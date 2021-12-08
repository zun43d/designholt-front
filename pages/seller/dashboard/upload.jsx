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
	Tags,
} from '@/components/uiComponents';

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
							<Text fontWeight="normal" fontSize="sm" color="gray.300">
								<i>(Multiple category can be selected)</i>
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
						<FormLabel>Tags</FormLabel>
						{/* <Tags /> */}
					</FormControl>
				</Box>
			</Box>
		</VendorPanel>
	);
}
