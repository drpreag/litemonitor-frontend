import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMoment from 'vue-moment'
import moment from 'moment'
//import vueResource from 'vue-resource'
import runtime from 'serviceworker-webpack-plugin/lib/runtime'
if ('serviceWorker' in navigator) {
  runtime.register();
}

// Navigation bar
import NavBar from '@/components/NavBar'
// custom css restyle
import "../src/assets/style.css";

// custom modules
import auth from '../modules/Auth.js';
Vue.use (auth);
import http from '../modules/Axios_api.js';
Vue.use (http);
import constants from '../modules/constants.js';
Vue.use (constants);
import VueSweetalert2 from 'vue-sweetalert2';
Vue.use (VueSweetalert2);

Vue.prototype.$eventHub = new Vue(); 

import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCHBxwgAWq_QPjn7mRpKAvLvgSs6e71M3A",
    libraries: "places" //necessary for places input
  }
});

import router from '@/components/routes.js';

//Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('content')
Vue.config.productionTip = false

Vue.filter('customFormat', function(value) {
      return moment.utc(value).local().format("MM/DD/YYYY hh:mm");
  });

Vue.filter('time-ago', function(value) {
      return moment.utc(value).local().fromNow();
  });

Vue.filter('two-decimals', function(value) {
    if (value)
      return value.toFixed(2);
    return null;
  });

// router.beforeEach (
//   (to, from, next) => {
//     if (! to.matched.some(record => record.meta.public)) {
//       if (! Vue.auth.isAuthenticated()) {
//         next ({
//           path: "/"
//         })
//       } else {
//         next()
//       }
//      } else { //next(false)
//       if (Vue.auth.isAuthenticated()) {
//         next (false)
//       } else {
//         next()
//       }
//      }
//   }
// )

/* eslint-disable no-new */
new Vue({
  //http,
  auth,
  constants,
  router,
  VueSweetalert2,
  template: `
	  <div id="app" class="container">
	    <nav-bar></nav-bar>  
	    <router-view/>
	  </div>
  `,
  components: {
    NavBar
  }
}).$mount('#app')  
