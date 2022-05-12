import { getAllProducts } from '@/lib/sanityDb';

const getSearchResult = async (req, res) => {
	const allProducts = await getAllProducts();
	const { search } = req.query;

	if (!search || search === '') {
		return res.status(404).send('No search query provided');
	}

	const searchStringArr = search.toLowerCase().split(' ');

	const searchResult = allProducts
		.filter((product) => {
			const { title, tags, productCategory } = product;
			const titleString = title.toLowerCase();
			const productCategoryStr = productCategory.join().toLowerCase();

			let points = 0;

			searchStringArr.map((search) => {
				if (search !== 'logo' && search !== 'logos') {
					if (productCategoryStr.includes(search)) {
						points += 100;
					}
					if (titleString.includes(search)) {
						points++;
					}
					if (tags.includes(search)) {
						points++;
					}
				}
			});

			if (points > 0) {
				product.priority = points;
				return true;
			} else {
				return false;
			}
		})
		.sort((a, b) => {
			return b.priority - a.priority;
		});

	// console.log(searchResult);

	return res.status(200).json({ searchResult });
};

export default async function handler(req, res) {
	req.method === 'GET'
		? await getSearchResult(req, res)
		: res.status(404).send('');
}
