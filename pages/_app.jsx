import { ChakraProvider } from '@chakra-ui/react';
import AuthProvider from '@/context/AuthUserContext';
import { theme } from '@/styles/theme';
import '@fontsource/inter/400.css';
import '@fontsource/raleway/700.css';

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
