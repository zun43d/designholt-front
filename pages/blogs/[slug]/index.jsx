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
		normal: ({ children }) => <Text fontSize="lg">{children}</Text>,
		h1: ({ children }) => (
			<Heading as="h1" fontSize="3xl">
				{children}
			</Heading>
		),
		h2: ({ children }) => (
			<Heading as="h2" fontSize="2xl">
				{children}
			</Heading>
		),
		h3: ({ children }) => (
			<Heading as="h3" fontSize="xl">
				{children}
			</Heading>
		),
		h4: ({ children }) => (
			<Heading as="h4" fontSize="lg">
				{children}
			</Heading>
		),
		h5: ({ children }) => (
			<Heading as="h5" fontSize="md">
				{children}
			</Heading>
		),
		h6: ({ children }) => (
			<Heading as="h6" fontSize="sm">
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
	return (
		<Layout maxW="5xl" my="10">
			<Box>
				<Heading
					as="h1"
					size="2xl"
					lineHeight="normal"
					textAlign="center"
					my="5"
				>
					{blog.title}
				</Heading>

				<Box w="100%" my="8">
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

				<PortableText value={blog.body} components={chakraPortableComponents} />
			</Box>
		</Layout>
	);
}
