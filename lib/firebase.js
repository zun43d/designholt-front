import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

if (!getApps().length) {
	const app = initializeApp({
		apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
		authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
		databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
		projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
		appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
		measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
	});
	getAnalytics(app);
}

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const db = getFirestore();

export { db };
