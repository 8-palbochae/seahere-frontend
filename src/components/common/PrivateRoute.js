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
	console.log("token", token);
	useEffect(() => {
		if (token) {
			// FCM 토큰이 존재할 때만 서버에 전송
			postFirebaseToken({ token })
				.then((response) => {
					console.log("토큰 전송 성공:", response);
				})
				.catch((error) => {
					console.error("토큰 전송 실패:", error);
				});
		}
	}, [token]); // firebaseToken이 변경될 때마다 실행

	if (!accessToken && !refreshToken) {
		return <Navigate to="/login" replace />;
	}

	return <Outlet />;
};

export default PrivateRoute;
