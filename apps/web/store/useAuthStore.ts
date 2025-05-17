import { create } from 'zustand';
import api from '../app/lib/api';
type User = {
    name: string;
    email: string;
    photos: string[];
    id: string;
}

type AuthStore = {
    user: User | null;
    setUser: (user: User | null) => void;
    fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    fetchUser: async () => {
        try {
            // const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_URL}/me`, {
            //     credentials: 'include',
            // });
            const res = await api.get("auth/user");
            console.log(res);
            set({ user: res.data.data});
        } catch (err) {
            set({ user: null });
        }
    },
}));