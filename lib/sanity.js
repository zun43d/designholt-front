import sanityClient from '@sanity/client';
export const client = sanityClient({
	projectId: 'epipoppz',
	dataset: 'production',
	apiVersion: '2021-11-18',
	token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN, // or leave blank for unauthenticated usage
	useCdn: false, // `false` if you want to ensure fresh data
});
