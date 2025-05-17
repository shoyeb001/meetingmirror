'use client';
import { useAuthStore } from "../../store/useAuthStore";
export default function Dashboard() {
    const user = useAuthStore((state) => state.user);

    if (!user) return <div>Loading...</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
            <p>Email: {user.email}</p>
            <img src={user.photos[0]} alt="Profile" className="w-10 h-10 rounded-full" />
        </div>
    );
}
