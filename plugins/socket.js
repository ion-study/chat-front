import Vue from 'vue'
const socketUtils = require('~/utils/socketUtils')

Vue.use({
  install: function (Vue) {
    Vue.prototype.$ws = socketUtils
  }
})
