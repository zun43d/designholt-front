import { Box, Text, Spinner } from '@chakra-ui/react';

export default function DashboardInfoCard({ heading, digits, currency }) {
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
				{digits && currency ? '$' : ''}
				{digits || <Spinner />}
			</Text>
		</Box>
	);
}
