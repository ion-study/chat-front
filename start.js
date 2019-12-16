var serviceConfig = require('./config/config')

console.log('start.js')
// Modules
const { Nuxt, Builder } = require('nuxt')
const app = require('express')()

const config = require('./nuxt.config')
// Force production mode (no webpack middleware called)
const port = serviceConfig.http.defaultPort

// const isProd = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'stg'

// Start Nuxt.js
const nuxt = new Nuxt(config)

/** TODO : Promise.resolve() VS build() 차이 확인 필요*/
// const promise = (isProd ? Promise.resolve() : new Builder(nuxt).build())
const promise = new Builder(nuxt).build()
promise.then(() => {
  app.use(nuxt.render)
  app.listen(port)
  console.log('Server is listening on ' + serviceConfig.http.defaultFrontHost + ':' + port)
})
  .catch((error) => {
    console.error(error)
    process.exit(1)
})