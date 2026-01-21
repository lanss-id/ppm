'use client';

import Link from 'next/link';

export default function PlayerHeader() {
    return (
        <div className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-green-600 text-white p-2 rounded-lg">
                            <i className="fas fa-microphone text-xl"></i>
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-gray-800">PPM Audio</h1>
                            <p className="text-xs text-gray-500">Recording Kajian</p>
                        </div>
                    </div>
                    <Link
                        href="/player"
                        className="text-green-600 hover:text-green-700 font-medium"
                    >
                        <i className="fas fa-headphones mr-2"></i>
                        Player
                    </Link>
                </div>
            </div>
        </div>
    );
}
