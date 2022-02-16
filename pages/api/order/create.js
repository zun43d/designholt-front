import {
	createBuyer,
	updateBoughtItems,
	productsAndVendors,
} from '@/lib/sanityAdmin';
import sgEmail from '@sendgrid/mail';

sgEmail.setApiKey(process.env.SENDGRID_API_KEY);

const sendProductOnEmail = async (items, name, email) => {
	try {
		const msg = {
			to: email,
			from: 'funnyclub2015@gmail.com',
			subject: 'Your download is ready',
			// text: 'sdasdawd',
			html: `
        <p>Hi ${name},</p>
        <p>Thank you for purchasing "Logo Template <a href="https://designholt.com/logo-license">(Logo Stock License)</a>" from Designholt. Read the license 
        properly before using the "Logo Template". You can download the "Logo Template" using the "Download" button below. 
        The product will be available on this link for the next 30 days. That's why we recommend saving the logo in secure 
        storage.</p>
        <a href="https://designholt.com/logo-license">Read the license here</a>
        <br />
        <br />
        <table style="
          font-family: arial, sans-serif;
          border-collapse: collapse;
          width: 90%;
          margin: auto;
        ">
          <tr>
            <th style="
              border: 1px solid #dddddd;
              text-align: left;
              padding: 8px;
            ">Product</th>
            <th style="
              border: 1px solid #dddddd;
              text-align: left;
              padding: 8px;
            ">Price (USD)</th> 
            <th style="
              border: 1px solid #dddddd;
              text-align: left;
              padding: 8px;
            ">Action</th>
          </tr>
          ${items
						.map(
							(item) => `
            <tr>
              <td style="
                border: 1px solid #dddddd;
              text-align: left;
              padding: 8px;
              ">${item.title}</td>
              <td style="
                border: 1px solid #dddddd;
              text-align: left;
              padding: 8px;
              ">${item.price}$</td>
              <td style="
                border: 1px solid #dddddd;
              text-align: left;
              padding: 8px;
              "><a href="https://designholt.com/download?productId=${
								item.id
							}&userId=${
								's5d1a4sd56aw' /* userid goes here */
							}">Download</a></td>
            </tr>
          `
						)
						.join('')}
        </table>
      `,
		};

		return await sgEmail
			.send(msg)
			.then((data) => data)
			.catch((err) => console.log(err));
	} catch (err) {
		console.log('sendProductEmail\n', err);
	}
};

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

		return await createBuyer(userInfo)
			.then(async (id) => {
				await updateBoughtItems(id, products, tnxId)
					.then(async (result) => {
						await sendProductOnEmail(products, fullname, email).then(
							async (data) => {
								console.log('email sent');
								res.status(200).json({ message: 'Confirmed' });
								return await productsAndVendors(products);
							}
						);
					})
					.catch((err) => console.log('updateBoughtItem\n', err));
			})
			.catch((err) => console.log('createBuyer\n', err));
	} else {
		res.status(405).send('Method Not Allowed');
	}
}
