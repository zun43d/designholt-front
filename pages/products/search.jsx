import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { Text, Box, Spinner, Center } from '@chakra-ui/react';
import Layout from '@/layout/layout';
import ProductList from '@/components/ProductList';

export default function SeachResults() {
	const [products, setProducts] = useState([]);
	const router = useRouter();
	const query = router.query.query;

	useEffect(() => {
		fetch(`/api/products?search=${query}`)
			.then((res) => res.json())
			.then((data) => {
				setProducts(data.searchResult);
			});
	}, [query]);

	const renderProducts = () => {
		if (products.length > 0) {
			return (
				<Box w="full" px="7" mt="8">
					<Text fontSize="xl" fontWeight="semibold">
						Search result for &quot;{query}&quot;
					</Text>
					<Box w="full" mt="5" mb="10">
						<ProductList products={products} mx="auto" />
					</Box>
				</Box>
			);
		}

		return (
			<Box w="full" px="7" mt="8">
				<Text fontSize="xl" fontWeight="semibold">
					Searching...
				</Text>
				<Box w="full" mt="5" mb="10" h="70vh" py="20">
					<Center>
						<Spinner size="xl" color="purple.500" thickness="4px" />
					</Center>
				</Box>
			</Box>
		);
	};

	return (
		<Layout maxW="8xl">
			<Head>
				<title>All Products | DesignHolt</title>
			</Head>

			<Box w="full" px="7">
				{/* <ShowCategory maxW="2xs" /> */}
				{renderProducts()}
			</Box>
		</Layout>
	);
}
