import Product from './Product';
import { Box, Grid, useDisclosure } from '@chakra-ui/react';
import AfterCartModal from './AfterCartModal';

export default function ProductList({ products, gridCol, ...rest }) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Grid
			templateColumns={`repeat(${gridCol || '4'}, minmax(320px,1fr))`}
			// templateRows="repeat(1, 1fr)"
			gridAutoColumns="320px"
			gap={8}
			w="min-content"
			{...rest}
		>
			{products.map((product) => (
				<Product
					key={product._id}
					id={product._id}
					image={product?.productImage.presentation}
					alt={product.productImage.imageAlt}
					thumbnail={product?.productImage.thumbnail}
					title={product.title}
					creator={product.creator}
					price={product.price}
					openModal={onOpen}
				/>
			))}
			<AfterCartModal isOpen={isOpen} onClose={onClose} />
		</Grid>
	);
}
