// const clientID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

export const addPaypalScript = (clientID, setLoaded) => {
	const script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = `https://www.paypal.com/sdk/js?client-id=${clientID}&currency=USD`;
	script.async = true;

	script.onload = () => setLoaded(true);

	document.body.appendChild(script);
};
