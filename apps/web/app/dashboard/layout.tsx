'use client';

import { useEffect } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { useState } from 'react';
import { Menu, X, Bell, Search, Settings, User, BarChart2, Users, FileText, Home, LogOut } from 'lucide-react';
import { DashboardSidebar } from "@repo/ui/dashboard-sidebar"
import { ProfileDropdown } from '@repo/ui/profile-dropdown';
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const fetchUser = useAuthStore((state) => state.fetchUser);
    const user = useAuthStore((state) => state.user);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    useEffect(() => {
        fetchUser();
    }, [fetchUser]);
    return (
        <div className='flex w-full h-screen'>
            <div className='w-1/5 h-screen bg-base-200 text-base-content'>
                <div className='py-5 px-4 flex items-center gap-2'>
                    <img src='/logo.svg' alt='Logo' className='w-6 h-6' />
                    <span className='text-lg font-semibold'>MeetingMirror</span>
                </div>
                {/* <nav className="p-4">
                    <ul className="menu menu-sm gap-2">
                        <li className="menu-title">
                            <span>Main Menu</span>
                        </li>
                        <li><a className="active"><Home size={18} /> Dashboard</a></li>
                        <li><a><BarChart2 size={18} /> Analytics</a></li>
                        <li><a><Users size={18} /> Users</a></li>
                        <li><a><FileText size={18} /> Reports</a></li>

                        <li className="menu-title mt-4">
                            <span>Settings</span>
                        </li>
                        <li><a><User size={18} /> Profile</a></li>
                        <li><a><Settings size={18} /> Preferences</a></li>
                        <li><a><LogOut size={18} /> Logout</a></li>
                    </ul>
                </nav> */}
                <DashboardSidebar />
            </div>
            <div className='flex-1 h-screen bg-base-100'>
                <header className="bg-base-100 shadow-md sticky top-0 z-40">
                    <div className="navbar px-4">
                        <div className="navbar-start">
                            <button onClick={toggleSidebar} className="btn btn-square btn-ghost">
                                <Menu size={40} />
                            </button>
                        </div>

                        <div className="navbar-center hidden md:flex">
                            <div className="join">
                                <input type="text" placeholder="Search..." className="input input-bordered join-item" />
                                <button className="btn join-item">
                                    <Search size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="navbar-end gap-6">
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} className="btn btn-ghost btn-circle">
                                    <div className="indicator">
                                        <Bell size={20} />
                                        <span className="badge badge-sm badge-primary indicator-item">3</span>
                                    </div>
                                </div>
                                <div tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <div className="p-2 font-semibold">Notifications</div>
                                    <div className="divider my-0"></div>
                                    <li><a>New user registered</a></li>
                                    <li><a>Report ready to download</a></li>
                                    <li><a>System update available</a></li>
                                </div>
                            </div>
                            <ProfileDropdown photo={user?.photos[0]} name={user?.name!} menu={[{ name: "Profile", path: "/profile", icon: <User size={18} /> }, { name: "Settings", path: "/settings", icon: <Settings size={18} /> }, { name: "Logout", path: "/logout", icon: <LogOut size={18} /> }]} />
                        </div>
                    </div>
                </header>
            </div>
        </div>
    )
}
