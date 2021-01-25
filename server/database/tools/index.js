const SteamUtils = require('./steam-utils')
SteamUtils.getAppDetails('596120')
  .then(game => {
    console.log(game)
  })
  .catch(error => console.log(error.message))
