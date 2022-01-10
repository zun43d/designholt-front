import { getAllProducts } from '@/lib/sanityDb';

export const sectionify = async () => {
	const allProducts = await getAllProducts();

	const sectionAProducts = allProducts.filter((product) => {
		if (product.section) {
			return product.section === 'a';
		}
	});

	const sectionBProducts = allProducts.filter((product) => {
		if (product.section) {
			return product.section === 'b';
		}
	});

	const sectionCProducts = allProducts.filter((product) => {
		if (product.section) {
			return product.section === 'c';
		}
	});

	const sectionDProducts = allProducts.filter((product) => {
		if (product.section) {
			return product.section === 'd';
		}
	});

	const sectionEProducts = allProducts.filter((product) => {
		if (product.section) {
			return product.section === 'e';
		}
	});

	const sectionFProducts = allProducts.filter((product) => {
		if (product.section) {
			return product.section === 'f';
		}
	});

	const sectionGProducts = allProducts.filter((product) => {
		if (product.section) {
			return product.section === 'g';
		}
	});

	const sectionHProducts = allProducts.filter((product) => {
		if (product.section) {
			return product.section === 'h';
		}
	});

	const sectionIProducts = allProducts.filter((product) => {
		if (product.section) {
			return product.section === 'i';
		}
	});

	return [
		sectionAProducts,
		sectionBProducts,
		sectionCProducts,
		sectionDProducts,
		sectionEProducts,
		sectionFProducts,
		sectionGProducts,
		sectionHProducts,
		sectionIProducts,
	];
};
