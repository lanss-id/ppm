'use client';

import { useState, useEffect } from 'react';
import PlayerHeader from '@/components/PlayerHeader';
import ClassSelection from '@/components/ClassSelection';
import AudioPlayer from '@/components/AudioPlayer';
import { Recording, formatDate, formatDurationDisplay } from '@/lib/types';

export default function PlayerPage() {
    const [selectedClass, setSelectedClass] = useState<{ kelas: string; kajian: string } | null>(null);
    const [activeRecording, setActiveRecording] = useState<Recording | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchRecordings = async (kelas?: string, mangkulan?: string) => {
        setLoading(true);
        try {
            const response = await fetch('/api/recordings');
            const data = await response.json();

            // Check if data is array (API might return error object)
            if (!Array.isArray(data)) {
                console.error('API error:', data);
                setActiveRecording(null);
                return;
            }

            // Filter by kelas and mangkulan if provided
            let filtered = data;
            if (kelas) {
                filtered = filtered.filter((r: Recording) => r.kelas === kelas);
            }
            if (mangkulan) {
                filtered = filtered.filter((r: Recording) => r.mangkulan === mangkulan);
            }

            // Get active recording from filtered results
            const active = filtered.find((r: Recording) => r.is_active) || filtered[0] || null;
            setActiveRecording(active);
        } catch (error) {
            console.error('Failed to fetch recordings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClassSelect = (kelas: string, kajian: string) => {
        setSelectedClass({ kelas, kajian });
        fetchRecordings(kelas, kajian);
    };

    const handleBackToMenu = () => {
        setSelectedClass(null);
        setActiveRecording(null);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <PlayerHeader />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Show Class Selection if not selected */}
                {!selectedClass ? (
                    <>
                        <div className="mb-8 text-center">
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">Recording mangkulan PPM</h1>
                            <p className="text-gray-600">Dengarkan recording mangkulan dari PPM Minhajul Haq</p>
                        </div>
                        <ClassSelection onSelect={handleClassSelect} />
                    </>
                ) : (
                    <>
                        {/* Back to menu button */}
                        <button
                            onClick={handleBackToMenu}
                            className="mb-6 text-gray-600 hover:text-green-600 transition flex items-center gap-2"
                        >
                            <i className="fas fa-arrow-left"></i>
                            <span>Kembali ke pilihan kelas</span>
                        </button>

                        {/* Selected Class Info */}
                        <div className="mb-6 bg-white rounded-xl shadow p-4 flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${selectedClass.kelas === 'cepatan'
                                ? 'bg-orange-100 text-orange-600'
                                : 'bg-blue-100 text-blue-600'
                                }`}>
                                <i className={`fas ${selectedClass.kelas === 'cepatan' ? 'fa-bolt' : 'fa-leaf'} text-xl`}></i>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800">
                                    Kelas {selectedClass.kelas === 'cepatan' ? 'Cepatan' : 'Lambatan'} - {selectedClass.kajian === 'quran' ? "Mangkul Qur'an" : 'Hadist'}
                                </p>
                                <p className="text-sm text-gray-500">Recording Mangkul Qur'an terpilih</p>
                            </div>
                        </div>

                        {loading ? (
                            <div className="text-center py-16">
                                <i className="fas fa-spinner fa-spin text-4xl text-green-600"></i>
                                <p className="mt-4 text-gray-600">Memuat recording...</p>
                            </div>
                        ) : (
                            <>
                                {/* Main Player */}
                                <AudioPlayer
                                    recording={activeRecording}
                                    onPlayCountUpdate={() => {
                                        // Update play count locally without re-fetching
                                        if (activeRecording) {
                                            setActiveRecording({
                                                ...activeRecording,
                                                play_count: activeRecording.play_count + 1
                                            });
                                        }
                                    }}
                                />

                                {/* Recording Description */}
                                {activeRecording && (
                                    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                                        <h3 className="text-xl font-bold text-gray-800 mb-4">Tentang Recording Ini</h3>
                                        <p className="text-gray-600 leading-relaxed mb-4">
                                            {activeRecording.description || 'Tidak ada deskripsi untuk recording ini.'}
                                        </p>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                                            <div className="bg-gray-50 rounded-lg p-4">
                                                <i className="fas fa-clock text-green-600 text-2xl mb-2"></i>
                                                <p className="text-sm text-gray-600">Durasi</p>
                                                <p className="font-semibold text-gray-800">{formatDurationDisplay(activeRecording.duration)}</p>
                                            </div>
                                            <div className="bg-gray-50 rounded-lg p-4">
                                                <i className="fas fa-headphones text-green-600 text-2xl mb-2"></i>
                                                <p className="text-sm text-gray-600">Didengar</p>
                                                <p className="font-semibold text-gray-800">{activeRecording.play_count} kali</p>
                                            </div>
                                            <div className="bg-gray-50 rounded-lg p-4">
                                                <i className="fas fa-calendar text-green-600 text-2xl mb-2"></i>
                                                <p className="text-sm text-gray-600">Tanggal</p>
                                                <p className="font-semibold text-gray-800">{formatDate(activeRecording.date)}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
