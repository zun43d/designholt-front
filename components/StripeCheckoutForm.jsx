import { useState, useEffect } from 'react';
import { useCart } from 'react-use-cart';
import {
	PaymentElement,
	useStripe,
	useElements,
} from '@stripe/react-stripe-js';
import { Text } from '@chakra-ui/react';
import { Button } from './uiComponents';

export default function CheckoutForm() {
	const stripe = useStripe();
	const elements = useElements();

	const [message, setMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const { emptyCart } = useCart();

	useEffect(() => {
		if (!stripe) {
			return;
		}

		const clientSecret = new URLSearchParams(window.location.search).get(
			'payment_intent_client_secret'
		);

		if (!clientSecret) {
			return;
		}

		stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
			switch (paymentIntent.status) {
				case 'succeeded':
					setMessage('Payment succeeded!');
					break;
				case 'processing':
					setMessage('Your payment is processing.');
					break;
				case 'requires_payment_method':
					setMessage('Your payment was not successful, please try again.');
					break;
				default:
					setMessage('Something went wrong.');
					break;
			}
			console.log(message);
		});
	}, [stripe, message]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!stripe || !elements) {
			// Stripe.js has not yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			return;
		}

		setIsLoading(true);

		const { error } = await stripe
			.confirmPayment({
				elements,
				confirmParams: {
					// Make sure to change this to your payment completion page
					return_url: 'https://www.designholt.com/checkout/order-success/',
				},
			})
			.then(() => emptyCart());

		// This point will only be reached if there is an immediate error when
		// confirming the payment. Otherwise, your customer will be redirected to
		// your `return_url`. For some payment methods like iDEAL, your customer will
		// be redirected to an intermediate site first to authorize the payment, then
		// redirected to the `return_url`.
		if (error.type === 'card_error' || error.type === 'validation_error') {
			setMessage(error.message);
		} else {
			setMessage('An unexpected error occurred.');
		}

		setIsLoading(false);
	};

	return (
		<form id="payment-form" onSubmit={handleSubmit}>
			<PaymentElement id="payment-element" />
			<Button
				type="submit"
				mt="5"
				w="full"
				colorScheme="purple"
				isLoading={isLoading || !stripe || !elements}
				id="submit"
			>
				<span id="button-text">
					{isLoading ? <div className="spinner" id="spinner"></div> : 'Pay now'}
				</span>
			</Button>
			{/* Show any error or success messages */}
			{message && (
				<Text
					mt="3"
					color="red.500"
					id="payment-message"
					w={['96', null, null, 'lg']}
				>
					{message}
				</Text>
			)}
		</form>
	);
}
