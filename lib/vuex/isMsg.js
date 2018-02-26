export default {
  state: {
    msgNum: {}
  },
  mutations: {
    _setMsgNum (state, data) {
      state.msgNum = data
    }
  },
  actions: {
    setMsgNum (context, data) {
      context.commit('_setMsgNum', data)
    }
  },
  getters: {
    getMsgNum (state) {
      return state.msgNum
    }
  }
}
