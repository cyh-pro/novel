import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rankCategory: null,
    chapter: null,
    minsCategory:null,
  },
  mutations: {
    updateRankCategory: function (state,payload) {
      state.rankCategory = payload
    },
    updateChapter: function (state,payload) {
      state.chapter = payload
    },
    minsCategory: function (state,payload) {
      state.minsCategory = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
