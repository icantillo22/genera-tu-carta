import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

/* modules */
import resignationLetter from './modules/resignationLetter'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    resignationLetter
  },
  plugins: [
    createPersistedState({
      paths: [
        'resignationLetter'
      ],
    })
  ]
})
