import Head from 'next/head';
import Image from 'next/image';
import NextLink from 'next/link';
import { useAuth } from '@/context/AuthUserContext';
import Layout from '@/layout/layout';
import { getAllProducts, getProductDetails } from '@/lib/sanityDb';
import {
	Text,
	Box,
	Heading,
	Grid,
	GridItem,
	UnorderedList,
	ListItem,
	Center,
	useToast,
	Avatar,
} from '@chakra-ui/react';
import { Breadcrumb, Link } from '@/components/uiComponents';
import { Button } from '@/components/uiComponents';
import { DownloadIcon } from '@chakra-ui/icons';

export const getStaticProps = async (context) => {
	const pid = context.params.productId;
	const product = await getProductDetails(pid);

	return {
		props: {
			product: product[0],
		},
	};
};

export const getStaticPaths = async () => {
	const products = await getAllProducts();

	return {
		paths: products.map((product) => ({
			params: {
				productId: product._id,
			},
		})),
		fallback: 'blocking',
	};
};

export default function ProductPage({ product }) {
	const { authUser } = useAuth();
	const toast = useToast();

	const errorToast = () => {
		toast({
			title: 'Almost there...',
			description: 'A few more days and we will be ready.',
			status: 'info',
			duration: 3000,
			isClosable: true,
		});
	};

	const descriptionBuilder = (description) => {
		return description.split('\n').reduce((children, textSegment, index) => {
			return [...children, index > 0 && <br key={index} />, textSegment];
		}, []);
	};

	return (
		<Layout>
			<Head>
				<title>{product.title || ''} | DesignHolt</title>
			</Head>

			<Box bg="gray.100" h="36">
				<Box maxW="6xl" mx="auto">
					<Breadcrumb
						paths={['Home', 'Logo Templates', product.title || '']}
						py="5"
						px="3"
						fontSize="sm"
					/>
				</Box>
			</Box>
			{product && (
				<Grid templateColumns="672px auto" maxW="6xl" mx="auto" gridGap={8}>
					<GridItem minW="2xl" mt="-20">
						<Box bg="gray.50" borderRadius="lg" p="3" boxShadow="lg">
							<Box
								borderTopRadius="lg"
								bg="white"
								mb="3"
								pt="2"
								pb="2.5"
								px="4"
							>
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
								src={product?.productImage?.presentation}
								alt={
									product.productImage.imageAlt ||
									product.title ||
									'Presentation of the logo'
								}
								width="800"
								height="1726"
								layout="responsive"
							/>
						</Box>
						<Box my="8" px="3">
							{product.description && (
								<Box>
									<Heading size="md" mb="2">
										Description
									</Heading>
									<Text>{descriptionBuilder(product.description)}</Text>
								</Box>
							)}
							<br />

							<Heading size="md" mb="2">
								Category(s)
							</Heading>
							<Text>{product.productCategory.join(', ')}</Text>
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
							<Box w="36" my="5" display="flex">
								<Box w="full">
									<Image
										src="/illustrator.png"
										alt="illustrator"
										width="50"
										height="50"
										layout="responsive"
									/>
								</Box>
								<Box w="full">
									<Image
										src="/eps.png"
										alt="eps"
										width="50"
										height="50"
										layout="responsive"
									/>
								</Box>
							</Box>
							<Heading size="lg" mt="8" mb="3">
								Logo licence
							</Heading>
							<Text>
								Single, non-exclusive logo license (used in unlimited ways) A
								handling fee will be added to the item price.
							</Text>
							<Text fontWeight="medium" py="3">
								<NextLink href="/terms" passHref>
									<Link color="purple.600">License Details</Link>
								</NextLink>{' '}
								|{' '}
								<NextLink href="/about" passHref>
									<Link color="purple.600">Why us?</Link>
								</NextLink>
							</Text>
							<Text
								fontSize="4xl"
								fontWeight="extrabold"
								mb="4"
								lineHeight="short"
							>
								{product.price}$
								<Text as="i" display="block" fontSize="xs" fontWeight="normal">
									(Price is in US dollars and excludes tax)
								</Text>
							</Text>
							<Box display="flex" gridGap={2}>
								<Button
									leftIcon={<DownloadIcon />}
									colorScheme="green"
									w="full"
									noOutline={true}
									onClick={errorToast}
								>
									Download
								</Button>
								<Button variant="outline" minW="32">
									Add to cart
								</Button>
							</Box>
						</Box>
						<Box
							w="full"
							bg="gray.50"
							border="1px"
							borderColor="gray.100"
							mt="8"
							py="6"
							px="8"
							borderRadius="lg"
							display="flex"
							alignItems="center"
							gridGap={4}
						>
							<Box minW="16" borderRadius="md" overflow="hidden">
								{/* {product.creator.profilePic && ( */}
								{/* <Image
									src={product.creator.profilePic || '/avatar.png'}
									alt={product.creator.fullName}
									width="100"
									height="100"
									layout="responsive"
								/> */}
								{/* )} */}
								<Avatar size="lg" src={product.creator.profilePic} />
							</Box>
							<Box>
								<Heading size="md" mb="1">
									{product.creator.fullName}
								</Heading>
								<NextLink href={`/seller/${product.creator._id}`}>
									<Link fontSize="sm" color="purple.600">
										View profile
									</Link>
								</NextLink>
							</Box>
						</Box>
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
							<Heading>Features</Heading>
							<br />
							<UnorderedList>
								<ListItem>
									<Text fontWeight="bold">CMYK Color</Text>
									The CMYK color model creates new colors by lessening the
									amount of light reflected off of your (usually) white page.
									Because the inks are taking away brightness, this process is
									called subtractive.
								</ListItem>
								<br />
								<ListItem>
									<Text fontWeight="bold">Print Ready Format</Text>
									When we say “print-ready”, we mean it is a file that has all
									the specifications needed to produce a high-resolution print
									product, without requiring any additional alteration or
									intervention.
								</ListItem>
								<br />
								<ListItem>
									<Text fontWeight="bold">Vector Files</Text>
									<Text fontWeight="semibold" mt="3" mb="1">
										Ai (Adobe Illustrator Artwork file)
									</Text>
									AI is a graphics file format created by Adobe Illustrator. Ai
									files store the logo as paths that can be resized without
									losing quality. Many other formats such as SVG, JPEG, PNG,
									PSD, etc can be easily created from Ai files.
									<br />
									<Text fontWeight="semibold" mt="3" mb="1">
										EPS (Encapsulated PostScript)
									</Text>
									EPS is a file format for vector graphic elements intended for
									high-resolution or large-scale printing and commonly used for
									printing to PostScript printers and image setters.
								</ListItem>
								<br />
								<ListItem>
									<Text fontWeight="bold">
										Easily Customizable and Editable.
									</Text>
								</ListItem>
								<br />
								<ListItem>
									<Text fontWeight="bold">Resizable</Text>
								</ListItem>
							</UnorderedList>
						</Box>
					</GridItem>
				</Grid>
			)}
			<Center
				flexDirection="column"
				borderRadius="lg"
				maxW="5xl"
				mx="auto"
				my="8"
				bg="gray.50"
				border="1px"
				borderColor="gray.100"
				p="10"
			>
				<Heading mb="5">Payment methods</Heading>
				<Box display="flex" w="96" alignItems="center" gridGap={8}>
					<Box w="full">
						<Image
							src="/visa.png"
							alt="Visa"
							width="100"
							height="31"
							layout="responsive"
						/>
					</Box>
					<Box w="full">
						<Image
							src="/mastercard.png"
							alt="Mastercard"
							width="100"
							height="80"
							layout="responsive"
						/>
					</Box>
					<Box w="full">
						<Image
							src="/paypal.png"
							alt="Paypal"
							width="100"
							height="26"
							layout="responsive"
						/>
					</Box>
				</Box>
			</Center>
		</Layout>
	);
}
