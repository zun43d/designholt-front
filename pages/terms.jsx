import NextLink from 'next/link';
import Layout from '@/layout/layout';
import { Box, Heading, Text, OrderedList, ListItem } from '@chakra-ui/react';
import { Link } from '@/components/uiComponents';

export default function Terms() {
	return (
		<Layout maxW="4xl">
			<Box my="12" px="10">
				<Heading as="h2" size="2xl" textAlign="center" mb="2">
					Terms & Conditions
				</Heading>
				<br />
				<Heading as="h3" size="lg" mb="2">
					Welcome to Designholt
				</Heading>
				<OrderedList>
					<ListItem fontSize="lg">
						Hi, we’re Desigholt and welcome! We’re happy to have you here. When
						we say ‘we’, ‘us’ or ‘Designholt’ it’s because that’s who we are and
						we own and run the Designholt.com.
					</ListItem>
					<ListItem fontSize="lg">
						You need to be 16 years or over to browse Designholt.com. We don’t
						knowingly collect any information from anyone aged 16 or under. When
						browsing the site you agree to follow our guidelines or instructions
						and keep in mind that these terms apply to any use of Designholt.
					</ListItem>
					<ListItem fontSize="lg">
						The items on Designholt are owned by the sellers, not by us. The
						items on Designholt are uploaded at the direction of the seller. We
						provide the platform service; we do not take ownership of any items
						uploaded by a vendor.
					</ListItem>
					<ListItem fontSize="lg">
						During your time with us you agree to follow the ground rules
						outlined in these terms so please read and understand them. If you
						don’t accept the terms then we’ll be sad, but you will need to leave
						because your presence on and use of Designholt is conditional on
						your acceptance to be bound by these terms and the Acceptable Use
						Policy.
					</ListItem>
					<ListItem fontSize="lg">
						Preview Files: If you stream or download a preview file from
						Designholt site, you agree that you will not remove any watermarking
						or other protective measures from the preview file. You agree that
						you will use the preview file solely for the purposes of evaluating
						a purchase from Designholt site and not for any other purpose.
					</ListItem>
					<ListItem fontSize="lg">
						You need to be 18 years or over to buy items. If you’re under 18,
						you will need to get a parent or guardian to buy items or use the
						account of a parent or legal guardian who is at least 18 years of
						age, with their permission, and this adult will be responsible for
						all of your activities.
					</ListItem>
					<ListItem fontSize="lg">
						Your responsibility: You promise that the information you give us is
						true, accurate and complete and, if you sign up for a Designholt
						account, that you will keep your account information up-to-date
						(including a current email address). You are responsible for any use
						of the Designholt site including any activity that occurs in
						conjunction with your username and password, if you have a
						Designholt account, so keep your password secure and don’t let any
						other person use your username or password. If you realise there’s
						any unauthorized use of your password or any breach of security, you
						need to let us know immediately. You must not use a virtual private
						network or VPN or any other means to avoid compliance with these
						terms and conditions, or for any fraudulent or illegal reasons.
					</ListItem>
					<ListItem fontSize="lg">
						License: When you buy an item, you acquire the right to use that
						item; you're not actually acquiring the item itself. What you get
						includes a license directly from the seller to use that item. Items
						are subject to specific terms of use, and these terms are the
						‘license’ that we set on Designholt. This license also applies to
						you if you download an item that someone else has bought for you
						(because anyone buying an item needs to accept all terms of
						Designholt).
					</ListItem>
					<ListItem fontSize="lg">
						Currency conversion costs: You are responsible for all costs of
						currency conversion relating to a transaction on Designholt. Your
						financial institution does the currency conversion and may charge
						you additional fees (we don’t control either the conversion rates or
						your financial institution’s fees).
					</ListItem>
					<ListItem fontSize="lg">
						Terms of buying: When you buy a Designholt item you’re doing so on
						the following terms:
						<OrderedList styleType="lower-alpha" my="1">
							<ListItem fontSize="lg">
								you cannot cancel a completed purchase of an item;
							</ListItem>
							<ListItem fontSize="lg">
								we and the sellers do not promise that any particular item will
								continue to be available on Designholt so you should download
								and save the item as soon as you buy it;
							</ListItem>
							<ListItem fontSize="lg">
								once you buy or download an item and the item has been paid for,
								you acquire a non-exclusive license to use the item under the
								terms set out in the license (non-exclusive means others might
								also license the same item);
							</ListItem>
							<ListItem fontSize="lg">
								the sellers retains ownership of the item;
							</ListItem>
							<ListItem fontSize="lg">
								your relevant details may be provided to the seller of the item
								in order to facilitate the transaction, for example for
								invoicing and item support services; and
							</ListItem>
							<ListItem fontSize="lg">
								we have the right to enforce against you the terms of the
								license that you have acquired from a seller.
							</ListItem>
							<ListItem fontSize="lg">
								Our team is constantly trying to make sure that no seller is
								submitting any copied item on Designholt site from the internet.
								But we won’t be responsible for any legal complications
								regarding copyright or any other issue related to the item once
								you buy it. We recommend you to do some research before buying
								any item. Sorry to say that but we won’t take any responsibility
								about any item once it’s sold.
							</ListItem>
						</OrderedList>
					</ListItem>
					<ListItem fontSize="lg">
						Warranties we make:
						<OrderedList styleType="lower-alpha" my="1">
							<ListItem fontSize="lg">
								We warrant that Designholt.com will provide platform services
								with reasonable skill and care.
							</ListItem>
							<ListItem fontSize="lg">
								We otherwise do not make any express or implied warranties about
								the Designholt.com (or any items on the Designholt site).
							</ListItem>
						</OrderedList>
					</ListItem>
					<ListItem fontSize="lg">
						Warranties sellers make: The seller of an item you buy warrants to
						you that:
						<OrderedList styleType="lower-alpha" my="1">
							<ListItem fontSize="lg">
								the item is of acceptable quality and fit for the purpose for
								which it is 'sold';
							</ListItem>
							<ListItem fontSize="lg">
								the item matches the description given by the seller on the item
								preview page, as well as any item preview;
							</ListItem>
							<ListItem fontSize="lg">
								they will honor any express warranties given to you that are
								contained in these terms;
							</ListItem>
							<ListItem fontSize="lg">
								they have the necessary rights to license that item on the terms
								of applicable license;
							</ListItem>
							<ListItem fontSize="lg">
								your use of that item in accordance with the terms of the
								applicable license does not infringe the intellectual property
								rights of someone else;
							</ListItem>
							<ListItem fontSize="lg">
								the item and its description are not false, inaccurate,
								misleading, fraudulent, unlawful or defamatory;
							</ListItem>
							<ListItem fontSize="lg">
								the item and its description do not violate any applicable law
								or regulation (including those governing export control,
								consumer protection, unfair competition, criminal law,
								pornography, anti-discrimination, trade practices or fair
								trading);
							</ListItem>
							<ListItem fontSize="lg">
								the item does not contain viruses or other computer codes, files
								or programs which are designed to limit or destroy the
								functionality of other computer software or hardware;
							</ListItem>
							<ListItem fontSize="lg">
								they will process your data in accordance with applicable
								privacy law and data protection regulations.
							</ListItem>
						</OrderedList>
					</ListItem>
					<ListItem fontSize="lg">
						Items with an incorrect price or incorrect information: Despite of
						our reasonable efforts, items may occasionally be listed at an
						incorrect price or with incorrect information. If this happens, we
						may cancel or reverse a transaction, even after it is completed and
						a payment has been processed. If we do this, we’ll promptly arrange
						for any payment to be credited or refunded and you must not use the
						item unless you re-purchase it at the correct price.
					</ListItem>
					<ListItem fontSize="lg">
						Refund: Given the nature of digital content, a refund or credit on a
						purchase is not granted. There is generally no obligation to provide
						a refund or credit in situations like the following:
						<OrderedList styleType="lower-alpha" my="1">
							<ListItem fontSize="lg">
								you have changed your mind about an item;
							</ListItem>
							<ListItem fontSize="lg">you bought an item by mistake;</ListItem>
							<ListItem fontSize="lg">
								you do not have sufficient expertise to use the item;
							</ListItem>
							<ListItem fontSize="lg">you ask for goodwill; or</ListItem>
							<ListItem fontSize="lg">
								you can no longer access the item because it has been removed
								(we advise you to download items as soon as you buy them to
								avoid this situation).
							</ListItem>
						</OrderedList>
					</ListItem>
					<ListItem fontSize="lg">
						Intellectual Property
						<OrderedList styleType="lower-alpha" my="1">
							<ListItem fontSize="lg">
								What we own: We own all the content uploaded on our official
								account (https://designholt.com/seller/designHolt) of Designholt
								site (unless otherwise stated and excluding content owned by
								others). This includes the design, compilation, and look and
								feel of the Designholt site, and copyright, trademarks, designs
								and other intellectual property on Designholt site. You will not
								copy, distribute, modify or make derivative works of any of our
								Designholt Content or use any of our intellectual property in
								any way not expressly stated in these terms.
							</ListItem>
							<ListItem fontSize="lg">
								What we don’t own: We do not own the items uploaded by sellers
								on Designholt; our sellers do. Items are uploaded at the
								direction of the seller. So we cannot take responsibility for
								the quality, safety or legality of the items. We do not warrant
								that the items or any member content, code, data or materials
								available on or via the Designholt do not infringe the
								intellectual property rights of a third party. (Each seller
								provides promises to you directly when you purchase their item –
								see section 12 - Warranties sellers make.)
							</ListItem>
						</OrderedList>
					</ListItem>
					<ListItem fontSize="lg">
						Platform Service Charge: We will take 50% of the item’s price on
						each sale as platform service charge. This charge will be taken from
						the seller. We don’t take “Platform Service Charge” from buyer. But
						we’ll take a handling fee from the buyer.
					</ListItem>
					<ListItem fontSize="lg">
						Changes to Designholt Terms: We may change these terms at any time.
						You can close your Designholt Account and terminate your agreement
						with us at any time if you do not agree to the changes. However, if
						you continue to use Designholt site after the changes are made, then
						you will be agreeing to the changes.
					</ListItem>
					<ListItem fontSize="lg">
						You may not access or use the Site for any purpose other than that
						for which we make the Site available.
						<br />
						As a user of the Site, you agree not to:
						<OrderedList styleType="lower-alpha" my="1">
							<ListItem fontSize="lg">
								Systematically retrieve data or other content from the Site to
								create or compile, directly or indirectly, a collection,
								compilation, database, or directory without written permission
								from us.
							</ListItem>
							<ListItem fontSize="lg">
								Trick, defraud, or mislead us and other users, especially in any
								attempt to learn sensitive account information such as user
								passwords.
							</ListItem>
							<ListItem fontSize="lg">
								Circumvent, disable, or otherwise interfere with
								security-related features of the Site, including features that
								prevent or restrict the use or copying of any Content or enforce
								limitations on the use of the Site and/or the Content contained
								therein.
							</ListItem>
							<ListItem fontSize="lg">
								Disparage, tarnish, or otherwise harm, in our opinion, us and/or
								the Site.
							</ListItem>
							<ListItem fontSize="lg">
								Use any information obtained from the Site in order to harass,
								abuse, or harm another person.
							</ListItem>
							<ListItem fontSize="lg">
								Make improper use of our support services or submit false
								reports of abuse or misconduct.
							</ListItem>
							<ListItem fontSize="lg">
								Engage in unauthorized framing of or linking to the Site.
							</ListItem>
							<ListItem fontSize="lg">
								Upload or transmit (or attempt to upload or to transmit)
								viruses, Trojan horses, or other material, including excessive
								use of capital letters and spamming (continuous posting of
								repetitive text), that interferes with any party’s uninterrupted
								use and enjoyment of the Site or modifies, impairs, disrupts,
								alters, or interferes with the use, features, functions,
								operation, or maintenance of the Site.
							</ListItem>
							<ListItem fontSize="lg">
								Engage in any automated use of the system, such as using scripts
								to send comments or messages, or using any data mining, robots,
								or similar data gathering and extraction tools.
							</ListItem>
							<ListItem fontSize="lg">
								Delete the copyright or other proprietary rights notice from any
								Content.
							</ListItem>
							<ListItem fontSize="lg">
								Attempt to impersonate another user or person or use the
								username of another user.
							</ListItem>
							<ListItem fontSize="lg">
								Upload or transmit (or attempt to upload or to transmit) any
								material that acts as a passive or active information collection
								or transmission mechanism, including without limitation, clear
								graphics interchange formats (“gifs”), 1×1 pixels, web bugs,
								cookies, or other similar devices (sometimes referred to as
								“spyware” or “passive collection mechanisms” or “pcms”).
							</ListItem>
							<ListItem fontSize="lg">
								Interfere with, disrupt, or create an undue burden on the Site
								or the networks or services connected to the Site.
							</ListItem>
							<ListItem fontSize="lg">
								Harass, annoy, intimidate, or threaten any of our employees or
								agents engaged in providing any portion of the Site to you.
							</ListItem>
							<ListItem fontSize="lg">
								Attempt to bypass any measures of the Site designed to prevent
								or restrict access to the Site, or any portion of the Site.
							</ListItem>
							<ListItem fontSize="lg">
								Copy or adapt the Site’s software, including but not limited to
								Flash, PHP, HTML, JavaScript, or other code.
							</ListItem>
							<ListItem fontSize="lg">
								Except as permitted by applicable law, decipher, decompile,
								disassemble, or reverse engineer any of the software comprising
								or in any way making up a part of the Site.
							</ListItem>
							<ListItem fontSize="lg">
								Except as may be the result of standard search engine or
								Internet browser usage, use, launch, develop, or distribute any
								automated system, including without limitation, any spider,
								robot, cheat utility, scraper, or offline reader that accesses
								the Site, or using or launching any unauthorized script or other
								software.
							</ListItem>
							<ListItem fontSize="lg">
								Make any unauthorized use of the Site, including collecting
								usernames and/or email addresses of users by electronic or other
								means for the purpose of sending unsolicited email, or creating
								user accounts by automated means or under false pretenses.
							</ListItem>
							<ListItem fontSize="lg">
								Sell or otherwise transfer your profile.
							</ListItem>
						</OrderedList>
					</ListItem>
					<ListItem fontSize="lg">
						SOCIAL MEDIA:
						<br />
						As part of the functionality of the Site, you may link your account
						with online accounts you have with third-party service providers
						(each such account, a “Third-Party Account”) by either:
						<OrderedList styleType="lower-alpha" my="1">
							<ListItem fontSize="lg">
								providing your Third-Party Account login information through the
								Site; or
							</ListItem>
							<ListItem fontSize="lg">
								allowing us to access your Third-Party Account, as is permitted
								under the applicable terms and conditions that govern your use
								of each Third-Party Account. You represent and warrant that you
								are entitled to disclose your Third-Party Account login
								information to us and/or grant us access to your Third-Party
								Account, without breach by you of any of the terms and
								conditions that govern your use of the applicable Third-Party
								Account, and without obligating us to pay any fees or making us
								subject to any usage limitations imposed by the third-party
								service provider of the Third-Party Account. By granting us
								access to any Third-Party Accounts, you understand that (i) we
								may access, make available, and store (if applicable) any
								content that you have provided to and stored in your Third-Party
								Account (the “Social Network Content”) so that it is available
								on and through the Site via your account, including without
								limitation any friend lists and (ii) we may submit to and
								receive from your Third-Party Account additional information to
								the extent you are notified when you link your account with the
								Third-Party Account. Depending on the Third-Party Accounts you
								choose and subject to the privacy settings that you have set in
								such Third-Party Accounts, personally identifiable information
								that you post to your Third-Party Accounts may be available on
								and through your account on the Site. Please note that if a
								Third-Party Account or associated service becomes unavailable or
								our access to such Third Party Account is terminated by the
								third-party service provider, then Social Network Content may no
								longer be available on and through the Site. You will have the
								ability to disable the connection between your account on the
								Site and your Third-Party Accounts at any time. PLEASE NOTE THAT
								YOUR RELATIONSHIP WITH THE THIRD-PARTY SERVICE PROVIDERS
								ASSOCIATED WITH YOUR THIRD-PARTY ACCOUNTS IS GOVERNED SOLELY BY
								YOUR AGREEMENT(S) WITH SUCH THIRD-PARTY SERVICE PROVIDERS. We
								make no effort to review any Social Network Content for any
								purpose, including but not limited to, for accuracy, legality,
								or non-infringement, and we are not responsible for any Social
								Network Content. You acknowledge and agree that we may access
								your email address book associated with a Third-Party Account
								and your contacts list stored on your mobile device or tablet
								computer solely for purposes of identifying and informing you of
								those contacts who have also registered to use the Site. You can
								deactivate the connection between the Site and your Third-Party
								Account by contacting us using the contact information below or
								through your account settings (if applicable). We will attempt
								to delete any information stored on our servers that was
								obtained through such Third-Party Account, except the username
								and profile picture that become associated with your account.
							</ListItem>
						</OrderedList>
					</ListItem>
				</OrderedList>
				<br />
				<br />
				<Heading as="h4" fontSize="xl">
					Definitions
				</Heading>
				<br />
				<Text fontSize="lg">
					<b>Seller:</b> a member who makes items available for sale on
					Designholt.
				</Text>
				<Text fontSize="lg">
					<b>Buyer:</b> a person who ‘buys’ items on Designholt.
				</Text>
			</Box>
		</Layout>
	);
}
