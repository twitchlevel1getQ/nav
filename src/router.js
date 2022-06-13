import Vue from 'vue'
import Router from 'vue-router'
import SelectClinic from './views/SelectClinic.vue'
import home from './views/Home.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/SelectClinic',
      name: 'SelectClinic',
      component: SelectClinic
    }
  ]
})
