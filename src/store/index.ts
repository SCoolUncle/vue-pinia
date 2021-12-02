import { createStore } from 'vuex'

import user from './modules/user'
import home from './modules/home'

const store = createStore({
    
  state: {
    historyUrl:''
  },
  mutations: {
    setHistoryUrl(state,payload){
      state.historyUrl = payload
    }
  },
  actions: {},
  getters:{},

  modules: {
    user,
    home
  }
})

const setupStore = (app) => {
    app.use(store)
}
export default setupStore