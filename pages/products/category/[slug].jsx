import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '@/layout/layout';
import {
	getAllCategories,
	getProductsByCategory,
	slugToCategory,
} from '@/lib/sanityDb';
import onSort from '@/utils/onSort';
import ProductList from '@/components/ProductList';
import {
	Box,
	Heading,
	Text,
	Menu,
	MenuButton,
	MenuList,
	MenuOptionGroup,
	MenuItemOption,
} from '@chakra-ui/react';
import {
	Breadcrumb,
	Button,
	Input,
	IconButton,
	InputGroup,
} from '@/components/uiComponents';
import Pagination from '@/components/Pagination';
import { BiSortAlt2 } from 'react-icons/bi';
import { RiSearchLine } from 'react-icons/ri';
import { productsPerPage } from '@/data/bussiness-data';

export const getStaticProps = async ({ params }) => {
	const { categoryName } = await slugToCategory(params.slug);
	const productsByCategory = await getProductsByCategory(params.slug);
	const products = await getProductsByCategory(params.slug, 1, productsPerPage);

	return {
		props: {
			categoryName,
			productsByCategory: products,
			totalProduct: productsByCategory.length,
		},
		revalidate: 3600,
	};
};

export const getStaticPaths = async () => {
	const allCategories = await getAllCategories();

	return {
		paths: allCategories.map((category) => ({
			params: {
				slug: category.slug,
			},
		})),
		fallback: 'blocking',
	};
};

export default function Category({
	categoryName,
	productsByCategory,
	totalProduct,
}) {
	const [products, setProducts] = useState([]);
	const router = useRouter();

	useEffect(() => {
		setProducts(productsByCategory);

		return () => {
			setProducts([]);
		};
	}, [productsByCategory, router]);

	const onSearch = (e) => {
		e.preventDefault();

		const searchValue = e.target[0].value;
		router.push(`/products/search?query=${searchValue}`);
	};

	return (
		<Layout>
			<Head>
				<title>{categoryName} logos | DesignHolt</title>
			</Head>

			<Box bg="gray.100">
				<Box maxW="8xl" mx="auto" px="10" py={['5', null, null, '8']}>
					<Breadcrumb
						paths={['Home', 'Categories', categoryName]}
						fontSize={['xs', null, 'sm']}
					/>
					<Heading
						fontWeight="bold"
						fontSize={['2xl', null, null, '3xl']}
						pt="5"
					>
						{categoryName}
					</Heading>
					<Text py="3" color="gray.600" fontSize="sm">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo,
						officiis ipsam eligendi doloribus debitis aperiam sapiente dolorum
						dicta porro corrupti facilis ipsum commodi at eum eius maxime
						placeat suscipit recusandae omnis, possimus ab magni rerum voluptate
						tempore. Incidunt ullam provident iusto. Voluptates voluptas
						repellat, ex distinctio consectetur natus unde in doloribus
						aspernatur sapiente, officiis mollitia, modi alias! Ipsa, asperiores
						dolor.
					</Text>
				</Box>
			</Box>

			<Box bg="#fcfcfc">
				<Box maxW="8xl" mx="auto" py="5">
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
				</Box>

				<Box maxW="8xl" mx="auto" mb="10">
					<ProductList mx="auto" products={products} />
					{/* this goes goest to another compoenent */}
					<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
						mt="5"
					>
						<Pagination totalProduct={totalProduct} />
					</Box>
				</Box>
			</Box>
		</Layout>
	);
}
