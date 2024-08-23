import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserTypeStore = create(persist(
  (set) => ({
    userType: null, 
    companyId: null,
    guestId : null, 
    setUserType: (type) => set({ userType: type }), 
    setCompanyId: (id) => set({ companyId: id }), 
    setGuestId: (id) => set({guestId : id}),
    initializeState: (userType = null, companyId = null, guestId = null) => 
      set({ userType, companyId, guestId }),
  }),
  {
    name: 'user-type-session-storage', 
    getStorage: () => sessionStorage, 
  }
));

export default useUserTypeStore;
