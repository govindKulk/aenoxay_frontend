import { create } from "zustand";

export const useUserStore = create((set) => ({
    user: {
        name: "",
        email: "",
        username: "",
        profilePic: "",
        location: "",

    },
    isLoggedin: localStorage.getItem('token') !== null ? true : false,
    setUser: (user) => set({ user }),
    setIsLoggedin: (isLoggedin) => set({ isLoggedin }),
}))