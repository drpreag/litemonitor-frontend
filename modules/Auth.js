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

export default function(Vue) {

	let authenticatedUser = {};

	Vue.auth = {

		setToken (token, expiration) {
			localStorage.setItem('token', token);
			localStorage.setItem('expiration', expiration);
		},

		getToken () {
			var token 	   = localStorage.getItem('token');
			var expiration = localStorage.getItem('expiration');

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
			localStorage.removeItem('token');
			localStorage.removeItem('expiration');
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