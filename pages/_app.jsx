import { ChakraProvider } from '@chakra-ui/react';
import { CartProvider } from 'react-use-cart';
import AuthProvider from '@/context/AuthUserContext';
import AppContext from '@/context/AppContext';
import { getAllCategories } from '@/lib/sanityDb';
import { theme } from '@/styles/theme';
import '@fontsource/inter/variable-full.css';

import '@/styles/phone-number-input.css';

// export const getStaticProps = async () => {
// 	return {
// 		categories: await getAllCategories(),
// 	};
// };

function MyApp({ Component, pageProps }) {
	// const categories = pageProps.categories;
	// console.log(categories);

	const categories = [
		{
			_id: 'da77d34d-0de5-46ca-b7ee-1a0e98160132',
			categoryName: 'Numbers',
			slug: 'numbers',
		},
		{
			_id: '08180d09-4bb2-402c-84ce-47d3bf84431c',
			categoryName: 'Symbol & Shapes',
			slug: 'symbol-and-shapes',
		},
		{
			_id: '1300be56-8b28-42f0-8e0c-060579083fc3',
			categoryName: 'Vehicle',
			slug: 'vehicle',
		},
		{
			_id: '3001c8fd-3835-4fca-9f94-314baf2cbddc',
			categoryName: 'Vintage',
			slug: 'vintage',
		},
		{
			_id: '4546b82c-4ae2-4ddc-aa73-02f468f06fcf',
			categoryName: 'Beauty',
			slug: 'beauty',
		},
		{
			_id: '468e8e48-788c-40ff-884a-32f946ba6782',
			categoryName: 'Travel',
			slug: 'travel',
		},
		{
			_id: '484f6e82-d28a-416d-a512-b00d70a00c64',
			categoryName: 'Security',
			slug: 'security',
		},
		{
			_id: '59d9249d-fdb9-4076-bee6-6a74b5aa6049',
			categoryName: 'Health & Wellness',
			slug: 'health-and-wellness',
		},
		{
			_id: '7b319831-9ac4-4349-aec5-7370cccd0ca6',
			categoryName: 'Objects',
			slug: 'objects',
		},
		{
			_id: '84972770-90e0-4bea-9b23-d80ab3d59b43',
			categoryName: 'Animal',
			slug: 'animal',
		},
		{
			_id: '9fe89d14-5493-481d-abaa-324301755894',
			categoryName: 'Gaming & Sports',
			slug: 'gaming-and-sports',
		},
		{
			_id: 'b240e96d-eddb-4bf3-bc71-0b3152e61ac9',
			categoryName: 'Abstract Symbol',
			slug: 'abstract-symbol',
		},
		{
			_id: 'c28e1ebe-3e99-4469-a306-cf2fa2a3ad5c',
			categoryName: 'Food',
			slug: 'food',
		},
		{
			_id: 'd837c3be-31d2-4d94-adab-c4ba5af422d9',
			categoryName: 'Buildings',
			slug: 'buildings',
		},
		{
			_id: '049bdcbe-6309-411e-91bc-90dc131f7bbd',
			categoryName: 'Crests',
			slug: 'crests',
		},
		{
			_id: 'da7aea80-6975-49cc-98c5-faa9130ecfb0',
			categoryName: 'Nature',
			slug: 'nature',
		},
		{
			_id: 'e150db81-894c-4bbd-9e37-da0677779bff',
			categoryName: 'Real Estate',
			slug: 'real-estate',
		},
		{
			_id: 'fb1e957c-d627-44d5-abe3-ac5c17256fa7',
			categoryName: 'Education',
			slug: 'education',
		},
		{
			_id: 'fc023c18-b8f5-40c9-a6b8-523fee7b40be',
			categoryName: 'Tech',
			slug: 'tech',
		},
		{
			_id: 'fdb8f243-66ff-4de2-897a-d0ad2ea51380',
			categoryName: 'Single Letter',
			slug: 'single-letter',
		},
	];

	return (
		<AuthProvider>
			<AppContext.Provider
				value={{
					state: {
						categories,
					},
				}}
			>
				<ChakraProvider theme={theme}>
					<CartProvider>
						<Component {...pageProps} />
					</CartProvider>
				</ChakraProvider>
			</AppContext.Provider>
		</AuthProvider>
	);
}

export default MyApp;
