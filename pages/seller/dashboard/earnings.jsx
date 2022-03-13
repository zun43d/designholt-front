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
	Alert,
	FormControl,
	FormLabel,
	Select,
} from '@chakra-ui/react';
import { Button, Input } from '@/components/uiComponents';
import DashboardInfoCard from '@/components/DashboardInfoCard';

export default function Earnings() {
	const { authUser } = useAuth();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const [retypeErr, setRetypeErr] = useState('');

	const [totalSales, setTotalSales] = useState('');
	const [balance, setBalance] = useState('');
	const [totalEarnings, setTotalEarnings] = useState('');

	const [method, setMethod] = useState();
	const [paymentAddr, setPaymentAddr] = useState();

	const getEarnings = async () => {
		setLoading(true);
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
			setTotalEarnings(res.data.totalEarnings.toString());
			setTotalSales(res.data.totalSales.toString());
			setBalance(res.data.balance.toString());
			setLoading(false);
		});
	};

	useEffect(() => {
		authUser && getEarnings();
		return () => {
			setTotalEarnings('');
			setTotalSales('');
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authUser]);

	const handledSubmit = async (e) => {
		e.preventDefault();

		const data = {
			uid: authUser.uid,
			method,
			paymentAddr,
		};
		console.log(data);
	};

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
						heading="Current Balance"
						digits={balance}
						currency={true}
					/>
					<DashboardInfoCard
						heading="Total Earnings"
						digits={totalEarnings}
						currency={true}
					/>
				</Box>
				<br />
				<Divider />
				<Box as="form" my="4" onSubmit={handledSubmit}>
					<Text>
						You currently have ${balance} in your balance.{' '}
						{balance >= 50 ? (
							<>
								For next month&apos;s payout click on &quot;Proceed to
								withdraw&quot; button to send a payout request.
							</>
						) : (
							<>
								You need at least <b>$50 in your balance to withdraw.</b>
							</>
						)}
					</Text>
					<Box>
						{balance >= 50 ? (
							<>
								<FormControl maxW="80" mt="5" isRequired={true}>
									<FormLabel>Payment Method</FormLabel>
									<Select
										placeholder="Select your payment method"
										onChange={(e) => {
											setRetypeErr('');
											setMethod(e.target.value);
										}}
									>
										<option value="paypal">PayPal</option>
										<option value="bkash">bKash</option>
									</Select>
								</FormControl>

								{method === 'paypal' ? (
									<>
										<FormControl mt="5" isRequired={true}>
											<FormLabel>Paypal Email</FormLabel>
											<Input
												type="email"
												placeholder="Enter your PayPal email"
												onChange={(e) => setPaymentAddr(e.target.value)}
											/>
										</FormControl>

										<FormControl mt="5" isRequired={true}>
											<FormLabel>Re-Enter Paypal email</FormLabel>
											<Input
												type="email"
												placeholder="Re-Enter your PayPal email"
												onChange={(e) => {
													if (e.target.value === paymentAddr) {
														setRetypeErr('');
													} else {
														setRetypeErr('Email does not match');
													}
												}}
											/>
											{retypeErr.length > 0 && (
												<Text color="red.500" fontSize="sm" my="1">
													{retypeErr}
												</Text>
											)}
										</FormControl>
									</>
								) : method === 'bkash' ? (
									<>
										<FormControl mt="5" isRequired={true}>
											<FormLabel>Bkash phone number</FormLabel>
											<Input
												type="number"
												placeholder="Enter your bKash number"
												onChange={(e) => setPaymentAddr(e.target.value)}
											/>
										</FormControl>

										<FormControl mt="5" isRequired={true}>
											<FormLabel>Re-Enter Bkash number</FormLabel>
											<Input
												type="number"
												placeholder="Re-Enter your bKash number"
												onChange={(e) => {
													if (e.target.value === paymentAddr) {
														setRetypeErr('');
													} else {
														setRetypeErr('Bkash number does not match');
													}
												}}
											/>
											{retypeErr.length > 0 && (
												<Text color="red.500" fontSize="sm" my="1">
													{retypeErr}
												</Text>
											)}
										</FormControl>
									</>
								) : null}
							</>
						) : null}
						<br />
						<Alert
							flexDir="column"
							alignItems="start"
							bg="purple.100"
							color="purple.900"
							borderRadius="md"
						>
							<Text fontWeight="bold">Things to keep in mind</Text>
							<UnorderedList mb="2">
								<ListItem>
									The request will be processed on the first week of the next
									month.
								</ListItem>
								<ListItem>
									Minimum withdrawable balance is <b>50$</b>
								</ListItem>
								<ListItem>
									Make sure you&apos;ve added a valid withdrawal method
								</ListItem>
							</UnorderedList>
							If you&apos;ve any question, contact us at- payment@designholt.com
						</Alert>
					</Box>
					<Text my="2">
						By clicking on the &quot;Proceed to withdraw&quot; button you agree
						to all the rules and terms of Designholt money withdrawal and you
						also agree that you don&apos;t have any objections with any of our
						policies.
					</Text>
					<Button
						type="submit"
						colorScheme="purple"
						disabled={
							(loading && !error) || !paymentAddr || !method || balance < 50
						}
					>
						Proceed to withdraw
					</Button>
				</Box>
			</Box>
		</VendorPanel>
	);
}
