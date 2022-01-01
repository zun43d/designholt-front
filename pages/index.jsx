import { Box, Text } from '@chakra-ui/react';
import Layout from '@/layout/layout';
import Hero from '@/components/Home/Hero';
import Featured from '@/components/Home/Featured';
import { getFeaturedProducts } from '@/lib/sanityDb';

export const getStaticProps = async () => {
	return {
		props: {
			products: await getFeaturedProducts(6),
		},
		revalidaate: 3600,
	};
};

export default function Home({ products }) {
	return (
		<Layout>
			<Hero />
			<Featured products={products} />
		</Layout>
	);
}
