import formidable from 'formidable';
import fs from 'fs';
import { changeUserAvatar } from '@/lib/sanityAdmin';

export const config = {
	api: {
		bodyParser: false,
	},
};

const post = async (req, res) => {
	const { userId } = req.query;
	const form = new formidable.IncomingForm();
	form.parse(req, async function (err, fields, files) {
		console.log(files.file.filepath);
		await changeUserAvatar(userId, files.file.filepath).then((response) => {
			return res.status(201).json({ message: 'Successfully saved', response });
		});
	});
};

const saveFile = async (file) => {
	const data = fs.readFileSync(file.path);
	fs.writeFileSync(`./sanityTemp/${file.name}`, data);
	await fs.unlinkSync(file.path);
	return;
};

export default function handler(req, res) {
	req.method === 'POST' ? post(req, res) : res.status(404).send('');
}
