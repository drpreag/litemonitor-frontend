/** Custom axios module 
 *
 * usage:
 *
 * import http from '../modules/Axios.js';
 *
 */

import axios from 'axios'

const unauthHttp = axios.create({
	baseURL: process.env.API_BASE_URL,
	timeout: 3000,
	crossdomain: true 
});

export default unauthHttp