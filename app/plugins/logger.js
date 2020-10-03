import debug from 'debug'
// https://github.com/visionmedia/debug#readme
export default {
  install: function (Vue, isProduction) {
    const dbg = debug('steamroi:app:debug')
    const error = debug('steamroi:app:error')
    const info = debug('steamroi:app:info')
    const log = debug('steamroi:app:log')
    const warn = debug('steamroi:app:warn')
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
