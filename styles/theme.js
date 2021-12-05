import { extendTheme, theme as baseTheme } from '@chakra-ui/react';

const colorMode = {
	initialColorMode: 'light',
	useSystemColorMode: false,
};

export const theme = extendTheme({
	fonts: {
		heading: ` ${baseTheme.fonts.heading}`,
		body: ` ${baseTheme.fonts.body}`,
	},
	colorMode,
});

export default theme;
