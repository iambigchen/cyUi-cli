export default {
  state: {
    userinfo: {}
  },
  mutations: {
    _setUserInfo (state, data) {
      state.userinfo = data
    }
  },
  actions: {
    setUserInfo (context, data) {
      context.commit('_setUserInfo', data)
    }
  },
  getters: {
    getUserInfo (state) {
      return state.userinfo
    }
  }
}
