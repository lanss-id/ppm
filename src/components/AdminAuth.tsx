'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Loader2, ShieldX } from 'lucide-react';
import Link from 'next/link';

interface AdminAuthProps {
    children: React.ReactNode;
}

export default function AdminAuth({ children }: AdminAuthProps) {
    const router = useRouter();
    const { user, profile, loading, profileLoading, canAccessAdmin, signOut } = useAuth();

    // Combined loading state - wait for BOTH auth and profile
    const isInitializing = loading || profileLoading;

    // Redirect to login if not authenticated (only after loading complete)
    useEffect(() => {
        if (!isInitializing && !user) {
            router.push('/auth/login');
        }
    }, [isInitializing, user, router]);

    // Show loading state while auth OR profile is loading
    if (isInitializing) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 text-emerald-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Memuat data...</p>
                </div>
            </div>
        );
    }

    // Not logged in - redirect handled above
    if (!user) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 text-emerald-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Mengalihkan ke login...</p>
                </div>
            </div>
        );
    }

    // Logged in but no admin/guru access
    if (!canAccessAdmin) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
                    <div className="inline-block bg-red-100 text-red-600 p-4 rounded-full mb-4">
                        <ShieldX className="w-8 h-8" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Akses Ditolak</h1>
                    <p className="text-gray-600 mb-6">
                        Akun Anda ({profile?.email}) tidak memiliki akses ke halaman admin.
                        Hanya akun dengan role <strong>Admin</strong> atau <strong>Guru</strong> yang dapat mengakses.
                    </p>
                    <div className="space-y-3">
                        <p className="text-sm text-gray-500">
                            Role Anda saat ini: <span className="font-semibold capitalize">{profile?.role || 'Guest'}</span>
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={signOut}
                                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition"
                            >
                                Logout
                            </button>
                            <Link
                                href="/"
                                className="flex-1 px-4 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition text-center"
                            >
                                Ke Beranda
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Has access - render children
    return <>{children}</>;
}
