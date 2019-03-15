import Vue from 'vue'
import Vuex from 'vuex'
import movies from './store/movie'
import cinema from './store/cinema'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    movies,
    cinema
	},
  state: {

  },
  mutations: {

  },
  actions: {

  }
})
