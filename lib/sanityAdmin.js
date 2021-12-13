import { client } from '@/lib/sanity';
import { basename } from 'path';
import { createReadStream } from 'fs';

export const changeUserAvatar = async (uid, filePath) =>
	await client.assets
		.upload('image', createReadStream(filePath), {
			filename: basename(filePath),
		})
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
