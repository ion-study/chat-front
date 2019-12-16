let configLevel

switch (process.env.NODE_ENV) {
  case 'stg' :
    configLevel = 'stg'
    break
  case 'dev' :
    configLevel = 'dev'
}

console.log('ConfigLevel:', configLevel)
const config = require('./app.' + configLevel + '.config.json')
config.level = configLevel
console.log('config : ' + JSON.stringify(config))

module.exports = config
