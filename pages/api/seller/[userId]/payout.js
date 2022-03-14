const handlePayout = (req, res) => {};

export default function handler(req, res) {
	return req.method === 'POST'
		? handlePayout(req, res)
		: res.status(405).json({ error: 'Method not allowed' });
}
