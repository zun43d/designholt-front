import { Flex, Heading, Text, Box, Stack } from '@chakra-ui/react';
import ProductList from '../ProductList';

export default function Featured({ products }) {
	return (
		<Flex
			py="20"
			flexDir="column"
			justifyContent="center"
			alignItems="center"
			textAlign="center"
			bgColor="gray.50"
		>
			<Flex maxW="container.xl" flexDir="column">
				<Heading size="2xl" mb="4">
					Featured for you
				</Heading>
				<Text fontSize="md" color="gray.500" mx="5">
					Feeling lazy to pick something out of an ocean of logos? We can feel
					you! <br /> That&apos;s why, in this section, our incredible design
					team hand-picked the best logos from our entire collection, just for
					you!
				</Text>
				<Box
					mb="10"
					mt="12"
					display="flex"
					flexDir="col"
					justifyContent="center"
				>
					<ProductList products={products} gridCol="4" />
				</Box>
			</Flex>
		</Flex>
	);
}
