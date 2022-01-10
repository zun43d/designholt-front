import Layout from '@/layout/layout';
import { Box, Heading, Text, UnorderedList, ListItem } from '@chakra-ui/react';

export default function RefundPolicy() {
	return (
		<Layout maxW="6xl" my="10">
			<Box mb="10">
				<Heading>DesignHolt Refund Rules</Heading>
				<br />
				<Text>
					Hi, we&apos;re DesignHolt and welcome to the DesignHolt Refund Rules.
					Because we are a platform, these rules outline what you can expect
					from the sellers of the items you buy. They apply to all sellers and
					customers.
				</Text>
				<br />
				<Text>
					The products that sellers sell on the platform are digital goods and
					cannot be &quot;returned&quot;, so your entitlement to a refund is
					designed with this in mind. Of course, in addition to these rules,
					each country has its own laws surrounding refunds, and these local
					laws are not excluded if they apply to you.
				</Text>
				<br />
				<Text>
					Given the nature of digital content, a refund or credit on a purchase
					is not granted unless one of the warranties given by the seller.
				</Text>
			</Box>
			<Box mb="10">
				<Heading>Item is &quot;not as described&quot;.</Heading> <br />
				<Text>
					An item is &quot;not as described&quot; if it is materially different
					from the item description or preview. If it turns out that the item is
					“not as described” then you would be entitled to a refund from the
					author.
				</Text>
				<br />
				<Text>
					We will assess refund requests (if you have an DesignHolt account) on
					their merits, considering the digital nature of DesignHolt items and
					the type of item preview that was available before purchase. There is
					generally no obligation to provide a refund or credit in situations
					like the following:
				</Text>
				<UnorderedList type="a" my="3">
					<ListItem>you have changed your mind about an item;</ListItem>
					<ListItem>you bought an item by mistake;</ListItem>
					<ListItem>
						you do not have sufficient expertise to use the item;
					</ListItem>
					<ListItem>you ask for goodwill; or</ListItem>
					<ListItem>
						you can no longer access the item because it has been removed (we
						advise you to download items as soon as you buy them to avoid this
						situation).
					</ListItem>
				</UnorderedList>
				<Text>
					If the seller or we decide to issue a refund or credit (if you have an
					DesignHolt account), this will generally be done using the same manner
					used to make the purchase. If the item was purchased using a
					particular payment method you will be refunded using the same payment
					method in reverse. Any payment made to will be made in US Dollars,
					under the rules of the payment method. You are responsible for all
					costs of currency conversion relating to a transaction on DesignHolt.
					Your financial institution does the currency conversion and may charge
					you additional fees (we don’t control either the conversion rates or
					your financial institution’s fees).
				</Text>
			</Box>
		</Layout>
	);
}
