'use client';

import { motion } from 'framer-motion';
import { ChevronDown, GraduationCap, Users } from 'lucide-react';

export function Hero() {
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Animated Background Orbs */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="bg-orb w-96 h-96 bg-emerald-500/30 top-1/4 -left-48" />
                <div className="bg-orb w-80 h-80 bg-emerald-700/20 bottom-1/4 -right-40" style={{ animationDelay: '-7s' }} />
                <div className="bg-orb w-64 h-64 bg-emerald-400/20 top-1/2 left-1/2" style={{ animationDelay: '-14s' }} />
            </div>

            {/* Islamic Pattern Overlay */}
            <div className="absolute inset-0 islamic-pattern opacity-50" />

            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-8"
                    >
                        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                        <span className="text-sm text-gray-300">Pondok Pesantren Mahasiswa</span>
                    </motion.div>

                    {/* Main Title */}
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6">
                        <span className="text-white">Selamat Datang di</span>
                        <br />
                        <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text text-transparent">
                            PPM Minhajul Haq
                        </span>
                    </h1>

                    {/* Tagline */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-lg md:text-xl text-gray-300 mb-4 max-w-3xl mx-auto"
                    >
                        &ldquo;Mencetak Generasi Madani: Sarjana yang Mubaligh, Mubaligh yang Sarjana&rdquo;
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-base text-gray-400 mb-10 max-w-2xl mx-auto"
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
                            className="group px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold rounded-2xl hover:shadow-xl hover:shadow-emerald-500/25 transition-all flex items-center justify-center gap-2"
                        >
                            <GraduationCap className="w-5 h-5" />
                            Daftar Sekarang
                        </a>
                        <a
                            href="#profil"
                            className="px-8 py-4 glass text-white font-semibold rounded-2xl hover:bg-white/15 transition-all flex items-center justify-center gap-2"
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
                        <div key={index} className="glass-card py-4 px-2">
                            <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
                                {stat.value}
                            </h3>
                            <p className="text-xs md:text-sm text-gray-400">{stat.label}</p>
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
                <a href="#profil" className="flex flex-col items-center text-gray-400 hover:text-emerald-400 transition">
                    <span className="text-xs mb-2">Scroll</span>
                    <ChevronDown className="w-5 h-5 animate-bounce" />
                </a>
            </motion.div>
        </section>
    );
}
