'use client';

import { useEffect } from 'react';
import { useAuthStore } from '../../store/useAuthStore';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const fetchUser = useAuthStore((state) => state.fetchUser);
    useEffect(() => {
        fetchUser();
    }, [fetchUser]);
    return <>{children}</>;
}
