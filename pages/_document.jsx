import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ColorModeScript } from '@chakra-ui/react';
import theme from '@/styles/theme';

class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<link
						rel="preload"
						href="/fonts/Axiforma/Axiforma-Regular.ttf"
						as="font"
						crossOrigin=""
					/>
					<link
						rel="preload"
						href="/fonts/Axiforma/Axiforma-Medium.ttf"
						as="font"
						crossOrigin=""
					/>
					<link
						rel="preload"
						href="/fonts/Axiforma/Axiforma-Bold.ttf"
						as="font"
						crossOrigin=""
					/>
				</Head>
				<body>
					<ColorModeScript initialColorMode={theme.config.initialColorMode} />
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
