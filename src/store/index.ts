import { createStore } from 'vuex'

import home from './home'

const store = createStore({
    
  state: {},
  mutations: {},
  actions: {},
  getters:{},

  modules: {
    home
  }
})

const setupStore = (app) => {
    app.use(store)
}
export default setupStore