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
			this.setAuthUser();			
		},

		getToken () {
			var token 	   = localStorage.getItem('user_token');
			var expiration = localStorage.getItem('user_token_expiration');
			this.getAuthUser();

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
			localStorage.removeItem('user_id');
			localStorage.removeItem('user_fullname');
			localStorage.removeItem('user_email');
			this.destroyAuthUserData();
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
			this.setAuthUser();
		},

		getAuthenticatedUser() {
			return authenticatedUser;
		},

		setAuthUser() {
			Vue.http
                .get('/user')
                .then(response => {
                    localStorage.setItem('user_id', response.data.id );
                    localStorage.setItem('user_email', response.data.email );
                    localStorage.setItem('user_fullname', response.data.name );
                    localStorage.setItem('user_role_id', response.data.role_id );
                })
                .catch(error => {
                    console.log(error)
                });
		},

		getAuthUser() {
			var data = {}
			data = { 
				user_id: localStorage.getItem('user_id'),
				user_fullname: localStorage.getItem('user_fullname'),
				user_email: localStorage.getItem('user_email'),
				user_role_id: localStorage.getItem('user_role_id')
			};
			return data;
		},

		destroyAuthUserData() {
			localStorage.removeItem('user_id'),
			localStorage.removeItem('user_fullname'),
			localStorage.removeItem('user_email'),
			localStorage.removeItem('user_role_id')
		}				

	} // Vue.auth

	Object.defineProperties(Vue.prototype, {
		$auth: {
			get () {
				return Vue.auth
			}
		}
	});
}