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

export const getAllProducts = async () => {
	const query = `*[_type == 'products' && isApproved == "approved"] {
		_id,
		_createdAt,
		_updatedAt,
		"creator": creator-> {
			_id,
			uid,
			email,
			fullName,
			"profilePic": profilePic.asset->url,
			isDisabled
		},
		description,
		isFeatured,
		price,
		"productCategory": productCategory[]->categoryName,
		"productImage": {
			"imageAlt": productImage.imageAlt,
			"previewImage": productImage.previewImage.asset->url,
		},
		tags,
		title,
		totalSell,
		views,
	}`;
	const params = {};

	return await client.fetch(query, params).then((res) => res);
};
