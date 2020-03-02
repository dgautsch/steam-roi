import debug from 'debug'
// https://github.com/visionmedia/debug#readme
export default {
  install: function (Vue, isProduction) {
    const dbg = debug('steamroi:debug')
    const error = debug('steamroi:error')
    const info = debug('steamroi:info')
    const log = debug('steamroi:log')
    const warn = debug('steamroi:warn')
    dbg.log = console.debug.bind(console)
    error.log = console.error.bind(console)
    info.log = console.info.bind(console)
    log.log = console.log.bind(console)
    warn.log = console.warn.bind(console)

    Vue.prototype.$logger = {
      debug: dbg,
      error,
      info,
      log,
      warn
    }

    if (!isProduction) {
      debug.enable('steamroi:*')
    } else {
      debug.disable()
    }
  }
}
