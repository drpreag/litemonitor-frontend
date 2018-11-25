/** Custom axios module 
 *
 * usage:
 *
 * import http from '../modules/Axios.js';
 * Vue.use (http);
 * 
 * this.$http ...
 * or
 * Vue.http ...
 *
 */

import Vue from 'vue'
import axios from 'axios'
import auth  from './Auth'
Vue.use (auth);

export default Vue.http = axios.create({
	// baseURL: process.env.API_URL,
	baseURL: "http://backend.litemonitor.profidata/api",
	timeout: 3000,
	crossdomain: true 
});

let token = Vue.auth.getToken();

Vue.http.interceptors.request.use(config => {
	config.headers['Accept']= `application/json`;
	config.headers['Authorization'] = `Bearer ${token}`;
	return config;
});

Object.defineProperties(Vue.prototype, {
	$http: {
		get () {
			return Vue.http
		}		
	}
});
