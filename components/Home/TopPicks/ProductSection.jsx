import { Flex, Heading, Box, Spacer } from '@chakra-ui/react';
import ProductList from '@/components/ProductList';
import { Link } from '@/components/uiComponents';
import { ChevronRightIcon } from '@chakra-ui/icons';

export default function ProductSection({ sectionedProducts, heading }) {
	return (
		<Box mt="14" mb="10">
			<Flex alignItems="center" mb="8" mx={['3', null, '0']}>
				<Heading size="md">{heading}</Heading>
				<Spacer />
				<Link fontWeight="semibold" color="purple.600" verticalAlign="middle">
					View all
					<ChevronRightIcon />
				</Link>
			</Flex>
			<Flex justifyContent="center">
				<ProductList products={sectionedProducts} gridCol="4" />
			</Flex>
		</Box>
	);
}
