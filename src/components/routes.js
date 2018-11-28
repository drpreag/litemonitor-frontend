import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter);

// Common pages
import Home from '@/components/Home';
import Dashboard from '@/components/Dashboard';
import Login from '@/components/Auth/Login';
import Logout from '@/components/Auth/Logout';
import Register from '@/components/Auth/Register';
// alert
// 404
// about

// Users
import Users from '@/components/Users/Users';
import User from '@/components/Users/User';
import UserCreate from '@/components/Users/UserCreate';
import UserEdit from '@/components/Users/UserEdit';
// Roles
import Roles from '@/components/Roles/Roles';
import Role from '@/components/Roles/Role';
import RoleCreate from '@/components/Roles/RoleCreate';
import RoleEdit from '@/components/Roles/RoleEdit';
// Services
import Services from '@/components/Services/Services';
import Service from '@/components/Services/Service';
import ServiceCreate from '@/components/Services/ServiceCreate';
import ServiceEdit from '@/components/Services/ServiceEdit';
// Hosts
import Hosts from '@/components/Hosts/Hosts';
import Host from '@/components/Hosts/Host';
import HostCreate from '@/components/Hosts/HostCreate';
import HostEdit from '@/components/Hosts/HostEdit';

// export default [
const router = new VueRouter ({
    mode: 'history',
    base: __dirname,    
    routes: [
        { path: '/', name: 'Home', component: Home, meta: { public: true } },
        { path: '/home', name: 'Home2', component: Home, meta: { public: true } },
        { path: '/dashboard', name: 'Dashboard', component: Dashboard },

        { path: '/login', name: 'Login', component: Login, meta: { public: true } },
        { path: '/register', name: 'Register', component: Register, meta: { public: true } },
        { path: '/logout', name: 'Logout', component: Logout },

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
    ],
    // linkActiveClass: 'active'
})

export default router;