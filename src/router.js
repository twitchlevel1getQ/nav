import Vue from 'vue'
import Router from 'vue-router'
import SelectClinic from './views/SelectClinic.vue'
import ChooseDept from './views/ChooseDept.vue'
import ToSearch from './views/ToSearch.vue'
import Registed from './views/Registed.vue'
import PatientInquire from './views/PatientInquire.vue'
import DivisionProgress from './views/DivisionProgress.vue'
import EditRemark from './views/EditRemark.vue'
import ReservePrescription from './views/ReservePrescription/ReservePrescription.vue'
import Home from './views/Home.vue'
Vue.use(Router)

export default new Router({
  // mode: 'history',
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
      path: '/Registed',
      name: 'Registed',
      component: Registed
    },
    {
      path: '/ToSearch',
      name: 'ToSearch',
      component: ToSearch
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
    },
    {
      path: '/ReservePrescription',
      name: 'ReservePrescription',
      component: ReservePrescription
    }
  ]
})
