import { useRouter } from 'next/router';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/context/AuthUserContext';
import { getAllCategories } from '@/lib/sanityDb';
import VendorPanel from '@/layout/vendorPanel';
import {
	Heading,
	Box,
	Text,
	FormControl,
	CheckboxGroup,
	Grid,
	FormErrorMessage,
	useToast,
} from '@chakra-ui/react';
import {
	Input,
	Button,
	FormLabel,
	Select,
	Checkbox,
	UploadComponent,
} from '@/components/uiComponents';
import { Textarea } from '@/components/uiComponents';

export const getStaticProps = async () => {
	const categories = await getAllCategories();

	return {
		props: {
			categories,
		},
	};
};

export default function Upload({ categories }) {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		watch,
		reset,
	} = useForm();
	const { authUser } = useAuth();
	const toast = useToast();
	const router = useRouter();

	const thumbnail_img_w = watch('thumbnail_img', '');
	const presentation_img_w = watch('presentation_img', '');
	const main_file_w = watch('main_file', '');

	const toastIdRef = useRef();
	function addToast() {
		toastIdRef.current = toast({
			description: 'Uploading...',
			duration: 9000000,
		});
	}
	function closeToast() {
		if (toastIdRef.current) {
			toast.close(toastIdRef.current);
		}
	}

	const handleUpload = async (data) => {
		addToast();
		// console.log(data);
		const { presentation_img, thumbnail_img, main_file, ...rest } = data;

		const formData = new FormData();

		const newData = {
			presentation_img: presentation_img[0],
			thumbnail_img: thumbnail_img[0],
			main_file: main_file[0],
			...rest,
		};

		for (const key in newData) {
			formData.append(key, newData[key]);
		}

		await fetch(`/api/seller/${authUser.uid}/uploadLogo`, {
			method: 'POST',
			body: formData,
			headers: {
				api_key: process.env.NEXT_PUBLIC_API_ROUTE_KEY,
			},
		}).then(async (res) => {
			closeToast();
			const resMsg = await res.json();

			if (res.status === 201) {
				toast({
					title: 'Logo Uploaded!',
					description: resMsg.message,
					status: 'success',
					duration: '5000',
					isClosable: true,
				});
				reset();
				return router.push('/seller/dashboard/portfolio');
			}

			toast({
				title: `Error ${res.status}`,
				description: resMsg.message,
				status: 'error',
				duration: '90000',
				isClosable: true,
			});
		});
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
			<Box maxW="container.md" my="10" mx="auto">
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
							<Grid templateColumns="repeat(4, 1fr)" gap={2}>
								{categories.map((category) => (
									<Checkbox
										key={category._id}
										{...register('category', {
											required: 'You must select a category',
										})}
										value={category._id}
									>
										{category.categoryName}
									</Checkbox>
								))}
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
						<Textarea
							{...register('description')}
							placeholder="Enter a description about the logo"
							rows="8"
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
								validate: (value) => {
									const isOk = value[0].size <= 5242880;
									if (!isOk) {
										return 'Maximum file size is 5MB.';
									}
									return true;
								},
							})}
							accept=".jpg"
							watchFile={thumbnail_img_w}
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
								validate: (value) => {
									const isOk = value[0].size <= 5242880;
									if (!isOk) {
										return 'Maximum file size is 5MB.';
									}
									return true;
								},
							})}
							accept=".jpg"
							watchFile={presentation_img_w}
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
								validate: (value) => {
									const isOk = value[0].size <= 3145728;
									if (!isOk) {
										return 'Maximum file size is 3MB.';
									}
									return true;
								},
							})}
							accept=".zip"
							watchFile={main_file_w}
						>
							Choose logo zip file
						</UploadComponent>{' '}
						<FormErrorMessage>
							{errors.main_file && errors.main_file.message}
						</FormErrorMessage>
					</FormControl>
					<br />
					<Button
						isLoading={isSubmitting}
						type="submit"
						colorScheme="purple"
						size="lg"
						w="full"
					>
						Submit
					</Button>
				</Box>
			</Box>
		</VendorPanel>
	);
}
