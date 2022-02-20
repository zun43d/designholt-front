import { Box, Text } from '@chakra-ui/react';
import Layout from '@/layout/layout';
import Hero from '@/components/Home/Hero';
import Featured from '@/components/Home/Featured';
import { getFeaturedProducts, getAllCategories } from '@/lib/sanityDb';
import TopPicks from '@/components/Home/TopPicks/index';
import { sectionify } from '@/utils/sectionWiseProducts';

export const getStaticProps = async () => {
	const sectionedProducts = await sectionify();

	return {
		props: {
			featuredProducts: await getFeaturedProducts(8),
			sectionedProducts,
			categories: await getAllCategories(),
		},
		revalidate: 3600,
	};
};

export default function Home({
	featuredProducts,
	sectionedProducts,
	categories,
}) {
	return (
		<Layout categories={categories}>
			<Hero />
			<Featured products={featuredProducts} />
			<TopPicks products={sectionedProducts} />
		</Layout>
	);
}
