import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
import VueAxios from 'vue-axios'

import gows from './assets/js/gows'

//fontawesome
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCalendarDays, faBookmark, faCircle } from "@fortawesome/free-solid-svg-icons";
library.add(faCalendarDays, faBookmark, faCircle);
import { faClipboard } from "@fortawesome/free-regular-svg-icons";
library.add(faClipboard);

//sweetalert
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

//ckeditor
import CKEditor from '@ckeditor/ckeditor5-vue2';


import './assets/css/bootstrap.min.css'
import './assets/css/style.css'
import './assets/js/bootstrap.min.js'
import './assets/js/popper.min.js'

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$gows = gows
Vue.use(VueAxios, axios)
Vue.use(CKEditor);
Vue.use(VueSweetalert2);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
