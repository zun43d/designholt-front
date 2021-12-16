import { useForm } from 'react-hook-form';
import VendorPanel from '@/layout/vendorPanel';
import {
	Heading,
	Box,
	Text,
	FormControl,
	CheckboxGroup,
	Grid,
	FormErrorMessage,
} from '@chakra-ui/react';
import {
	Input,
	Button,
	FormLabel,
	Select,
	Checkbox,
	UploadComponent,
} from '@/components/uiComponents';

export default function Upload() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		watch,
	} = useForm();

	const thumbnail_img = watch('thumbnail_img', '');
	const presentation_img = watch('presentation_img', '');
	const main_file = watch('main_file', '');

	const handleUpload = (data) => {
		console.log(data);
	};

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
				<Box as="form" onSubmit={handleSubmit(handleUpload)}>
					<FormControl id="category" isInvalid={errors.category}>
						<FormLabel>
							Logo category*{' '}
							<Text fontWeight="normal" fontSize="sm" color="gray.400">
								<i>(Multiple categories can be selected)</i>
							</Text>
						</FormLabel>
						<CheckboxGroup colorScheme="purple">
							<Grid templateColumns="repeat(5, 1fr)" gap={2}>
								<Checkbox
									{...register('category', {
										required: 'You must select a category',
									})}
									value="animal"
								>
									Animal
								</Checkbox>
								<Checkbox
									{...register('category', {
										required: 'You must select a category',
									})}
									value="beauty"
								>
									Beauty
								</Checkbox>
								<Checkbox
									{...register('category', {
										required: 'You must select a category',
									})}
									value="realEstate"
								>
									Real Estate
								</Checkbox>
								<Checkbox
									{...register('category', {
										required: 'You must select a category',
									})}
									value="abstruct"
								>
									Abstruct
								</Checkbox>
								<Checkbox
									{...register('category', {
										required: 'You must select a category',
									})}
									value="letters"
								>
									Letters
								</Checkbox>
								<Checkbox
									{...register('category', {
										required: 'You must select a category',
									})}
									value="wellness"
								>
									Wellness
								</Checkbox>
								<Checkbox
									{...register('category', {
										required: 'You must select a category',
									})}
									value="nature"
								>
									Nature
								</Checkbox>
								<Checkbox
									{...register('category', {
										required: 'You must select a category',
									})}
									value="symbol"
								>
									Symbol
								</Checkbox>
								<Checkbox
									{...register('category', {
										required: 'You must select a category',
									})}
									value="pet"
								>
									Pet
								</Checkbox>
							</Grid>
						</CheckboxGroup>
						<Text color="red.500" fontSize="sm" mt="2">
							{errors.category && errors.category.message}
						</Text>
					</FormControl>
					<br />
					<FormControl isInvalid={errors.tags}>
						<FormLabel>
							Tags*
							<Text fontWeight="normal" fontSize="sm" color="gray.400">
								<i>
									(Enter comma seperated tags.Tags are generally used for search
									query.)
								</i>
							</Text>
						</FormLabel>
						<Input
							{...register('tags', {
								required: 'You must enter at least one tag.',
							})}
							placeholder="(eg. animal, logo, yellow, ...)"
							_placeholder={{ fontStyle: 'italic' }}
						/>

						<FormErrorMessage>
							{errors.tags && errors.tags.message}
						</FormErrorMessage>
					</FormControl>
					<br />
					<FormControl isInvalid={errors.title}>
						<FormLabel>Title*</FormLabel>
						<Input
							{...register('title', { required: 'Enter a logo title' })}
							placeholder="Enter logo title"
						/>

						<FormErrorMessage>
							{errors.title && errors.title.message}
						</FormErrorMessage>
					</FormControl>
					<br />
					<FormControl isInvalid={errors.description}>
						<FormLabel>Description</FormLabel>
						<Input
							{...register('description')}
							placeholder="Enter a description about the logo"
						/>

						<FormErrorMessage>
							{errors.description && errors.description.message}
						</FormErrorMessage>
					</FormControl>
					<br />
					<FormControl isInvalid={errors.thumbnail_img}>
						<FormLabel>Thumbnail preview of your logo*</FormLabel>
						<UploadComponent
							{...register('thumbnail_img', {
								required: 'You must select a thumbnail image',
							})}
							accept=".jpg"
							watchFile={thumbnail_img}
						>
							Choose an image
						</UploadComponent>

						<FormErrorMessage>
							{errors.thumbnail_img && errors.thumbnail_img.message}
						</FormErrorMessage>

						<Box mt="3">
							<li>Only jpg format is supported.</li>
							<li>This image is basically a thumbnail of your logo</li>
						</Box>
					</FormControl>
					<br />
					<FormControl isInvalid={errors.presentation_img}>
						<FormLabel>Presentation for the logo*</FormLabel>
						<UploadComponent
							{...register('presentation_img', {
								required: 'You must enter an image for presentation',
							})}
							accept=".jpg"
							watchFile={presentation_img}
						>
							Choose an image
						</UploadComponent>

						<FormErrorMessage>
							{errors.presentation_img && errors.presentation_img.message}
						</FormErrorMessage>

						<Box mt="3">
							<li>Only jpg format is supported.</li>
							<li>Presentation will represent your logo to the buyer.</li>
						</Box>
					</FormControl>
					<br />
					<FormControl isInvalid={errors.presentationAltText}>
						<FormLabel>
							Alternative text for presentation image
							<Text fontWeight="normal" fontSize="sm" color="gray.400">
								<i>
									(Carefully enter the text, this is for improving the logo
									search results)
								</i>
							</Text>
						</FormLabel>
						<Input
							{...register('presentationAltText')}
							placeholder="Presentation ALT text"
						/>

						<FormErrorMessage>
							{errors.presentationAltText && errors.presentationAltText.message}
						</FormErrorMessage>
					</FormControl>
					<br />
					<FormControl isInvalid={errors.main_file}>
						<FormLabel>Upload main zip file for the logo*</FormLabel>
						<UploadComponent
							{...register('main_file', {
								required: 'You forgot to upload a file',
							})}
							accept=".zip"
							watchFile={main_file}
						>
							Choose logo zip file
						</UploadComponent>{' '}
						<FormErrorMessage>
							{errors.main_file && errors.main_file.message}
						</FormErrorMessage>
					</FormControl>
					<br />
					<Button type="submit" colorScheme="purple" size="lg" w="full">
						Submit
					</Button>
				</Box>
			</Box>
		</VendorPanel>
	);
}
