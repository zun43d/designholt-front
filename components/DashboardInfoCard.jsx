import { Box, Text } from '@chakra-ui/react';

export default function DashboardInfoCard({ heading, digits }) {
	return (
		<Box
			w="full"
			border="1px"
			borderColor="gray.300"
			borderRadius="lg"
			p="5"
			mx="2"
		>
			<Text fontWeight="semibold">{heading}</Text>
			<Text fontSize="3xl" fontWeight="bold">
				{digits}
			</Text>
		</Box>
	);
}
