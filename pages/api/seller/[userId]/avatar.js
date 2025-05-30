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
	if (req.headers.api_key !== process.env.NEXT_PUBLIC_API_ROUTE_KEY) {
		return res.status(401).send('Unauthorized');
	}

	const { userId } = req.query;
	const form = new formidable.IncomingForm();
	form.parse(req, async function (err, fields, files) {
		const imageStream = await processImage(files.file, {
			width: 200,
			quality: 80,
		}).catch((err) => {
			return res.status(400).send('Invalid image');
		});
		if (imageStream) {
			await changeUserAvatar(userId, imageStream).then(async (response) => {
				res.status(201).json({ message: 'Successfully saved', response });
			});
		}
	});
};

export default function handler(req, res) {
	req.method === 'POST' ? post(req, res) : res.status(404).send('');
}
