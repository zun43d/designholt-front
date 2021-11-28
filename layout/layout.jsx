import Head from 'next/head';
import { Box, Text } from '@chakra-ui/react';
import NavBar from '@/components/NavBar.jsx';

export const siteTitle = 'DesignHolt';
export const subHeading = 'Get professional logo that suits you the most';

export default function Layout({ noNav, children, ...rest }) {
	return (
		<Box>
			<Head>
				<title>{`${siteTitle} | ${subHeading}`}</title>
			</Head>
			{noNav ? null : (
				<header>
					<NavBar />
				</header>
			)}
			<main>
				<Box mx="auto" my="8" {...rest}>
					{children}
				</Box>
			</main>
			<footer></footer>
		</Box>
	);
}
