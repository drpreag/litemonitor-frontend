import Vue from 'vue'

export default function(Vue) {
// export default {

	Vue.constants = {
		'USER_ROLE_READER': 1,
		'USER_ROLE_MODERATOR': 5,
		'USER_ROLE_ADMIN': 9
	}

	Object.defineProperties(Vue.prototype, {
		$constants: {
			get () {
				return Vue.constants
			}
		}
	});
}