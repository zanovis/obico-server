<template>
  <b-container>
    <b-row class="justify-content-center">
      <b-col v-if="user" lg="8" class="mt-3">
        <div v-if="printersToShow.length === 0" class="wizard-container full-on-mobile">
          <b-container>
            <b-row>
              <div class="col-sm-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                <svg viewBox="0 0 1965 240" class="logo-img">
                  <use href="#svg-logo-compact" />
                </svg>
              </div>
            </b-row>
            <b-row>
              <h1 class="mx-auto">Welcome To Obico</h1>
            </b-row>
            <b-row>
              <b-col>
                <hr />
              </b-col>
            </b-row>
            <b-row v-if="isEnt && trialDaysLeft > 0">
              <b-col>
                <h3 v-if="trialDaysLeft >= 29" class="py-3">Your 30-Day <a class="link" target="_blank" href="https://www.obico.io/docs/user-guides/upgrade-to-pro/">Pro Plan</a> Free Trial Has Started!</h3>
                <h3 v-else class="py-3">{{trialDaysLeft}} Days Left on Your <a class="link" target="_blank" href="https://www.obico.io/docs/user-guides/upgrade-to-pro/">Pro Plan </a>Free Trial!</h3>
                <div class="pb-1"><i class="feature-check fas fa-check-circle"></i><span class="feature-text">Unlimited Secure Tunneling to your OctoPrint</span></div>
                <div class="pb-1"><i class="feature-check fas fa-check-circle"></i><span class="feature-text">Premium 25 FPS Webcam Streaming</span></div>
                <div class="pb-1"><i class="feature-check fas fa-check-circle"></i><span class="feature-text">250 AI Failure Detection Hours</span></div>
                <div class="pb-1"><i class="feature-check fas fa-check-circle"></i><span class="feature-text">G-Code Remote Upload and Printing</span></div>
                <div class="lead py-4">OctoPrint has not been linked to your Obico account.</div>
                <div class="d-flex flex-column align-center justify-content-center">
                  <div>
                    <a :href="wizardUrl" class="btn btn-primary btn-block mx-auto btn-lg">Link OctoPrint Now</a>
                  </div>
                  <div>
                    <div class="text-muted mx-auto text-center font-weight-light">It's as easy as 1-2-3.</div>
                  </div>
                </div>
              </b-col>
            </b-row>
            <div class="footer-note small">Not ready to start yet? <a href="mailto:support@obico.io?subject=Please%20pause%20my%20free%20trial">Email us</a> to pause your free trial.</div>
          </b-container>
        </div>
        <div v-else>
          <div class="text-center">
            <svg width="100" height="30">
              <use href="#svg-logo-full" />
            </svg>
          </div>

          <div v-if="authorized" class="authorization-successful">
            <h4 class="title">Authorization Successful!</h4>
            <p>You can close this page</p>
          </div>
          <div v-else>
            <div>
              <div class="lead text-center mt-3 mb-5">Tunnel Access Authorization</div>
              <h4 class="my-4"><span class="font-weight-bold">{{ appName }}</span> is requesting to access you OctoPrint Tunnel.</h4>
              <p class="text-muted"><a href="https://www.obico.io/docs/user-guides/octoprint-tunneling/" target="_blank">OctoPrint Tunnel</a> is a secure way provided by <a href="https://www.obico.io/" target="_blank">Obico</a> to remotely access your OctoPrint. With the OctoPrint Tunnel, you can use {{appName}} to access your OctoPrint from anywhere.</p>

              <b-alert v-if="!user.is_pro" variant="warning" dismissible class="my-3" show>
                <div>
                  <i class="fas fa-exclamation-triangle"></i> Tunnel usage of a free account is <a href="https://www.obico.io/docs/user-guides/octoprint-tunneling/#why-is-the-limit-on-free-account-only-100mb" target="_blank">capped at 500MB per month</a>. You can <a href="http://app.obico.io/ent_pub/pricing/" target="_blank">upgrade to the Obico app Pro plan for 1 Starbucks a month</a> to enjoy unlimited tunnel usage.
                </div>
              </b-alert>
              <b-alert v-if="user.is_pro && trialDaysLeft > 0" variant="warning" dismissible class="my-3" show>
                <div>
                  <i class="fas fa-exclamation-triangle"></i> After the Free trial expires, tunnel data usage will be <a href="https://www.obico.io/docs/user-guides/octoprint-tunneling/#why-is-the-limit-on-free-account-only-100mb" target="_blank">capped at 500MB per month</a>. You can <a href="http://app.obico.io/ent_pub/pricing/" target="_blank">upgrade to the Obico app Pro plan for 1 Starbucks a month</a> to continue enjoying unlimited tunnel usage.
                </div>
              </b-alert>

              <div class="mt-5">
                <p class="lead">Tunnel access by <span class="font-weight-bold">{{ appName }}</span> (make sure you trust it):
                <h5 v-if="printersToShow.length === 0">You have 0 active printers</h5>
                <h5 v-else-if="printersToShow.length === 1" class="font-weight-bold">{{ printersToShow[0].name }}</h5>
                <select v-else-if="printersToShow.length > 1" v-model="printerToAuthorize" class="custom-select">
                  <option :value="null" selected disabled>Please select a printer</option>
                  <option
                    v-for="printer in printersToShow"
                    :key="printer.id"
                    :value="printer.id"
                  >
                    {{ printer.name }}
                  </option>
                </select>
                <div v-if="printersToShow.length" class="d-flex mt-4 mb-3">
                  <button
                    class="btn btn-primary"
                    style="flex: 1"
                    @click="authorize"
                    :disabled="!printerToAuthorize || performingAuthRequest"
                  >
                    <b-spinner v-if="performingAuthRequest" small label="Loading..."></b-spinner>
                    <span v-else>Authorize</span>
                  </button>
                  <a class="btn btn-outline-secondary ml-2" style="flex: 1" href="/user_preferences/authorized_apps">Manage Apps</a>
                </div>
              </div>
            </div>
            <div class="mt-4">
              <p class="text-muted small mb-1">
                Security notes:
              </p>
              <ul class="text-muted small pl-4">
                <li>The app can only access the tunnel, not your Obico account info such as your email address.</li>
                <li>The access remains valid until explicitly revoked. You can revoke the access by going to Preferences -> Authorized Apps.</li>
              </ul>
            </div>
          </div>
        </div>
      </b-col>
      <b-col v-else class="mt-5">
        <div>
          <b-container>
            <div class="d-flex justify-content-center align-items-center">
                <img class="logo-icon"
                  :src="appLogo" />
                <h3>&#8644;</h3>
                <svg class="logo-icon obico">
                  <use href="#svg-logo-compact" />
                </svg>
                <h3>&#8644;</h3>
                <img class="logo-icon"
                  :src="require('@static/img/octoprint_logo.png')" />
            </div>
            <div class="my-4">
              <div class="mx-auto text-center">
                <h4>OctoPrint Tunnel</h4>
                <div class="lead">Powered by Obico</div>
              </div>
            </div>
            <div class="account-details">
              <p>With the OctoPrint Tunnel by Obico, you can now use {{appName}} to <a href="https://www.obico.io/docs/user-guides/octoprint-tunneling/" target="_blank">securely control and monitor your printer from anywhere</a>.</p>
              <div class="text-muted">Obico Free Account:</div>
              <ul class="text-muted">
                <li>Unlimited realtime webcam at 0.1FPS.</li>
                <li>500MB monthly tunnel data cap (excluding webcam streaming).</li>
                <li>10 hours/mo AI failure detection.</li>
              </ul>
              <div class="text-muted">Obico Pro Account (<a href="https://app.obico.io/ent_pub/pricing/" target="_blank">from $4/mo</a>):</div>
              <ul class="text-muted">
                <li>Unlimited realtime webcam streaming.</li>
                <li>Unlimited tunnel data usage.</li>
                <li>50 hours/mo AI failure detection.</li>
                <li><a href="https://app.obico.io/ent_pub/pricing/" target="_blank">And much more...</a></li>
              </ul>
            </div>
            <div>
              <div class="my-5 w-100">
                <a class="btn btn-primary btn-block" :href="loginUrl">SIGN IN </a>
                <div class="text-center pt-3 w-100">
                  <div class="font-weight-light text-muted">- OR -</div>
                  <a class="btn" :href="signupUrl">SIGN UP</a>
                </div>
              </div>
            </div>
          </b-container>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import urls from '@config/server-urls'
