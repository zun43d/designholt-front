import getAccessToken from '@/utils/paypal/getPayPalAccessToken';

export default async function handler(req, res) {
	const {
		data: { access_token },
	} = await getAccessToken();
	console.log('accessToken', access_token);

	res.status(200).json({ message: 'sdawdw' });
}
