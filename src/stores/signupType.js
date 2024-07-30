import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserTypeStore = create(persist(
  (set) => ({
    userType: null, 
    companyId: null,
    guestId : null, 
    setUserType: (type) => set({ userType: type }), // 상태 업데이트 함수
    setCompanyId: (id) => set({ companyId: id }), 
    setGuestId: (id) => set({guestId : id}),
    initializeState: (userType = null, companyId = null, guestId = null) => 
      set({ userType, companyId, guestId }),
  }),
  {
    name: 'user-type-session-storage', // 세션 저장소에 저장될 키 이름
    getStorage: () => sessionStorage, // 세션 저장소를 사용
  }
));

export default useUserTypeStore;
