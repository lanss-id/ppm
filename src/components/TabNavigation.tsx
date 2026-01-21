'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TabNavigation() {
    const pathname = usePathname();

    const tabs = [
        { id: 'admin', label: 'Admin - Upload Recording', href: '/admin', icon: 'fa-upload' },
        { id: 'player', label: 'Player - Dengar Recording', href: '/player', icon: 'fa-play-circle' },
    ];

    return (
        <div className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex space-x-8 py-4">
                    {tabs.map((tab) => {
                        const isActive = pathname === tab.href;
                        return (
                            <Link
                                key={tab.id}
                                href={tab.href}
                                className={`pb-2 font-medium transition-colors ${isActive
                                        ? 'text-green-600 border-b-2 border-green-600 font-semibold'
                                        : 'text-gray-600 hover:text-green-600'
                                    }`}
                            >
                                <i className={`fas ${tab.icon} mr-2`}></i>
                                {tab.label}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
