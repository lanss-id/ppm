'use client';

import Link from 'next/link';

export default function AdminHeader() {
    return (
        <div className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-green-600 text-white p-2 rounded-lg">
                            <i className="fas fa-cog text-xl"></i>
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-gray-800">PPM Admin</h1>
                            <p className="text-xs text-gray-500">Kelola Recording</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/player"
                            className="text-gray-600 hover:text-green-600 font-medium"
                        >
                            <i className="fas fa-headphones mr-2"></i>
                            Player
                        </Link>
                        <Link
                            href="/admin"
                            className="text-green-600 font-semibold"
                        >
                            <i className="fas fa-upload mr-2"></i>
                            Upload
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
