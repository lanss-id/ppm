'use client';

import { useState } from 'react';
import { Bell, Search, Menu } from 'lucide-react';

interface AdminHeaderProps {
    title: string;
    subtitle?: string;
}

export function AdminHeader({ title, subtitle }: AdminHeaderProps) {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
                        <Menu size={20} className="text-gray-600" />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">{title}</h1>
                        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {/* Search */}
                    <div className="relative hidden md:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cari..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent w-64"
                        />
                    </div>

                    {/* Notifications */}
                    <button className="relative p-2 hover:bg-gray-100 rounded-xl transition">
                        <Bell size={20} className="text-gray-600" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                    </button>

                    {/* Profile */}
                    <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white font-semibold text-sm">
                            A
                        </div>
                        <div className="hidden sm:block">
                            <p className="text-sm font-medium text-gray-800">Admin</p>
                            <p className="text-xs text-gray-500">Super Admin</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
