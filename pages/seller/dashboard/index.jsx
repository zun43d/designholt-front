import { useRouter } from 'next/router';
import { Heading, Text, Box } from '@chakra-ui/react';
import { useAuth } from '@/context/AuthUserContext';
import VendorPanel from '@/layout/vendorPanel';
import DashboardInfoCard from '@/components/DashboardInfoCard';

export default function Dashboard() {
	const router = useRouter();
	const { authUser, signUserOut } = useAuth();

	const handleSignOut = () => {
		signUserOut().then((res) => router.push('/'));
	};

	return (
		<VendorPanel>
			<Heading
				size="2xl"
				textAlign="center"
				pt="16"
				pb="20"
				bg="gray.50"
				borderBottom="1px"
				borderBottomColor="gray.200"
			>
				Overview
			</Heading>
			<Box maxW="container.lg" my="10" mx="auto">
				<Box display="flex" justifyContent="space-evenly" my="8">
					<DashboardInfoCard heading="Approved Logo(s)" digits="0" />
					<DashboardInfoCard heading="Pending Approval" digits="0" />
					<DashboardInfoCard heading="Earnings" digits="$0.00" />
				</Box>
			</Box>
		</VendorPanel>
	);
}
