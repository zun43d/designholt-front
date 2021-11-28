import { Flex, Heading, Text, Stack } from '@chakra-ui/react';

export default function Featured() {
	return (
		<Flex
			py="16"
			flexDir="column"
			justifyContent="center"
			alignItems="center"
			textAlign="center"
			bgColor="gray.50"
		>
			<Flex maxW="container.lg" flexDir="column">
				<Heading size="2xl" mb="5">
					Featured for you
				</Heading>
				<Text fontSize="md" color="gray.600">
					Feeling lazy to pick something out of an ocean of logos? We can feel
					you! <br /> That&apos;s why, in this section, our incredible design
					team hand-picked the best logos from our entire collection, just for
					you!
				</Text>
			</Flex>
		</Flex>
	);
}
