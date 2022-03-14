import { client } from '@/lib/sanity';
import { logoPrice, vendorShare } from 'data/bussiness-data';
import { format, addDays } from 'date-fns';
import { nanoid } from 'nanoid';

export const createBuyer = async (userData) => {
	const { fullname, email, phone } = userData;
	const oldBuyer = await getBuyer(email);

	if (oldBuyer.length > 0) {
		console.log('buyer exists');
		return oldBuyer[0]._id;
	}

	const buyer = {
		_type: 'buyers',
		fullName: fullname,
		email,
		phone,
	};

	return await client
		.create(buyer)
		.then((res) => {
			console.log('buyer created');
			return res._id;
		})
		.catch((err) => err);
};

export const getBuyer = async (email) => {
	const query = `*[_type == 'buyers' && email == $email] {
		...
	}`;
	const params = { email };

	return await client
		.fetch(query, params)
		.then((res) => res)
		.catch((err) => console.log('getBuyer\n', err));
};

export const updateBoughtItems = async (uid, items, tnxId) => {
	const currentDate = format(addDays(new Date(), 30), 'yyyy-MM-dd');

	const updates = items.map((item) => ({
		_key: nanoid(),
		product: {
			_ref: item.id,
			_type: 'reference',
		},
		price: +item.price,
		expires: currentDate,
		tnxId,
	}));

	return await client
		.patch(uid)
		.setIfMissing({ bought: [] })
		.append('bought', updates)
		.commit()
		.then((res) => {
			console.log('Bought items added/updated');
			return res._id;
		})
		.catch((err) => err);
};

export const productsAndVendors = async (items) => {
	// basically this function will update the product sales count and verdors earnings

	return items.forEach(async (item) => {
		const { id, price, creator } = item;
		const vendorEarning = price * (vendorShare / 100);

		console.log(item);
		return await client
			.patch(id)
			.setIfMissing({ totalSell: 0 })
			.inc({ totalSell: 1 })
			.commit()
			.then(async (res) => {
				console.log('Products sell count updated');
				return await client
					.patch(creator._id)
					.setIfMissing({ earnings: 0, balance: 0 })
					.inc({ earnings: +vendorEarning, balance: +vendorEarning })
					.commit()
					.then((res) => {
						console.log('Vendor earning updated');
					})
					.catch((err) => console.log('earning\n', err));
			})
			.catch((err) => console.log('totalSell\n', err));
	});
};

export const changeUserAvatar = async (uid, fileStream) =>
	await client.assets
		.upload('image', fileStream)
		.then((imageAsset) => {
			// Here you can decide what to do with the returned asset document.
			// If you want to set a specific asset field you can to the following:
			return client
				.patch(uid)
				.set({
					profilePic: {
						_type: 'image',
						asset: {
							_type: 'reference',
							_ref: imageAsset._id,
						},
					},
				})
				.commit();
		})
		.then((res) => {
			console.log('Done!');
			return { status: 'Profile picture successfully updated' };
		});

export const uploadLogoItem = async (uid, formData) => {
	const {
		categoryArray,
		description,
		main_file_stream,
		presentationAltText,
		presentation_img_stream,
		tagsArray,
		thumbnail_img_stream,
		title,
	} = formData;

	const presentation_img_id = await client.assets
		.upload('image', presentation_img_stream)
		.then((res) => {
			return res._id;
		})
		.catch((err) => {
			throw err;
		});
	const thumbnail_img_id = await client.assets
		.upload('image', thumbnail_img_stream)
		.then((res) => {
			return res._id;
		})
		.catch((err) => {
			throw err;
		});
	const main_file_id = await client.assets
		.upload('file', main_file_stream)
		.then((res) => {
			return res._id;
		})
		.catch((err) => {
			throw err;
		});

	const data = {
		_type: 'products',
		creator: {
			_type: 'reference',
			_ref: uid,
		},
		description,
		isApproved: 'pending',
		isFeatured: false,
		price: logoPrice,
		productCategory: categoryArray.map((item, index) => {
			return {
				_type: 'reference',
				_ref: item,
				_key: item,
			};
		}),
		productImage: {
			imageAlt: presentationAltText || title,
			presentation: {
				_type: 'image',
				asset: {
					_type: 'reference',
					_ref: presentation_img_id,
				},
			},
			thumbnail: {
				_type: 'image',
				asset: {
					_type: 'reference',
					_ref: thumbnail_img_id,
				},
			},
		},
		downloadable: {
			_type: 'file',
			asset: {
				_type: 'reference',
				_ref: main_file_id,
			},
		},
		tags: tagsArray,
		title,
		totalSell: 0,
		views: 0,
	};

	return await client
		.create(data)
		.then((res) => {
			console.log('Logo item was uploaded!');
			return res._id;
		})
		.catch((err) => {
			console.log(err);
			throw err;
		});
};
