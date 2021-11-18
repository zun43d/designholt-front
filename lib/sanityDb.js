import { client } from '@/lib/sanity';

export const createUser = async (uid, email, userData) => {
	const { fullName, gender, country } = userData;
	const user = {
		_id: uid,
		_type: 'vendors',
		country,
		email,
		fullName,
		gender,
	};

	return await client
		.create(user)
		.then((res) => {
			console.log('User was created');
			return res._id;
		})
		.catch((err) => err);
};

export const getUserFromSanity = async (uid, email) => {
	const query = `*[_type == 'vendors'] {
    "photoUrl": profilePic.asset->url,
    ...
  }`;
	const params = {};

	return await client.fetch(query, params).then((res) => res[0]);
};
