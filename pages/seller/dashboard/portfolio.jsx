import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthUserContext';
import VendorPanel from '@/layout/vendorPanel';
import {
	Heading,
	Box,
	Text,
	Avatar,
	Tabs,
	TabList,
	Tab,
	TabPanels,
	TabPanel,
	Grid,
	Select,
	AvatarBadge,
	useToast,
} from '@chakra-ui/react';
import { Uploader, Link } from '@/components/uiComponents';
import { Button } from '@/components/uiComponents';

export default function Portfolio() {
	const [portfolioItems, setPortfolioItems] = useState([]);
	const [uploading, setUploading] = useState(false);
	const { authUser } = useAuth();
	const toast = useToast();
	const { reload } = useRouter();

	const uploadToServer = async (e) => {
		if (e.target.files && e.target.files[0]) {
			setUploading(true);
			const image = e.target.files[0];
			const body = new FormData();
			body.append('file', image);
			const response = await fetch(`/api/seller/${authUser.uid}/avatar`, {
				method: 'POST',
				body,
			}).then((res) => {
				setUploading(false);
				toast({
					title: 'Profile picture updated',
					status: 'success',
					duration: 2000,
					isClosable: false,
				});
				reload();
			});
		}
	};

	useEffect(() => {
		if (authUser) {
			fetch(`/api/seller/${authUser.uid}`)
				.then((res) => res.json())
				.then((res) => {
					const items = res.data;
					setPortfolioItems(items);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [authUser]);

	return (
		<VendorPanel maxW="container.lg" my="10" mx="auto">
			<Box
				display="flex"
				flexDir="column"
				justifyContent="flex-start"
				alignItems="center"
				my="5"
			>
				<Avatar
					bgColor={uploading ? 'gray.100' : ''}
					src={uploading ? '/loading.gif' : authUser?.photoUrl}
					size="2xl"
				>
					<label>
						<AvatarBadge
							boxSize="1em"
							border="8px"
							bgColor="gray.200"
							bgImage="url('/camera-ico.png')"
							bgPos="center"
							bgRepeat="no-repeat"
							cursor="pointer"
							_hover={{
								bgColor: 'gray.300',
							}}
						/>
						<input
							type="file"
							accept=".jpg, .png"
							style={{ display: 'none' }}
							onChange={uploadToServer}
						/>
					</label>
				</Avatar>
				<Heading my="3">{authUser?.name}</Heading>
			</Box>
			<Tabs variant="enclosed" isLazy>
				<TabList>
					<Tab>Portfolio</Tab>
				</TabList>
				<TabPanels>
					{/* initially mounted */}
					<TabPanel>
						<Box
							mt="2"
							mb="4"
							display="flex"
							justifyContent="space-between"
							alignItems="center"
						>
							<Text fontWeight="semibold" fontSize="lg">
								Showing All Logos
							</Text>
							<Box display="flex" alignItems="center">
								<Text pr="2">Filtered By</Text>
								<Select variant="filled" size="sm" maxW="36">
									<option value="approved" selected>
										Approved
									</option>
									<option value="pending">Pending Approval</option>
									<option value="option3">All Logo</option>
								</Select>
							</Box>
						</Box>
						<Grid templateColumns="repeat(6, 1fr)" gap={2}>
							{portfolioItems.map((item) => (
								<Box
									key={item._id}
									bg="black"
									w="full"
									h="full"
									borderRadius="md"
								>
									<Image
										src={item.productImage.thumbnail || ''}
										placeholder="empty"
										width="200"
										height="200"
										alt={item.productImage.imageAlt}
										layout="responsive"
										objectFit="cover"
									/>
								</Box>
							))}
						</Grid>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</VendorPanel>
	);
}
