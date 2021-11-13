import { extendTheme, theme as baseTheme } from '@chakra-ui/react';

const colorMode = {
	initialColorMode: 'light',
	useSystemColorMode: false,
};

export const theme = extendTheme({
	fonts: {
		heading: `Open Sans, sans-serif`,
		body: `Open Sans, sans-serif`,
	},
	colorMode,
});

export default theme;
