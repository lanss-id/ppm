'use client';

import { AuthProvider } from '@/context/AuthContext';
import { AdminSidebar } from '@/components/admin/Sidebar';
import AdminAuth from '@/components/AdminAuth';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthProvider>
            <AdminAuth>
                <div className="flex h-screen bg-gray-100">
                    <AdminSidebar />
                    <main className="flex-1 overflow-y-auto">
                        {children}
                    </main>
                </div>
            </AdminAuth>
        </AuthProvider>
    );
}
