import axios from 'axios';

export const getServerSideProps = async (ctx) => {
	const {
		query: { productId, userId },
	} = ctx;

	const { data } = await axios.get(
		`http://localhost:3000/api/download?productId=${productId}&userId=${userId}`
	);

	return data.message
		? {
				props: {
					error: message,
					URL: null,
				},
		  }
		: {
				redirect: {
					destination: data.downloadLink,
					permanent: false,
				},
		  };
};

export default function DownloadPage({ error, URL }) {
	return <h1>{error}</h1>;
}
