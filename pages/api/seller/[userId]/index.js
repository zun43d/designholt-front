import { getUserItems } from '@/lib/sanityDb';

async function provideUserItems(req, res) {
	if (req.headers.api_key !== process.env.NEXT_PUBLIC_API_ROUTE_KEY) {
		console.log(req.headers);
		return res.status(401).send('Unauthorized');
	}

	if (req.method === 'GET') {
		const { userId } = req.query;

		try {
			return await getUserItems(userId).then((response) => {
				return res.status(200).json({ data: response });
			});
		} catch (err) {
			return res.status(400).json({ message: 'Something went really wrong!' });
		}
	}
}

export default function handler(req, res) {
	req.method === 'GET' ? provideUserItems(req, res) : res.status(404).send('');
}
