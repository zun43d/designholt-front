import { ChakraProvider } from '@chakra-ui/react';
import { CartProvider, useCart } from 'react-use-cart';
import AuthProvider from '@/context/AuthUserContext';
import { theme } from '@/styles/theme';

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
