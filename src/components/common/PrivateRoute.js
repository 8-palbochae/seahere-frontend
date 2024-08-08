// components/PrivateRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthenticationStore } from "../../stores/authentication";
import useFCM from "../../hooks/fcm/useFCM";

const PrivateRoute = () => {
	const { accessToken, refreshToken } = useAuthenticationStore();
	useFCM({ accessToken, refreshToken });
	if (!accessToken && !refreshToken) {
		return <Navigate to="/login" replace />;
	}

	return <Outlet />;
};

export default PrivateRoute;
