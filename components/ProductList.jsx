import Product from './Product';
import { Box, Grid } from '@chakra-ui/react';

export default function ProductList({ products, ...rest }) {
	return (
		<Grid
			templateColumns="repeat(4, minmax(320px,1fr))"
			templateRows="repeat(1, 1fr)"
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
					title={product.title}
					creator={product.creator}
					price={product.price}
				/>
			))}
		</Grid>
	);
}
