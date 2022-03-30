import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { Text, Box, Spinner, Center } from '@chakra-ui/react';
import Layout from '@/layout/layout';
import ProductList from '@/components/ProductList';

export default function SeachResults() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	const router = useRouter();
	const query = router.query.query;

	useEffect(() => {
		setLoading(true);
		fetch(`/api/products?search=${query}`)
			.then((res) => res.json())
			.then((data) => {
				setProducts(data.searchResult);
			})
			.finally(() => setLoading(false));

		return () => setProducts([]);
	}, [query]);

	return (
		<Layout maxW="8xl">
			<Head>
				<title>
					Search results {products.length > 0 ? `for ${query}` : ''} |
					DesignHolt
				</title>
			</Head>

			<Box w="full" px="7">
				{/* <ShowCategory maxW="2xs" /> */}

				<Box w="full" px="7" mt="8">
					{loading ? (
						<>
							<Text fontSize="xl" fontWeight="semibold" textAlign="center">
								Searching...
							</Text>
							<Box w="full" mt="5" mb="10" h="70vh" py="20">
								<Center>
									<Spinner size="xl" color="purple.500" thickness="4px" />
								</Center>
							</Box>
						</>
					) : products.length > 0 ? (
						<>
							<Text fontSize="xl" fontWeight="semibold">
								Search result for &quot;{query}&quot;
							</Text>
							<Box w="full" mt="5" mb="10">
								<ProductList products={products} mx="auto" />
							</Box>
						</>
					) : products.length === 0 && !loading ? (
						<>
							<Text
								fontSize="xl"
								fontWeight="semibold"
								textAlign="center"
								h="96"
								py="5"
							>
								No results found for &quot;{query}&quot;
							</Text>
						</>
					) : (
						<>
							<Text fontSize="xl" fontWeight="semibold">
								Please wait...
							</Text>
						</>
					)}
				</Box>
				{console.log(products.length)}
			</Box>
		</Layout>
	);
}
