/**
 * Created by zhangtao on 2017/12/26
 * Description vue-commands
 */
import components from './components'
import Axios from './http.js'
import {fw} from './core'
let Commands = {
  name: 'landz-ui-commands',
  install(Vue, options) {
    Vue.directive('over', {
      // 当被绑定的元素插入到 DOM 中时……
      inserted: function (el) {
        console.log(el.offsetWidth,el.scrollWidth)
        if (el.offsetWidth < el.scrollWidth) {
          el.setAttribute('title', el.innerText)
        }
      }
    })
    //注入通用组件
    for (let _name in components) {
      Vue.component(_name, components[_name])
    }
    //全局变量
    Vue.prototype.$g = {
      Error: window.Error
    }
    Vue.prototype.$axios = Axios
    Vue.prototype.fw = fw
    let valiSize = function (size) {
      return function (rule, value, callback) {
        if (value.length > size) {
          callback(new Error('最大长度' + size))
        } else {
          callback()
        }
      }
    }
    let email = function () {
      return function (rule, value, callback) {
        var reg = /^(|(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3}))$/
        var re = new RegExp(reg)
        if (!re.test(value)) {
          return callback(new Error('请输入正确的邮箱'))
        } else {
          return callback()
        }
      }
    }
    let idCard = function () {
      return function (rule, value, callback) {
        var regu = /^(|(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w))$/
        var re = new RegExp(regu)
        if (!re.test(value)) {
          // return callback(new Error('请输入正确的身份证号码'))
          return callback(new Error('请输入正确的身份证号码'))
        } else {
          return callback()
        }
      }
    }
    let telPhone = function () {
      return function (rule, value, callback) {
        var reg = /^(|(\d{3,4}-?)?\d{7,9})$/g
        var re = new RegExp(reg)
        if (!re.test(value)) {
          return callback(new Error('请输入正确的电话号码'))
        } else {
          return callback()
        }
      }
    }
    let qq = function () {
      return function (rule, value, callback) {
        if (value) {
          let reg = /^(|\d{5,15})$/
          if (reg.test(value)) {
            callback()
          } else {
            callback(new Error('请输入正确的QQ号码'))
          }
        } else {
          callback()
        }
      }
    }
    let weChat = function () {
      return function (rule, value, callback) {
        var reg = /^(|[a-zA-Z\d_-]{5,})$/
        var re = new RegExp(reg)
        if (!re.test(value)) {
          return callback(new Error('请输入正确的微信号'))
        } else {
          return callback()
        }
      }
    }
    let cellPhone = function () {
      return function (rule, value, callback) {
        var reg = /^(13[0123456789][0-9]{8}|15[012356789][0-9]{8}|17[0123456789][0-9]{8}|18[0123456789][0-9]{8}|147[0-9]{8})$/
        var re = new RegExp(reg)
        if (!re.test(value)) {
          return callback(new Error('请输入正确的手机号码'))
        } else {
          return callback()
        }
      }
    }
    //校验规则
    Vue.prototype.$validator = {
      size140: valiSize(140),
      size100: valiSize(100),
      size50: valiSize(30),
      size10: valiSize(10),
      email: email(),
      idCard: idCard(),
      tel: telPhone(),
      cellPhone: cellPhone(),
      QQ: qq(),
      weChat: weChat()
    }
    //默认值过滤器 空值时返回'--'
    Vue.filter('def', function (value) {
      if (value === 0 || value === '0' || value === '0.00') {
        value = value.toString()
        return value
      } else if (!value) {
        return '--'
      } else {
        value = value.toString()
        return value
      }
    })
    //码值
    Vue.filter('bit', function (value) {
      if (value) {
        let str
        if (Array.isArray(value)) {
          str = value[1]
          value = value[0].toString()
        } else {
          str = value.toString().slice(0, 4)
          for (var k in fw.app.$store.getters.getDatabict) {
            if (k.split('-')[0] === str && k.split('-')[1]) {
              console.error(value + '存在多个父码值，请核对一下')
            }
          }
        }
        if (fw.app.$store.getters.getDatabict[str]) {
          let dictName = ''
          let childDict = fw.app.$store.getters.getDatabict[str].childDict
          childDict.forEach(function (item) {
            if (item.dictCode === value) {
              dictName = item.dictName
            }
          })
          return dictName
        } else {
          return value
        }
      } else {
        return '--'
      }
    })
    //时间
    Vue.filter('time', function (value) {
      if (value) {
        return fw.api.dateChange(value)
      } else {
        return '--'
      }
    })
    Vue.directive('over', {
      // 当被绑定的元素插入到 DOM 中时……
      inserted: function (el) {
        if (el.offsetWidth < el.scrollWidth) {
          el.setAttribute('title', el.innerText)
        }
      }
    })
  }
}

export default Commands
