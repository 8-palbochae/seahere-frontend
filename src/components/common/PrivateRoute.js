// components/PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthenticationStore } from '../../stores/authentication';

const PrivateRoute = () => {
  const { accessToken } = useAuthenticationStore();

  if (!accessToken) {
    // 인증되지 않은 경우 로그인 페이지로 리다이렉트
    return <Navigate to="/login" replace />;
  }

  // 인증된 경우 자식 컴포넌트 렌더링
  return <Outlet />;
};

export default PrivateRoute;
