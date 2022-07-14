import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Box } from '@chakra-ui/react';
import Loading from '@/components/Loading';

import StripeCheckoutForm from './StripeCheckoutForm';

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function StripeWrapper({ items, email }) {
	const [clientSecret, setClientSecret] = useState('');

	useEffect(() => {
		// Create PaymentIntent as soon as the component mounts
		fetch('/api/stripe/create-payment-intent', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ items: items }),
		})
			.then((res) => res.json())
			.then((data) => setClientSecret(data.clientSecret));
	}, [items]);

	const appearance = {
		theme: 'stripe',
		variables: {
			colorPrimary: '#805AD5',
		},
	};
	const options = {
		clientSecret,
		appearance,
	};

	return (
		<Box>
			{clientSecret ? (
				<Elements options={options} stripe={stripePromise}>
					<StripeCheckoutForm email={email} />
				</Elements>
			) : (
				<Loading />
			)}
		</Box>
	);
}
