import NextLink from 'next/link';
import Layout from '@/layout/layout';
import { Box, Heading, Text, OrderedList, ListItem } from '@chakra-ui/react';
import { Link } from '@/components/uiComponents';

export default function Privacy() {
	return (
		<Layout maxW="4xl">
			<Box my="12" px="10">
				<Heading as="h2" size="2xl" textAlign="center" mb="2">
					Privacy Policy
				</Heading>
				<br />
				<Heading as="h4" size="lg" mb="2" ml="4">
					Welcome to Designholt&apos;s Privacy Policy
				</Heading>
				<Text fontSize="lg">
					<OrderedList>
						<ListItem>
							Hi there, we&apos;re Designholt and welcome to our privacy policy.
							This policy sets out how we handle your personal information if
							you&apos;re an Designholt user or visitor to our site.
						</ListItem>
						<ListItem>
							When we say &quot;we&quot;, &quot;us&quot; or
							&quot;Designholt&quot; it&apos;s because that&apos;s who we are
							and we own and run the site.
						</ListItem>
						<ListItem>
							If we say &quot;policy&quot; we&apos;re talking about this privacy
							policy. If we say &quot;user terms&quot; we&apos;re talking about
							the rules for using the Designholt site. If we say
							&quot;site&quot; we&apos;re talking about designholt.com.
						</ListItem>
						<br />
						<Heading as="h4" size="lg" mb="2">
							The type of personal information we collect
						</Heading>
						<ListItem>
							We collect certain personal information about visitors and users
							of our site.
						</ListItem>
						<ListItem>
							The most common types of information we collect include things
							like: user-names, account holder names, email addresses, other
							contact details, photos, payment information such as payment agent
							details, transactional details, tax information, content you
							direct us to make available on our site (such as item
							descriptions), your actions on our site (including any selections
							or inputs into items) and web and email analytics data.
						</ListItem>
						<br />
						<Heading as="h4" size="lg" mb="2">
							How we collect personal information
						</Heading>
						<ListItem>
							We collect personal information directly when you provide it to
							us, automatically as you navigate through the site, or through
							other people when you use services associated with the site.
						</ListItem>
						<ListItem>
							We collect your personal information when you provide it to us
							when you complete account registration and buy or provide items or
							services on our site, submit feedback, fill out a survey, or send
							us a communication.
						</ListItem>
						<ListItem>
							As the operator of digital content marketplaces, we have a
							legitimate interest in verifying the identity of our sellers. We
							believe that knowing who our sellers are will strengthen the
							integrity of our marketplaces by reducing fraud, making sellers
							more accountable for their content and giving Designholt and
							customers the ability to enforce contracts for sellers who break
							the rules. Designholt also has certain legal obligations that
							require us to know who our sellers are in certain circumstances.
							In light of this, if you are a seller we will verify your
							identity, in particular, your name, full address and date of birth
							by asking you to show us a Photo ID document.
						</ListItem>
						<br />
						<Heading as="h4" size="lg" mb="2">
							How we use personal information
						</Heading>
						<ListItem>
							We will use your personal information:
							<OrderedList styleType="lower-alpha" my="1">
								<ListItem>
									To fulfill a contract, or take steps linked to a contract: in
									particular, in facilitating and processing transactions that
									take place on the site, like where you purchase an item from
									our marketplace.
								</ListItem>
								<ListItem>
									Where this is necessary for purposes which are in our, or
									third parties&apos;, legitimate interests. These interests
									include:
									<OrderedList styleType="lower-roman" my="1">
										<ListItem>operating the site;</ListItem>
										<ListItem>
											providing you with services described on the site;
										</ListItem>
										<ListItem>
											verifying your identity when you sign in to our site;
										</ListItem>
										<ListItem>
											updating you with operational news and information about
											our site and services e.g. to notify you about changes to
											our site, website disruptions or security updates;
										</ListItem>
										<ListItem>
											carrying out technical analysis to determine how to
											improve the site and services we provide;
										</ListItem>
										<ListItem>
											monitoring activity on the site, e.g. to identify
											potential fraudulent activity and to ensure compliance
											with the user terms that apply to the site;
										</ListItem>
										<ListItem>
											managing our relationship with you, e.g. by responding to
											your comments or queries submitted to us on the site or
											asking for your feedback or whether you want to
											participate in a survey;
										</ListItem>
										<ListItem>
											managing our legal and operational affairs (including,
											managing risks relating to content and fraud matters);
										</ListItem>
										<ListItem>
											training Designholt staff about how to best serve our user
											community;
										</ListItem>
										<ListItem>improving our products and services;</ListItem>
										<ListItem>
											providing general administrative and performance functions
											and activities;
										</ListItem>
									</OrderedList>
								</ListItem>
							</OrderedList>
						</ListItem>
						<ListItem>
							Where you give us consent:
							<OrderedList styleType="lower-alpha" my="1">
								<ListItem>
									providing you with marketing information about products and
									services which we feel may interest you; and
								</ListItem>
								<ListItem>
									customizing our services and website, like advertising that
									appear on the site – where this involves the use of cookies or
									similar technologies – in order to provide a more personalized
									experience.
								</ListItem>
							</OrderedList>
						</ListItem>
						<ListItem>For purposes which are required by law.</ListItem>
						<ListItem>
							For the purpose of responding to requests by government, a court
							of law, or law enforcement authorities conducting an
							investigation.
						</ListItem>
						<br />
						<Heading as="h4" size="lg" mb="2">
							When we disclose your personal information
						</Heading>
						<ListItem>
							We will disclose personal information to the following recipients:
							<OrderedList styleType="lower-alpha" my="1">
								<ListItem>
									our professional advisers (lawyers, accountants, financial
									advisers etc.)
								</ListItem>
								<ListItem>
									regulators and government authorities in connection with our
									compliance procedures and obligations;
								</ListItem>
								<ListItem>
									a purchaser or prospective purchaser of all or part of our
									assets or our business, and their professional advisers, in
									connection with the purchase;
								</ListItem>
								<ListItem>
									a third party to respond to requests relating to a criminal
									investigation or alleged or suspected illegal activity;
								</ListItem>
								<ListItem>
									a third party, in order to enforce or defend our rights, or to
									address financial or reputational risks;
								</ListItem>
								<ListItem>
									a rights holder in relation to an allegation of intellectual
									property infringement or any other infringement; and
								</ListItem>
								<ListItem>
									other recipients where we are authorized or required by law,
									or requests by government, a court of law, or law enforcement
									authorities, to do so.
								</ListItem>
							</OrderedList>
						</ListItem>
						<br />
						<Heading as="h4" size="lg" mb="2">
							How we keep your personal information secure
						</Heading>
						<ListItem>
							We store personal information on secure servers that are managed
							by us and our service providers, and occasionally hard copy files
							that are kept in a secure location.
						</ListItem>
						<br />
						<Heading as="h4" size="lg" mb="2">
							How you can access your personal information
						</Heading>
						<ListItem>
							You can access some of the personal information that we collect
							about you by logging in to your account. You also have the right
							to make a request to access other personal information we hold
							about you and to request corrections of any errors in that data.
							You can also close the account you have with Designholt site at
							any time. To make an access or correction request, contact us
							using the contact details at the end of this policy.
						</ListItem>
						<br />
						<Heading as="h4" size="lg" mb="2">
							Cookies and web analytics
						</Heading>
						<ListItem>
							For more information about how we use cookies, web beacons and
							similar technologies see our{' '}
							<NextLink href="/cookies" passHref>
								<Link color="purple.600">cookie policy</Link>
							</NextLink>{' '}
							and for more general information on cookies, see{' '}
							<NextLink href="https://www.allaboutcookies.org/" passHref>
								<Link color="purple.600" target="_blank">
									https://www.allaboutcookies.org.
								</Link>
							</NextLink>
						</ListItem>
						<ListItem>
							When you visit our site, there&apos;s certain information
							that&apos;s recorded which is generally anonymous information and
							does not reveal your identity. If you&apos;re logged into your
							account some of this information could be associated with your
							account. We&apos;re talking about the following kinds of details:
							<OrderedList styleType="lower-alpha" my="1">
								<ListItem>
									your IP address or proxy server IP address&apos;s
								</ListItem>
								<ListItem>the domain name you requested;</ListItem>
								<ListItem>
									the name of your internet service provider is sometimes
									captured depending on the configuration of your ISP
									connection;
								</ListItem>
								<ListItem>
									the date and time of your visit to the website;
								</ListItem>
								<ListItem>the length of your session;</ListItem>
								<ListItem>the pages which you have accessed;</ListItem>
								<ListItem>
									the number of times you access our site within any month;
								</ListItem>
								<ListItem>
									the file URL you look at and information relating to it;
								</ListItem>
								<ListItem>the website which referred you to our site;</ListItem>
								<ListItem>
									the operating system which your computer uses; and
								</ListItem>
								<ListItem>
									the technical capabilities of your web browser.
								</ListItem>
							</OrderedList>
						</ListItem>
						<ListItem>
							Occasionally, we will use third party advertising companies to
							serve ads based on prior visits to our site. For example, if you
							visit our site, you may later see an add for our products and
							services when you visit a different site. Read more about your
							options in our{' '}
							<NextLink href="/cookies" passHref>
								<Link color="purple.600">cookie policy</Link>
							</NextLink>
							.
						</ListItem>
						<br />
						<Heading as="h4" size="lg" mb="2">
							Information about children
						</Heading>
						<ListItem>
							Designholt.com is not suitable for children under the age of 16
							years, so if you are under 16 we ask that you do not use our site
							or give us your personal information (if you are a young tech wiz,
							please direct your nearest responsible adult to use the site for
							you!). If you are from 16 to 18 years, you can browse the site but
							you&apos;ll need the supervision of a parent or guardian to become
							a registered user. It&apos;s the responsibility of parents or
							guardians to monitor their children&apos;s use of our site.
						</ListItem>
						<br />
						<Heading as="h4" size="lg" mb="2">
							Information you make public or give to others
						</Heading>
						<ListItem>
							If you make your personal information available to other people,
							we can&apos;t control or accept responsibility for the way they
							will use or manage that data. There are lots of ways that you can
							find yourself providing information to other people, like when you
							share information via social media, or make contact with another
							user (such as a third party seller) whether via our site or
							directly via email. Before making your information publicly
							available or giving your information to anyone else, think
							carefully. If giving information to another user via our site, ask
							them how they will handle your information. If you&apos;re sharing
							information via another website, check the privacy policy for that
							site to understand its information management practices as this
							privacy policy will not apply.
						</ListItem>
						<br />
						<Heading as="h4" size="lg" mb="2">
							How long we keep your personal information
						</Heading>
						<ListItem>
							We retain your personal information for as long as is necessary to
							provide the services to you and others, and to comply with our
							legal obligations. If you no longer want us to use your personal
							information or to provide you with the Designholt services, you
							can request that we erase your personal information and close your
							Designholt account. Please note that if you request the erasure of
							your personal information we will retain information from deleted
							accounts as necessary for our legitimate business interests, to
							comply with the law, prevent fraud, collect fees, resolve
							disputes, troubleshoot problems, assist with investigations or
							requests by government, a court of law, or law enforcement
							authorities, enforce the terms of service and take other actions
							permitted by law. The information we retain will be handled in
							accordance with this Privacy Policy.
						</ListItem>
						<br />
						<Heading as="h4" size="lg" mb="2">
							When we need to update this policy
						</Heading>
						<ListItem>
							We will need to change this policy from time to time in order to
							make sure it stays up to date with the latest legal requirements
							and any changes to our privacy management practices.
						</ListItem>
						<ListItem>
							When we do change the policy, we&apos;ll make sure to notify you
							about such changes, where required. A copy of the latest version
							of this policy will always be available on this page.
						</ListItem>
						<br />
						<Heading as="h4" size="lg" mb="2">
							How you can contact us
						</Heading>
						<ListItem>
							If you have any questions about our privacy practices or the way
							in which we have been managing your personal information, please
							contact our privacy champion via{' '}
							<NextLink href="mailto:contact@desingholt.com" passHref>
								<Link color="purple.600">contact@desingholt.com</Link>
							</NextLink>
							.
						</ListItem>
						<ListItem>
							We&apos;re really glad you made it to the end of the privacy
							policy, because knowing this stuff is the best way to understand
							how your personal information is used and how to best manage it!
						</ListItem>
					</OrderedList>
				</Text>
				<br />
			</Box>
		</Layout>
	);
}
