import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    area: 0,
    language:'zh-tw',
  },
  mutations: {
    Area(state, status) {
      state.area = status;
    },
    lang(state, status) {
      state.language = status;
    }
  },
  actions: {
    updateArea(context, status) {
      context.commit("Area", status);
    },
    updlanguage(context, status) {
      context.commit("lang", status);
    }
  }
})
