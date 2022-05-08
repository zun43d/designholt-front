import { useState } from 'react';
import Product from './Product';
import { Box, Grid } from '@chakra-ui/react';
import CartPopUp from './CartPopUp';
import ProductSkeleton from './ProductSkeleton';

export default function ProductList({ products, gridCol, ...rest }) {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [itemDetails, setItemDetails] = useState(null);

	const emptyData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

	return (
		<Grid
			templateColumns={[
				'repeat(1, minmax(320px,1fr))',
				null,
				`repeat(2, minmax(320px,1fr))`,
				`repeat(${gridCol || '4'}, minmax(320px,1fr))`,
			]}
			// templateRows="repeat(1, 1fr)"
			gridAutoColumns="320px"
			gap={9}
			w="min-content"
			{...rest}
		>
			{products.length > 0
				? products.map((product) => (
						<Product
							key={product._id}
							id={product._id}
							image={product?.productImage.presentation}
							alt={product.productImage.imageAlt}
							thumbnail={product?.productImage.thumbnail}
							title={product.title}
							creator={product.creator}
							price={product.price}
							setIsCartOpen={setIsCartOpen}
							setItemDetails={setItemDetails}
						/>
				  ))
				: emptyData.map((product, id) => <ProductSkeleton key={id} />)}
			{isCartOpen && (
				<CartPopUp
					open={isCartOpen}
					setOpen={setIsCartOpen}
					itemDetails={itemDetails}
				/>
			)}
		</Grid>
	);
}
