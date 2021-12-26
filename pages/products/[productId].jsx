import Layout from '@/layout/layout';
import { getProductDetails } from '@/lib/sanityDb';
import { Text, Box, Heading } from '@chakra-ui/react';

export const getServerSideProps = async (context) => {
	const pid = context.params.productId;
	const product = await getProductDetails(pid);

	return {
		props: {
			product: product[0],
		},
	};
};

export default function ProductPage({ product }) {
	return (
		<Layout maxW="8xl">
			<Heading>{product.title}</Heading>
			<Text>{product.description}</Text>
			<Text>{product.productCategory}</Text>
			<Text>{product.tags}</Text>
		</Layout>
	);
}
