import { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { CartProvider } from 'react-use-cart';
import AuthProvider from '@/context/AuthUserContext';
import AppContext from '@/context/AppContext';
import { getAllCategories } from '@/lib/sanityDb';
import { theme } from '@/styles/theme';
import '@fontsource/inter/variable-full.css';

import '@/styles/phone-number-input.css';

export const getStaticProps = async () => {
	return {
		props: {
			categories: await getAllCategories(),
		},
	};
};

function MyApp({ Component, pageProps }) {
	const [paypalLoaded, setPaypalLoaded] = useState(false);

	return (
		<AuthProvider>
			<AppContext.Provider
				value={{
					state: {
						categories: pageProps.categories,
					},
				}}
			>
				<ChakraProvider theme={theme}>
					<CartProvider>
						<Component {...pageProps} test="fuck" />
					</CartProvider>
				</ChakraProvider>
			</AppContext.Provider>
		</AuthProvider>
	);
}

export default MyApp;
