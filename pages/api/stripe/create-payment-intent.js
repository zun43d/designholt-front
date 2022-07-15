import { client } from '@/lib/sanity';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import { handlingFee } from '@/data/bussiness-data';

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

	return await client
		.fetch(query, params)
		.then((res) => {
			let total = res.reduce((acc, item) => {
				return acc + +item.price;
			}, 0);

			total += handlingFee;
			console.log(total);
			return Math.trunc(total * 100);
		})
		.catch((err) => {
			console.log(
				'calculateOrderAmount#####################################',
				err
			);
		});
	// return 1400;
};

export default async function handler(req, res) {
	const { items, userInfo } = req.body;

	// Create a PaymentIntent with the order amount and currency
	const paymentIntent = await stripe.paymentIntents.create({
		amount: await calculateOrderAmount(items),
		currency: 'usd',
		automatic_payment_methods: {
			enabled: true,
		},
		metadata: {
			name: userInfo.fullname,
			email: userInfo.email,
			phone: userInfo.phone,
		},
	});

	res.send({
		clientSecret: paymentIntent.client_secret,
	});
}
