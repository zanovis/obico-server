import moment from 'moment'
import get from 'lodash/get'
import filesize from 'filesize'
import semverGte from 'semver/functions/gte'

export const toMomentOrNull = datetimeStr => {
  if (!datetimeStr) {
    return null
  }
  return moment(datetimeStr)
}

export const normalizedPrint = print => {
  print.ended_at = toMomentOrNull(print.cancelled_at || print.finished_at)
  print.started_at = toMomentOrNull(print.started_at)
  print.uploaded_at = toMomentOrNull(print.uploaded_at)
  print.has_alerts = Boolean(print.alerted_at)
  return print
}

export const normalizedGcode = gcode => {
  gcode.created_at = toMomentOrNull(gcode.created_at)
  gcode.updated_at = toMomentOrNull(gcode.updated_at)
  gcode.deleted = toMomentOrNull(gcode.deleted)
  gcode.filesize = filesize(gcode.num_bytes)
  return gcode
}

export const normalizedPrinter = (newData, oldData) => {
  const printerMixin = {
    createdAt: function() { return toMomentOrNull(this.created_at) },
    isOffline: function() { return get(this, 'status', null) === null },
    isPaused: function() { return get(this, 'status.state.flags.paused', false) },
    isDisconnected: function() { return get(this, 'status.state.flags.closedOrError', true) },
    isActive: function() {
      const flags = get(this, 'status.state.flags')
      // https://discord.com/channels/704958479194128507/705047010641838211/1013193281280159875
      return Boolean(flags && flags.operational && (!flags.ready || flags.paused))
    },
    inTransientState: function() { return !this.hasError() && get(this, 'status.state.text', '').includes('ing') && !get(this, 'status.state.text', '').includes('Printing') },
    inUserInteractionRequired: function() { return get(this, 'status.user_interaction_required', false) },
    hasError: function() { return get(this, 'status.state.flags.error') || get(this, 'status.state.text', '').toLowerCase().includes('error') },
    isAgentMoonraker: function() { return get(this, 'agent_name', '') === 'moonraker_obico'},
    agentDisplayName: function() { return this.isAgentMoonraker() ? 'Klipper' : 'OctoPrint' },
    basicStreamingInWebrtc: function() {
      return get(this, 'settings.agent_name', '') === 'octoprint_obico' && semverGte(get(this, 'settings.agent_version', '0.0.0'), '2.1.0') ||
        get(this, 'settings.agent_name', '') === 'moonraker_obico' && semverGte(get(this, 'settings.agent_version', '0.0.0'), '0.3.0')
    },
    alertUnacknowledged: function() {
      return get(this, 'current_print.alerted_at')
                && moment(
                  get(this, 'current_print.alerted_at')
                ).isAfter(
                  moment(get(this, 'current_print.alert_acknowledged_at') || 0)
                )
    },
  }
  if (oldData){
    if (get(oldData, 'status._ts', -1) > get(newData, 'status._ts', get(oldData, 'status._ts', 0))) {
      delete newData.status
    }
    return {
      ...oldData,
      ...newData,
      ...printerMixin,
    }
  } else {
    return {
      ...newData,
      ...printerMixin,
    }
  }
}

export const normalizedPrinterEvent = printerEvent => {
  printerEvent.created_at = toMomentOrNull(printerEvent.created_at)
  return printerEvent
}