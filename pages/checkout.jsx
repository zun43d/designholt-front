import { useState, useEffect } from 'react';
import { useCart } from 'react-use-cart';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
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
} from '@chakra-ui/react';
import { Input } from '@/components/uiComponents';

export default function CheckOut() {
	const { isEmpty, items } = useCart();

	const amount = '2';
	const currency = 'USD';
	const style = { layout: 'vertical', color: 'blue' };

	return (
		<Layout noFoot={true} maxW="6xl">
			<Box my="5" w="full">
				{/* <Heading>Checkout</Heading> */}
				<Flex gridGap={4} alignItems="start" w="full" my="3">
					<Box
						flexGrow="2"
						py="5"
						px="8"
						border="1px"
						borderColor="gray.200"
						borderRadius="md"
					>
						<Box>
							<Heading size="lg">Billing details</Heading>
							<Stack as="form" mt="5" spacing={4}>
								<FormControl>
									<FormLabel>Email</FormLabel>
									<Input placeholder="Enter you email" />
								</FormControl>

								<FormControl>
									<FormLabel>Country</FormLabel>
									<Input placeholder="Select your country" />
								</FormControl>
							</Stack>
						</Box>
						<Box w="full" mx="auto" mt="8">
							<PayPalScriptProvider
								options={{
									'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
								}}
							>
								<PayPalButtons
									style={style}
									disabled={false}
									forceReRender={[amount, currency, style]}
									fundingSource={undefined}
									createOrder={(data, actions) => {
										return actions.order
											.create({
												purchase_units: [
													{
														amount: {
															currency_code: currency,
															value: amount,
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
										return actions.order.capture().then(function () {
											// Your code here after capture the order
										});
									}}
								/>
							</PayPalScriptProvider>
						</Box>
					</Box>
					<Box flexGrow="1" bg="blue">
						asdasda
					</Box>
				</Flex>
			</Box>
		</Layout>
	);
}
