import Image from 'next/image';
import NextLink from 'next/link';
import { useAuth } from '@/context/AuthUserContext';
import { useCart } from 'react-use-cart';

import { Box, Text, Heading, useToast } from '@chakra-ui/react';
import { Button, Link } from '@/components/uiComponents';

export default function Product({
	image,
	alt,
	title,
	creator,
	price,
	id,
	thumbnail,
	...rest
}) {
	const { authUser } = useAuth();
	const { addItem, inCart } = useCart();
	const toast = useToast();

	const productUrl = `/products/${id}`;

	return (
		<Box w="full" boxShadow="md" borderRadius="sm" overflow="hidden" {...rest}>
			<NextLink href={productUrl} passHref>
				<Link>
					<Box w="full" height="xs" overflow="hidden">
						<Image
							src={image}
							width={128}
							height={278}
							layout="responsive"
							alt={alt}
						/>
					</Box>
				</Link>
			</NextLink>
			<Box px="4">
				<Box py="3">
					<NextLink href={productUrl} passHref>
						<Link>
							<Heading as="h4" size="sm" isTruncated>
								{title}
							</Heading>
						</Link>
					</NextLink>
					<Text pt="0.5" fontSize="xs" color="gray.500">
						<i>by</i>{' '}
						<NextLink href={`/seller/${creator._id}`} passHref>
							<Link>{creator.fullName}</Link>
						</NextLink>
					</Text>
				</Box>
				<Box
					pb="4"
					display="flex"
					justifyContent="space-between"
					alignItems="end"
				>
					<Text fontWeight="bold" fontSize="xl">
						${price}
					</Text>
					<Button
						colorScheme="purple"
						size="sm"
						isDisabled={creator._id === authUser?.uid}
						onClick={() => {
							if (!inCart(id)) {
								addItem({ id, title, price, thumbnail });
								return toast({
									title: 'Added to cart',
									status: 'success',
									duration: 5000,
									isClosable: true,
								});
							}

							toast({
								title: 'Already in cart',
								status: 'warning',
								duration: 5000,
								isClosable: true,
							});
						}}
					>
						Add to cart
					</Button>
				</Box>
			</Box>
		</Box>
	);
}
