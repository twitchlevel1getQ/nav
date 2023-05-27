import Vue from 'vue'
import Router from 'vue-router'
import SelectClinic from './views/SelectClinic.vue'
import navi from './views/navi.vue'
import ChooseDept from './views/ChooseDept.vue'
import ToSearch from './views/ToSearch.vue'
import Registed from './views/Registed.vue'
import PatientInquire from './views/PatientInquire.vue'
import DivisionProgress from './views/DivisionProgress.vue'
import EditRemark from './views/EditRemark.vue'
import ReservePrescription from './views/ReservePrescription/ReservePrescription.vue'
import Navigator from './views/Navigator/Navigator.vue'
import Home from './views/Home.vue'
import longdpage from './views/Navigator/longdpage.vue'
import pay from './views/Navigator/pay.vue'
import rgpage from './views/Navigator/rgpage.vue'
import rgquery from './views/Navigator/rgquery.vue'
import rgrecord from './views/Navigator/rgrecord.vue'
import schedule from './views/Navigator/schedule.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Navigator',
      component: Navigator
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
    },
     {
      path: '/Navigator',
      name: 'Navigator',
      component: Navigator
    },{
      path: '/longdpage',
      name: 'longdpage',
      component: longdpage
    },{
      path: '/rgquery',
      name: 'rgquery',
      component: rgquery
    },{
      path: '/pay',
      name: 'pay',
      component: pay
    },{
      path: '/rgrecord',
      name: 'rgrecord',
      component: rgrecord
    },{
      path: '/rgpage',
      name: 'rgpage',
      component: rgpage
    },{
      path: '/schedule',
      name: 'schedule',
      component: schedule
    },,{
      path: '/navi',
      name: 'navi',
      component: navi
    },
  ]
})
