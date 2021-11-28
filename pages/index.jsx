import { Box, Text } from '@chakra-ui/react';
import Layout from '@/layout/layout';
import Hero from '@/components/Home/Hero';
import Featured from '@/components/Home/Featured';

export default function Home() {
	return (
		<Layout>
			<Hero />
			<Featured />
		</Layout>
	);
}
