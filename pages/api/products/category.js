import { getProductsByCategory } from '@/lib/sanityDb';
import { productsPerPage } from '@/data/bussiness-data';

const getProducts = async (req, res) => {
	const { name, index } = req.query;

	if (!name && !index) return res.status(400).send('Bad Request');

	const products = await getProductsByCategory(name, index, productsPerPage);

	return res.status(200).json({ products });
};

export default async function handler(req, res) {
	req.method === 'GET'
		? await getProducts(req, res)
		: res.status(404).send('Method not allowed');
}
