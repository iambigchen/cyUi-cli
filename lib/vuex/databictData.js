/**
 * Created by liet on 2017/10/11.
 */
export default {
  state: {
    databict: {},
    databictMap: {}
  },
  mutations: {
    databict: (state, data) => {
      state.databict = data
    },
    databictMap: (state, data) => {
      state.databictMap = data
    }
  },
  actions: {
    setDatabict: (context, data) => {
      context.commit('databict', data)
    },
    setDatabictMap: (context, data) => {
      context.commit('databictMap', data)
    }
  },
  getters: {
    getDatabict: state => {
      return state.databict
    },
    getDatabictMap: state => {
      return state.databictMap
    }
  }
}
