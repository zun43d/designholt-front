import Image from 'next/image';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Box, Heading, Text, Flex, Center, useToast } from '@chakra-ui/react';
import { Input, IconButton } from '@/components/uiComponents';
import { SearchIcon } from '@chakra-ui/icons';
import { RiSearchLine } from 'react-icons/ri';

export default function Hero() {
	const toast = useToast();
	const router = useRouter();
	const { register, handleSubmit, errors } = useForm();

	const handleSearch = (data) => {
		router.push(`/products/search?query=${data.search}`);
	};

	return (
		// <Container>
		<Flex
			minH="sm"
			h="45vh"
			bgGradient="linear(to-br, gray.100, gray.200)"
			// bg="gray.200"
			// color="white"
		>
			<Box
				maxW="7xl"
				mx="auto"
				display="flex"
				flexDir="row"
				justifyContent="space-between"
				alignItems="center"
			>
				<Box
					h="full"
					display="flex"
					flexDir="column"
					justifyContent="center"
					w="60%"
				>
					<Heading
						size="2xl"
						mb="4"
						lineHeight="shorter"
						fontWeight="extrabold"
					>
						Get modern and premium logos only for $37
					</Heading>
					<Text maxW="xl" fontSize="lg" mb="8" color="gray.700">
						Introduce your brand to the global audience with our hand picked
						modern logos by expert designers.
					</Text>
					<Box
						as="form"
						onSubmit={handleSubmit(handleSearch)}
						display="flex"
						justifyContent="start"
						boxShadow="md"
						w="min-content"
					>
						<Input
							{...register('search', { required: true })}
							w="lg"
							size="lg"
							bgColor="white"
							border="1px"
							borderColor="gray.50"
							borderRightRadius="none"
							borderLeftRadius="lg"
							_hover={{ border: '1px solid gray.50' }}
							_focus={{ bacgroundColor: 'gray.100' }}
							variant="filled"
							placeholder="Search anything, don't hold back"
							ml="-1"
						/>
						<IconButton
							type="submit"
							borderLeftRadius="none"
							icon={<RiSearchLine size="28" />}
							size="lg"
							colorScheme="purple"
						/>
					</Box>
				</Box>
				<Box
					w="96"
					h="full"
					display="flex"
					flexDir="column"
					alignItems="center"
					justifyContent="center"
					gridGap={10}
				>
					<Box display="flex" flexDir="row" gridGap={10} ml="-20">
						<Box w="32" boxShadow="lg" borderRadius="xl">
							<Image
								src="/001.svg"
								width={300}
								height={300}
								layout="responsive"
								alt="Logo"
							/>
						</Box>
						<Box w="32" boxShadow="lg" borderRadius="xl">
							<Image
								src="/002.svg"
								width={300}
								height={300}
								layout="responsive"
								alt="Logo"
							/>
						</Box>
					</Box>
					<Box display="flex" flexDir="row" gridGap={10}>
						<Box w="32" boxShadow="lg" borderRadius="xl">
							<Image
								src="/003.svg"
								width={300}
								height={300}
								layout="responsive"
								alt="Logo"
							/>
						</Box>
						<Box w="32" boxShadow="lg" borderRadius="xl">
							<Image
								src="/004.svg"
								width={300}
								height={300}
								layout="responsive"
								alt="Logo"
							/>
						</Box>
					</Box>
				</Box>
			</Box>
		</Flex>
		// </Container>
	);
}
