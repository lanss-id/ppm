'use client';

import Link from 'next/link';
import { Building2, Instagram, Facebook, Youtube, Mail } from 'lucide-react';

export function Footer() {
    return (
        <footer className="py-12 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700">
                                <Building2 className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">PPM Minhajul Haq</h3>
                                <p className="text-xs text-emerald-400">Pondok Pesantren Mahasiswa</p>
                            </div>
                        </Link>
                        <p className="text-gray-400 text-sm">
                            Mencetak Generasi Madani: Sarjana yang Mubaligh, Mubaligh yang Sarjana.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Link Cepat</h4>
                        <ul className="space-y-2">
                            {['Home', 'Profil', 'Program', 'Fasilitas', 'Kontak'].map((link) => (
                                <li key={link}>
                                    <a
                                        href={`#${link.toLowerCase()}`}
                                        className="text-gray-400 hover:text-emerald-400 text-sm transition"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Kontak</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li>Jl. Bijaksana 2 No. 8</li>
                            <li>Pasteur, Sukajadi</li>
                            <li>Kota Bandung, Jawa Barat</li>
                            <li className="pt-2">+62 878-8982-7126</li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Ikuti Kami</h4>
                        <div className="flex gap-3">
                            {[
                                { icon: Instagram, href: '#' },
                                { icon: Facebook, href: '#' },
                                { icon: Youtube, href: 'https://youtu.be/E0k9bXSnx58' },
                                { icon: Mail, href: 'mailto:ppmminhajulhaq@gmail.com' },
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 glass rounded-lg hover:bg-emerald-500/20 transition"
                                >
                                    <social.icon className="w-5 h-5 text-gray-400 hover:text-emerald-400" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 text-center">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} PPM Minhajul Haq. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
