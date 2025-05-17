import React from 'react'

export const SocialButton = ({ className, onClick, children, logo }: { className?: string, onClick: () => void; children: React.ReactNode, logo: string }) => {
    return (
        <button className={`btn bg-white text-black border-[#e5e5e5] ${className}`} onClick={onClick}>
            <img src={logo} alt="logo" className="w-5 h-5 mr-2" />
            {children}
        </button>
    )
}
