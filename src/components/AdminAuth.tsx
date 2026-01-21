'use client';

import { useState, useEffect } from 'react';

interface AdminAuthProps {
    children: React.ReactNode;
}

const ADMIN_PIN = '1234'; // PIN default, bisa diganti

export default function AdminAuth({ children }: AdminAuthProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if already authenticated in session
        const auth = sessionStorage.getItem('ppm_admin_auth');
        if (auth === 'true') {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (pin === ADMIN_PIN) {
            setIsAuthenticated(true);
            sessionStorage.setItem('ppm_admin_auth', 'true');
            setError('');
        } else {
            setError('PIN salah. Silakan coba lagi.');
            setPin('');
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <i className="fas fa-spinner fa-spin text-4xl text-green-600"></i>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
                    <div className="text-center mb-8">
                        <div className="inline-block bg-green-100 text-green-600 p-4 rounded-full mb-4">
                            <i className="fas fa-lock text-3xl"></i>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800">Admin Access</h1>
                        <p className="text-gray-600 mt-2">Masukkan PIN untuk mengakses halaman admin</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <input
                                type="password"
                                placeholder="Masukkan PIN"
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                                className="w-full px-4 py-4 text-center text-2xl tracking-widest border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                maxLength={10}
                                autoFocus
                            />
                            {error && (
                                <p className="text-red-500 text-sm text-center mt-2">{error}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 transition"
                        >
                            <i className="fas fa-sign-in-alt mr-2"></i>
                            Masuk
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <a href="/player" className="text-gray-500 hover:text-green-600 text-sm">
                            <i className="fas fa-arrow-left mr-2"></i>
                            Kembali ke Player
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
