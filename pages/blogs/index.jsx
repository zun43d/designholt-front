import { getAllBlogs } from '@/lib/sanityDb';
import Layout from '@/layout/layout';
import {
	Box,
	Heading,
	Link,
	Image,
	Text,
	Divider,
	HStack,
	Tag,
	Wrap,
	WrapItem,
	SpaceProps,
	useColorModeValue,
	Container,
	VStack,
} from '@chakra-ui/react';
import { PortableText, toPlainText } from '@portabletext/react';

export const getStaticProps = async () => {
	const allBlogs = await getAllBlogs();
	const featuredPost = allBlogs.filter((blog) => blog.isFeatured === true);

	return {
		props: {
			posts: allBlogs,
			featuredPost: featuredPost[0],
		},
	};
};

const BlogTags = (props) => {
	return (
		<HStack spacing={2} marginTop={props.marginTop}>
			{props.tags.map((tag) => {
				return (
					<Tag size={'md'} variant="solid" colorScheme="purple" key={tag}>
						{tag}
					</Tag>
				);
			})}
		</HStack>
	);
};

// Activate this and also uncommet this component inside main component
// to use author name and author image
// ---------------------------------------------------------------------
// export const BlogAuthor = (props) => {
// 	return (
// 		<HStack marginTop="2" spacing="2" display="flex" alignItems="center">
// 			<Image
// 				borderRadius="full"
// 				boxSize="40px"
// 				src="https://100k-faces.glitch.me/random-image"
// 				alt={`Avatar of ${props.name}`}
// 			/>
// 			<Text fontWeight="medium">{props.name}</Text>
// 			<Text>—</Text>
// 			<Text>{props.date.toLocaleDateString()}</Text>
// 		</HStack>
// 	);
// };

const DesignEl = () => (
	<Box
		bgGradient={useColorModeValue(
			'radial(purple.600 1px, transparent 1px)',
			'radial(purple.300 1px, transparent 1px)'
		)}
		backgroundSize="20px 20px"
		opacity="0.4"
		height="100%"
	/>
);

export default function Blogs({ posts, featuredPost }) {
	return (
		<Layout>
			<Container maxW={'7xl'} p="12">
				{featuredPost && (
					<>
						<Heading as="h1">Articles by Designholt</Heading>
						{/* Fetured post */}
						<Box
							marginTop={{ base: '1', sm: '5' }}
							display="flex"
							flexDirection={{ base: 'column', sm: 'row' }}
							justifyContent="space-between"
						>
							<Box
								display="flex"
								flex="1"
								marginRight="3"
								position="relative"
								alignItems="center"
							>
								<Box
									width={{ base: '100%', sm: '85%' }}
									zIndex="2"
									marginLeft={{ base: '0', sm: '5%' }}
									marginTop="5%"
									w="96"
									h="80"
									overflow="hidden"
									display="flex"
									justifyContent="center"
									alignItems="center"
									borderRadius="lg"
								>
									<Link
										textDecoration="none"
										_hover={{ textDecoration: 'none' }}
									>
										<Image
											src={featuredPost.mainImage}
											alt="some good alt text"
											objectFit="contain"
										/>
									</Link>
								</Box>
								<Box zIndex="1" width="100%" position="absolute" height="100%">
									<DesignEl />
								</Box>
							</Box>
							<Box
								display="flex"
								flex="1"
								flexDirection="column"
								justifyContent="center"
								marginTop={{ base: '3', sm: '0' }}
							>
								<BlogTags tags={featuredPost.tags} />
								<Heading marginTop="1">
									<Link
										textDecoration="none"
										_hover={{ textDecoration: 'none' }}
									>
										{featuredPost.title}
									</Link>
								</Heading>
								<Text as="p" marginTop="2" color="gray.700" fontSize="lg">
									{featuredPost.description || 'Click to read more'}
								</Text>
								{/* Uncomment bottom code to use author */}
								{/* <BlogAuthor
							name="John Doe"
							date={new Date('2021-04-06T19:01:27Z')}
						/> */}
							</Box>
						</Box>
					</>
				)}
				<Box mt="16" mb="8">
					<Heading as="h2" marginTop="5">
						Latest articles
					</Heading>
					<Divider marginTop="5" />
					<Box
					// display="flex"
					// justifyContent="space-between"
					// alignItems="center"
					>
						{posts.map((post) => (
							<>
								<Wrap spacing="30px" marginTop="5">
									<WrapItem
										width={{ base: '100%', sm: '45%', md: '45%', lg: '30%' }}
									>
										<Box w="100%">
											<Box
												borderRadius="lg"
												overflow="hidden"
												height="80"
												// width="sm"
												display="flex"
												justifyContent="center"
												alignItems="center"
											>
												<Link
													textDecoration="none"
													_hover={{ textDecoration: 'none' }}
												>
													<Image
														transform="scale(1.0)"
														src={post.mainImage}
														alt="some text"
														objectFit="contain"
														width="100%"
														transition="0.3s ease-in-out"
														_hover={{
															transform: 'scale(1.05)',
														}}
													/>
												</Link>
											</Box>
											<BlogTags tags={post.tags} marginTop="3" />
											<Heading fontSize="xl" marginTop="2">
												<Link
													textDecoration="none"
													_hover={{ textDecoration: 'none' }}
												>
													{post.title}
												</Link>
											</Heading>
											<Text as="p" fontSize="md" marginTop="2">
												{featuredPost.description || 'Click to read more'}
											</Text>
											{/* Uncomment bottom code to use author */}
											{/* <BlogAuthor
                    name="John Doe"
                    date={new Date('2021-04-06T19:01:27Z')}
                  /> */}
										</Box>
									</WrapItem>
								</Wrap>
							</>
						))}
					</Box>
				</Box>
				<VStack paddingTop="40px" spacing="2" alignItems="flex-start">
					<Heading as="h2">What we write about</Heading>
					<Text as="p" fontSize="lg">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
						condimentum quam arcu, eu tempus tortor molestie at. Vestibulum
						pretium condimentum dignissim. Vestibulum ultrices vitae nisi sed
						imperdiet. Mauris quis erat consequat, commodo massa quis, feugiat
						sapien. Suspendisse placerat vulputate posuere. Curabitur neque
						tortor, mattis nec lacus non, placerat congue elit.
					</Text>
					<Text as="p" fontSize="lg">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
						condimentum quam arcu, eu tempus tortor molestie at. Vestibulum
						pretium condimentum dignissim. Vestibulum ultrices vitae nisi sed
						imperdiet. Mauris quis erat consequat, commodo massa quis, feugiat
						sapien. Suspendisse placerat vulputate posuere. Curabitur neque
						tortor, mattis nec lacus non, placerat congue elit.
					</Text>
					<Text as="p" fontSize="lg">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
						condimentum quam arcu, eu tempus tortor molestie at. Vestibulum
						pretium condimentum dignissim. Vestibulum ultrices vitae nisi sed
						imperdiet. Mauris quis erat consequat, commodo massa quis, feugiat
						sapien. Suspendisse placerat vulputate posuere. Curabitur neque
						tortor, mattis nec lacus non, placerat congue elit.
					</Text>
				</VStack>
			</Container>
		</Layout>
	);
}
