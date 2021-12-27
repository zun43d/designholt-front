import Image from 'next/image';
import NextLink from 'next/link';
import { useAuth } from '@/context/AuthUserContext';
import Layout from '@/layout/layout';
import { getProductDetails } from '@/lib/sanityDb';
import { Text, Box, Heading, Grid, GridItem } from '@chakra-ui/react';
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
						px="3"
						fontSize="sm"
					/>
				</Box>
			</Box>
			<Grid templateColumns="672px auto" maxW="6xl" mx="auto" gridGap={8}>
				<GridItem minW="2xl" mt="-20">
					<Box bg="gray.50" borderRadius="lg" p="3" boxShadow="lg">
						<Box borderTopRadius="lg" bg="white" mb="3" pt="2" pb="2.5" px="4">
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
							layout="responsive"
						/>
					</Box>
					<Box my="8" px="3">
						{product.description && (
							<Box>
								<Heading size="md" mb="2">
									Description
								</Heading>
								<Text>{product.description}</Text>
							</Box>
						)}
						<br />
						<Heading size="md" mb="2">
							Tags
						</Heading>
						<Text>{product.tags.join(', ')}</Text>
					</Box>
				</GridItem>
				<GridItem>
					<Box
						w="full"
						bg="gray.50"
						border="1px"
						borderColor="gray.100"
						mt="8"
						py="6"
						px="8"
						borderRadius="lg"
					>
						<Heading size="lg" mb="3">
							Files Included
						</Heading>
					</Box>
				</GridItem>
			</Grid>
		</Layout>
	);
}
