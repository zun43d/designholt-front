import { Box, Text } from '@chakra-ui/react';
import Layout from '@/layout/layout';
import Hero from '@/components/Home/Hero';
import Featured from '@/components/Home/Featured';
import { getFeaturedProducts } from '@/lib/sanityDb';
import TopPicks from '@/components/Home/TopPicks/index';
import { sectionify } from '@/utils/sectionWiseProducts';

export const getStaticProps = async () => {
	const sectionedProducts = await sectionify();

	return {
		props: {
			featuredProducts: await getFeaturedProducts(6),
			sectionedProducts,
		},
		revalidate: 3600,
	};
};

export default function Home({ featuredProducts, sectionedProducts }) {
	return (
		<Layout>
			<Hero />
			<Featured products={featuredProducts} />
			<TopPicks products={sectionedProducts} />
		</Layout>
	);
}
