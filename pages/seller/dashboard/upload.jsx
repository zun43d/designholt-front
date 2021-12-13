import VendorPanel from '@/layout/vendorPanel';
import {
	Heading,
	Box,
	Text,
	FormControl,
	CheckboxGroup,
	Grid,
} from '@chakra-ui/react';
import {
	Input,
	Button,
	FormLabel,
	Select,
	Checkbox,
	Uploader,
} from '@/components/uiComponents';
import Dropzone from 'react-dropzone';

export default function Upload() {
	return (
		<VendorPanel>
			<Heading
				textAlign="center"
				pt="16"
				pb="20"
				bg="gray.50"
				borderBottom="1px"
				borderBottomColor="gray.200"
			>
				Upload Center
			</Heading>
			<Box maxW="container.sm" my="10" mx="auto">
				<Heading size="md">
					Fill up everything carefully to get your logo approved.
				</Heading>
				<Text py="1" color="gray.600">
					After submitting you wont&apos;t get any chnace to modify. So fill
					everything up keeping that in mind.
				</Text>
				<br />
				<Box as="form">
					<FormControl>
						<FormLabel>
							Logo category{' '}
							<Text fontWeight="normal" fontSize="sm" color="gray.400">
								<i>(Multiple categories can be selected)</i>
							</Text>
						</FormLabel>
						<CheckboxGroup colorScheme="purple">
							<Grid templateColumns="repeat(5, 1fr)" gap={2}>
								<Checkbox vallue="animal">Animal</Checkbox>
								<Checkbox vallue="beauty">Beauty</Checkbox>
								<Checkbox vallue="realEstate">Real Estate</Checkbox>
								<Checkbox vallue="abstruct">Abstruct</Checkbox>
								<Checkbox vallue="letters">Letters</Checkbox>
								<Checkbox vallue="wellness">Wellness</Checkbox>
								<Checkbox vallue="nature">Nature</Checkbox>
								<Checkbox vallue="symbol">Symbol</Checkbox>
								<Checkbox vallue="pet">Pet</Checkbox>
							</Grid>
						</CheckboxGroup>
					</FormControl>
					<br />
					<FormControl>
						<FormLabel>
							Tags
							<Text fontWeight="normal" fontSize="sm" color="gray.400">
								<i>
									(Enter comma seperated tags.Tags are generally used for search
									query.)
								</i>
							</Text>
						</FormLabel>
						<Input
							placeholder="(eg. animal, logo, yellow, ...)"
							_placeholder={{ fontStyle: 'italic' }}
						/>
					</FormControl>
					<br />
					<FormControl>
						<FormLabel>Title</FormLabel>
						<Input placeholder="Enter logo title" />
					</FormControl>
					<br />
					<FormControl>
						<FormLabel>Description</FormLabel>
						<Input placeholder="Enter a description about the logo" />
					</FormControl>
					<br />
					<FormControl>
						<FormLabel>Thumbnail preview of your logo</FormLabel>
						<Uploader>
							<Button>Choose File</Button>
						</Uploader>

						<Box mt="3">
							<li>Only jpg format is supported.</li>
							<li>This image is basically a thumbnail of your logo</li>
						</Box>
					</FormControl>
					<br />
					<FormControl>
						<FormLabel>Presentation for the logo</FormLabel>
						<Uploader>
							<Button>Choose File</Button>
						</Uploader>
						<Box mt="3">
							<li>Only jpg format is supported.</li>
							<li>Presentation will represent your logo to the buyer.</li>
						</Box>
					</FormControl>
					<br />
					<FormControl>
						<FormLabel>
							Alternative text for presentation image
							<Text fontWeight="normal" fontSize="sm" color="gray.400">
								<i>
									(Carefully enter the text, this is for improving the logo
									search results)
								</i>
							</Text>
						</FormLabel>
						<Input placeholder="Presentation ALT text" />
					</FormControl>
					<br />
					<FormControl>
						<FormLabel>Upload main zip file for the logo</FormLabel>
						<Uploader>
							<Button>Choose File</Button>
						</Uploader>{' '}
						{/* Gotta make the uploader reusable and all format supportable */}
					</FormControl>
					<br />
					<Button colorScheme="purple" size="lg" w="full">
						Submit
					</Button>
				</Box>
			</Box>
		</VendorPanel>
	);
}
