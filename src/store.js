import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    area: 0,
  },
  mutations: {
    Area(state, status) {
      state.area = status;
    }
  },
  actions: {
    updateArea(context, status) {
      context.commit("Area", status);
    }
  }
})
