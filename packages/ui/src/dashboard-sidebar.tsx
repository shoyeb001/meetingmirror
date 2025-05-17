import { BarChart2, FileText, Home, LogOut, Settings, User, Users } from 'lucide-react'
import React from 'react'

export const DashboardSidebar = () => {
    return (
        <nav className="p-2">
            <ul className="menu menu-sm gap-2 w-full">
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
        </nav>
    )
}