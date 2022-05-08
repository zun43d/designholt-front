import { Skeleton, Box, Text } from '@chakra-ui/react';

export default function ProductSkeleton() {
	return (
		<Box boxShadow="md" borderRadius="sm" overflow="hidden">
			<Skeleton variant="rect" height="320px" width="100%" />
			<Box px="4" py="5">
				<Skeleton h="4" w="80%" />
				<Skeleton mt="2" h="2.5" w="30%" />
			</Box>
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				pb="5"
				px="4"
			>
				<Skeleton h="8" w="10" />
				<Skeleton h="12" w="12" />
			</Box>
		</Box>
	);
}
