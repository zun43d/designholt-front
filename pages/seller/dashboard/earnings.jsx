import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthUserContext';
import VendorPanel from '@/layout/vendorPanel';
import {
	Heading,
	Box,
	Text,
	UnorderedList,
	ListItem,
	Divider,
} from '@chakra-ui/react';
import { Button } from '@/components/uiComponents';
import DashboardInfoCard from '@/components/DashboardInfoCard';

export default function Earnings() {
	const { authUser } = useAuth();

	const [earnings, setEarnings] = useState('');
	const [totalSales, setTotalSales] = useState('');

	const getEarnings = async () => {
		await axios({
			method: 'POST',
			url: `/api/seller/${authUser.uid}/stats`,
			headers: {
				Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_API_ROUTE_KEY,
			},
			data: {
				uid: authUser.uid,
			},
		}).then((res) => {
			console.log(res.data);
			setEarnings(res.data.earnings.toString());
			setTotalSales(res.data.totalSales.toString());
		});
	};

	useEffect(() => {
		authUser && getEarnings();
		return () => {
			setEarnings('');
			setTotalSales('');
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authUser]);

	return (
		<VendorPanel>
			<Heading
				textAlign="center"
				pt="16"
				pb="20"
				bg="gray.50"
				borderBottom="1px"
				borderBottomColor="gray.200"
			>
				Upload Center
			</Heading>
			<Box maxW="container.md" my="10" mx="auto">
				<Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gridGap={4}>
					<DashboardInfoCard heading="Total Sales" digits={totalSales} />
					<DashboardInfoCard
						heading="Total Earning"
						digits={earnings}
						currency={true}
					/>
					<DashboardInfoCard
						heading="Withdrawable"
						digits={+earnings < 50 ? '0' : earnings}
						currency={true}
					/>
				</Box>
				<br />
				<Divider />
				<Box my="4">
					<Heading size="md">Rules for withdrawal</Heading>

					<UnorderedList my="1">
						<ListItem>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit.
							Adipisci, beatae.
						</ListItem>
						<ListItem>
							Lorem ipsum dolor sit amet consectetur. Lorem, ipsum.
						</ListItem>
						<ListItem>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
							at praesentium consectetur voluptas cum natus.
						</ListItem>
						<ListItem>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit.
							Adipisci, beatae.
						</ListItem>
						<ListItem>
							Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo
							omnis aperiam sit nam aliquam quia expedita rem repellendus
							perspiciatis!
						</ListItem>
						<ListItem>
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Consequuntur eveniet excepturi dolorem quia nulla alias modi amet,
							aperiam animi impedit, numquam ipsam maxime.
						</ListItem>
						<ListItem>
							Lorem ipsum dolor sit amet consectetur, adipisicing elit.
						</ListItem>
					</UnorderedList>
				</Box>
				<Box>
					<Text my="2">
						By clicking on the &quot;Proceed to withdraw&quot; button you agree
						to all the rules and terms of Designholt money withdrawal and you
						also agree that you don&apos;t have any objections with any of our
						policies.
					</Text>
					<Button colorScheme="purple">Proceed to withdraw</Button>
				</Box>
			</Box>
		</VendorPanel>
	);
}
