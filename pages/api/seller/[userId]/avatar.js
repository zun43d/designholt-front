import formidable from 'formidable';
import fs from 'fs';
import { changeUserAvatar } from '@/lib/sanityAdmin';
import { processImage } from '@/utils/processImage';

export const config = {
	api: {
		bodyParser: false,
	},
};

const post = async (req, res) => {
	const { userId } = req.query;
	const form = new formidable.IncomingForm();
	form.parse(req, async function (err, fields, files) {
		const compressedImgPath = await processImage(files.file, {
			width: 200,
			quality: 80,
		});
		console.log(compressedImgPath);
		if (compressedImgPath) {
			await changeUserAvatar(userId, compressedImgPath).then(
				async (response) => {
					fs.rm(compressedImgPath, { recursive: true }, () => {
						res.status(201).json({ message: 'Successfully saved', response });
					});
				}
			);
		}
	});
};

export default function handler(req, res) {
	req.method === 'POST' ? post(req, res) : res.status(404).send('');
}
