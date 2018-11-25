import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMoment from 'vue-moment'
import moment from 'moment'
//import vueResource from 'vue-resource'

// Navigation bar
import NavBar from '@/components/NavBar'

// custom css restyle
import "../src/assets/style.css";
// custom modules
import auth from '../modules/Auth.js';
Vue.use (auth);
import http from '../modules/Axios.js';
Vue.use (http);

import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCHBxwgAWq_QPjn7mRpKAvLvgSs6e71M3A",
    libraries: "places" //necessary for places input
  }
});

import router from '@/components/routes.js';

router.beforeEach (
  (to, from, next) => {
    if (! to.matched.some(record => record.meta.public)) {
      if (! Vue.auth.isAuthenticated()) {
        next ({
          path: "/"
        })
      } else {
        next()
      }
     } else { //next(false)
      if (Vue.auth.isAuthenticated()) {
        next (false)
      } else {
        next()
      }
     }
  }
)

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

/* eslint-disable no-new */
new Vue({
  // auth,
  // http,
  router,
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
