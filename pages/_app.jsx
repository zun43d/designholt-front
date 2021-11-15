import { ChakraProvider } from '@chakra-ui/react';
import { CartProvider, useCart } from 'react-use-cart';
import AuthProvider from '@/context/AuthUserContext';
import { theme } from '@/styles/theme';
import '@fontsource/inter/400.css';
import '@fontsource/raleway/700.css';

function MyApp({ Component, pageProps }) {
	return (
		<AuthProvider>
			<ChakraProvider theme={theme}>
				<CartProvider>
					<Component {...pageProps} />
				</CartProvider>
			</ChakraProvider>
		</AuthProvider>
	);
}

export default MyApp;
