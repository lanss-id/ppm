'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';

const photos = [
    {
        src: '/img/santri-putri.jpg',   // ganti dengan path foto santriwati
        label: 'Santri Putri',
        desc: 'Keluarga besar santriwati PPM Minhajul Haq',
    },
    {
        src: '/img/santri-putra.jpg',   // ganti dengan path foto santri putra
        label: 'Santri Putra',
        desc: 'Keluarga besar santri putra bersama dewan asatidz',
    },
    {
        src: '/img/kegiatan.jpg',       // ganti dengan path foto kegiatan outdoor
        label: 'Kegiatan Bersama',
        desc: 'Kegiatan outdoor seluruh santri PPM Minhajul Haq',
    },
];

export function GallerySection() {
    const [lightbox, setLightbox] = useState<number | null>(null);

    return (
        <section id="galeri" className="py-24 bg-white relative overflow-hidden">
            {/* Islamic pattern */}
            <div className="absolute inset-0 islamic-pattern opacity-[0.025]" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-emerald-400" />
                        <span className="text-emerald-500 text-lg select-none">❋</span>
                        <div className="h-px w-12 bg-gradient-to-l from-transparent to-emerald-400" />
                    </div>
                    <span className="text-emerald-600 font-semibold mb-2 block tracking-widest text-sm uppercase">
                        Galeri
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Keluarga Besar Kami
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Santri dan Santriwati PPM Minhajul Haq — bersama membangun generasi madani
                    </p>
                </motion.div>

                {/* Photo Grid */}
                <div className="grid md:grid-cols-3 gap-5">
                    {photos.map((photo, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            className="group relative rounded-2xl overflow-hidden shadow-sm border border-emerald-100 cursor-pointer"
                            style={{ aspectRatio: '4/3' }}
                            onClick={() => setLightbox(index)}
                        >
                            {/* Background Image */}
                            <img
                                src={photo.src}
                                alt={photo.label}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />

                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-300 group-hover:from-black/70" />

                            {/* Zoom icon */}
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="p-2 bg-white/90 rounded-full shadow-sm">
                                    <ZoomIn className="w-4 h-4 text-emerald-700" />
                                </div>
                            </div>

                            {/* Label */}
                            <div className="absolute bottom-0 left-0 right-0 p-5">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-emerald-300 text-xs select-none">❋</span>
                                    <span className="text-xs text-emerald-300 font-medium tracking-widest uppercase">
                                        {photo.label}
                                    </span>
                                </div>
                                <p className="text-white text-sm font-medium leading-snug">
                                    {photo.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            {lightbox !== null && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={() => setLightbox(null)}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="relative max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={photos[lightbox].src}
                            alt={photos[lightbox].label}
                            className="w-full h-auto max-h-[80vh] object-contain bg-white"
                        />
                        {/* Caption bar */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-5">
                            <p className="text-white font-semibold">{photos[lightbox].label}</p>
                            <p className="text-gray-300 text-sm">{photos[lightbox].desc}</p>
                        </div>
                        {/* Close button */}
                        <button
                            onClick={() => setLightbox(null)}
                            className="absolute top-4 right-4 p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition"
                        >
                            <X className="w-5 h-5 text-gray-700" />
                        </button>

                        {/* Prev / Next */}
                        <div className="absolute inset-y-0 left-0 flex items-center px-3">
                            <button
                                onClick={() => setLightbox((lightbox - 1 + photos.length) % photos.length)}
                                className="p-2 bg-white/80 rounded-full hover:bg-white transition text-gray-700 font-bold text-lg shadow"
                            >
                                ‹
                            </button>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center px-3">
                            <button
                                onClick={() => setLightbox((lightbox + 1) % photos.length)}
                                className="p-2 bg-white/80 rounded-full hover:bg-white transition text-gray-700 font-bold text-lg shadow"
                            >
                                ›
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </section>
    );
}