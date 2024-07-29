import { create } from 'zustand';

const useUserTypeStore = create((set) => ({
  userType: null, // 초기 상태
  setUserType: (type) => set({ userType: type }), // 상태 업데이트 함수
}));

export default useUserTypeStore;