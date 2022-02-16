import getAccessToken from './getPayPalAccessToken';

const {
	data: { access_token },
} = await getAccessToken();

const verifyTnx = async (id) => {};

// I will have to do that later on :)))
