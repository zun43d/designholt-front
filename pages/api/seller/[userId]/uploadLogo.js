import fs, { readFileSync } from 'fs';
import formidable from 'formidable';
import { processImage } from '@/utils/processImage';
import { uploadLogoItem } from '@/lib/sanityAdmin';

export const config = {
	api: {
		bodyParser: false,
	},
};

const commaSeparator = (stringList) => {
	const arrayRaw = stringList.split(',');
	return arrayRaw.map((item) => item.trim());
};

const validateFileSize = (file, maxSizeMb) => {
	const maxSize = maxSizeMb * 1024 * 1024; // in bytes
	return file.size <= maxSize;
};

const upload = async (req, res) => {
	if (req.headers.api_key !== process.env.NEXT_PUBLIC_API_ROUTE_KEY) {
		return res.status(401).send('Unauthorized');
	}

	const { userId } = req.query;
	const form = new formidable.IncomingForm();
	form.parse(req, async function (errors, fields, files) {
		if (validateFileSize(files.main_file, 3)) {
			const presentation_img_stream = await processImage(
				files.presentation_img,
				{
					width: 800,
					quality: 90,
				}
			);
			const thumbnail_img_stream = await processImage(files.thumbnail_img, {
				width: 160,
				quality: 60,
			});
			const main_file_stream = fs.createReadStream(files.main_file.filepath);

			const { tags, category, ...rest } = fields;

			const tagsArray = commaSeparator(tags);
			const categoryArray = commaSeparator(category);

			const logoUploadData = {
				presentation_img_stream,
				thumbnail_img_stream,
				main_file_stream,
				tagsArray,
				categoryArray,
				...rest,
			};

			await uploadLogoItem(userId, logoUploadData)
				.then((response) => {
					res
						.status(201)
						.json({ message: 'Logo was uploaded successfully', response });
				})
				.catch((err) => {
					res
						.status(401)
						.json({ message: 'Something really went wrong!', err });
				});
		} else {
			res
				.status(406)
				.json({ message: 'Maximum file size for logo zip file is 3MB!' });
		}
	});
};

export default function handler(req, res) {
	req.method === 'POST' ? upload(req, res) : res.status(404).send('');
}
