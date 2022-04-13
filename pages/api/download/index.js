import { getBuyerWithId } from '@/lib/sanityAdmin';

export default async function handler(req, res) {
	if (req.method === 'GET') {
		const { productId, userId } = req.query;

		const buyerData = await getBuyerWithId(userId);

		// console.log(buyerData[0].bought[0]);
		if (buyerData.length === 0) {
			return res.status(200).json({ message: 'User does not exist' });
		}

		const { bought } = buyerData[0];

		if (bought.length > 0) {
			const matched = bought.find((item) => {
				const {
					expires,
					product: { _ref },
					downloadURL,
				} = item;

				return _ref === productId;
			});

			return matched
				? res.status(200).json({ downloadLink: matched.downloadURL })
				: res.status(200).json({ message: 'No such product bought!' });
		} else {
			return res.status(200).json({ message: 'No bought items found!' });
		}
	} else {
		return res.status(405).json({ message: 'Method not allowed!' });
	}
}
