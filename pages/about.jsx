import Layout from '@/layout/layout';
import { Box, Heading, Text } from '@chakra-ui/react';

export default function About() {
	return (
		<Layout maxW="4xl">
			<Box my="12" px="10">
				<Heading as="h2" size="2xl" textAlign="center" mb="2">
					About Us
				</Heading>
				<br />
				<Text fontSize="lg">
					DesignHolt is a marketplace where people can find professional
					non-exclusive logos for their business & also creative designers can
					sell their unique logos. Our purpose is to connect business owners &
					designers. We offer the customers an option to choose the best logo
					for their business from thousands of logos at a very reasonable price.
					It saves their time & money. Besides, customers can see the outcome
					before making a purchase, which is not possible in a custom logo
					design project.
				</Text>
				<br />

				<Heading as="h3" size="lg" mb="2">
					Our Goal
				</Heading>
				<Text fontSize="lg">
					DesignHolt&apos;s goal is to save customers&apos; time by providing
					them readymade professional logos & also help designers to grow
					financially. Many businesses fail to choose a perfect logo for them
					because of not having a proper idea about logo design. Different
					businesses require different types of logos. Without having proper
					knowledge, it&apos;s always risky to choose a logo for a business. Our
					goal is to reduce the risk by proving a huge collection of relevant
					logos to choose from.
				</Text>
				<br />

				<Heading as="h3" size="lg" mb="2">
					People Behind Designholt
				</Heading>
				<Text fontSize="lg">
					Designholt is a cooperative endeavor of many designers led by MD
					Tahsin Azadi Nihan (C.E.O of DesignHolt). The website was designed &
					developed by Zunaed Ahmed (Cheif Web Officer of Designholt). Sanjida
					Sharna & Ibtisam Nipun has played very important roles while
					developing the fundamental contents of the website. Many designers
					from all over the world are constantly trying to improve the website
					by uploading their creative & unique logos.
				</Text>
				<br />

				<Heading as="h3" size="lg" mb="2">
					Why Us?
				</Heading>
				<Text>
					Premium Quality, Easy & Affordable Customization and Reasonable Price
				</Text>
			</Box>
		</Layout>
	);
}
