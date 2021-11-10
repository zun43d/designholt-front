import { ChakraProvider } from '@chakra-ui/react';
import AuthProvider from '@/context/AuthUserContext';
import { theme } from '@/styles/theme';
import '@/styles/global.module.css';

function MyApp({ Component, pageProps }) {
	return (
		<AuthProvider>
			<ChakraProvider theme={theme}>
				<Component {...pageProps} />
			</ChakraProvider>
		</AuthProvider>
	);
}

export default MyApp;
