'use client';

import { useEffect, useState } from 'react';
import { AdminHeader } from '@/components/admin/Header';
import { supabase } from '@/lib/supabase';
import { Santri, Pendaftaran } from '@/lib/types';
import {
    Users, UserPlus, Newspaper, CheckCircle, ArrowUp, Clock,
    Check, X, Eye, Edit2, Trash2, GraduationCap, Phone
} from 'lucide-react';
import Link from 'next/link';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

interface DashboardStats {
    totalSantri: number;
    pendingPendaftaran: number;
    publishedBerita: number;
    santriAktif: number;
}

interface Activity {
    id: string;
    type: 'pendaftaran' | 'approval' | 'berita' | 'update' | 'santri';
    title: string;
    description: string;
    time: string;
    created_at: string;
}

interface ChartDataPoint {
    month: string;
    count: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats>({
        totalSantri: 0,
        pendingPendaftaran: 0,
        publishedBerita: 0,
        santriAktif: 0,
    });
    const [loading, setLoading] = useState(true);
    const [pendingList, setPendingList] = useState<Pendaftaran[]>([]);
    const [recentSantri, setRecentSantri] = useState<Santri[]>([]);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [chartData, setChartData] = useState<ChartDataPoint[]>([]);

    // Format relative time
    const formatRelativeTime = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Baru saja';
        if (diffMins < 60) return `${diffMins} menit lalu`;
        if (diffHours < 24) return `${diffHours} jam lalu`;
        if (diffDays < 7) return `${diffDays} hari lalu`;
        return date.toLocaleDateString('id-ID');
    };

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch stats
                const [santriRes, pendaftaranRes, beritaRes, santriAktifRes] = await Promise.all([
                    supabase.from('santri').select('id', { count: 'exact', head: true }),
                    supabase.from('pendaftaran').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
                    supabase.from('berita').select('id', { count: 'exact', head: true }).eq('status', 'published'),
                    supabase.from('santri').select('id', { count: 'exact', head: true }).eq('status', 'aktif'),
                ]);

                setStats({
                    totalSantri: santriRes.count || 0,
                    pendingPendaftaran: pendaftaranRes.count || 0,
                    publishedBerita: beritaRes.count || 0,
                    santriAktif: santriAktifRes.count || 0,
                });

                // Fetch pending pendaftaran for cards
                const { data: pendingData } = await supabase
                    .from('pendaftaran')
                    .select('*')
                    .eq('status', 'pending')
                    .order('created_at', { ascending: false })
                    .limit(3);
                setPendingList(pendingData || []);

                // Fetch recent santri for table
                const { data: santriData } = await supabase
                    .from('santri')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(5);
                setRecentSantri(santriData || []);

                // Build dynamic activities from real data
                const activityList: Activity[] = [];

                // Get recent pendaftaran
                const { data: recentPendaftaran } = await supabase
                    .from('pendaftaran')
                    .select('id, nama, status, created_at')
                    .order('created_at', { ascending: false })
                    .limit(3);

                recentPendaftaran?.forEach((p) => {
                    if (p.status === 'pending') {
                        activityList.push({
                            id: `pendaftaran-${p.id}`,
                            type: 'pendaftaran',
                            title: 'Pendaftaran Baru',
                            description: `${p.nama} mendaftar`,
                            time: formatRelativeTime(p.created_at),
                            created_at: p.created_at,
                        });
                    } else if (p.status === 'approved') {
                        activityList.push({
                            id: `approval-${p.id}`,
                            type: 'approval',
                            title: 'Approval',
                            description: `${p.nama} disetujui`,
                            time: formatRelativeTime(p.created_at),
                            created_at: p.created_at,
                        });
                    }
                });

                // Get recent berita
                const { data: recentBerita } = await supabase
                    .from('berita')
                    .select('id, title, status, created_at')
                    .order('created_at', { ascending: false })
                    .limit(2);

                recentBerita?.forEach((b) => {
                    activityList.push({
                        id: `berita-${b.id}`,
                        type: 'berita',
                        title: b.status === 'published' ? 'Berita Dipublish' : 'Berita Draft',
                        description: b.title,
                        time: formatRelativeTime(b.created_at),
                        created_at: b.created_at,
                    });
                });

                // Get recent santri updates
                const { data: recentSantriActivity } = await supabase
                    .from('santri')
                    .select('id, nama, created_at')
                    .order('created_at', { ascending: false })
                    .limit(2);

                recentSantriActivity?.forEach((s) => {
                    activityList.push({
                        id: `santri-${s.id}`,
                        type: 'santri',
                        title: 'Santri Baru',
                        description: `${s.nama} ditambahkan`,
                        time: formatRelativeTime(s.created_at),
                        created_at: s.created_at,
                    });
                });

                // Sort activities by created_at and take top 5
                activityList.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
                setActivities(activityList.slice(0, 5));

                // Build chart data - count pendaftaran per month for last 6 months
                const months = [];
                const now = new Date();
                for (let i = 5; i >= 0; i--) {
                    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
                    months.push({
                        month: date.toLocaleDateString('id-ID', { month: 'short' }),
                        year: date.getFullYear(),
                        monthNum: date.getMonth(),
                    });
                }

                // Fetch all pendaftaran for chart
                const { data: allPendaftaran } = await supabase
                    .from('pendaftaran')
                    .select('created_at')
                    .gte('created_at', new Date(now.getFullYear(), now.getMonth() - 5, 1).toISOString());

                const chartPoints: ChartDataPoint[] = months.map((m) => {
                    const count = allPendaftaran?.filter((p) => {
                        const date = new Date(p.created_at);
                        return date.getMonth() === m.monthNum && date.getFullYear() === m.year;
                    }).length || 0;
                    return { month: m.month, count };
                });

                setChartData(chartPoints);

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const handleApprove = async (id: string) => {
        try {
            await supabase.from('pendaftaran').update({ status: 'approved', reviewed_at: new Date().toISOString() }).eq('id', id);
            setPendingList(prev => prev.filter(p => p.id !== id));
            setStats(prev => ({ ...prev, pendingPendaftaran: prev.pendingPendaftaran - 1 }));
        } catch (error) {
            console.error('Error approving:', error);
        }
    };

    const handleReject = async (id: string) => {
        try {
            await supabase.from('pendaftaran').update({ status: 'rejected', reviewed_at: new Date().toISOString() }).eq('id', id);
            setPendingList(prev => prev.filter(p => p.id !== id));
            setStats(prev => ({ ...prev, pendingPendaftaran: prev.pendingPendaftaran - 1 }));
        } catch (error) {
            console.error('Error rejecting:', error);
        }
    };

    const getActivityIcon = (type: Activity['type']) => {
        const icons = {
            pendaftaran: { icon: UserPlus, bg: 'bg-blue-100', color: 'text-blue-600' },
            approval: { icon: Check, bg: 'bg-green-100', color: 'text-green-600' },
            berita: { icon: Newspaper, bg: 'bg-purple-100', color: 'text-purple-600' },
            update: { icon: Edit2, bg: 'bg-amber-100', color: 'text-amber-600' },
            santri: { icon: Users, bg: 'bg-emerald-100', color: 'text-emerald-600' },
        };
        return icons[type];
    };

    const getStatusBadge = (status: string) => {
        const styles: Record<string, string> = {
            aktif: 'bg-green-100 text-green-700',
            alumni: 'bg-blue-100 text-blue-700',
            cuti: 'bg-yellow-100 text-yellow-700',
        };
        return styles[status] || 'bg-gray-100 text-gray-700';
    };

    const statCards = [
        {
            title: 'Total Santri',
            value: stats.totalSantri,
            icon: Users,
            color: 'from-blue-500 to-blue-600',
            subtitle: '12% dari bulan lalu',
            subtitleIcon: ArrowUp,
        },
        {
            title: 'Pendaftaran Baru',
            value: stats.pendingPendaftaran,
            icon: UserPlus,
            color: 'from-amber-500 to-amber-600',
            subtitle: 'Menunggu review',
            subtitleIcon: Clock,
        },
        {
            title: 'Berita Published',
            value: stats.publishedBerita,
            icon: Newspaper,
            color: 'from-purple-500 to-purple-600',
            subtitle: 'Bulan ini',
            subtitleIcon: null,
        },
    ];

    // Chart.js configuration
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12,
                titleFont: { size: 14 },
                bodyFont: { size: 13 },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: 'rgba(0, 0, 0, 0.05)' },
                ticks: { stepSize: 1 },
            },
            x: {
                grid: { display: false },
            },
        },
    };

    const chartDataConfig = {
        labels: chartData.map(d => d.month),
        datasets: [
            {
                label: 'Pendaftaran',
                data: chartData.map(d => d.count),
                borderColor: 'rgb(16, 185, 129)',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                fill: true,
                pointBackgroundColor: 'rgb(16, 185, 129)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7,
            },
        ],
    };

    return (
        <div className="flex flex-col h-full">
            <AdminHeader title="Dashboard Overview" />

            <div className="flex-1 p-6 overflow-y-auto space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {statCards.map((card, index) => (
                        <div
                            key={index}
                            className={`bg-gradient-to-br ${card.color} text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1`}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <p className="text-white/80 text-sm">{card.title}</p>
                                    <h3 className="text-4xl font-bold">
                                        {loading ? '...' : card.value}
                                    </h3>
                                </div>
                                <div className="p-4 bg-white/20 rounded-xl">
                                    <card.icon className="w-8 h-8" />
                                </div>
                            </div>
                            <div className="flex items-center text-sm text-white/80">
                                {card.subtitleIcon && <card.subtitleIcon className="w-4 h-4 mr-1" />}
                                <span>{card.subtitle}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts & Activity Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Chart with Chart.js */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-800">Statistik Pendaftaran</h3>
                            <span className="text-sm text-gray-500">6 Bulan Terakhir</span>
                        </div>
                        <div className="h-64">
                            {loading ? (
                                <div className="h-full flex items-center justify-center text-gray-400">
                                    Memuat chart...
                                </div>
                            ) : (
                                <Line options={chartOptions} data={chartDataConfig} />
                            )}
                        </div>
                    </div>

                    {/* Recent Activities - Dynamic */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <h3 className="text-xl font-bold text-gray-800 mb-6">Aktivitas Terbaru</h3>
                        <div className="space-y-4">
                            {loading ? (
                                <div className="text-center py-4 text-gray-400">Memuat aktivitas...</div>
                            ) : activities.length === 0 ? (
                                <div className="text-center py-4 text-gray-400">Belum ada aktivitas</div>
                            ) : (
                                activities.map((activity) => {
                                    const iconData = getActivityIcon(activity.type);
                                    return (
                                        <div key={activity.id} className="flex items-start gap-3">
                                            <div className={`p-2 rounded-lg ${iconData.bg}`}>
                                                <iconData.icon className={`w-4 h-4 ${iconData.color}`} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-gray-800">{activity.title}</p>
                                                <p className="text-xs text-gray-500 truncate">{activity.description}</p>
                                                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                        <Link href="/admin/pendaftaran" className="block w-full mt-4 text-emerald-600 hover:text-emerald-700 text-sm font-semibold text-center">
                            Lihat Semua →
                        </Link>
                    </div>
                </div>

                {/* Pending Approvals */}
                {pendingList.length > 0 && (
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-800">
                                Pendaftaran Menunggu Review ({stats.pendingPendaftaran})
                            </h3>
                            <Link
                                href="/admin/pendaftaran"
                                className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-emerald-700 transition flex items-center gap-2"
                            >
                                <Eye size={16} />
                                Lihat Semua
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {pendingList.map((item) => (
                                <div
                                    key={item.id}
                                    className="border-2 border-emerald-200 rounded-xl p-4 hover:border-emerald-400 transition"
                                >
                                    <div className="flex items-center mb-3">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white font-bold mr-3">
                                            {item.nama.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800">{item.nama}</h4>
                                            <p className="text-xs text-gray-500">
                                                {new Date(item.created_at).toLocaleDateString('id-ID')}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="space-y-1 text-sm text-gray-600 mb-3">
                                        <p className="flex items-center gap-2">
                                            <GraduationCap className="w-4 h-4 text-emerald-600" />
                                            {item.kampus}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <Phone className="w-4 h-4 text-emerald-600" />
                                            {item.phone}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleApprove(item.id)}
                                            className="flex-1 flex items-center justify-center gap-1 bg-emerald-500 text-white py-2 rounded-lg text-sm hover:bg-emerald-600 transition"
                                        >
                                            <Check size={16} /> Approve
                                        </button>
                                        <button
                                            onClick={() => handleReject(item.id)}
                                            className="flex-1 flex items-center justify-center gap-1 bg-red-500 text-white py-2 rounded-lg text-sm hover:bg-red-600 transition"
                                        >
                                            <X size={16} /> Reject
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Recent Santri Table */}
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-800">Data Santri Terbaru</h3>
                        <div className="flex gap-2">
                            <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-emerald-600 transition">
                                📊 Export Excel
                            </button>
                            <Link
                                href="/admin/santri"
                                className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-emerald-700 transition"
                            >
                                + Tambah Santri
                            </Link>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">No</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Nama</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">NIS</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Kampus</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Angkatan</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {loading ? (
                                    <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-500">Memuat data...</td></tr>
                                ) : recentSantri.length === 0 ? (
                                    <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-500">Belum ada data santri</td></tr>
                                ) : (
                                    recentSantri.map((santri, index) => (
                                        <tr key={santri.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 text-sm">{index + 1}</td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center">
                                                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-semibold text-sm mr-3">
                                                        {santri.nama.charAt(0).toUpperCase()}
                                                    </div>
                                                    <span className="font-medium text-gray-800">{santri.nama}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-600">{santri.nis}</td>
                                            <td className="px-4 py-3 text-sm text-gray-600">{santri.kampus}</td>
                                            <td className="px-4 py-3 text-sm text-gray-600">{santri.angkatan}</td>
                                            <td className="px-4 py-3">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusBadge(santri.status)}`}>
                                                    {santri.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex gap-2">
                                                    <button className="text-blue-600 hover:text-blue-700" title="View">
                                                        <Eye size={16} />
                                                    </button>
                                                    <Link href="/admin/santri" className="text-amber-600 hover:text-amber-700" title="Edit">
                                                        <Edit2 size={16} />
                                                    </Link>
                                                    <button className="text-red-600 hover:text-red-700" title="Delete">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex items-center justify-between mt-6">
                        <p className="text-sm text-gray-600">Showing 1-{recentSantri.length} of {stats.totalSantri} santri</p>
                        <Link href="/admin/santri" className="text-emerald-600 hover:text-emerald-700 text-sm font-semibold">
                            Lihat Semua Santri →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
