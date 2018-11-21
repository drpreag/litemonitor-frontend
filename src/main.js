// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
//import vueResource from 'vue-resource'
import VueMoment from 'vue-moment'
import moment from 'moment'

// Navigation bar
import NavBar from './components/NavBar'
// Users
import Users from '@/components/Users/Users'
import User from '@/components/Users/User'
import UserCreate from '@/components/Users/UserCreate'
import UserEdit from '@/components/Users/UserEdit'
// Roles
import Roles from '@/components/Roles/Roles'
import Role from '@/components/Roles/Role'
import RoleCreate from '@/components/Roles/RoleCreate'
import RoleEdit from '@/components/Roles/RoleEdit'
// Services
import Services from '@/components/Services/Services'
import Service from '@/components/Services/Service'
import ServiceCreate from '@/components/Services/ServiceCreate'
import ServiceEdit from '@/components/Services/ServiceEdit'
// Hosts
import Hosts from '@/components/Hosts/Hosts'
import Host from '@/components/Hosts/Host'
import HostCreate from '@/components/Hosts/HostCreate'
import HostEdit from '@/components/Hosts/HostEdit'
// Probes

// Common pages
import Dashboard from '@/components/Dashboard'
import Login from '@/components/Auth/Login'
import Register from '@/components/Auth/Register'
import Drawing from '@/components/Charts/Drawing'
//import HelloWorld from '@/components/HelloWorld'
// alert
// 404
// about

import "../src/assets/style.css";

import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCHBxwgAWq_QPjn7mRpKAvLvgSs6e71M3A",
    libraries: "places" //necessary for places input
  }
});

Vue.use(VueRouter)

//Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('content')
Vue.config.productionTip = false

const router = new VueRouter ({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', name: 'Dashboard', component: Dashboard },

    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register },
    // { path: '/logout', name: 'Logout', component: Logout },

    { path: '/users', name: 'Users', component: Users },
    { path: '/users/:id', name: 'User', component: User },    
    { path: '/users_create', name: 'UserCreate', component: UserCreate },
    { path: '/users_edit', name: 'UserEdit', component: UserEdit },    

    { path: '/roles', name: 'Roles', component: Roles },
    { path: '/roles/:id', name: 'Role', component: Role },
    { path: '/roles_create', name: 'RoleCreate', component: RoleCreate },
    { path: '/roles_edit', name: 'RoleEdit', component: RoleEdit },

    { path: '/services', name: 'Services', component: Services },
    { path: '/services/:id', name: 'Service', component: Service },
    { path: '/services_create', name: 'ServiceCreate', component: ServiceCreate },
    { path: '/services_edit', name: 'ServiceEdit', component: ServiceEdit },

    { path: '/hosts', name: 'Hosts', component: Hosts },
    { path: '/hosts/:id', name: 'Host', component: Host },
    { path: '/hosts_create', name: 'HostCreate', component: HostCreate },
    { path: '/hosts_edit', name: 'HostEdit', component: HostEdit },
  ]
});

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
