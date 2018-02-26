/**
 * Created by zhangtao on 2018/1/16
 * Description main.js
 */

import {fw, init, store} from './js/core'
import Commands from './js/commands'
import plugins from './js/plugins'

let LandzUI = {
  name: 'landz-ui',
  init,
  store
}
let api = fw.api,
  $axios = api.$axios,
  qs = api.qs,
  mapActions = api.mapActions,
  mapGetters = api.mapGetters,
  mapMutations = api.mapMutations,
  mapState = api.mapState,
  timer = api.timer,
  dateChange = api.dateChange,
  transDate = api.transDate,
  debounce = api.debounce,
  throttle = api.throttle

LandzUI.install = Commands.install
export default LandzUI
export {
  $axios,
  qs,
  debounce,
  throttle,
  mapGetters,
  mapState,
  mapActions,
  mapMutations,
  timer,
  dateChange,
  transDate,
  plugins
}
