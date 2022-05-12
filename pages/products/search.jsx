import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';

import {
	Text,
	Box,
	Spinner,
	Center,
	Menu,
	MenuButton,
	MenuList,
	MenuOptionGroup,
	MenuItemOption,
} from '@chakra-ui/react';
import Layout from '@/layout/layout';
import ProductList from '@/components/ProductList';
import { Button, IconButton, InputGroup } from '@/components/uiComponents';
import { BiSortAlt2 } from 'react-icons/bi';
import { RiSearchLine } from 'react-icons/ri';
import onSort from '@/utils/onSort';

export default function SeachResults() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	const router = useRouter();
	const query = router.query.query;

	const { data, error } = useSWR(
		query ? `/api/products?search=${query}` : null,
		fetcher
	);

	const onSearch = (e) => {
		e.preventDefault();

		const searchValue = e.target[0].value;
		router.push(`/products/search?query=${searchValue}`);
	};

	useEffect(() => {
		setLoading(true);
		// fetch(`/api/products?search=${query}`)
		// 	.then((res) => res.json())
		// 	.then((data) => {
		// 		setProducts(data.searchResult);
		// 		setLoading(false);
		// 	});
		console.log(data);
		data ? setProducts(data.searchResult) : setProducts([]);
		data && setLoading(false);
		return () => setProducts([]);
	}, [data]);

	return (
		<Layout>
			<Head>
				<title>Search results {query ? `for ${query}` : ''} | DesignHolt</title>
			</Head>

			<Box mt="8" mx="auto">
				{/* <ShowCategory maxW="2xs" /> */}

				<Box
					display="flex"
					flexDir={['column-reverse', null, 'row']}
					alignItems="center"
					gridGap={['2', null, null, '4']}
					maxW="8xl"
					mx="auto"
					px="5"
				>
					<Menu closeOnSelect={false}>
						<MenuButton
							as={Button}
							// size="sm"
							leftIcon={<BiSortAlt2 size="20" />}
							variant="outline"
							w={['full', null, null, 'auto']}
							justifyContent="center"
						>
							Sort
						</MenuButton>
						<MenuList minWidth="240px" zIndex="5">
							<MenuOptionGroup
								title="Order"
								type="radio"
								onChange={(e) => setProducts(onSort(e, products))}
							>
								<MenuItemOption value="most-sold">Most Sold</MenuItemOption>
								<MenuItemOption value="less-sold">Least Sold</MenuItemOption>
								<MenuItemOption value="recently-added">
									Recently Added
								</MenuItemOption>
							</MenuOptionGroup>
						</MenuList>
					</Menu>

					<Box as="form" w="full" onSubmit={onSearch}>
						<InputGroup
							size="md"
							placeholder="Search to get more specific results"
							rightButton={
								<IconButton
									type="submit"
									borderLeftRadius="none"
									icon={<RiSearchLine size="24" />}
									size="md"
									colorScheme="purple"
								/>
							}
						/>
					</Box>
				</Box>

				<Box px={[null, null, null, '7']} mt="5">
					<Box maxW="8xl" mt="5" mb="10" mx="auto">
						{!loading && products.length !== 0 ? (
							<ProductList products={products} mx="auto" />
						) : (
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
						)}
					</Box>
				</Box>
			</Box>
		</Layout>
	);
}
