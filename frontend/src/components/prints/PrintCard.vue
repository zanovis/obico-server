<template>
  <div class="col-sm-12 col-md-6 col-lg-4 print-card">
    <div class="card vld-parent">
      <div v-if="isPublic" class="card-header">
        - By {{ print.creator_name }}
      </div>
      <div v-else class="card-header">
        <div :style="{visibility: hasSelectedChangedListener ? 'visible' : 'hidden'}">
          <b-form-checkbox
            v-model="selected"
            @change="onSelectedChange"
            size="lg"
            class="text-decoration-none"
          ></b-form-checkbox>
        </div>
        <b-form-radio-group
          v-model="selectedCardView"
          buttons
          button-variant="outline-primary"
          name="radio-btn-outline"
        >
          <b-form-radio
            value="detective"
            class="no-corner no-shadow"
            :disabled="!canShowDetectiveView"
          >
            <i class="fas fa-balance-scale"></i>
          </b-form-radio>
          <b-form-radio value="info" class="no-corner no-shadow">
            <i class="fas fa-info"></i>
          </b-form-radio>
        </b-form-radio-group>
        <b-dropdown right no-caret toggle-class="icon-btn">
          <template #button-content>
            <i class="fas fa-ellipsis-v"></i>
          </template>
          <b-dropdown-item v-if="this.print.video_url && !print.video_archived_at" :href="this.print.video_url" target="_blank">
            <i class="fas fa-download"></i>Download Original Time-lapse
          </b-dropdown-item>
          <b-dropdown-item
            v-if="this.print.tagged_video_url && !print.video_archived_at"
            :href="this.print.tagged_video_url" target="_blank"
          >
            <i class="fas fa-download"></i>Download Detective Time-lapse
          </b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item @click="deleteVideo">
            <span class="text-danger">
              <i class="fas fa-trash-alt"></i>Delete
            </span>
          </b-dropdown-item>
        </b-dropdown>
      </div>
      <div>
        <div class="position-relative" v-if="print.video_archived_at">
          <div class="poster-placeholder-wrapper">
            <svg class="poster-placeholder">
              <use :href="posterSrc" />
            </svg>
          </div>
          <div class="archived-info">
            <div class="text">Video file is deleted. <a href="#" @click="showVideoArchivedDescription($event)">Why?</a></div>
          </div>
        </div>
        <div v-else>
          <video-box
            v-if="videoUrl"
            :videoUrl="videoUrl"
            :posterUrl="print.poster_url"
            :fluid="true"
            :fullscreenBtn="hasFullscreenListener"
            @timeupdate="onTimeUpdate"
            @fullscreen="$emit('fullscreen', print.id, videoUrl)"
          />
          <div v-else>
            <detective-working />
          </div>
        </div>
        <div v-show="cardView == 'info' && !isPublic">
          <div class="card-body">
            <div class="container">
              <div class="row">
                <div class="text-muted col-4">
                  File
                  <span class="float-right">:</span>
                </div>
                <div class="col-8">{{ print.filename }}</div>
              </div>
              <div class="row" v-b-tooltip.hover :title="this.humanizedPrintedOrUploadedTime(longFormat=true)">
                <div class="text-muted col-4">
                  {{ wasTimelapseUploaded ? "Uploaded" : "Printed" }}
                  <span class="float-right">:</span>
                </div>
                <div
                  class="col-8"
                >{{ this.humanizedPrintedOrUploadedTime() }} {{ endStatus }}</div>
              </div>
              <div class="row" v-if="!wasTimelapseUploaded && duration" :id="'dur-'+print.id">
                <b-tooltip :target="'dur-'+print.id" triggers="hover">
                  {{ duration | duration("asHours") | floor }}:{{ duration | duration("minutes") }}:{{ duration | duration("seconds") }}
                </b-tooltip>
                <div class="text-muted col-4">
                  Duration
                  <span class="float-right">:</span>
                </div>
                <div class="col-8">{{ duration.humanize() }}</div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="isPublic" class="bg-warning alert-banner text-center" :style="{opacity: normalizedP > 0.4 ? 1 : 0}">
          <!-- v-show="normalizedP > 0.4" -->
          <i class="fas fa-exclamation-triangle"></i> Possible failure detected!
        </div>

        <div v-show="cardView == 'detective' || isPublic">
          <gauge
            v-if="print.prediction_json_url"
            :normalizedP="normalizedP"
          />
          <div v-if="!isPublic" class="feedback-section">
            <div class="text-center py-2 px-3">
              <div
                class="lead"
                :class="[print.alerted_at ? 'text-danger' : 'text-success', ]"
              >{{ print.alerted_at ? 'Failure detected' : 'No failure detected' }}</div>
              <div class="py-2">
                Did we get it right?
                <b-button
                  :variant="thumbedUp ? 'primary' : 'outline'"
                  @click="onThumbUpClick"
                  class="mx-2 btn-sm"
                >
                  <b-spinner v-if="inflightAlertOverwrite" type="grow" small></b-spinner>
                  <i v-else class="fas fa-thumbs-up"></i>
                </b-button>
                <b-button
                  :variant="thumbedDown ? 'primary' : 'outline'"
                  @click="onThumbDownClick"
                  class="mx-2 btn-sm"
                >
                  <b-spinner v-if="inflightAlertOverwrite" type="grow" small></b-spinner>
                  <i v-else class="fas fa-thumbs-down"></i>
                </b-button>
              </div>
              <transition name="bounce">
                <div v-if="focusedFeedbackEligible" class="pt-2">
                  <a
                    role="button"
                    class="btn btn-sm btn-outline-primary px-4"
                    :href="focusedFeedbackLink"
                  >
                    F
                    <i class="fas fa-search focused-feedback-icon"></i>CUSED FEEDBACK
                    <svg v-if="!focusedFeedbackCompleted" class="seg-control-icon ml-1 double-hours-icon">
                      <use href="#svg-hour-double" />
                    </svg>
                  </a>
                </div>
              </transition>
            </div>
            <div class="text-muted py-2 px-3 help-text">
              <small v-if="focusedFeedbackEligible">
                <span
                  v-if="focusedFeedbackCompleted"
                >Thank you for completing the Focused Feedback. You have earned 2 non-expirable AI Detection Hours. You can click the button again to change your feedback.</span>
                <span v-else>
                  With Focused Feedback, you can tell us exactly where we got it wrong. This is the most effective way to help us improve.
                  <a
                    href="https://www.obico.io/docs/user-guides/how-does-credits-work#you-earn-detective-hours-for-giving-focused-feedback"
                  >You will earn 2 AI Detection Hours once you finish the Focused Feedback</a>.
                </span>
              </small>

              <small v-else>
                Every time you give us feedback,
                <a
                  href="https://www.obico.io/docs/user-guides/how-does-credits-work/"
                >you help us get better at detecting failures</a>.
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import filter from 'lodash/filter'
// import get from 'lodash/get'

