"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../lib/api";

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        api.get("/auth/user")
            .then(res => setUser(res.data))
            .catch(() => router.push("/login"));
    }, []);

    const handleLogout = () => {
        api.get("/auth/logout").then(() => {
            router.push("/login");
        });
    };

    if (!user) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Welcome, {user.displayName} 👋</h1>
            <img src={user.photos?.[0]?.value} alt="avatar" className="rounded-full w-20 h-20" />
            <p>Email: {user.emails?.[0]?.value}</p>

            <button
                onClick={handleLogout}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
                Logout
            </button>
        </div>
    );
}
