import Head from 'next/head';
import { Box, Text } from '@chakra-ui/react';
import NavBar from '@/components/NavBar.jsx';
import Footer from '@/components/Footer';

export const siteTitle = 'DesignHolt';
export const subHeading = 'Get professional logo that suits you the most';

export default function Layout({
	categories,
	noNav,
	noFoot,
	noCart,
	children,
	...rest
}) {
	const triggerCart = (cartButton) => {
		if (cartButton.current) {
			cartButton.current.click();
		}
	};

	return (
		<Box>
			<Head>
				<title>{`${siteTitle} | ${subHeading}`}</title>
			</Head>
			{noNav ? null : (
				<header>
					<NavBar
						categories={categories}
						triggerCart={triggerCart}
						noCart={noCart ? true : false}
					/>
				</header>
			)}
			<main>
				<Box mx="auto" {...rest}>
					{children}
				</Box>
			</main>
			{noFoot ? null : <Footer />}
		</Box>
	);
}