import {getNormalizedP} from '@src/lib/utils'
import urls from '@config/server-urls'
import VideoBox from '@src/components/VideoBox'
import Gauge from '@src/components/Gauge'
import DetectiveWorking from '@src/components/DetectiveWorking'

export default {
  name: 'PrintCard',

  components: {
    VideoBox,
    Gauge,
    DetectiveWorking,
  },

  data: () => {
    return {
      ALERT_THRESHOLD: 0.4,
      currentPosition: 0,
      predictions: [],
      selectedCardView: 'detective',
      inflightAlertOverwrite: null,
    }
  },

  props: {
    print: Object,
    isPublic: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: false
    },
  },

  computed: {
    wasTimelapseUploaded() {
      return this.print.uploaded_at !== null
    },

    endStatus() {
      return this.print.cancelled_at ? '(Cancelled)' : ''
    },

    duration() {
      return this.print.ended_at && this.print.started_at
        ? moment.duration(this.print.ended_at.diff(this.print.started_at))
        : null
    },

    canShowDetectiveView() {
      if (
        this.print.prediction_json_url !== null &&
        this.print.tagged_video_url !== null
      ) {
        return true
      }
      // Time-lapses that was uploaded within the past 24 hours are presumably still be processed
      if (
        (this.print.uploaded_at &&
          moment().diff(this.print.uploaded_at, 'hours') < 24)
      ) {
        return true
      }
      return false
    },

    cardView() {
      return this.canShowDetectiveView ? this.selectedCardView : 'info'
    },

    videoUrl() {
      return this.cardView == 'info'
        ? this.print.video_url
        : this.print.tagged_video_url
    },

    thumbedUp() {
      if (!this.print.alert_overwrite) {
        return false
      }
      return (
        this.print.has_alerts ^ (this.print.alert_overwrite === 'NOT_FAILED')
      )
    },

    thumbedDown() {
      if (!this.print.alert_overwrite) {
        return false
      }
      return this.print.has_alerts ^ (this.print.alert_overwrite === 'FAILED')
    },

    focusedFeedbackEligible() {
      return (
        this.print.printshotfeedback_set.length > 0 &&
        this.print.alert_overwrite
      )
    },

    focusedFeedbackCompleted() {
      return (
        this.print.printshotfeedback_set.length > 0 &&
        filter(this.print.printshotfeedback_set, f => !f.answered_at).length ==
          0
      )
    },

    focusedFeedbackLink() {
      return `/prints/shot-feedback/${this.print.id}/`
    },

    hasSelectedChangedListener() {
      return Boolean(this.$listeners && this.$listeners.selectedChanged)
    },

    hasFullscreenListener() {
      return Boolean(this.$listeners && this.$listeners.fullscreen)
    },

    normalizedP() {
      return getNormalizedP(this.predictions, this.currentPosition, this.isPublic)
    },

    posterSrc() {
      return this.print.poster_url || '#svg-3d-printer'
    },
  },

  methods: {
    onTimeUpdate(currentPosition) {
      this.currentPosition = currentPosition
    },

    onSelectedChange() {
      this.$emit('selectedChanged', this.print.id, !this.selected) // this method is called before this.selected is flipped. So need to inverse it before passing it event listener
    },

    deleteVideo() {
      axios.delete(urls.print(this.print.id)).then(() => {
        this.$emit('printDeleted', this.print.id)
      })
    },

    onThumbUpClick() {
      this.inflightAlertOverwrite = this.print.has_alerts
        ? 'FAILED'
        : 'NOT_FAILED'
      this.alertOverwrite(this.inflightAlertOverwrite)
    },

    onThumbDownClick() {
      this.inflightAlertOverwrite = this.print.has_alerts
        ? 'NOT_FAILED'
        : 'FAILED'
      this.alertOverwrite(this.inflightAlertOverwrite)
    },

    alertOverwrite(value) {
      axios.patch(
        urls.print(this.print.id),
        {
          alert_overwrite: value,
        })
        .then(response => {
          this.$emit('printDataChanged', response.data)
          this.inflightAlertOverwrite = null
        })
    },

    fetchPredictions() {
      axios.get(this.print.prediction_json_url).then(response => {
        this.predictions = response.data
      })
    },

    humanizedPrintedOrUploadedTime(longFormat=false) {
      if (!this.print.uploaded_at && !this.print.ended_at) {
        return '-'
      }
      const ts = this.wasTimelapseUploaded ? this.print.uploaded_at : this.print.ended_at
      if (longFormat) {
        return ts.format('LLLL')
      } else {
        return ts.fromNow()
      }
    },
    showVideoArchivedDescription(event) {
      event.preventDefault()
      this.$swal.Prompt.fire({
        title: 'Time-lapse video deleted',
        html: `
          <p>Time-lapse videos older than 6-months are deleted from the Obico app server as they are rarely needed and cost significant amount to store in the cloud.</p>
          <p>If you are a Pro subscriber and you don't want your time-lapse videos to be deleted, please <a href="mailto:support@obico.io?subject=Please%20keep%20my%20timelapse%20videos">contact us</a>.</p>
          `,
        showCloseButton: true,
      })
    },
  },
  mounted() {
    if (this.print.prediction_json_url) {
      this.fetchPredictions()
    }

    if (!this.print.tagged_video_url) {
      this.selectedCardView = 'info'
    }
  }
}
</script>

