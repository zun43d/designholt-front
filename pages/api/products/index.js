import { getAllProducts } from '@/lib/sanityDb';

const getSearchResult = async (req, res) => {
	const allProducts = await getAllProducts();
	const { search } = req.query;

	const searchResult = allProducts.filter((product) => {
		const { title, tags } = product;
		const titleString = title.toLowerCase();
		const searchString = search.toLowerCase();

		let result = [];

		if (titleString.includes(searchString)) {
			return true;
		}

		const searchToArray = searchString.split(' ');

		tags.forEach((tag) => {
			const tagString = tag.toLowerCase();

			searchToArray.forEach((search) => {
				if (tagString.includes(search)) {
					return true;
				}
			});
		});
	});

	return res.status(200).json({ searchResult });
};

export default function handler(req, res) {
	req.method === 'GET' ? getSearchResult(req, res) : res.status(404).send('');
}
