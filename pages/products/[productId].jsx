import Image from 'next/image';
import NextLink from 'next/link';
import { useAuth } from '@/context/AuthUserContext';
import Layout from '@/layout/layout';
import { getProductDetails } from '@/lib/sanityDb';
import { Text, Box, Heading } from '@chakra-ui/react';
import { Breadcrumb, Link } from '@/components/uiComponents';

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
	const { authUser } = useAuth();

	return (
		<Layout>
			<Box bg="gray.100" h="36">
				<Box maxW="6xl" mx="auto">
					<Breadcrumb
						paths={['Home', 'Products', product.title]}
						py="5"
						fontSize="sm"
					/>
				</Box>
			</Box>
			<Box maxW="6xl" mx="auto" display="flex" justifyContent="space-between">
				<Box
					w="2xl"
					mt="-20"
					bg="gray.50"
					boxShadow="xl"
					borderRadius="lg"
					p="3"
				>
					<Box borderTopRadius="lg" bg="white" mb="3" py="2" px="4">
						<Heading size="lg" mb="2">
							{product.title}
						</Heading>
						<Text color="gray.500" fontSize="sm" as="i">
							Created by{' '}
							<Text display="inline" color="purple.600">
								<NextLink href={`/seller/${product.creator._id}`} passHref>
									<Link>{product.creator.fullName}</Link>
								</NextLink>
							</Text>
						</Text>
					</Box>
					<Image
						src={product.productImage.presentation}
						alt={product.title}
						width="670"
						height="1450"
					/>
				</Box>
				<Box></Box>
			</Box>
		</Layout>
	);
}
