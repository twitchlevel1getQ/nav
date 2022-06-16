import Vue from 'vue'
import Router from 'vue-router'
import SelectClinic from './views/SelectClinic.vue'
import ChooseDept from './views/ChooseDept.vue'
import PatientInquire from './views/PatientInquire.vue'
import DivisionProgress from './views/DivisionProgress.vue'
import EditRemark from './views/EditRemark.vue'
import Home from './views/Home.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/ChooseDept',
      name: 'ChooseDept',
      component: ChooseDept
    },
    {
      path: '/DivisionProgress',
      name: 'DivisionProgress',
      component: DivisionProgress
    },
    {
      path: '/SelectClinic',
      name: 'SelectClinic',
      component: SelectClinic
    },
    {
      path: '/PatientInquire',
      name: 'PatientInquire',
      component: PatientInquire
    }, {
      path: '/EditRemark',
      name: 'EditRemark',
      component: EditRemark
    }
  ]
})
