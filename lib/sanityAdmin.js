import { client } from '@/lib/sanity';
import { logoPrice } from 'data/bussiness-data';

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
