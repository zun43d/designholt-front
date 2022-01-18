import { useEffect, useState } from 'react';
import { addPaypalScript } from '@/utils/addPaypalScript';

import { ChakraProvider } from '@chakra-ui/react';
import { CartProvider } from 'react-use-cart';
import AuthProvider from '@/context/AuthUserContext';
import { theme } from '@/styles/theme';
import '@fontsource/inter/variable-full.css';

function MyApp({ Component, pageProps }) {
	const [paypalLoaded, setPaypalLoaded] = useState(false);
	// useEffect(() => {
	// 	addPaypalScript(process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID, setPaypalLoaded);
	// 	console.log(paypalLoaded);
	// }, [paypalLoaded]);

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
