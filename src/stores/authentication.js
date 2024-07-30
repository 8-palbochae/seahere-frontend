import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const authentication = create(persist(
  (set) => ({
    accessToken: null, 
    refreshToken: null,
    setAccessToekn: (token) => set({ accessToken: token }), 
    setRefreshToken: (token) => set({ refreshToken: token }), 
  }),
  {
    name: 'jwt-storage', 
    getStorage: () => localStorage, 
  }
));

const getCookie = (name) => {
  const cookieString = document.cookie;
  const cookies = cookieString.split('; ').reduce((acc, cookie) => {
    const [key, value] = cookie.split('=');
    acc[key] = value;
    return acc;
  }, {});
  return cookies[name];
};

const deleteCookie = (name) => {
  document.cookie = `${name}=; Max-Age=0; path=/;`;
};

export {authentication,getCookie,deleteCookie};
