import axios from 'axios';
import { createBuyer, updateBoughtItems } from '@/lib/sanityAdmin';

export default async function handler(req, res) {
	const { authorization } = req.headers;
	const { tnxId, products, userInfo, totalPrice } = req.body;

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

		const isCustom = products.some((product) => product.custom?.isCustom);

		return await createBuyer(userInfo, isCustom)
			.then(async (id) => {
				// update item list in buyer's document
				await updateBoughtItems(id, products, tnxId, isCustom, totalPrice)
					.then(async (result) => {
						// await sendProductOnEmail(products, fullname, email).then(
						// 	async (data) => {
						// 		console.log('email sent');
						// 		res.status(200).json({ message: 'Confirmed' });
						// 		return await productsAndVendors(products);
						// 	}
						// );
					})
					.catch((err) => {
						res.status(404).json({ message: err });
						console.log('updateBoughtItem\n', err);
					});

				// update everything
				await axios({
					method: 'POST',
					url: 'https://designholt.com/api/order/updateData',
					data: {
						items: products,
					},
				})
					.then((data) => {
						console.log('updateData function worked');
					})
					.catch((err) => {
						console.log('updateData function failed\n', err);
					});

				// send the logo to the user
				return await axios({
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
			})
			.catch((err) => console.log('createBuyer\n', err));
	} else {
		res.status(405).send('Method Not Allowed');
	}
}
