'use client';

import { Recording, formatDate } from '@/lib/types';

interface RecordingListProps {
    recordings: Recording[];
    onRestore?: (id: string) => void;
    onDelete?: (id: string) => void;
    onPlay?: (recording: Recording) => void;
    showActions?: boolean;
}

export default function RecordingList({
    recordings,
    onRestore,
    onDelete,
    onPlay,
    showActions = false,
}: RecordingListProps) {
    if (recordings.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                <i className="fas fa-music text-4xl mb-3 opacity-50"></i>
                <p>Belum ada recording</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {recordings.map((recording) => (
                <div
                    key={recording.id}
                    className="flex items-center gap-4 p-4 border rounded-xl hover:border-green-300 hover:bg-green-50 transition cursor-pointer"
                    onClick={() => onPlay?.(recording)}
                >
                    <div className="bg-green-100 rounded-lg p-4">
                        <i className="fas fa-microphone text-green-600 text-2xl"></i>
                    </div>
                    <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{recording.title}</h4>
                        <p className="text-sm text-gray-600">
                            {recording.speaker} • {formatDate(recording.date)}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            {recording.duration || '0:00'} • {recording.play_count} plays
                        </p>
                    </div>
                    {showActions ? (
                        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                            <button
                                onClick={() => onRestore?.(recording.id)}
                                className="text-blue-600 hover:text-blue-700 p-2"
                                title="Restore"
                            >
                                <i className="fas fa-undo"></i>
                            </button>
                            <button
                                onClick={() => {
                                    if (confirm('Yakin ingin menghapus recording ini secara permanen?')) {
                                        onDelete?.(recording.id);
                                    }
                                }}
                                className="text-red-600 hover:text-red-700 p-2"
                                title="Delete"
                            >
                                <i className="fas fa-trash"></i>
                            </button>
                        </div>
                    ) : (
                        <button className="bg-green-600 text-white w-12 h-12 rounded-full hover:bg-green-700 transition">
                            <i className="fas fa-play ml-1"></i>
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}
