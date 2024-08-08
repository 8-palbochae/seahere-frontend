import { useEffect } from "react";
import { messaging, getToken } from "../../firebase";
import { useToken } from "./TokenContext";

const useFCM = ({ accessToken, refreshToken }) => {
	const { setToken } = useToken();

	useEffect(() => {
		if ("serviceWorker" in navigator) {
			navigator.serviceWorker
				.register(
					"/firebase-messaging-sw.js?timestamp=" +
						new Date().getTime()
				)
				.then((registration) => {
					console.log(
						"Service Worker registered with scope:",
						registration.scope
					);
					if (accessToken || refreshToken) {
						getToken(messaging, {
							vapidKey:
								"BMdVMnAGVkYaOyWrKqvE2vCtn3KYgw2eZEcjn6xMXOVbJ8_bqDyrWTeN7SMO7H-b1zuUWcfA75iNtyKOhxnR1I0",
							serviceWorkerRegistration: registration,
						})
							.then((currentToken) => {
								if (currentToken) {
									console.log("FCM Token:", currentToken);
									setToken(currentToken);
								} else {
									console.warn(
										"No registration token available. Request permission to generate one."
									);
								}
							})
							.catch((err) => {
								console.error(
									"An error occurred while retrieving token. ",
									err
								);
							});
					}
				})
				.catch((err) => {
					console.error("Service Worker registration failed: ", err);
				});
		}
	}, [setToken, accessToken, refreshToken]);
};

export default useFCM;
