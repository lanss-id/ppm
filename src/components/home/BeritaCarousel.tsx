'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Berita } from '@/lib/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade, Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

export default function BeritaCarousel() {
    const [beritaList, setBeritaList] = useState<Berita[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBerita() {
            try {
                const { data, error } = await supabase
                    .from('berita')
                    .select('*')
                    .eq('status', 'published')
                    .order('published_at', { ascending: false })
                    .limit(6);

                if (error) throw error;
                setBeritaList(data || []);
            } catch (error) {
                console.error('Error fetching berita:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchBerita();
    }, []);

    if (loading) {
        return (
            <section className="py-20 bg-gradient-to-b from-gray-950 to-gray-900">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center">
                        <div className="animate-pulse">
                            <div className="h-8 bg-gray-800 rounded w-48 mx-auto mb-4"></div>
                            <div className="h-64 bg-gray-800 rounded-2xl"></div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (beritaList.length === 0) {
        return null; // Don't show section if no berita
    }

    return (
        <section id="berita" className="py-20  overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="inline-block px-4 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-full text-sm font-medium mb-4">
                        Berita & Aktivitas
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Kegiatan Terbaru
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Ikuti perkembangan kegiatan dan aktivitas di PPM Minhajul Haq
                    </p>
                </motion.div>

                {/* Main Carousel */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <Swiper
                        modules={[Autoplay, Pagination, Navigation]}
                        spaceBetween={24}
                        slidesPerView={1}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        className="berita-swiper pb-12"
                    >
                        {beritaList.map((berita, index) => (
                            <SwiperSlide key={berita.id}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group relative backdrop-blur-sm rounded-2xl overflow-hidden border border-emerald-900 hover:border-emerald-500/50 transition-all duration-300"
                                >
                                    {/* Image */}
                                    <div className="relative h-48 overflow-hidden">
                                        {berita.image_url ? (
                                            <img
                                                src={berita.image_url}
                                                alt={berita.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center">
                                                <span className="text-6xl">📰</span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />

                                        {/* Category Badge */}
                                        <span className="absolute top-4 left-4 px-3 py-1 bg-emerald-500/90 text-white text-xs font-medium rounded-full capitalize">
                                            {berita.category}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                                            <Calendar size={14} />
                                            <span>
                                                {new Date(berita.published_at || berita.created_at).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })}
                                            </span>
                                        </div>

                                        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-emerald-400 transition-colors">
                                            {berita.title}
                                        </h3>

                                        <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                                            {berita.excerpt || berita.content.substring(0, 120)}...
                                        </p>

                                        <Link
                                            href={`#berita-${berita.id}`}
                                            className="inline-flex items-center gap-2 text-emerald-400 text-sm font-medium hover:text-emerald-300 transition-colors group/link"
                                        >
                                            Baca Selengkapnya
                                            <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </motion.div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </motion.div>

                {/* View All Link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-center mt-8"
                >
                    <Link
                        href="#semua-berita"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500/10 text-emerald-400 rounded-xl hover:bg-emerald-500/20 transition-colors font-medium"
                    >
                        Lihat Semua Berita
                        <ArrowRight size={18} />
                    </Link>
                </motion.div>
            </div>

            {/* Custom Swiper Styles */}
            <style jsx global>{`
                .berita-swiper .swiper-pagination-bullet {
                    background: rgba(16, 185, 129, 0.3);
                    opacity: 1;
                }
                .berita-swiper .swiper-pagination-bullet-active {
                    background: rgb(16, 185, 129);
                }
                .berita-swiper .swiper-button-prev,
                .berita-swiper .swiper-button-next {
                    color: rgb(16, 185, 129);
                    background: rgba(0, 0, 0, 0.5);
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    backdrop-filter: blur(4px);
                }
                .berita-swiper .swiper-button-prev:after,
                .berita-swiper .swiper-button-next:after {
                    font-size: 18px;
                    font-weight: bold;
                }
                .berita-swiper .swiper-button-prev:hover,
                .berita-swiper .swiper-button-next:hover {
                    background: rgba(16, 185, 129, 0.2);
                }
            `}</style>
        </section>
    );
}
