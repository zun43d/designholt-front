import { getProductsByCategory } from '@/lib/sanityDb';
import { productsPerPage } from '@/data/bussiness-data';

const getProducts = async (req, res) => {
	const { name, pIndex } = req.query;

	if (!name && !pIndex) return res.status(400).send('Bad Request');

	const products = await getProductsByCategory(name, pIndex, productsPerPage);

	return res.status(200).json({ products });
};

export default async function handler(req, res) {
	req.method === 'GET'
		? await getProducts(req, res)
		: res.status(404).send('Method not allowed');
}
