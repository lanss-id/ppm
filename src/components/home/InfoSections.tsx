'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import {
    BookOpen,
    GraduationCap,
    Users,
    CheckCircle,
    Target,
    Lightbulb,
    Heart,
    Building,
    Home,
    DoorOpen,
    Car,
    Building2,
    MapPin,
    Phone,
    Mail,
    Youtube,
} from 'lucide-react';

// ============================================
// ABOUT SECTION
// ============================================
export function AboutSection() {
    return (
        <section id="profil" className="py-24 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-emerald-400 font-medium mb-2 block">Tentang Kami</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Profil PPM Minhajul Haq
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Lembaga pendidikan agama Islam yang berlokasi strategis di tengah Kota Bandung
                    </p>
                </motion.div>

                {/* Video Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <GlassCard delay={0.1} className="p-0 overflow-hidden">
                        <div className="aspect-video w-full">
                            <iframe
                                src="https://www.youtube.com/embed/E0k9bXSnx58"
                                title="Video Profil PPM Minhajul Haq"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                className="rounded-3xl"
                            />
                        </div>
                    </GlassCard>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Description */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <p className="text-gray-300 text-lg leading-relaxed">
                            PPM Minhajul Haq adalah lembaga pendidikan agama Islam yang berlokasi strategis
                            di tengah Kota Bandung. Pesantren ini berdiri di atas lahan seluas lebih dari
                            <strong className="text-emerald-400"> dua hektar</strong>, dirancang khusus sebagai
                            tempat menuntut ilmu bagi mahasiswa dengan memadukan konsep hunian asrama modern
                            dan nilai-nilai Islami.
                        </p>

                        <div className="space-y-4">
                            {[
                                { icon: CheckCircle, text: 'Kurikulum berbasis Al-Qur\'an dan Al-Hadits' },
                                { icon: CheckCircle, text: 'Dibimbing langsung oleh Ulama ahli' },
                                { icon: CheckCircle, text: 'Pemisahan (Hijab) dalam kegiatan belajar' },
                            ].map((item, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <item.icon className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                                    <span className="text-gray-300">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Vision & Mission Cards */}
                    <div className="space-y-4">
                        <GlassCard delay={0.2}>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-emerald-500/20 rounded-xl">
                                    <Target className="w-6 h-6 text-emerald-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-2">Visi</h3>
                                    <p className="text-gray-400 text-sm">
                                        Berkontribusi dalam dakwah dan pemberdayaan masyarakat menuju
                                        kehidupan yang lebih baik.
                                    </p>
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard delay={0.3}>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-emerald-500/20 rounded-xl">
                                    <Lightbulb className="w-6 h-6 text-emerald-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-2">Misi</h3>
                                    <p className="text-gray-400 text-sm">
                                        Mencetak kader muslim sejati yang memiliki keseimbangan antara
                                        ilmu pengetahuan (akademis) dan agama.
                                    </p>
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard delay={0.4}>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-emerald-500/20 rounded-xl">
                                    <Heart className="w-6 h-6 text-emerald-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-2">Karakter</h3>
                                    <p className="text-gray-400 text-sm">
                                        Membentuk karakter luhur, profesional, dan religius dengan tetap
                                        memegang teguh sikap toleransi.
                                    </p>
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </div>
        </section>
    );
}


// ============================================
// PROGRAM SECTION
// ============================================
export function ProgramSection() {
    const programs = [
        {
            icon: BookOpen,
            title: 'Kajian Al-Qur\'an & Hadits',
            description: 'Kurikulum berbasis Al-Qur\'an dan Al-Hadits dengan metode pembelajaran intensif.',
        },
        {
            icon: Users,
            title: 'Bimbingan Ulama Ahli',
            description: 'Dibimbing langsung oleh Ustadz atau Ulama yang ahli di bidang Tafsir.',
        },
        {
            icon: GraduationCap,
            title: 'Pendidikan Karakter',
            description: 'Pendidikan karakter sebagai landasan utama dalam kehidupan bermasyarakat.',
        },
        {
            icon: Heart,
            title: 'Budaya Komunikatif',
            description: 'Membangun budaya komunikatif antara pengasuh asrama dan santri.',
        },
    ];

    return (
        <section id="program" className="py-24 relative">
            <div className="absolute inset-0 islamic-pattern opacity-30" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-emerald-400 font-medium mb-2 block">Program Kami</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Program Pendidikan
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Program pendidikan yang dirancang untuk mencetak generasi Muslim yang berilmu dan berakhlak
                    </p>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {programs.map((program, index) => (
                        <GlassCard key={index} delay={index * 0.1} className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-500/20 to-emerald-700/20 rounded-2xl flex items-center justify-center">
                                <program.icon className="w-8 h-8 text-emerald-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">{program.title}</h3>
                            <p className="text-gray-400 text-sm">{program.description}</p>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ============================================
// FACILITIES SECTION
// ============================================
export function FacilitiesSection() {
    const facilities = [
        {
            icon: Building2,
            title: 'Masjid',
            description: 'Sarana utama peribadatan yang menjadi pusat kegiatan pesantren.',
        },
        {
            icon: Building,
            title: 'Gedung Asrama Putri',
            description: 'Ruang belajar nyaman, kamar bernuansa Islami, dan sistem keamanan terjamin.',
        },
        {
            icon: Home,
            title: 'Gedung Asrama Putra',
            description: 'Terletak di sebelah barat masjid dengan fasilitas lengkap setara asrama putri.',
        },
        {
            icon: DoorOpen,
            title: 'Ruang Kelas Terpisah',
            description: 'Desain khusus dengan dua akses pintu terpisah untuk santri putra dan putri.',
        },
        {
            icon: Car,
            title: 'Area Parkir Luas',
            description: 'Area parkir yang luas untuk kenyamanan santri dan pengunjung.',
        },
        {
            icon: Users,
            title: 'Ruang Tamu',
            description: 'Ruang tamu yang nyaman untuk menerima kunjungan keluarga santri.',
        },
    ];

    return (
        <section id="fasilitas" className="py-24 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-emerald-400 font-medium mb-2 block">Fasilitas</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Fasilitas Modern & Islami
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Dilengkapi fasilitas yang mengedepankan kenyamanan dan nilai-nilai Islami
                    </p>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {facilities.map((facility, index) => (
                        <GlassCard key={index} delay={index * 0.1}>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-emerald-500/20 rounded-xl flex-shrink-0">
                                    <facility.icon className="w-6 h-6 text-emerald-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-1">{facility.title}</h3>
                                    <p className="text-gray-400 text-sm">{facility.description}</p>
                                </div>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ============================================
// CONTACT SECTION
// ============================================
export function ContactSection() {
    return (
        <section id="kontak" className="py-24 relative">
            <div className="absolute inset-0 islamic-pattern opacity-30" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-emerald-400 font-medium mb-2 block">Kontak</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Hubungi Kami
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Kunjungi lokasi kami atau hubungi untuk informasi lebih lanjut
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <GlassCard delay={0.1}>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-emerald-500/20 rounded-xl">
                                    <MapPin className="w-6 h-6 text-emerald-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-1">Alamat</h3>
                                    <p className="text-gray-400">
                                        Jl. Bijaksana 2 No. 8, Pasteur<br />
                                        Kecamatan Sukajadi, Kota Bandung<br />
                                        Jawa Barat
                                    </p>
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard delay={0.2}>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-emerald-500/20 rounded-xl">
                                    <Phone className="w-6 h-6 text-emerald-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-1">Telepon</h3>
                                    <p className="text-gray-400">+62 878-8982-7126</p>
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard delay={0.3}>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-emerald-500/20 rounded-xl">
                                    <Mail className="w-6 h-6 text-emerald-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-1">Email</h3>
                                    <p className="text-gray-400">ppmminhajulhaq@gmail.com</p>
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard delay={0.4}>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-emerald-500/20 rounded-xl">
                                    <Youtube className="w-6 h-6 text-emerald-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-1">YouTube</h3>
                                    <a
                                        href="https://youtu.be/E0k9bXSnx58?si=tqQqPlSH98MICGJe"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-emerald-400 hover:text-emerald-300 transition"
                                    >
                                        Lihat Video Profil →
                                    </a>
                                </div>
                            </div>
                        </GlassCard>
                    </div>

                    {/* Map */}
                    <GlassCard delay={0.2} className="min-h-[400px] p-0 overflow-hidden">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.0!2d107.5934!3d-6.8877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTMnMTUuNyJTIDEwN8KwMzUnMzYuMCJF!5e0!3m2!1sen!2sid!4v1234567890"
                            width="100%"
                            height="100%"
                            style={{ border: 0, minHeight: '400px' }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="rounded-3xl"
                        />
                    </GlassCard>
                </div>
            </div>
        </section>
    );
}
