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
//import HelloWorld from '@/components/HelloWorld'
// alert
// 404
// about

import 'bulma/css/bulma.css'
import '@/assets/bulma_restyle.css'

Vue.use(VueRouter)
//Vue.use(vueResource)

//Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('content')
Vue.config.productionTip = false

const router = new VueRouter ({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', name: 'Dashboard', component: Dashboard },
    { path: '/users', name: 'Users', component: Users },
    { path: '/user/:id', name: 'User', component: User },    
    { path: '/user_create', name: 'UserCreate', component: UserCreate },
    { path: '/user_edit', name: 'UserEdit', component: UserEdit },    

    { path: '/roles', name: 'Roles', component: Roles },
    { path: '/role/:id', name: 'Role', component: Role },
    { path: '/role_create', name: 'RoleCreate', component: RoleCreate },
    { path: '/role_edit', name: 'RoleEdit', component: RoleEdit },

    { path: '/services', name: 'Services', component: Services },
    { path: '/service/:id', name: 'Service', component: Service },
    { path: '/service_create', name: 'ServiceCreate', component: ServiceCreate },
    { path: '/service_edit', name: 'ServiceEdit', component: ServiceEdit },

    { path: '/hosts', name: 'Hosts', component: Hosts },
    { path: '/host/:id', name: 'Host', component: Host },
    { path: '/host_create', name: 'HostCreate', component: HostCreate },
    { path: '/host_edit', name: 'HostEdit', component: HostEdit },
  ]
});

Vue.filter('customFormat', function(value) {
      return moment.utc(value).local().format("MM/DD/YYYY hh:mm");
  });

Vue.filter('timeago', function(value) {
      return moment.utc(value).local().fromNow();
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
