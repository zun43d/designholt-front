import { getUserFromSanity, getUserItems } from '@/lib/sanityDb';

const getStats = async (req, res) => {
	const { authorization } = req.headers;

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

		// Gotta return an object with earnings and totalSales value
		const { uid } = req.body;

		const { totalEarn, bal } = await getUserFromSanity(uid)
			.then((res) => {
				if (res.earnings != undefined) {
					return { totalEarn: res.earnings, bal: res.balance };
				}
				return { totalEarn: 0, bal: 0 };
			})
			.catch((err) => console.log('sats => getUserFromSanity\n', err));

		const sell = await getUserItems(uid)
			.then((res) => {
				let sells = 0;
				res.length > 0 &&
					res.forEach((item) => {
						if (item.totalSell) {
							sells += item.totalSell;
						}
					});
				return sells;
			})
			.catch((err) => console.log('sats => getUserItems\n', err));

		return res
			.status(200)
			.json({ totalEarnings: totalEarn, balance: bal, totalSales: sell });
	}
};

export default async function handler(req, res) {
	req.method == 'POST'
		? await getStats(req, res)
		: res.status(404).send('Method not allowed');
}
