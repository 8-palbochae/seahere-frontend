// src/firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
	apiKey: "AIzaSyAiEZI6h_b0KqwyjGYRY6F_VmG2PTJsE54",
	authDomain: "seahere-ce8f4.firebaseapp.com",
	projectId: "seahere-ce8f4",
	storageBucket: "seahere-ce8f4.appspot.com",
	messagingSenderId: "342525093205",
	appId: "1:342525093205:web:f0d9ef75b6e7ba39dfbbdc",
	measurementId: "G-2J9VMQY4M5",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

onMessage(messaging, (payload) => {
	console.log("Message received. ", payload);
	// Customize notification here
	const notificationTitle = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body,
		icon: payload.notification.icon,
	};

	if (Notification.permission === "granted") {
		new Notification(notificationTitle, notificationOptions);
	}
});
export { messaging, getToken, onMessage };
