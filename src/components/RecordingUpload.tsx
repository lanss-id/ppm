'use client';

import { useState, useRef, useCallback } from 'react';
import { supabase, uploadAudioFile } from '@/lib/supabase';
import { RecordingFormData, GURU_OPTIONS, KELAS_OPTIONS, MANGKULAN_OPTIONS } from '@/lib/types';

interface RecordingUploadProps {
    onUploadSuccess: () => void;
}

export default function RecordingUpload({ onUploadSuccess }: RecordingUploadProps) {
    const [isDragOver, setIsDragOver] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState<RecordingFormData>({
        title: '',
        speaker: '',
        date: new Date().toISOString().split('T')[0],
        kelas: '',
        mangkulan: '',
        description: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    }, []);

    const handleDragLeave = useCallback(() => {
        setIsDragOver(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    }, []);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = async (selectedFile: File) => {
        if (!selectedFile.type.includes('audio')) {
            alert('Mohon upload file audio (MP3)');
            return;
        }

        if (selectedFile.size > 50 * 1024 * 1024) {
            alert('File terlalu besar. Maksimal 50MB');
            return;
        }

        setFile(selectedFile);
        setIsUploading(true);

        // Simulate upload progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            setUploadProgress(progress);
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    setIsUploading(false);
                    setShowForm(true);
                }, 500);
            }
        }, 200);
    };

    const handleCancel = () => {
        setFile(null);
        setShowForm(false);
        setUploadProgress(0);
        setFormData({
            title: '',
            speaker: '',
            date: new Date().toISOString().split('T')[0],
            kelas: '',
            mangkulan: '',
            description: '',
        });
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handlePublish = async () => {
        if (!formData.title || !formData.speaker || !formData.date || !formData.kelas || !formData.mangkulan) {
            alert('Mohon lengkapi semua field yang wajib diisi');
            return;
        }

        if (!file) {
            alert('File tidak ditemukan');
            return;
        }

        setIsSubmitting(true);

        try {
            // Upload file to Supabase Storage
            const uploadResult = await uploadAudioFile(file);

            if (!uploadResult) {
                throw new Error('Gagal upload file');
            }

            // Get audio duration
            let duration = '';
            try {
                const audio = new Audio(URL.createObjectURL(file));
                await new Promise((resolve) => {
                    audio.addEventListener('loadedmetadata', () => {
                        const hours = Math.floor(audio.duration / 3600);
                        const mins = Math.floor((audio.duration % 3600) / 60);
                        const secs = Math.floor(audio.duration % 60);
                        duration = `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
                        resolve(null);
                    });
                });
            } catch {
                duration = '0:00:00';
            }

            // Save to database
            const response = await fetch('/api/recordings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    file_url: uploadResult.url,
                    file_name: file.name,
                    file_size: file.size,
                    duration,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('API Error:', errorData);
                throw new Error(errorData.error || 'Gagal menyimpan recording');
            }

            alert('✅ Recording berhasil dipublish!\n\nRecording lama telah diarsipkan.');
            handleCancel();
            onUploadSuccess();
        } catch (error) {
            console.error('Publish error:', error);
            const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan';
            alert(`Terjadi kesalahan saat mempublish recording:\n${errorMessage}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Upload Recording Baru</h2>

            {/* Upload Area */}
            {!showForm && (
                <div
                    className={`border-2 border-dashed rounded-xl p-12 text-center mb-6 transition-all ${isDragOver ? 'border-green-600 bg-green-50' : 'border-gray-300'
                        }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    {!isUploading ? (
                        <div>
                            <i className="fas fa-cloud-upload-alt text-6xl text-gray-400 mb-4"></i>
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">Drag & Drop File MP3</h3>
                            <p className="text-gray-500 mb-4">atau</p>
                            <label className="bg-green-600 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-green-700 transition inline-block">
                                <i className="fas fa-folder-open mr-2"></i>Pilih File
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="audio/mp3,audio/mpeg"
                                    className="hidden"
                                    onChange={handleFileSelect}
                                />
                            </label>
                            <p className="text-sm text-gray-500 mt-4">Max file size: 50MB</p>
                        </div>
                    ) : (
                        <div>
                            <i className="fas fa-file-audio text-5xl text-green-600 mb-3"></i>
                            <p className="font-semibold text-gray-800">{file?.name}</p>
                            <p className="text-sm text-gray-500">
                                {file && (file.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                            <div className="w-full bg-gray-200 rounded-full h-3 mt-4 mb-2">
                                <div
                                    className="bg-green-600 h-3 rounded-full transition-all duration-300"
                                    style={{ width: `${uploadProgress}%` }}
                                />
                            </div>
                            <p className="text-sm text-gray-600">{uploadProgress}% - Uploading...</p>
                        </div>
                    )}
                </div>
            )}

            {/* Recording Form */}
            {showForm && (
                <div>
                    <div className="space-y-4 mb-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Judul Recording *
                            </label>
                            <input
                                type="text"
                                placeholder="Contoh: Kajian Tafsir Al-Baqarah Ayat 1-10"
                                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Guru/Pembicara *</label>
                            <select
                                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={formData.speaker}
                                onChange={(e) => setFormData({ ...formData, speaker: e.target.value })}
                            >
                                <option value="">Pilih Guru</option>
                                {GURU_OPTIONS.map((guru) => (
                                    <option key={guru.value} value={guru.value}>
                                        {guru.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Tanggal *
                            </label>
                            <input
                                type="date"
                                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Kelas *</label>
                                <select
                                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    value={formData.kelas}
                                    onChange={(e) => setFormData({ ...formData, kelas: e.target.value })}
                                >
                                    <option value="">Pilih Kelas</option>
                                    {KELAS_OPTIONS.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Mangkulan *</label>
                                <select
                                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    value={formData.mangkulan}
                                    onChange={(e) => setFormData({ ...formData, mangkulan: e.target.value })}
                                >
                                    <option value="">Pilih Mangkulan</option>
                                    {MANGKULAN_OPTIONS.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Deskripsi</label>
                            <textarea
                                rows={4}
                                placeholder="Jelaskan isi kajian..."
                                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={handleCancel}
                            className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                            disabled={isSubmitting}
                        >
                            <i className="fas fa-times mr-2"></i>Batal
                        </button>
                        <button
                            onClick={handlePublish}
                            className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
                            disabled={isSubmitting}
                        >
                            <i className="fas fa-check mr-2"></i>
                            {isSubmitting ? 'Menyimpan...' : 'Publish Recording'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