import { normalizedPrinter } from '@src/lib/normalizers'
import { user, settings} from '@src/lib/page_context'
import octopodLogo from '@static/img/octopod.webp'
import octoappLogo from '@static/img/octoapp.webp'
import polymerLogo from '@static/img/polymer.webp'
import printoidLogo from '@static/img/printoid.webp'
import genericAppLogo from '@static/img/generic-app.png'

export default {
  name: 'NewOctoPrintTunnelPage',

  components: {
  },

  data() {
    return {
      user: null,
      printers: [],
      printerId: null,
      printerToAuthorize: null,
      performingAuthRequest: false,
      authorized: false,
    }
  },

  created() {
    this.user = user()
    const {IS_ENT} = settings()
    this.isEnt = !!IS_ENT
    this.printerId = new URLSearchParams(window.location.search).get('printer_id')
    if (this.user) {
      this.fetchPrinters()
    }
  },

  computed: {
    printersToShow() {
      return this.printerId ? this.printers.filter((printer) => printer.id == this.printerId) : this.printers
    },
    loginUrl() {
      return `/accounts/login/?hide_navbar=true&next=${encodeURIComponent(window.location.pathname+window.location.search)}`
    },
    signupUrl() {
      return `/accounts/signup/?hide_navbar=true&next=${encodeURIComponent(window.location.pathname+window.location.search)}`
    },
    wizardUrl() {
      return `/printers/wizard/?redirectToTunnelCreation=${encodeURIComponent(window.location.pathname+window.location.search)}`
    },
    appName() {
      return new URLSearchParams(window.location.search).get('app') || 'Unknown App'
    },
    trialDaysLeft() {
      if (this.user?.subscription?.plan_id !== 'pro-trial') {
        return -1
      }
      return moment(this.user.subscription.expired_at).diff(moment(), 'days') + 1
    },
    appLogo() {
      switch (this.appName.toLowerCase()) {
        case 'octopod':
          return octopodLogo
        case 'printoid':
          return printoidLogo
        case 'polymer':
          return polymerLogo
        case 'octoapp':
          return octoappLogo
        default:
          return genericAppLogo
      }
    },
  },

  methods: {
    fetchPrinters() {
      return axios
        .get(urls.printers())
        .then(response => {
          response.data.forEach((p) => {
            this.printers.push(normalizedPrinter(p))
          })
          if (this.printersToShow.length == 1) {
            this.printerToAuthorize = this.printersToShow[0].id
          }
        })
    },

    authorize() {
      if (this.printersToShow.length) {
        this.performingAuthRequest = true
        axios
          .post(urls.tunnels(), {
            app_name: this.appName,
            target_printer_id: this.printerToAuthorize || this.printersToShow[0].id,
          })
          .then(response => {
            this.authorized = true
            const tunnelEndpoint = response.data.tunnel_endpoint
            const redirectUrl = new URLSearchParams(window.location.search).get('success_redirect_url') || '/tunnels/succeeded/'
            window.location.replace(`${redirectUrl}?tunnel_endpoint=${tunnelEndpoint}`)
          })
          .catch(error => {
            this.performingAuthRequest = false
            this.$swal.Reject.fire({
              title: 'Oops',
              text: error.message,
            })
          })
      }
    }
  },
}
</script>

<style lang="sass" scoped>
body
  padding-bottom: 0

.wizard-container
  padding: 1.5rem 0.6rem 3rem

.feature-check
  color: var(--color-primary)

.feature-text
  margin-left: 0.5em

.authorization-successful
  padding-top: 6rem
  text-align: center

.logo-img
  max-height: 4em
  margin-bottom: 2em

.logo-icon
  max-height: 50px
  object-fit: contain
  border-radius: 8px
  margin: 0px 15px

  &.obico
    max-width: 46px
    color: var(--color-primary)

.account-details
  background: var(--color-surface-secondary)
  border-radius: var(--border-radius-sm)
  padding: 15px
  margin-left: -15px
  margin-right: -15px

.footer-note
  margin: 3rem 0 -1.5rem
  text-align: right
</style>

