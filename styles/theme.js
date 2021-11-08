import { extendTheme, theme as baseTheme } from '@chakra-ui/react';

const theme = extendTheme({
	fonts: {
		heading: `Open Sans, ${baseTheme.fonts.body}`,
		body: `Open Sans, ${baseTheme.fonts.body}`,
	},
});

export default theme;
