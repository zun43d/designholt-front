import { useAuth } from '@/context/AuthUserContext';
import VendorPanel from '@/layout/vendorPanel';
import {
	Heading,
	Box,
	Text,
	Avatar,
	Tabs,
	TabList,
	Tab,
	TabPanels,
	TabPanel,
	Grid,
	Select,
} from '@chakra-ui/react';

export default function Portfolio() {
	const { authUser } = useAuth();

	return (
		<VendorPanel maxW="container.lg" my="10" mx="auto">
			<Box
				display="flex"
				flexDir="column"
				justifyContent="flex-start"
				alignItems="center"
				my="5"
			>
				<Avatar src={authUser?.photoUrl} size="2xl" />
				<Heading my="3">{authUser?.name}</Heading>
			</Box>
			<Tabs variant="enclosed" isLazy>
				<TabList>
					<Tab>Portfolio</Tab>
				</TabList>
				<TabPanels>
					{/* initially mounted */}
					<TabPanel>
						<Box
							mt="2"
							mb="4"
							display="flex"
							justifyContent="space-between"
							alignItems="center"
						>
							<Text fontWeight="semibold" fontSize="lg">
								Showing All Logos
							</Text>
							<Box display="flex" alignItems="center">
								<Text pr="2">Filtered By</Text>
								<Select variant="filled" size="sm" maxW="36">
									<option value="approved" selected>
										Approved
									</option>
									<option value="pending">Pending Approval</option>
									<option value="option3">All Logo</option>
								</Select>
							</Box>
						</Box>
						<Grid templateColumns="repeat(6, 1fr)" gap={2}>
							<Box bg="black" w="full" h="40" borderRadius="md"></Box>
							<Box bg="black" w="full" h="40" borderRadius="md"></Box>
							<Box bg="black" w="full" h="40" borderRadius="md"></Box>
							<Box bg="black" w="full" h="40" borderRadius="md"></Box>
							<Box bg="black" w="full" h="40" borderRadius="md"></Box>
							<Box bg="black" w="full" h="40" borderRadius="md"></Box>
							<Box bg="black" w="full" h="40" borderRadius="md"></Box>
							<Box bg="black" w="full" h="40" borderRadius="md"></Box>
							<Box bg="black" w="full" h="40" borderRadius="md"></Box>
							<Box bg="black" w="full" h="40" borderRadius="md"></Box>
							<Box bg="black" w="full" h="40" borderRadius="md"></Box>
							<Box bg="black" w="full" h="40" borderRadius="md"></Box>
						</Grid>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</VendorPanel>
	);
}
