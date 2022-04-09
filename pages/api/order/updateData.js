export default async function handler() {
	if (req.method === 'POST') {
		const { items } = req.body;

		return await productsAndVendors(items)
			.then((result) => {
				console.log('Products and vendors data updated');
			})
			.catch((err) => {
				console.log('productsAndVendors\n', err);
			});
	} else {
		return res.status(405).send({
			status: 'error',
			message: 'Method not allowed',
		});
	}
}
