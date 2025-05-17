"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "../lib/api";
import Image from "next/image";
import { SocialButton } from "@repo/ui/social-button";
export default function LoginPage() {
    const router = useRouter();
    useEffect(() => {
        // Check if user already logged in
        api.get("/auth/user")
            .then(res => {
                if (res.data) router.push("/dashboard");
            })
            .catch(() => { });
    }, []);

    const handleLogin = () => {
        window.location.href = "http://localhost:4000/auth/google";
    };

    return (
        <div className="h-screen w-full flex items-center bg-base-100">
            <div className="w-[50%] h-full bg-base-200">
                <div className="mt-15 px-15">
                    <div className=" flex gap-2 items-center" >
                        <Image src="/logo.svg" alt="logo" width={30} height={30} /> <span className="font-bold text-md">MeetingMirror</span>
                    </div>
                    <h2 className="font-semibold text-2xl mt-2">Automate your meeting notes</h2>
                    <p className="text-base-content/50 mt-2">Transcribe, summarize, search, and analyze all your voice conversations.</p>
                    <SocialButton />
                </div>

            </div>
        </div>
    );
}
