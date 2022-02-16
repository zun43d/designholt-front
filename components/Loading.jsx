import { Spinner, Box, Center, Text } from '@chakra-ui/react';

export default function Loading({ message }) {
	return (
		<Box w="full">
			<Center>
				<Spinner colorScheme="purple" />
				<Text>{message}</Text>
			</Center>
		</Box>
	);
}
