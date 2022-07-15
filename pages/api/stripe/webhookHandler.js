import { buffer } from 'micro';
import Cors from 'micro-cors';
import axios from 'axios';

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	apiVersion: '2020-08-27',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const config = {
	api: {
		bodyParser: false,
	},
};

const cors = Cors({
	allowMethods: ['POST', 'HEAD'],
});

const handler = async (req, res) => {
	if (req.method === 'POST') {
		const buf = await buffer(req);
		const sig = req.headers['stripe-signature'];

		// console.log('➡️ buffer', buf.toString());
		// console.log('🪧 Signature', sig);
		console.log('🗝️ webhook secret', webhookSecret);
		console.log('🗝️ stripe secret', process.env.STRIPE_SECRET_KEY);

		let event;

		try {
			console.log('📦 Event');
			event = stripe.webhooks.constructEvent(
				buf.toString(),
				sig,
				webhookSecret
			);
		} catch (err) {
			// On error, log and return the error message
			console.log(`❌ Error message: ${err.message}`);
			res.status(400).send(`Webhook Error: ${err.message}`);
			return;
		}

		// Successfully constructed event
		console.log('✅ Success:', event.id);

		// Cast event data to Stripe object.
		if (event.type === 'payment_intent.succeeded') {
			const paymentIntent = event.data.object;
			console.log(`💰 PaymentIntent status: ${paymentIntent.status}`);

			// Process after receiving the payment
			// axios({
			//   method: 'POST',
			//   url: 'https://designholt.com/api/order/create',
			//   data: {
			//     tnxId: paymentIntent.id,
			//     products: paymentIntent.charges.data[0].description,
			//     userInfo: {
			//       fullname: paymentIntent.charges.data[0].shipping.name,
			//       email: paymentIntent.charges.data[0].shipping.email,
			//       phone: paymentIntent.charges.data[0].shipping.phone,
			//     },
			//   },
			//   headers: {
			//     'Content-Type': 'application/json',
			//   },
			// })
		} else if (event.type === 'payment_intent.payment_failed') {
			const paymentIntent = event.data.object;
			console.log(
				`❌ Payment failed: ${paymentIntent.last_payment_error?.message}`
			);
		} else if (event.type === 'charge.succeeded') {
			const charge = event.data.object;
			console.log(`💵 Charge id: ${charge.id}`);
		} else {
			console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
		}

		// Return a response to acknowledge receipt of the event.
		res.json({ received: true });
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method Not Allowed');
	}
};

export default cors(handler);
