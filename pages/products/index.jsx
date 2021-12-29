import Image from 'next/image';
import Head from 'next/head';
import { getAllProducts } from '@/lib/sanityDb';

import { Text, Box } from '@chakra-ui/react';
import Layout from '@/layout/layout';
import { Button } from '@/components/uiComponents';
import ProductList from '@/components/ProductList';
import ShowCategory from '@/components/ShowCategory';

export async function getStaticProps() {
	const products = await getAllProducts();

	return {
		props: {
			products,
		},
	};
}

export default function AllProducts({ products }) {
	return (
		<Layout maxW="8xl">
			<Head>
				<title>All Products | DesignHolt</title>
			</Head>

			<Box w="full" px="7">
				{/* <ShowCategory maxW="2xs" /> */}
				<Box mt="8">
					<Text fontSize="xl" fontWeight="semibold">
						Showing logos from &quot;All Category&quot;
					</Text>
					<Box w="full" mt="5" mb="10">
						<ProductList products={products} mx="auto" />
					</Box>
				</Box>
			</Box>
		</Layout>
	);
}
