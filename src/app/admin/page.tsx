'use client';

import { useState, useEffect } from 'react';
import AdminAuth from '@/components/AdminAuth';
import AdminHeader from '@/components/AdminHeader';
import RecordingUpload from '@/components/RecordingUpload';
import RecordingList from '@/components/RecordingList';
import { Recording, formatDate } from '@/lib/types';

export default function AdminPage() {
    const [activeRecording, setActiveRecording] = useState<Recording | null>(null);
    const [archivedRecordings, setArchivedRecordings] = useState<Recording[]>([]);
    const [showArchive, setShowArchive] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchRecordings = async () => {
        try {
            const response = await fetch('/api/recordings');
            const data = await response.json();

            // Check if data is array (API might return error object)
            if (!Array.isArray(data)) {
                console.error('API error:', data);
                setActiveRecording(null);
                setArchivedRecordings([]);
                return;
            }

            const active = data.find((r: Recording) => r.is_active);
            const archived = data.filter((r: Recording) => !r.is_active);

            setActiveRecording(active || null);
            setArchivedRecordings(archived);
        } catch (error) {
            console.error('Failed to fetch recordings:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecordings();
    }, []);

    const handleRestore = async (id: string) => {
        try {
            await fetch(`/api/recordings/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ restore: true }),
            });
            fetchRecordings();
        } catch (error) {
            console.error('Failed to restore:', error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await fetch(`/api/recordings/${id}`, { method: 'DELETE' });
            fetchRecordings();
        } catch (error) {
            console.error('Failed to delete:', error);
        }
    };

    return (
        <AdminAuth>
            <div className="min-h-screen bg-gray-100">
                <AdminHeader />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Upload Recording Kajian</h1>
                        <p className="text-gray-600">
                            Upload file MP3 recording kajian terbaru. Recording lama akan otomatis diarsipkan.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Upload Section */}
                        <div className="lg:col-span-2">
                            <RecordingUpload onUploadSuccess={fetchRecordings} />
                        </div>

                        {/* Current Active Recording */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h2 className="text-lg font-bold text-gray-800 mb-4">Recording Aktif Saat Ini</h2>

                                {loading ? (
                                    <div className="text-center py-8">
                                        <i className="fas fa-spinner fa-spin text-3xl text-gray-400"></i>
                                    </div>
                                ) : activeRecording ? (
                                    <div>
                                        <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-xl p-6 text-white mb-4">
                                            <div className="flex items-center justify-center mb-4">
                                                <i className="fas fa-microphone text-4xl"></i>
                                            </div>
                                            <h3 className="font-semibold text-center mb-2">{activeRecording.title}</h3>
                                            <p className="text-sm text-center opacity-90 mb-1">{activeRecording.speaker}</p>
                                            <p className="text-xs text-center opacity-75">{formatDate(activeRecording.date)}</p>
                                        </div>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Durasi:</span>
                                                <span className="font-semibold">{activeRecording.duration || '0:00'}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Didengar:</span>
                                                <span className="font-semibold">{activeRecording.play_count} kali</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Status:</span>
                                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">
                                                    Active
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        <i className="fas fa-music text-4xl mb-3 opacity-50"></i>
                                        <p>Belum ada recording aktif</p>
                                    </div>
                                )}

                                <button
                                    onClick={() => setShowArchive(!showArchive)}
                                    className="w-full mt-4 text-green-600 hover:text-green-700 font-semibold text-sm"
                                >
                                    <i className="fas fa-archive mr-2"></i>
                                    {showArchive ? 'Tutup Arsip' : 'Lihat Recording Lama (Arsip)'}
                                </button>
                            </div>

                            {/* Warning Info */}
                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6 rounded">
                                <div className="flex">
                                    <i className="fas fa-exclamation-triangle text-yellow-400 mt-1"></i>
                                    <div className="ml-3">
                                        <h3 className="text-sm font-semibold text-yellow-800">Perhatian</h3>
                                        <p className="text-xs text-yellow-700 mt-1">
                                            Upload recording baru akan otomatis mengarsipkan recording lama. Recording lama
                                            tetap bisa diakses di arsip.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Archive Section */}
                    {showArchive && (
                        <div className="mt-8">
                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-gray-800">Arsip Recording</h2>
                                    <button onClick={() => setShowArchive(false)} className="text-gray-600 hover:text-gray-800">
                                        <i className="fas fa-times text-xl"></i>
                                    </button>
                                </div>
                                <RecordingList
                                    recordings={archivedRecordings}
                                    onRestore={handleRestore}
                                    onDelete={handleDelete}
                                    showActions
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AdminAuth>
    );
}
