import axios from 'axios';

const client_id = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
const client_secret = process.env.PAYPAL_SECRET_ID;

const getAccessToken = async () =>
	await axios({
		url: 'https://api-m.sandbox.paypal.com/v1/oauth2/token',
		method: 'post',
		headers: {
			Accept: 'application/json',
			'Accept-Language': 'en_US',
		},
		auth: {
			username: client_id,
			password: client_secret,
		},
		params: {
			grant_type: 'client_credentials',
		},
	});

export default getAccessToken;
