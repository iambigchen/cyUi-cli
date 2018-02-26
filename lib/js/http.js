/**
 * Created by zhangtao on 2017/12/26
 * Description http.js
 */
// 引入axios以及element ui中的loading和message组件
import axios from 'axios'
import { Loading, Message } from 'element-ui'
import {fw} from './core'
// 超时时间
axios.defaults.timeout = 15000
//提供给服务器判断 401 删掉会302
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'

let _Loading = {
  loadinginstace: null,
  open () {
    this.loadinginstace = Loading.service({fullscreen: true})
    this.loadinginstace.$el.innerHTML = this.loadinginstace.$el.innerHTML
  },
  close () {
    if (this.loadinginstace) {
      this.loadinginstace.close()
    }
  }
}
// http请求拦截器
axios.interceptors.request.use(config => {
  // element ui Loading方法
  if (config.fullscreen === true || config.fullscreen === 'true') {
    // loadinginstace = Loading.service({fullscreen: true})
    _Loading.open()
  }
  return config
}, error => {
  _Loading.close()
  Message.error({
    message: '加载超时:' + error.toString()
  })
  return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(data => {
  // 响应成功关闭loading
  _Loading.close()
  return data
}, error => {
  if (error.response && error.response.status === 401) {
    if(fw.config.loginUrl.constructor === String){
      window.location.href = fw.config.loginUrl
    }else{
      Message.error({
        message: '请设置登录地址'
      })
    }
  } else {
    Message.error({
      message: '加载失败:' + error.toString()
    })
    _Loading.close()
  }
  return Promise.reject(error)
})

export default axios
