import {
	Container,
	Heading,
	Text,
	Flex,
	Center,
	useToast,
} from '@chakra-ui/react';
import { InputGroup } from '@/components/uiComponents';
import { SearchIcon } from '@chakra-ui/icons';

export default function Hero() {
	const toast = useToast();

	return (
		// <Container>
		<Flex
			maxW="container.md"
			mx="auto"
			flexDir="column"
			justifyContent="center"
			alignItems="center"
			textAlign="center"
			minH="sm"
			h="45vh"
		>
			<Heading size="3xl" mb="6">
				Discover the logo that suits you most!
			</Heading>
			<Text maxW="xl" fontSize="lg" mb="10" color="gray.700">
				Search through our amazing hand-reviewed collection made by many of our
				brilliant designers.
			</Text>
			<Center maxW="lg">
				<InputGroup
					w="lg"
					size="lg"
					icon={<SearchIcon color="gray.500" />}
					variant="filled"
					placeholder="Search anything, don't hold back"
					onSubmit={() => {
						toast({
							status: 'info',
							title: 'Right now we are working on this, try later!',
						});
					}}
				/>
			</Center>
		</Flex>
		// </Container>
	);
}
