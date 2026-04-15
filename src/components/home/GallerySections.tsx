'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const photos = [
    {
        src: '/img/santri-putri.jpg',
        label: 'Santri Putri',
        desc: 'Keluarga besar santriwati PPM Minhajul Haq',
    },
    {
        src: '/img/santri-putra.jpg',
        label: 'Santri Putra',
        desc: 'Keluarga besar santri putra bersama dewan Guru',
    },
    {
        src: '/img/kegiatan.jpg',   // simpan file sebagai kegiatan.jpg (lowercase)
        label: 'Kegiatan Bersama',
        desc: 'Kegiatan outdoor seluruh santri PPM Minhajul Haq',
    },
];

export function GallerySection() {
    const [lightbox, setLightbox] = useState<number | null>(null);
    // Track which images are loaded to avoid blank flash
    const [loaded, setLoaded] = useState<boolean[]>(photos.map(() => false));

    const handleLoad = (i: number) => {
        setLoaded((prev) => {
            const next = [...prev];
            next[i] = true;
            return next;
        });
    };

    return (
        <section id="galeri" className="py-24 bg-white relative overflow-hidden">
            <div className="absolute inset-0 islamic-pattern opacity-[0.025]" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, ease: EASE }}
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
                        Santri dan Dewan Guru PPM Minhajul Haq — bersama membangun generasi madani
                    </p>
                </motion.div>

                {/* Photo Grid */}
                <div className="grid md:grid-cols-3 gap-5">
                    {photos.map((photo, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            // margin negatif besar → animasi mulai jauh sebelum masuk viewport
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{
                                delay: index * 0.15,
                                duration: 0.65,
                                ease: EASE,
                            }}
                            className="group relative rounded-2xl overflow-hidden border border-emerald-100 cursor-pointer"
                            style={{ aspectRatio: '4/3' }}
                            onClick={() => setLightbox(index)}
                            whileHover={{ y: -4, transition: { duration: 0.22 } }}
                        >
                            {/* Skeleton placeholder — mencegah blank putih */}
                            {!loaded[index] && (
                                <div className="absolute inset-0 bg-emerald-50 animate-pulse flex items-center justify-center">
                                    <span className="text-emerald-200 text-4xl select-none">❋</span>
                                </div>
                            )}

                            {/* Foto */}
                            <img
                                src={photo.src}
                                alt={photo.label}
                                onLoad={() => handleLoad(index)}
                                className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
                                    loaded[index] ? 'opacity-100' : 'opacity-0'
                                }`}
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent transition-all duration-500 group-hover:from-black/75" />

                            {/* Zoom icon */}
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300">
                                <div className="p-2 bg-white/90 rounded-full shadow-sm">
                                    <ZoomIn className="w-4 h-4 text-emerald-700" />
                                </div>
                            </div>

                            {/* Label */}
                            <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
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
            <AnimatePresence>
                {lightbox !== null && (
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={() => setLightbox(null)}
                    >
                        <motion.div
                            key={lightbox}
                            initial={{ scale: 0.9, opacity: 0, y: 16 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.93, opacity: 0 }}
                            transition={{ duration: 0.3, ease: EASE }}
                            className="relative max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={photos[lightbox].src}
                                alt={photos[lightbox].label}
                                className="w-full h-auto max-h-[80vh] object-contain bg-white"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 to-transparent p-5">
                                <p className="text-white font-semibold">{photos[lightbox].label}</p>
                                <p className="text-gray-300 text-sm">{photos[lightbox].desc}</p>
                            </div>
                            <button
                                onClick={() => setLightbox(null)}
                                className="absolute top-4 right-4 p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition"
                            >
                                <X className="w-5 h-5 text-gray-700" />
                            </button>
                            <div className="absolute inset-y-0 left-0 flex items-center px-3">
                                <button
                                    onClick={() => setLightbox((lightbox - 1 + photos.length) % photos.length)}
                                    className="p-2.5 bg-white/80 rounded-full hover:bg-white transition text-gray-700 font-bold text-xl shadow"
                                >
                                    ‹
                                </button>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center px-3">
                                <button
                                    onClick={() => setLightbox((lightbox + 1) % photos.length)}
                                    className="p-2.5 bg-white/80 rounded-full hover:bg-white transition text-gray-700 font-bold text-xl shadow"
                                >
                                    ›
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}