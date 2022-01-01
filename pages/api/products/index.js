import { getAllProducts } from '@/lib/sanityDb';

const getSearchResult = async (req, res) => {
	// const allProducts = await getAllProducts();
	const { search } = req.query;
	console.log(search.split(''));
};

export default function handler(req, res) {
	req.method === 'GET' ? getSearchResult(req, res) : res.status(404).send('');
}
