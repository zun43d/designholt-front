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
	const query = `*[_type == 'vendors' && 	_id == $uid] {
    "photoUrl": profilePic.asset->url,
    ...
  }`;
	const params = { uid };

	return await client.fetch(query, params).then((res) => res[0]);
};

export const getUserItems = async (uid) => {
	const query = `*[_type == 'products' && creator._ref == $uid] {
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
		isApproved,
		price,
		"productCategory": productCategory[]->categoryName,
		"productImage": {
			"imageAlt": productImage.imageAlt,
			"presentation": productImage.presentation.asset->url,
			"thumbnail": productImage.thumbnail.asset->url,
		},
		tags,
		title,
		totalSell,
		views,
	}`;
	const params = { uid };

	return await client.fetch(query, params).then((res) => res);
};

export const getAllCategories = async () => {
	const query = `*[_type == 'category'] {
		_id,
		categoryName,
		slug,
	}`;
	const params = {};

	return await client.fetch(query, params).then((res) => res);
};

export const slugToCategory = async (slug) => {
	const query = `*[_type == 'category' && slug == $slug] {
		_id,
		categoryName,
		slug,
	}`;
	const params = { slug };

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
			"presentation": productImage.presentation.asset->url,
			"thumbnail": productImage.thumbnail.asset->url,
		},
		tags,
		title,
		totalSell,
		views,
		section,
	}`;
	const params = {};

	return await client.fetch(query, params).then((res) => res);
};

export const getProductsByCategory = async (
	categorySlug,
	pageIndex = 1,
	totalPerPage = 999999999999
) => {
	console.log(categorySlug);

	const startOffset = pageIndex * totalPerPage - totalPerPage;

	const query = `*[_type == 'products' && isApproved == "approved" && $categorySlug in productCategory[]->slug] {
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
		"productCategory": productCategory[]->slug,
		"productImage": {
			"imageAlt": productImage.imageAlt,
			"presentation": productImage.presentation.asset->url,
			"thumbnail": productImage.thumbnail.asset->url,
		},
		tags,
		title,
		totalSell,
		views,
		section,
	}[$startOffset...$startOffset + $totalPerPage]`;
	const params = { categorySlug, startOffset, totalPerPage };

	return await client.fetch(query, params).then((res) => res);
};

export const getFeaturedProducts = async (amount) => {
	const query = `*[_type == 'products' && isFeatured == true && isApproved == "approved"] {
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
		price,
		"productCategory": productCategory[]->categoryName,
		"productImage": {
			"imageAlt": productImage.imageAlt,
			"presentation": productImage.presentation.asset->url,
			"thumbnail": productImage.thumbnail.asset->url,
		},
		tags,
		title,
		totalSell,
		views,
	}${amount ? `[0...${amount}]` : ''}`;
	const params = { amount };

	return await client.fetch(query, params).then((res) => res);
};

export const getProductDetails = async (pid) => {
	const query = `*[_type == 'products' && _id == $pid] {
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
			"presentation": productImage.presentation.asset->url,
			"thumbnail": productImage.thumbnail.asset->url,
		},
		tags,
		title,
		totalSell,
		views,
	}`;
	const params = { pid };

	return await client.fetch(query, params).then((res) => res);
};

// Blogs realted segment

export const getAllBlogs = async () => {
	const query = `*[_type == 'blogs'] {
		_id,
		publishedAt,
		title,
		description,
		"slug": slug.current,
		body,
		"mainImage" : {
			"imageAlt": mainImage.imageAlt,
			"img": mainImage.asset->url,
		},
		tags,
		isFeatured,
	}`;
	const params = {};

	return await client.fetch(query, params).then((res) => res);
};

export const getBlogBySlug = async (slug) => {
	const query = `*[_type == 'blogs' && slug.current == $slug] {
		_id,
		publishedAt,
		title,
		description,
		"slug": slug.current,
		body,
		"mainImage" : {
			"imageAlt": mainImage.imageAlt,
			"img": mainImage.asset->url,
		},
		tags,
		isFeatured,
	}`;
	const params = { slug };

	return await client.fetch(query, params).then((res) => res);
};
