/** Custom axios module 
 *
 * usage:
 *
 * import http from '../modules/Axios_api.js';
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
import router  from '../src/components/routes.js'
Vue.use (auth);

export default Vue.http = axios.create({
	baseURL: process.env.API_BASE_URL,
	timeout: 3000,
	crossdomain: true 
});

let token = Vue.auth.getToken();

if (token) {
	// request
	// if(Vue.auth.isAuthenticated()) {
		Vue.http.interceptors.request.use(config => {
			config.headers['Accept']=`application/json`;
			config.headers['Authorization']=`Bearer ${token}`;
			return config;
		});
	// }

	Vue.http.interceptors.response.use(response => {
		return response
	}, error => {
  		console.log("Error: (" + error.response.status + ") " + error.response.statusText);
		if (error.response.status === 401) {
			router.push({ name: "401"});
		}
		else if (error.response.status === 403) {
			router.push({ name: "403"});
		}
		else if (error.response.status === 404) {
			router.push({ name: "404"}); 
		}
		else if (error.response.status === 429) {
			router.push({ name: "429"}); 
		}	  
		else if (error.response.status === 500) {
			router.push({ name: "500"});
		}
		else if (error.response.status === 503) {
			router.push({ name: "503"});
		}
		return Promise.reject(error);
	});	
}

Object.defineProperties(Vue.prototype, {
	$http: {
		get () {
			return Vue.http
		}		
	}
});

// export default Vue.http