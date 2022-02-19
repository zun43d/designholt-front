import axios from 'axios';
import { createBuyer, updateBoughtItems } from '@/lib/sanityAdmin';

export default async function handler(req, res) {
	const { authorization } = req.headers;
	const { tnxId, products, userInfo } = req.body;

	const { fullname, email, phone } = userInfo;

	const unauthorized = () => {
		res.status(401).send({
			status: 'error',
			message: 'Authorization required',
		});
	};

	if (req.method === 'POST') {
		if (authorization !== `Bearer ${process.env.NEXT_PUBLIC_API_ROUTE_KEY}`) {
			return unauthorized();
		}

		let secondCount = 0;
		const timeCount = setInterval(() => {
			secondCount += 0.5;
			console.log(secondCount);
		}, 500);

		return await createBuyer(userInfo)
			.then(async (id) => {
				// update item list in buyer's document
				await updateBoughtItems(id, products, tnxId)
					.then(async (result) => {
						// await sendProductOnEmail(products, fullname, email).then(
						// 	async (data) => {
						// 		console.log('email sent');
						// 		res.status(200).json({ message: 'Confirmed' });
						// 		return await productsAndVendors(products);
						// 	}
						// );
					})
					.catch((err) => console.log('updateBoughtItem\n', err));

				// send the logo to the user
				await axios({
					method: 'POST',
					url: 'https://designholt.com/api/order/sendEmail',
					data: {
						email,
						name: fullname,
						items: products,
					},
				})
					.then((result) => {
						console.log('email sent');
						res.status(200).json({ message: 'Confirmed' });
					})
					.catch((err) => console.log('sendEmailApi\n', err));

				return (
					clearInterval(timeCount) &&
					console.log('Timeout ends in /api/order/create')
				);
			})
			.catch((err) => console.log('createBuyer\n', err));
	} else {
		res.status(405).send('Method Not Allowed');
	}
}
