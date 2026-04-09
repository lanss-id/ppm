'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, GraduationCap, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

const bgPhotos = [
    '/img/santri-putri.jpg',   // ganti dengan nama file foto santriwati
    '/img/santri-putra.jpg',   // ganti dengan nama file foto santri putra
    '/img/kegiatan.jpg',       // ganti dengan nama file foto kegiatan outdoor
];

export function Hero() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % bgPhotos.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">

            {/* Background Photo Slideshow */}
            <AnimatePresence>
                <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: 'easeInOut' }}
                    className="absolute inset-0"
                >
                    <img
                        src={bgPhotos[current]}
                        alt="background"
                        className="w-full h-full object-cover"
                    />
                </motion.div>
            </AnimatePresence>

            {/* Dark overlay agar teks terbaca */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/65" />
            {/* Soft emerald tint */}
            <div className="absolute inset-0 bg-emerald-950/20" />
            {/* Islamic Pattern Overlay */}
            <div className="absolute inset-0 islamic-pattern opacity-[0.06]" />

            {/* Top decorative border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />

            {/* Slide indicators */}
            <div className="absolute bottom-24 md:bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {bgPhotos.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`transition-all duration-300 rounded-full ${
                            i === current
                                ? 'w-6 h-2 bg-emerald-400'
                                : 'w-2 h-2 bg-white/40 hover:bg-white/60'
                        }`}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Ornament */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="flex items-center justify-center gap-3 mb-6"
                    >
                        <div className="h-px w-16 bg-gradient-to-r from-transparent to-emerald-400" />
                        <span className="text-emerald-400 text-2xl select-none">❋</span>
                        <div className="h-px w-16 bg-gradient-to-l from-transparent to-emerald-400" />
                    </motion.div>

                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 border border-white/30 backdrop-blur-sm rounded-full mb-8"
                    >
                        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                        <span className="text-sm text-white/90 font-medium tracking-wide">Pondok Pesantren Mahasiswa</span>
                    </motion.div>

                    {/* Main Title */}
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
                        <span className="text-white">Selamat Datang di</span>
                        <br />
                        <span className="bg-gradient-to-r from-emerald-300 via-emerald-200 to-emerald-300 bg-clip-text text-transparent">
                            PPM Minhajul Haq
                        </span>
                    </h1>

                    {/* Tagline */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-lg md:text-xl text-white/85 mb-4 max-w-3xl mx-auto italic drop-shadow"
                    >
                        &ldquo;Mencetak Generasi Madani: Sarjana yang Mubaligh, Mubaligh yang Sarjana&rdquo;
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-base text-white/70 mb-10 max-w-2xl mx-auto"
                    >
                        Kurikulum berbasis Al-Qur&apos;an dan Al-Hadits, dibimbing langsung oleh Ulama ahli
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <a
                            href="#kontak"
                            className="px-8 py-4 bg-emerald-600 text-white font-semibold rounded-2xl hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-900/40 transition-all flex items-center justify-center gap-2"
                        >
                            <GraduationCap className="w-5 h-5" />
                            Daftar Sekarang
                        </a>
                        <a
                            href="#profil"
                            className="px-8 py-4 bg-white/10 border border-white/30 backdrop-blur-sm text-white font-semibold rounded-2xl hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                        >
                            <Users className="w-5 h-5" />
                            Pelajari Lebih Lanjut
                        </a>
                    </motion.div>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-6xl mx-auto"
                >
                    {[
                        { value: '82', label: 'Santri Aktif' },
                        { value: '5', label: 'Dewan Guru' },
                        { value: '4', label: 'Gedung Asrama' },
                        { value: '5+', label: 'Tahun Berdiri' },
                    ].map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white/10 border border-white/20 backdrop-blur-sm rounded-2xl py-5 px-3 hover:bg-white/15 transition-all"
                        >
                            <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-300 to-emerald-200 bg-clip-text text-transparent">
                                {stat.value}
                            </h3>
                            <p className="text-xs md:text-sm text-white/70 mt-1">{stat.label}</p>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-[2%] md:bottom-[7%] left-1/2 -translate-x-1/2"
            >
                <a href="#profil" className="flex flex-col items-center text-white/50 hover:text-emerald-400 transition">
                    <span className="text-xs mb-2">Scroll</span>
                    <ChevronDown className="w-5 h-5 animate-bounce" />
                </a>
            </motion.div>
        </section>
    );
}