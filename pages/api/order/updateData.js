import { productsAndVendors } from '@/lib/sanityAdmin.js';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const { items } = req.body;

		return await productsAndVendors(items)
			.then((result) => {
				console.log('Products and vendors data updated');
				res.status(200).json({ message: 'All documents updated!' });
			})
			.catch((err) => {
				console.log('productsAndVendors\n', err);
				res.status(500).json({ message: 'Something went wrong' });
			});
	} else {
		return res.status(405).send({
			status: 'error',
			message: 'Method not allowed',
		});
	}
}
