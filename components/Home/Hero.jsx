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
			h={['xl', null, null, 'md']}
			bgGradient="linear(to-br, gray.100, gray.200)"
			// bg="gray.200"
			// color="white"
		>
			<Box
				maxW="7xl"
				mx="auto"
				display="flex"
				flexDir={['column', null, null, 'row']}
				justifyContent={['space-evenly', null, null, 'space-between']}
				alignItems="center"
			>
				<Box
					h={[null, null, null, 'full']}
					display="flex"
					flexDir="column"
					justifyContent="center"
					alignItems={['center', null, null, 'start']}
					textAlign={['center', null, 'left']}
					// w={['auto', '80%']}
				>
					<Heading
						as="h2"
						maxW={['sm', null, null, '80%']}
						fontSize={['1.75rem', null, null, '5xl']}
						mb="4"
						mx={['3', null, null, '0']}
						lineHeight="shorter"
						fontWeight="extrabold"
					>
						Get modern and premium logos only for $37
					</Heading>
					<Text
						maxW={['md', null, null, 'xl']}
						fontSize={['sm', null, null, 'lg']}
						mb="8"
						mx={['5', null, null, '0']}
						color="gray.700"
					>
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
							w={['2xs', '45', null, 'lg']}
							h={['10', null, null, '12']}
							px="4"
							bgColor="white"
							border="1px"
							borderColor="gray.50"
							borderRightRadius="none"
							borderLeftRadius="lg"
							_hover={{ border: '1px solid gray.50' }}
							_focus={{ bacgroundColor: 'gray.100' }}
							variant="filled"
							placeholder="Search anything, don't hold back"
							fontSize={['sm', null, null, 'md']}
							ml="-1"
						/>
						<IconButton
							type="submit"
							borderLeftRadius="none"
							icon={<RiSearchLine size="28" />}
							w={['10', null, null, '12']}
							h={['10', null, null, '12']}
							colorScheme="purple"
						/>
					</Box>
				</Box>
				<Box
					w={['56', '56', '96']}
					h={[null, null, null, 'full']}
					display="flex"
					flexDir="column"
					alignItems="center"
					justifyContent="center"
					gridGap={[5, null, null, 10]}
				>
					<Box
						display="flex"
						flexDir="row"
						gridGap={[5, null, null, 10]}
						ml="-10"
					>
						<Box w={['24', '24', null, '32']} boxShadow="lg" borderRadius="xl">
							<Image
								src="/001.svg"
								width={300}
								height={300}
								layout="responsive"
								alt="Logo"
							/>
						</Box>
						<Box w={['24', '24', null, '32']} boxShadow="lg" borderRadius="xl">
							<Image
								src="/002.svg"
								width={300}
								height={300}
								layout="responsive"
								alt="Logo"
							/>
						</Box>
					</Box>
					<Box
						display="flex"
						flexDir="row"
						gridGap={[5, null, null, 10]}
						ml="10"
					>
						<Box w={['24', '24', null, '32']} boxShadow="lg" borderRadius="xl">
							<Image
								src="/003.svg"
								width={300}
								height={300}
								layout="responsive"
								alt="Logo"
							/>
						</Box>
						<Box w={['24', '24', null, '32']} boxShadow="lg" borderRadius="xl">
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
