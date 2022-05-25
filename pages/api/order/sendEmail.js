import sgEmail from '@sendgrid/mail';
import { productsAndVendors } from '@/lib/sanityAdmin';

sgEmail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
			const { email, name, items } = req.body;

			const msg = {
				to: email,
				from: 'admin@designholt.com',
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
                "><a href="https://designholt.com/download?productId=${item.id}&userId=${item.creator._ref}">Download</a></td>
              </tr>
              `
							)
							.join('')}
              </table>
              `,
			};

			console.log('Here in the middle');

			return await sgEmail
				.send(msg)
				.then((data) => {
					console.log('sendEmail function worked');
					res.status(200).json({ message: 'Email sent' });
				})
				.catch((err) => console.log(err));

			// ------------------
		} catch (err) {
			console.log('sendProductEmail\n', err);
		}
	} else {
		return res.status(405).send({
			status: 'error',
			message: 'Method not allowed',
		});
	}
}
