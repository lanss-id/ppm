'use client';

import { useState } from 'react';

interface ClassSelectionProps {
    onSelect: (kelas: string, kajian: string) => void;
}

export default function ClassSelection({ onSelect }: ClassSelectionProps) {
    const [selectedKelas, setSelectedKelas] = useState<string | null>(null);

    const handleKelasSelect = (kelas: string) => {
        setSelectedKelas(kelas);
    };

    const handleKajianSelect = (kajian: string) => {
        if (selectedKelas) {
            onSelect(selectedKelas, kajian);
        }
    };

    const handleBack = () => {
        setSelectedKelas(null);
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4">
            <div className="max-w-2xl w-full">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-block bg-green-100 text-green-600 p-4 rounded-full mb-4">
                        <i className="fas fa-headphones text-4xl"></i>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        {selectedKelas ? 'Pilih Mangkulan' : 'Pilih Kelas'}
                    </h1>
                    <p className="text-gray-600">
                        {selectedKelas
                            ? `Kelas ${selectedKelas === 'cepatan' ? 'Cepatan' : 'Lambatan'} - Pilih jenis mangkulan`
                            : 'Silakan pilih kelas yang ingin Anda ikuti'}
                    </p>
                </div>

                {/* Step 1: Kelas Selection */}
                {!selectedKelas && (
                    <div className="mb-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <button
                                onClick={() => handleKelasSelect('cepatan')}
                                className="group relative bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-orange-500 focus:border-orange-500 focus:outline-none"
                            >
                                <div className="text-center">
                                    <div className="bg-gradient-to-br from-orange-400 to-orange-600 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                                        <i className="fas fa-bolt text-3xl"></i>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Cepatan</h3>
                                </div>
                            </button>

                            <button
                                onClick={() => handleKelasSelect('lambatan')}
                                className="group relative bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-500 focus:border-blue-500 focus:outline-none"
                            >
                                <div className="text-center">
                                    <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                                        <i className="fas fa-leaf text-3xl"></i>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Lambatan</h3>
                                </div>
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 2: Kajian Selection */}
                {selectedKelas && (
                    <div className="mb-8">
                        {/* Back Button */}
                        <button
                            onClick={handleBack}
                            className="mb-6 text-gray-600 hover:text-green-600 transition flex items-center gap-2"
                        >
                            <i className="fas fa-arrow-left"></i>
                            <span>Kembali pilih kelas</span>
                        </button>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <button
                                onClick={() => handleKajianSelect('quran')}
                                className="group relative bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-emerald-500 focus:border-emerald-500 focus:outline-none"
                            >
                                <div className="text-center">
                                    <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                                        <i className="fas fa-quran text-3xl"></i>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Al-Qur'an</h3>
                                </div>
                            </button>

                            <button
                                onClick={() => handleKajianSelect('hadist')}
                                className="group relative bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-amber-500 focus:border-amber-500 focus:outline-none"
                            >
                                <div className="text-center">
                                    <div className="bg-gradient-to-br from-amber-400 to-amber-600 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                                        <i className="fas fa-book text-3xl"></i>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Hadits</h3>
                                </div>
                            </button>
                        </div>
                    </div>
                )}

                {/* Progress Indicator */}
                <div className="flex justify-center gap-2 mt-8">
                    <div className={`w-3 h-3 rounded-full transition-colors ${!selectedKelas ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                    <div className={`w-3 h-3 rounded-full transition-colors ${selectedKelas ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                </div>
            </div>
        </div>
    );
}
