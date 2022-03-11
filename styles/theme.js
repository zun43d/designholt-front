import { extendTheme, theme as baseTheme } from '@chakra-ui/react';

const colorMode = {
	initialColorMode: 'light',
	useSystemColorMode: false,
};

export const theme = extendTheme({
	fonts: {
		// gotta change the font to open sans
		heading: `Mulish, ${baseTheme.fonts.heading}`,
		body: `InterVariable, ${baseTheme.fonts.body}`,
	},
	colorMode,
});

export default theme;
