import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

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

	const onSearch = (e) => {
		e.preventDefault();

		const searchValue = e.target[0].value;
		router.push(`/products/search?query=${searchValue}`);
	};

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

			<Box w="full" px={['3', null, null, '7']} mt="8">
				{/* <ShowCategory maxW="2xs" /> */}

				<Box
					display="flex"
					flexDir={['column-reverse', null, 'row']}
					alignItems="center"
					gridGap={['2', null, null, '4']}
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

				<Box w="full" px={[null, null, null, '7']} mt="5">
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
								Search results for &quot;{query}&quot;
							</Text>
							<Box w="full" mt="5" mb="10" mx="auto">
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
			</Box>
		</Layout>
	);
}
