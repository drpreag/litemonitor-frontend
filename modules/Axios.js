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
	// Vue.http.interceptors.response.use((response) => {
 //    	return response;
 //  	}, (error) => {
	//     if (error.response.status === 401) {
 //    		Vue.swal ("You are not authorize for this operation");
 //    		this.$router.go(-1);
 //  		}
	// });

	Vue.http.interceptors.response.use(response => {return response}, error => {
	  console.log("Error: (" + error.response.status + ") " + error.response.statusText);
	  if (error.response.status === 401) {
	    router.push("/401");
	  }
	  else if (error.response.status === 403) {
	    router.push("/403");
	  }
	  else if (error.response.status === 404) {
	    router.push("/404");
	  }
	  else if (error.response.status === 500) {
	    router.push("/500");
	  }
	  else if (error.response.status === 503) {
	    router.push("/503");
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
