import { client } from '@/lib/sanity';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = async (items) => {
	// Replace this constant with a calculation of the order's amount
	// Calculate the order total on the server to prevent
	// people from directly manipulating the amount on the client

	// Gotta do the job after the implementation is done
	const ids = items.map((item) => item.id);
	const query = `*[_type == 'products' && _id in $ids] {
    _id,
    price
  }`;
	const params = { ids };
	console.log('ids of items -----------------------------------', ids);

	return await client
		.fetch(query, params)
		.then((res) => {
			const total = res.reduce((acc, item) => {
				return acc + item.price;
			}, 0);
			console.log(total);
			return total * 100;
		})
		.catch((err) => {
			console.log(err);
		});
	// return 1400;
};

export default async function handler(req, res) {
	const { items } = req.body;

	// Create a PaymentIntent with the order amount and currency
	const paymentIntent = await stripe.paymentIntents.create({
		amount: await calculateOrderAmount(items),
		currency: 'usd',
		automatic_payment_methods: {
			enabled: true,
		},
	});

	res.send({
		clientSecret: paymentIntent.client_secret,
	});
}
