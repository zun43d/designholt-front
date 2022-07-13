import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useCart } from 'react-use-cart';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { handlingFee, customFee } from 'data/bussiness-data';
import PhoneInput from 'react-phone-number-input';
import Layout from '@/layout/layout';
import {
	Heading,
	Box,
	Flex,
	Stack,
	FormControl,
	FormLabel,
	Divider,
	Text,
	Spacer,
	useToast,
} from '@chakra-ui/react';
import { Input, Button, Link } from '@/components/uiComponents';
import Loading from '@/components/Loading';

export default function CheckOut() {
	const router = useRouter();
	const toast = useToast();

	const { isEmpty, items, totalItems, emptyCart, cartTotal } = useCart();
	const { register, handleSubmit, errors, setValue } = useForm();

	const [userInfo, setUserInfo] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isPaid, setIsPaid] = useState(false);

	const itemPrice = cartTotal;
	const totalPrice =
		+itemPrice + handlingFee + +(items[0]?.custom?.isCustom ? customFee : 0);

	const payingAmount = totalPrice;
	const currency = 'USD';
	const style = { layout: 'horizontal' };
	const fundingSources = ['paypal', 'card'];

	const getUserInfo = () =>
		setUserInfo(JSON.parse(localStorage.getItem('userInfo')));
	const clearUserInfo = () => {
		localStorage.removeItem('userInfo');
		setUserInfo(null);
	};

	useEffect(() => {
		getUserInfo();
	}, []);

	const handleUserInfo = (data) => {
		localStorage.setItem('userInfo', JSON.stringify(data));
		getUserInfo();
	};

	const handlePaymentConfirm = (details) => {
		setIsLoading(true);
		if (details) {
			axios({
				method: 'POST',
				url: `/api/order/create`,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_ROUTE_KEY}`,
				},
				data: {
					tnxId: details.id,
					products: items.map((item) => item),
					userInfo,
				},
			}).then((res) => {
				setIsPaid(true);
				toast({
					title: 'Payment success',
					description: 'Your order was placed successfully',
					status: 'success',
					duration: 5000,
					isClosable: true,
				});
				emptyCart();
				localStorage.setItem('checkout', JSON.stringify({ isPaid: true }));
				router.push('/checkout/order-success');
			});
		} else {
			console.log('Payment cancelled');
		}
	};

	return (
		<Layout noCart noFoot maxW="5xl">
			<Head>
				<title>Checkout | Designholt</title>
			</Head>

			<Box my="5" w="full">
				{/* <Heading>Checkout</Heading> */}
				<Flex
					gridGap={4}
					flexDir={['column-reverse', null, null, 'row']}
					alignItems={['center', null, null, 'start']}
					w="full"
					my="3"
				>
					<Box
						flexGrow={['10', null, null, null, '5']}
						w={['96', null, null, 'auto']}
					>
						<Box
							py="4"
							px="6"
							border="1px"
							borderColor="gray.200"
							borderRadius="md"
						>
							<Heading as="h2" size="md">
								Billing details
							</Heading>
							{userInfo ? (
								<Box my="3">
									<Text>Name: {userInfo.fullname}</Text>
									<Text>Email: {userInfo.email}</Text>
									<Text>Phone: {userInfo.phone}</Text>
									<Link
										as="button"
										color="purple.500"
										fontSize="sm"
										onClick={() => setUserInfo(null)}
									>
										Edit
									</Link>
								</Box>
							) : (
								<Stack
									as="form"
									onSubmit={handleSubmit(handleUserInfo)}
									mt="5"
									spacing={4}
								>
									<FormControl>
										<FormLabel>Full name</FormLabel>
										<Input
											{...register('fullname', {
												required: true,
											})}
											placeholder="Enter your fullname"
										/>
									</FormControl>

									<FormControl>
										<FormLabel>Email</FormLabel>
										<Input
											{...register('email', {
												required: true,
											})}
											placeholder="Enter your email"
										/>
									</FormControl>

									<FormControl>
										<FormLabel>Phone number</FormLabel>
										{
											// <Input
											//{...register('phone', {
											//		required: true,
											//	})}
											//	placeholder="Enter your phone number"
											///>
										}
										<PhoneInput
											international
											countryCallingCodeEditable={false}
											defaultCountry="US"
											onChange={(value) => setValue('phone', value)}
										/>
									</FormControl>

									<Button type="submit" isLoading={false}>
										Next
									</Button>
								</Stack>
							)}
						</Box>
						<Box
							mt="5"
							py="5"
							px="8"
							border="1px"
							borderColor="gray.200"
							borderRadius="md"
						>
							<Heading size="md">Payment method</Heading>

							{userInfo && !isEmpty ? (
								<Box w="full" mx="auto" mt="8">
									<PayPalScriptProvider
										options={{
											'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
										}}
									>
										<Box w="70%" mx="auto">
											{fundingSources.map((source, index) =>
												isLoading ? (
													<Loading />
												) : (
													<PayPalButtons
														key={index}
														style={{
															color: source === 'paypal' ? 'silver' : '',
														}}
														disabled={isPaid}
														forceReRender={[payingAmount, currency, style]}
														fundingSource={source}
														createOrder={(data, actions) => {
															return actions.order
																.create({
																	purchase_units: [
																		{
																			amount: {
																				currency_code: currency,
																				value: payingAmount,
																			},
																		},
																	],
																})
																.then((orderId) => {
																	// Your code here after create the order
																	return orderId;
																});
														}}
														onApprove={function (data, actions) {
															return actions.order
																.capture()
																.then(function (details) {
																	// Your code here after capture the order
																	handlePaymentConfirm(details);
																});
														}}
													/>
												)
											)}
										</Box>
									</PayPalScriptProvider>
								</Box>
							) : (
								<Box
									display="flex"
									justifyContent="space-evenly"
									alignItems="center"
								></Box>
							)}
						</Box>
					</Box>

					<Box w="96">
						<Box
							py="4"
							px="6"
							border="1px"
							borderColor="gray.200"
							borderRadius="md"
						>
							<Heading as="h2" size="md">
								Order summary
							</Heading>
							<Box>
								<Text fontSize="sm" color="gray.400">
									{/* {totalItems || '0'} items */}
								</Text>
							</Box>
							<Divider my="3" />
							<Box>
								{/* {items.map((item) => (
									<Box
										key={item.id}
										mb="3"
										px="3"
										py="2"
										borderColor="gray.100"
										borderRadius="md"
										display="flex"
										alignItems="center"
									>
										<Box
											w="full"
											display="flex"
											flexDir="row"
											alignItems="center"
										>
											<Box w="10" h="10">
												<Image
													src={item.thumbnail}
													alt={item.title}
													width={100}
													height={100}
													layout="responsive"
												/>
											</Box>
											<Box ml="5" flexGrow="1">
												<Text fontWeight="semibold" fontSize="sm">
													{item.title}
												</Text>
											</Box>
											<Spacer />
											<Box>
												<Text
													fontSize="md"
													fontWeight="medium"
													color="gray.500"
												>
													{item.price}$
												</Text>
											</Box>
										</Box>
									</Box>
								))} */}
							</Box>
							<Divider my="3" />
							<Box fontSize="md">
								<Box display="flex" mb="2">
									<Text>Subtotal</Text>
									<Spacer />
									{/* <Text>${itemPrice}</Text> */}
								</Box>

								{/* {items[0]?.custom?.isCustom && (
									<Box display="flex" mb="2">
										<Text>Customization Fee</Text>
										<Spacer />
										<Text>${customFee}</Text>
									</Box>
								)} */}

								<Box display="flex">
									<Text>Handling fee</Text>
									<Spacer />
									<Text>${handlingFee.toFixed(2)}</Text>
								</Box>
							</Box>
							<Divider my="3" />
							<Box display="flex" alignItems="center">
								<Text fontSize="md" fontWeight="semibold">
									Total (USD)
								</Text>
								<Spacer />
								{/* <Text fontWeight="semibold">${totalPrice}</Text> */}
							</Box>
						</Box>
					</Box>
				</Flex>
			</Box>
		</Layout>
	);
}
