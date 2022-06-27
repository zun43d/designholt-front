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
					<FormControl isInvalid={errors.title}>
						<FormLabel>Logo Name*</FormLabel>
						<Input
							{...register('title', {
								required: 'You must enter the logo name',
							})}
							placeholder='Enter the exact name you used in the "Logo Template"'
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
							placeholder="Enter a detailed description about the logo template. This description will be visible to the buyer & will also help them to find your logo. So try to include as much details as possible for increasing sells."
							rows="8"
						/>

						<FormErrorMessage>
							{errors.description && errors.description.message}
						</FormErrorMessage>
					</FormControl>

					<br />

					<FormControl id="category" isInvalid={errors.category}>
						<FormLabel>
							Logo category*{' '}
							<Text fontWeight="normal" fontSize="sm" color="gray.400">
								You can choose more than one category if the logo is relevant.
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
								Enter comma seperated tags. Enter relevant tags. Think how
								customer will search for this logo. It will help your logo to
								rank high in search results & eventually increase sells.
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

					<Heading size="lg" mt="5" mb="3">
						Add logo files
					</Heading>

					<FormControl isInvalid={errors.thumbnail_img}>
						<FormLabel>
							3. Thumbnail*
							<Text fontWeight="normal" fontSize="sm" color="gray.400">
								Thumbnail is a small 80x80 px image that includes only the logo
								icon (no text).
							</Text>
						</FormLabel>
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
						<FormLabel>
							2. Presentation Image*
							<Text fontWeight="normal" fontSize="sm" color="gray.400">
								Presentation image is a single image (5 megabte max) that
								includes 2 mockup & 3 preview image accoding to &quot;Designholt
								Presentation Template.&quot;
							</Text>
						</FormLabel>
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
								Ass some words that desrives your presentation. Such as
								Billboard Logo Mockup, Real Estate Logo, Paper Logo Mockup etc.
								Describe elements of the presentation in words. This will help
								your logo to rank higher in the engine.
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
						<FormLabel>
							1. Main Files(s)*
							<Text fontWeight="normal" fontSize="sm" color="gray.400">
								Main files should be zip file that includes Ai & Eps format of
								the Logo Template, Read Me.txt & Information.txt
							</Text>
						</FormLabel>
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

					<FormControl isInvalid={errors.agreement} mt="3" mb="1">
						<Checkbox
							{...register('agreement', {
								required:
									'You must agree with this. Please check the box above.',
							})}
							value="true"
						>
							All images or other elements that are not my own work, have been
							appropiately licensed for use in the presentation or main
							download. Other than these items, this work is entirely my own and
							I have full rights to sell it on Designholt.
						</Checkbox>

						<FormErrorMessage>
							{errors.agreement && errors.agreement.message}
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
