import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserTypeStore = create(persist(
  (set) => ({
    userType: null, // 초기 상태
    companyId: null, // 초기 상태
    setUserType: (type) => set({ userType: type }), // 상태 업데이트 함수
    setCompanyId: (id) => set({ companyId: id }), // 회사 ID 상태 업데이트 함수
  }),
  {
    name: 'user-type-session-storage', // 세션 저장소에 저장될 키 이름
    getStorage: () => sessionStorage, // 세션 저장소를 사용
  }
));

export default useUserTypeStore;
