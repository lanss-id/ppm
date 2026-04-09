'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#profil', label: 'Profil' },
    { href: '#program', label: 'Program' },
    { href: '#fasilitas', label: 'Fasilitas' },
    { href: '#kontak', label: 'Kontak' },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                isScrolled
                    ? 'py-2 bg-white/90 backdrop-blur-xl border-b border-emerald-100 shadow-sm shadow-emerald-100/50'
                    : 'py-4 bg-white/70 backdrop-blur-md border-b border-emerald-50'
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="p-1 rounded-xl border border-emerald-100 bg-white shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all">
                            <Image src="/img/logo.png" width={40} height={40} alt="logo" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-gray-800">PPM Minhajul Haq</h1>
                            <p className="text-xs text-emerald-600 font-medium">Pondok Pesantren Mahasiswa</p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-all"
                            >
                                {link.label}
                            </a>
                        ))}
                        <a
                            href="#kontak"
                            className="ml-3 px-5 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-xl hover:bg-emerald-700 transition-all shadow-sm"
                        >
                            Daftar
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border border-emerald-100 mt-2 mx-4 rounded-2xl overflow-hidden shadow-md"
                    >
                        <div className="p-4 space-y-1">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block px-4 py-3 text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition font-medium text-sm"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <div className="pt-2 border-t border-emerald-100">
                                <a
                                    href="#kontak"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block px-4 py-3 bg-emerald-600 text-white rounded-xl text-center font-semibold text-sm hover:bg-emerald-700 transition"
                                >
                                    Daftar Sekarang
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}