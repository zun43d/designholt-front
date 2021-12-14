import { client } from '@/lib/sanity';

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
