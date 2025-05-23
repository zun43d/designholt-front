import { Flex, Heading, Text, Box, Spacer } from '@chakra-ui/react';
import ProductSection from './ProductSection';

export default function TopPicks({ products }) {
	const sectionNames = [
		'Top Animal Logos',
		'Top Real Estate Logos',
		'Top Technology Logos',
		'Top Security Logos',
		'Top Car Logos',
		'Top Wellness Logos',
		'Top Abstract Logos',
		'Top Number Logos',
	];

	const sectionCatSlug = [
		'animal',
		'real-estate',
		'tech',
		'security',
		'vahicle',
		'health-and-wellness',
		'abstract',
		'numbers',
	];

	return (
		<Flex
			py="20"
			flexDir="column"
			justifyContent="center"
			alignItems="center"
			// bgColor="gray.50"
		>
			<Flex maxW="8xl" flexDir="column">
				<Box textAlign="center">
					<Heading size="2xl" mb="5">
						Our top picks
					</Heading>
					<Text fontSize="md" color="gray.600" mx="3">
						Best of our collection, hand-picked by our design team.
					</Text>
				</Box>
				{products &&
					products?.map((product, index) => {
						if (product.length > 0) {
							return (
								<ProductSection
									key={index}
									heading={sectionNames[index] || 'Top picks'}
									sectionedProducts={product}
									catSlug={sectionCatSlug[index]}
								/>
							);
						}
					})}
			</Flex>
		</Flex>
	);
}
