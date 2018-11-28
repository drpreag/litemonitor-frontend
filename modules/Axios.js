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
	baseURL: process.env.API_BASE_URL,
	timeout: 3000,
	crossdomain: true 
});

let token = Vue.auth.getToken();

if (token) {
	// request
	Vue.http.interceptors.request.use(config => {
		config.headers['Accept']=`application/json`;
		config.headers['Authorization']=`Bearer ${token}`;
		return config;
	});
	// response
	Vue.http.interceptors.response.use((response) => {
    	return response;
  	}, (error) => {
	    if (error.response.status === 401) {
    		Vue.swal ("You are not authorize for this operation");
    		this.$router.go(-1);
  		}
	});
}

Object.defineProperties(Vue.prototype, {
	$http: {
		get () {
			return Vue.http
		}		
	}
});
