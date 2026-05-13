import { create } from "zustand"

// manage autheticated user and auth state
export const useAuthStore = create((set) => ({
    authState: false,
    user: null,
    setAuthState: (authState) => set(() => ({ authState })),
    setUser: (user) => set(() => ({ user })),
}))