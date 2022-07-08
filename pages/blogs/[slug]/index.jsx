import Head from 'next/head';
import Image from 'next/image';
import NextLink from 'next/link';
import Layout from '@/layout/layout';
import { getBlogBySlug, getAllBlogs } from '@/lib/sanityDb';
import {
	Box,
	Heading,
	Text,
	OrderedList,
	UnorderedList,
	ListItem,
	Link,
} from '@chakra-ui/react';
import { PortableText, toPlainText } from '@portabletext/react';
import { getImageDimensions } from '@sanity/asset-utils';
import urlBuilder from '@sanity/image-url';
import { client as sanityClient } from '@/lib/sanity';

const builder = urlBuilder(sanityClient);

export const getStaticProps = async (ctx) => {
	const slug = ctx.params.slug;
	const blog = await getBlogBySlug(slug);

	return {
		props: {
			blog: blog[0],
		},
		revalidate: 3600,
	};
};

export const getStaticPaths = async () => {
	const blogs = await getAllBlogs();
	const paths = blogs.map((blog) => {
		return {
			params: {
				slug: blog.slug,
			},
		};
	});

	return {
		paths,
		fallback: 'blocking',
	};
};

const chakraPortableComponents = {
	types: {
		image: ({ value, isInline }) => {
			const { width, height } = getImageDimensions(value);
			return (
				<Box
					my="5"
					borderRadius="lg"
					overflow="hidden"
					w="100%"
					display="flex"
					justifyContent="center"
					alignItems="center"
				>
					<Image
						src={builder.image(value).width(width).height(height).url()}
						alt=""
						width={width}
						height={height}
						objectFit="scale-down"
						loading="lazy"
					/>
				</Box>
			);
		},
	},
	block: {
		normal: ({ children }) => (
			<>
				<Text fontSize="xl">{children}</Text>
				<br />
			</>
		),
		h1: ({ children }) => (
			<Heading as="h1" fontSize="4xl">
				{children}
			</Heading>
		),
		h2: ({ children }) => (
			<Heading as="h2" fontSize="3xl">
				{children}
			</Heading>
		),
		h3: ({ children }) => (
			<Heading as="h3" fontSize="2xl">
				{children}
			</Heading>
		),
		h4: ({ children }) => (
			<Heading as="h4" fontSize="xl">
				{children}
			</Heading>
		),
		h5: ({ children }) => (
			<Heading as="h5" fontSize="lg">
				{children}
			</Heading>
		),
		h6: ({ children }) => (
			<Heading as="h6" fontSize="md">
				{children}
			</Heading>
		),
	},
	marks: {
		link: ({ value, children }) => (
			<NextLink href={value?.href} passHref>
				<Link color="purple.600" target="_blank">
					{children}
				</Link>
			</NextLink>
		),
	},
	list: {
		bullet: ({ children }) => (
			<UnorderedList py="3" ml="10">
				{children}
			</UnorderedList>
		),
		number: ({ children }) => (
			<OrderedList py="3" ml="10">
				{children}
			</OrderedList>
		),
	},
	listItem: {
		bullet: ({ children }) => <ListItem fontSize="lg">{children}</ListItem>,
		number: ({ children }) => <ListItem fontSize="lg">{children}</ListItem>,
	},
};

export default function BlogPost({ blog }) {
	const { width, height } = getImageDimensions(blog.mainImage.img);
	const blogTitle = `${blog.title} | DesignHolt`;

	return (
		<Layout my="10">
			<Head>
				<title>{blogTitle}</title>
			</Head>

			<Box>
				<Heading
					maxW={['xl', null, null, '7xl']}
					mx="auto"
					px="5"
					as="h1"
					size={['2xl', null, '3xl', '4xl']}
					fontWeight="extrabold"
					lineHeight="normal"
					textAlign={['left', null, null, 'center']}
					mt={['5', null, '12']}
					mb={['10', null, '16']}
				>
					{blog.title}
				</Heading>

				<Box w="100%" my="8" maxW="4xl" mx="auto" px="5">
					<Image
						src={blog.mainImage.img}
						alt={blog.mainImage.imageAlt}
						width={width}
						height={height}
						layout="responsive"
						// objectFit="scale-down"
						loading="lazy"
					/>
				</Box>

				<Box maxW="4xl" mx="auto" px="5">
					<PortableText
						value={blog.body}
						components={chakraPortableComponents}
					/>
				</Box>
			</Box>
		</Layout>
	);
}
