// import axios from 'axios';
const axios = require('axios');

export default {
	user: {
		login: (credentials) => 
			axios.post('/api/auth', { credentials }).then(res => res.data.user)
	}
}