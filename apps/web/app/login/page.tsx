"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { SocialButton } from "@repo/ui/social-button";
export default function LoginPage() {
    const router = useRouter();
    const handleLogin = () => {
        window.location.href = "http://localhost:8000/auth/google";
    };

    return (
        <div className="h-screen w-full flex items-center bg-base-100">
            <div className="w-[50%] h-full bg-base-200">
                <div className="mt-15 px-15">
                    <div className=" flex gap-2 items-center mb-15" >
                        <Image src="/logo.svg" alt="logo" width={30} height={30} /> <span className="font-bold text-md">MeetingMirror</span>
                    </div>
                    <h2 className="font-semibold text-2xl mt-2">Automate your meeting notes</h2>
                    <p className="text-base-content/50 mt-2">Transcribe, summarize, search, and analyze all your voice conversations.</p>
                    <SocialButton logo={"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Google_Favicon_2025.svg/250px-Google_Favicon_2025.svg.png"} onClick={handleLogin} className="mt-3">Login with Google</SocialButton>
                    <p className="mt-15 text-xs text-base-content/50">By signing up, I agree to Fireflies' Terms of Service, Privacy Policy  and Data Processing Terms. Security is our top priority. Read  about the steps we take to ensure security.</p>
                </div>

            </div>
        </div>
    );
}
