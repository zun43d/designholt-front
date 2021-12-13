import { getUserItems } from '@/lib/sanityDb';

export default async function handler(req, res) {
	const { userId } = req.query;

	try {
		await getUserItems(userId).then((response) => {
			res.status(200).json({ data: response });
		});
	} catch (err) {
		res.status(400).json({ message: 'Something went really wrong!' });
	}
}
