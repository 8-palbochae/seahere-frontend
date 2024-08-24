// components/PrivateRoute.js
import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthenticationStore } from "../../stores/authentication";
import useFCM from "../../hooks/fcm/useFCM";
import { useToken } from "../../hooks/fcm/TokenContext";
import { postFirebaseToken } from "../../api/firebase/firebaseApi";

const PrivateRoute = () => {
	const { accessToken, refreshToken } = useAuthenticationStore();
	useFCM({ accessToken, refreshToken });
	const { token } = useToken();

	useEffect(() => {
		if (token) {
		
			postFirebaseToken({ token })
				.then((response) => {
					
				})
				.catch((error) => {
					console.error("토큰 전송 실패:", error);
				});
		}
	}, [token]); 

	if (!accessToken && !refreshToken) {
		return <Navigate to="/login" replace />;
	}

	return <Outlet />;
};

export default PrivateRoute;
