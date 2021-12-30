import { getUserItems } from '@/lib/sanityDb';

export default async function handler(req, res) {
	if (req.headers.api_key !== process.env.NEXT_PUBLIC_API_ROUTE_KEY) {
		console.log(req.headers);
		return res.status(401).send('Unauthorized');
	}

	const { userId } = req.query;

	try {
		await getUserItems(userId).then((response) => {
			res.status(200).json({ data: response });
		});
	} catch (err) {
		res.status(400).json({ message: 'Something went really wrong!' });
	}
}
