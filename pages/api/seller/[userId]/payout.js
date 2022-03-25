import { getUserBalance, sendPayoutReq } from '@/lib/sanityAdmin';

const handlePayout = async (req, res) => {
	const { authorization } = req.headers;
	const { uid, method, paymentAddr } = req.body;

	const unauthorized = () => {
		res.status(401).send({
			status: 'error',
			message: 'Authorization required',
		});
	};

	if (authorization !== `Bearer ${process.env.NEXT_PUBLIC_API_ROUTE_KEY}`) {
		return unauthorized();
	}

	const bal = await getUserBalance(uid);
	console.log('balance', bal[0].balance);
	const details = {
		amount: bal[0].balance,
		method,
		payAddr: paymentAddr,
	};

	return details.amount >= 50
		? await sendPayoutReq(uid, details).then((result) => {
				console.log('payout Api done');
				res.status(200).json({ message: 'Payout request sent!' });
				return result;
		  })
		: res.status(400).json({ message: 'Insufficient balance' });
};

export default async function handler(req, res) {
	return req.method === 'POST'
		? await handlePayout(req, res)
		: res.status(405).json({ error: 'Method not allowed' });
}
