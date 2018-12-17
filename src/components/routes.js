import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter);

// Common pages
import Home from '@/components/views/Home';
import Statistics from '@/components/views/Statistics';
import Dashboard from '@/components/views/Dashboard';
// import About from '@/components/views/About';

import Login from '@/components/Auth/Login';
import Logout from '@/components/Auth/Logout';
import Register from '@/components/Auth/Register';
import WhoAmI from '@/components/Auth/WhoAmI';

// Error pages
import Error401 from '@/components/views/error_pages/Error401'
import Error403 from '@/components/views/error_pages/Error403'
import Error404 from '@/components/views/error_pages/Error404'
import Error429 from '@/components/views/error_pages/Error429'
import Error500 from '@/components/views/error_pages/Error500'
import Error503 from '@/components/views/error_pages/Error503'

// Users
import Users from '@/components/views/Users/Users';
import User from '@/components/views/Users/User';
import UserCreate from '@/components/views/Users/UserCreate';
import UserEdit from '@/components/views/Users/UserEdit';
// Roles
import Roles from '@/components/views/Roles/Roles';
import Role from '@/components/views/Roles/Role';
import RoleCreate from '@/components/views/Roles/RoleCreate';
import RoleEdit from '@/components/views/Roles/RoleEdit';
// Services
import Services from '@/components/views/Services/Services';
import Service from '@/components/views/Services/Service';
import ServiceCreate from '@/components/views/Services/ServiceCreate';
import ServiceEdit from '@/components/views/Services/ServiceEdit';
// Hosts
import Hosts from '@/components/views/Hosts/Hosts';
import Host from '@/components/views/Hosts/Host';
import HostCreate from '@/components/views/Hosts/HostCreate';
import HostEdit from '@/components/views/Hosts/HostEdit';

// export default [
const router = new VueRouter ({
    mode: 'history',
    base: __dirname,    
    routes: [
        { path: '/', name: 'Home', component: Home, meta: { public: true } },
        { path: '/statistics', name: 'Statistics', component: Statistics },
        { path: '/dashboard', name: 'Dashboard', component: Dashboard },
        { path: '/login', name: 'Login', component: Login, meta: { public: true } },
        { path: '/whoami', name: 'whoAmI', component: WhoAmI, meta: { public: true } },
        { path: '/register', name: 'Register', component: Register, meta: { public: true } },
        { path: '/logout', name: 'Logout', component: Logout },

        { path: '/401', name: '401', component: Error401, meta: { public: true } },
        { path: '/403', name: '403', component: Error403, meta: { public: true } },
        { path: '/404', name: '404', component: Error404, meta: { public: true } },
        { path: '/429', name: '429', component: Error429, meta: { public: true } },
        { path: '/500', name: '500', component: Error500, meta: { public: true } },
        { path: '/503', name: '503', component: Error503, meta: { public: true } },

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
})

export default router;
