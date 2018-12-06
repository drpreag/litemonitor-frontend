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
	    	let userObject = {} 
			try {
    			const user = await this.WhoAmI();
		    	userObject = { 
						id: user.id,
						email: user.email,
						name: user.name,
						role_id: user.role_id
				};
  			} catch(e) {
    			return null;
  			}	
	     	return userObject;
	    },

	    WhoAmI () {
			return new Promise(resolve => {
				Vue.http
					.get('/whoami')
					.then(response => {
						resolve(response.data);
				  	})
					.catch(error => {
						console.log(error);
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