import NextLink from 'next/link';
import { Button } from '@/components/uiComponents';

export default function CategoryItem({ title, slug }) {
	return (
		<NextLink href={`/products/category/${slug}`} passHref>
			<Button
				as="a"
				variant="ghost"
				pl="3"
				// pr="5"
				justifyContent="start"
				h="10"
				w="52"
				borderRadius="xl"
				cursor="pointer"
				color="gray.500"
				_hover={{
					color: 'gray.900',
					bg: 'gray.100',
				}}
			>
				{title}
			</Button>
		</NextLink>
	);
}
