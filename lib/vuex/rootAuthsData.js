/**
 * Created by liet on 2017/10/11.
 */
export default {
  state: {
    rootAuths: {}
  },
  mutations: {
    rootAuths: (state, data) => {
      state.rootAuths = data
    }
  },
  actions: {
    setRootAuths: (context, data) => {
      context.commit('rootAuths', data)
    }
  },
  getters: {
    getRootAuths: state => {
      return state.rootAuths
    }
  }
}
