import ProtectedRoute from '@/components/ProtectedRoute';
import Layout from '@/layout/layout';
import VendorNav from '@/components/VendorNav';
import { Box } from '@chakra-ui/react';

export default function VendorPanel({ children, ...rest }) {
	return (
		<Layout noFoot={true}>
			<ProtectedRoute>
				<VendorNav />
				<Box {...rest}>{children}</Box>
			</ProtectedRoute>
		</Layout>
	);
}
