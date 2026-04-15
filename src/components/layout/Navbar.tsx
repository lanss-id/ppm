'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

// ✅ Urutan harus sama persis dengan urutan section di halaman
const navLinks = [
    { href: '#home',      label: 'Home' },
    { href: '#profil',    label: 'Profil' },
    { href: '#program',   label: 'Program' },
    { href: '#fasilitas', label: 'Fasilitas' },
    { href: '#galeri',    label: 'Galeri' },
    { href: '#kontak',    label: 'Kontak' },
];

const NAVBAR_HEIGHT = 80;

function scrollToSection(href: string) {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
    window.scrollTo({ top, behavior: 'smooth' });
}

export function Navbar() {
    const [isScrolled, setIsScrolled]         = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection]   = useState('home');
    const observerRef = useRef<IntersectionObserver | null>(null);
    // Simpan semua section yang sedang intersecting beserta posisi top-nya
    const visibleSections = useRef<Map<string, number>>(new Map());

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 60);
        window.addEventListener('scroll', handleScroll, { passive: true });

        const sectionIds = navLinks.map((l) => l.href.replace('#', ''));

        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const id = entry.target.id;
                    if (entry.isIntersecting) {
                        // Simpan posisi top section di halaman
                        visibleSections.current.set(
                            id,
                            (entry.target as HTMLElement).offsetTop
                        );
                    } else {
                        visibleSections.current.delete(id);
                    }
                });

                // Pilih section yang paling atas (offsetTop terkecil) di antara yang visible
                if (visibleSections.current.size > 0) {
                    let topId = '';
                    let topVal = Infinity;
                    visibleSections.current.forEach((top, id) => {
                        if (top < topVal) { topVal = top; topId = id; }
                    });
                    if (topId) setActiveSection(topId);
                }
            },
            {
                // Section dianggap aktif jika berada di area tepat di bawah navbar hingga 60% viewport
                rootMargin: `-${NAVBAR_HEIGHT}px 0px -40% 0px`,
                threshold: 0,
            }
        );

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observerRef.current?.observe(el);
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            observerRef.current?.disconnect();
        };
    }, []);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        // Set aktif langsung saat klik tanpa menunggu observer
        setActiveSection(href.replace('#', ''));
        scrollToSection(href);
        setIsMobileMenuOpen(false);
    };

    const onHero = !isScrolled;

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
                onHero
                    ? 'py-4 bg-transparent'
                    : 'py-2 bg-white/95 backdrop-blur-xl border-b border-emerald-100 shadow-sm'
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className={cn(
                            'p-1 rounded-xl shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all',
                            onHero ? 'bg-white/20 border border-white/30 backdrop-blur-sm'
                                   : 'bg-white border border-emerald-100'
                        )}>
                            <Image src="/img/LOGO PPM WHITE BG.png" width={40} height={40} alt="logo" />
                        </div>
                        <div>
                            <h1 className={cn(
                                'text-lg font-bold transition-colors duration-300',
                                onHero ? 'text-white' : 'text-gray-800'
                            )}>
                                PPM Minhajul Haq
                            </h1>
                            <p className={cn(
                                'text-xs font-medium transition-colors duration-300',
                                onHero ? 'text-emerald-300' : 'text-emerald-600'
                            )}>
                                Pondok Pesantren Mahasiswa
                            </p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const id = link.href.replace('#', '');
                            const isActive = activeSection === id;
                            return (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className={cn(
                                        'relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300',
                                        onHero
                                            ? isActive
                                                ? 'text-white bg-white/15'
                                                : 'text-white/80 hover:text-white hover:bg-white/15'
                                            : isActive
                                                ? 'text-emerald-700 bg-emerald-50'
                                                : 'text-gray-600 hover:text-emerald-700 hover:bg-emerald-50'
                                    )}
                                >
                                    {link.label}
                                    {isActive && (
                                        <motion.span
                                            layoutId="nav-dot"
                                            className={cn(
                                                'absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full',
                                                onHero ? 'bg-emerald-300' : 'bg-emerald-500'
                                            )}
                                        />
                                    )}
                                </a>
                            );
                        })}
                        <a
                            href="#kontak"
                            onClick={(e) => handleNavClick(e, '#kontak')}
                            className={cn(
                                'ml-3 px-5 py-2 text-sm font-semibold rounded-xl transition-all shadow-sm',
                                onHero
                                    ? 'bg-emerald-500 text-white hover:bg-emerald-400 border border-emerald-400/50'
                                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                            )}
                        >
                            Daftar
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={cn(
                            'md:hidden p-2 rounded-lg transition',
                            onHero
                                ? 'text-white hover:bg-white/15'
                                : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-700'
                        )}
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
                        className={cn(
                            'md:hidden mt-2 mx-4 rounded-2xl overflow-hidden shadow-md border',
                            onHero
                                ? 'bg-black/40 border-white/20 backdrop-blur-md'
                                : 'bg-white border-emerald-100'
                        )}
                    >
                        <div className="p-4 space-y-1">
                            {navLinks.map((link) => {
                                const id = link.href.replace('#', '');
                                const isActive = activeSection === id;
                                return (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        onClick={(e) => handleNavClick(e, link.href)}
                                        className={cn(
                                            'block px-4 py-3 rounded-lg transition font-medium text-sm',
                                            onHero
                                                ? isActive ? 'text-white bg-white/20' : 'text-white/80 hover:text-white hover:bg-white/15'
                                                : isActive ? 'text-emerald-700 bg-emerald-50' : 'text-gray-600 hover:text-emerald-700 hover:bg-emerald-50'
                                        )}
                                    >
                                        {link.label}
                                    </a>
                                );
                            })}
                            <div className={cn('pt-2 border-t', onHero ? 'border-white/20' : 'border-emerald-100')}>
                                <a
                                    href="#kontak"
                                    onClick={(e) => handleNavClick(e, '#kontak')}
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