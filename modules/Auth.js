/** Custom auth module 
 *
 * usage:
 *
 * import auth from '../modules/Auth.js';
 * Vue.use (auth);
 * 
 * this.$auth
 * or
 * Vue.auth
 *
 */

import Vue from 'vue'

export default function(Vue) {

	let authenticatedUser = {};

	Vue.auth = {

		setToken (token, expiration) {
			localStorage.setItem('user_token', token);
			localStorage.setItem('user_token_expiration', expiration);
		},

		getToken () {
			var token 	   = localStorage.getItem('user_token');
			var expiration = localStorage.getItem('user_token_expiration');

			if(!token || !expiration) {
				return null;
			}

			if(Date.now() > parseInt(expiration)) {
				this.destroyToken();
				return null;
			} else {
				return token;
			}
		},

		destroyToken () {
			localStorage.removeItem('user_token');
			localStorage.removeItem('user_token_expiration');
		},

		isAuthenticated () {
			if(this.getToken()) {
				return true;
			} else {
				return false;
			}
		},

		setAuthenticatedUser(data) {
			authenticatedUser = data;
		},

		getAuthenticatedUser() {
			return authenticatedUser;
		},

	    async getUser () {
			try {
    			await this.WhoAmI()
    			 	.then ((response)=> {
	     				return response.data
					})
					.catch(error => {
						console.log(error)
					});
			} catch (err) {
					console.log (err)
			}
	    },

	    WhoAmI () {
			return new Promise((resolve,reject) => {
				Vue.http
					.get('whoami')
					.then(response => {
						localStorage.setItem('user_id', response.data.id);
	    			 	localStorage.setItem('user_email', response.data.email);
	    			 	localStorage.setItem('user_name', response.data.name);
	    			 	localStorage.setItem('user_role_id', response.data.role_id);					
						resolve(response)
				  	})
					.catch(error => {
						reject (error)
					});
			});
	    },

	} // Vue.auth

	Object.defineProperties(Vue.prototype, {
		$auth: {
			get () {
				return Vue.auth
			}
		}
	});
}