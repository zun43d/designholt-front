import { extendTheme, theme as baseTheme } from '@chakra-ui/react';

const colorMode = {
	initialColorMode: 'light',
	useSystemColorMode: false,
};

export const theme = extendTheme({
	fonts: {
		heading: `Raleway, ${baseTheme.fonts.heading}`,
		body: `Inter, ${baseTheme.fonts.heading}`,
	},
	colorMode,
});

export default theme;
