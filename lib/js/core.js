/**
 * Created by zhangtao on 2017/12/26
 * Description framework
 */
import Axios from './http.js'
import debounce from 'lodash.debounce'
import throttle from 'lodash.throttle'
import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'
import qs from 'qs'
import store from '../vuex/index'

let fw = {}
let _const = {
  'version': '1.0.0'
}
let _databictMap = {}
let core = {
  'app': {}//应用vue实例
}

let api = {
  $axios: Axios,
  debounce,
  throttle,
  qs,
  mapActions,
  mapGetters,
  mapMutations,
  mapState,
  timer () {
    return new Date().getTime()
  },
  priceToFix (name, val, config) {
    let _this = this
    let _val = parseFloat(val)
    let _min
    _val = isNaN(_val) ? '' : _val.toFixed(2).toString()
    if (config && config.max !== '' && _val > Number(config.max) && config.max !== undefined) {
      _val = ''
    }
    if (!config || !config.min) {
      _min = 0
    } else {
      _min = config.min
    }
    if (_val < _min) {
      _val = ''
    }
    try {
      let arr = name.split('.')
      arr.forEach((key, idx) => {
        if (arr.length - 1 > idx) {
          _this = _this[key]
        }
      })
      _this[arr.pop()] = _val
    } catch (e) {
      throw e
    }
  },
  dateChange (val) {
    if (val) {
      let reg = /^(d{4})-(d{1,2})-(d{1,2})$/
      if (reg.test(val)) {
        return val
      } else {
        let d = new Date(val)
        let y = d.getFullYear()
        let m = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)
        let day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
        return y + '-' + m + '-' + day
      }
    } else {
      return ''
    }
  },
  transDate (val) {
    console.log(val)
    if (val) {
      if (val.split(' ')[1]) {
        let dataArr = val.split(' ')[0].split('-')
        if (dataArr[1].split('').length < 2) {
          dataArr[1] = '0' + dataArr[1]
        }
        if (dataArr[2].split('').length < 2) {
          dataArr[2] = '0' + dataArr[2]
        }
        let str = dataArr[0] + '-' + dataArr[1] + '-' + dataArr[2]
        return new Date(str)
      } else {
        return new Date(val)
      }
    } else {
      return ''
    }
  },
  Table: class {
    constructor (_this, url, sort) {
      this.vm = _this
      this.url = url
      this.sort = sort
      this.result = _this.result
      this.sort_params = {}
      this.isSearch = false
    }

    init () {
      Object.assign(this.sort_params, this.sort)
      this.refresh()
      return this
    }

    search () {
      this.isSearch = true
      this.sort.currentPage = 1
      Object.assign(this.sort_params, this.sort)
      this.refresh()
    }

    refresh () {
      let that = this
      for (let key in this.sort_params) {
        let val = this.sort_params[key]
        this.sort_params[key] = val instanceof String ? val.trim() : val
      }
      this.vm.$axios.post(this.url, this.sort_params, {fullscreen: true}).then(response => {
        if (response.data.state === 'error') {
          that.vm.$alert(response.data.msg, '提示', {
            confirmButtonText: '确定',
            callback: action => {

            }
          })
        } else {
          let result = response.data.result
          if (result.pageNum === 0) {
            result.pageNum = 1
          }
          this.vm.result = response.data.result
        }
        that.isSearch = false
      })
      return this
    }

    handleCurrentChange (val) {
      if (this.isSearch) {
        this.isSearch = false
      } else {
        this.sort_params.currentPage = val
        this.refresh()
      }
    }
  }
}

let Status = function * (...status) {
  for (let name in status) {
    yield status[name]
  }
}

let status = {
  fw: 'init'
}
fw = Object.assign({},_const,core,{api},{status})

let _init = function (cb) {
  let store = this.app.$store
  let $axios = Axios
  let fetch = function ({url='',filter=(res)=>res.data.result}) {
    return new Promise((resolve, reject) => {
      $axios.post(url).then(response => {
        resolve(filter(response))
      }).catch((e) => {
        reject(e)
      })
    })
  }
  if (this.config.userdataUrl.constructor === String) {
    //vuex码值
    fetch({url: this.config.userdataUrl}).then((data) => {
      //用户信息
      store.dispatch('setUserInfo', data.userinfo)
      //子类码值
      let cityCode = data.userinfo.currentCity
      store.dispatch('setDatabict', data[cityCode])
      //父类码值databictMap
      store.dispatch('setDatabictMap', _databictMap)
      //vuex权限
      store.dispatch('setRootAuths', data.rootAuths)
      return cb instanceof Function ? cb() : ''
    })
  }
  if (this.config.msgAmountUrl.constructor === String) {
    //消息
    fetch({url: this.config.msgAmountUrl}).then((data) => {
      store.dispatch('setMsgNum', data)
    })
  }
}
let init = function ({
  app = false,
  databictMap = {},
  msgAmountUrl = false,
  userdataUrl = false,
  loginUrl = false
}) {
  let initStatus = Status('pending', 'success')
  status.fw = initStatus.next()
  _databictMap = databictMap
  Object.assign(fw, {
    app: app,
    config:{
      databictMap,
      msgAmountUrl,
      userdataUrl,
      loginUrl
    }
  })
  _init.call(fw, () => {
    status.fw = initStatus.next()
  })
}
export { init, fw, store }