<style lang="sass" scoped>
.print-card
  margin-top: var(--gap-between-blocks)

.card-header
  display: flex
  flex-flow: row nowrap
  justify-content: space-between
  align-items: center

.seg-control-icon
  height: 1.2rem
  width: 1.2rem
  &.double-hours-icon
    width: 1.5rem

.feedback-section
  background-color: var(--color-surface-secondary)

.bounce-enter-active
  animation: bounce-in .5s

.bounce-leave-active
  animation: bounce-in .5s reverse

@keyframes bounce-in
  0%
    transform: scale(0)
  50%
    transform: scale(1.5)
  100%
    transform: scale(1)

.help-text
  line-height: 1.2

.bg-warning.alert-banner
  position: static
  display: block

.archived-info
  position: absolute
  width: 100%
  z-index: 10
  bottom: 0
  left: 0
  background-color: rgba(0,0,0,.6)
  text-align: center
  padding: 10px 0

::v-deep .vjs-poster, ::v-deep .video-js
  background-color: #000

.poster-placeholder-wrapper
  height: 250px
  background-color: #000

  .poster-placeholder
    $size: 100px
    color: rgb(255 255 255 / .2)
    width: $size
    height: $size
    position: absolute
    left: calc(50% - #{$size / 2})
    top: calc(50% - #{$size / 2} - 20px)

i.fas
  width: 1em

</style>
