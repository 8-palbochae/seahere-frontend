import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { messaging, getToken } from "./firebase";
const queryClient = new QueryClient();

if ("serviceWorker" in navigator) {
	navigator.serviceWorker
		.register("/firebase-messaging-sw.js?timestamp=" + new Date().getTime())
		.then((registration) => {
			console.log(
				"Service Worker registered with scope:",
				registration.scope
			);

			// Get the token
			getToken(messaging, {
				vapidKey:
					"BMdVMnAGVkYaOyWrKqvE2vCtn3KYgw2eZEcjn6xMXOVbJ8_bqDyrWTeN7SMO7H-b1zuUWcfA75iNtyKOhxnR1I0",
				serviceWorkerRegistration: registration,
			})
				.then((currentToken) => {
					if (currentToken) {
						console.log("FCM Token:", currentToken);
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
		})
		.catch((err) => {
			console.error("Service Worker registration failed: ", err);
		});
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	</React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
