/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Factory, 
  Construction, 
  Zap, 
  HardHat, 
  Users, 
  Phone, 
  Mail, 
  MapPin, 
  ChevronRight, 
  Menu, 
  X,
  LayoutDashboard,
  Briefcase,
  MessageSquare,
  Settings,
  LogOut,
  Filter,
  ArrowRight,
  CheckCircle2,
  BarChart3,
  FileText,
  ShieldCheck,
  Utensils,
  Shirt,
  Clock,
  Award,
  Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  year: number;
  location: string;
  status: string;
  image_url: string;
}

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

// --- Components ---

const IconMap: Record<string, any> = {
  Building2, Factory, Construction, Zap, HardHat, Users, Utensils, Shirt
};

const Logo = ({ className = "w-10 h-10", isScrolled = false }: { className?: string, isScrolled?: boolean }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 30C20 24.4772 24.4772 20 30 20H70C75.5228 20 80 24.4772 80 30V70C80 75.5228 75.5228 80 70 80H30C24.4772 80 20 75.5228 20 70V30Z" fill={isScrolled ? "#006B3F" : "white"} fillOpacity="0.1"/>
    <path d="M35 35H45V45H35V35Z" fill="#006B3F"/>
    <path d="M35 45H55V55H35V45Z" fill="#006B3F"/>
    <path d="M45 55H55V65H45V55Z" fill="#006B3F"/>
    <path d="M55 35H65V65H55V35Z" fill="#F28E1E"/>
    <path d="M45 35H55V45H45V35Z" fill="#F28E1E"/>
    <text x="50" y="85" textAnchor="middle" fontSize="12" fontWeight="bold" fill={isScrolled ? "#006B3F" : "white"} fontFamily="Outfit">SM</text>
  </svg>
);

const Navbar = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Beranda' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'contact', label: 'Kontak' },
    { id: 'admin', label: 'Admin' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
          <Logo isScrolled={isScrolled} className="w-12 h-12" />
          <div className="flex flex-col">
            <span className={`text-xl font-bold tracking-tight leading-none ${isScrolled ? 'text-slate-900' : 'text-white'}`}>SRIKARYA</span>
            <span className={`text-[10px] font-bold tracking-[0.3em] uppercase ${isScrolled ? 'text-primary' : 'text-secondary'}`}>MANDIRI</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`text-sm font-medium transition-colors hover:text-secondary ${
                activeTab === item.id 
                  ? 'text-secondary' 
                  : isScrolled ? 'text-slate-600' : 'text-white/80'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button 
            onClick={() => setActiveTab('contact')}
            className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-lg shadow-primary/20"
          >
            Konsultasi Gratis
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className={isScrolled ? 'text-slate-900' : 'text-white'} /> : <Menu className={isScrolled ? 'text-slate-900' : 'text-white'} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl border-t border-slate-100 p-6 flex flex-col gap-4 md:hidden"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
                className={`text-left text-lg font-medium ${activeTab === item.id ? 'text-blue-600' : 'text-slate-600'}`}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onContact }: { onContact: () => void }) => (
  <section className="relative h-screen flex items-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://picsum.photos/seed/srikarya-hero/1920/1080?brightness=0.3" 
        className="w-full h-full object-cover"
        alt="Hero background"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/40" />
    </div>
    
    <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl"
      >
        <div className="flex items-center gap-4 mb-8">
          <Logo className="w-16 h-16" />
          <div className="h-12 w-px bg-white/20" />
          <span className="text-white/80 text-sm font-bold uppercase tracking-[0.2em]">General Contractor & Supplier</span>
        </div>
        <span className="inline-block px-4 py-1.5 bg-secondary/20 border border-secondary/30 rounded-full text-secondary text-xs font-bold uppercase tracking-widest mb-6">
          Kerja Aman, Karya Berkualitas
        </span>
        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
          Solusi <span className="text-secondary">Konstruksi</span> & Suplai Terpercaya
        </h1>
        <p className="text-lg text-slate-200 mb-10 leading-relaxed">
          CV SRIKARYA MANDIRI hadir sebagai mitra strategis untuk mendukung keberhasilan proyek industri, konstruksi sipil, mechanical electrical, hingga penyediaan jasa boga di seluruh Indonesia.
        </p>
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={onContact}
            className="bg-secondary hover:bg-secondary/90 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center gap-2 group shadow-xl shadow-secondary/20"
          >
            Hubungi Kami
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg transition-all">
            Cakupan Layanan
          </button>
        </div>
      </motion.div>
    </div>
  </section>
);

const About = () => (
  <section className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center p-12 bg-slate-50 rounded-3xl border border-slate-100 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Logo className="w-64 h-64 relative z-10" isScrolled={true} />
          <div className="absolute -bottom-10 -right-10 bg-primary p-8 rounded-3xl text-white shadow-xl hidden lg:block">
            <p className="text-4xl font-bold mb-1">K3</p>
            <p className="text-sm font-medium opacity-80 uppercase tracking-wider">Budaya Utama Kami</p>
          </div>
        </motion.div>

        <div>
          <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">Tentang Perusahaan</h2>
          <h3 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">Mitra Terpercaya untuk Berbagai Kebutuhan Proyek</h3>
          <p className="text-slate-600 mb-8 leading-relaxed">
            CV Srikarya Mandiri merupakan perusahaan yang bergerak dibidang General Contractor dan General supplier juga jasa boga (Catering). Kami berkomitmen memberikan pelayanan terbaik dengan mengutamakan kualitas pekerjaan, ketepatan waktu, dan keselamatan kerja.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            <div className="flex gap-4">
              <div className="bg-primary/5 p-3 rounded-xl h-fit">
                <ShieldCheck className="text-primary w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Kualitas & K3</h4>
                <p className="text-xs text-slate-500">Menjadikan K3 sebagai budaya utama dalam setiap aktivitas proyek.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-primary/5 p-3 rounded-xl h-fit">
                <Zap className="text-primary w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Tepat Waktu</h4>
                <p className="text-xs text-slate-500">Menyelesaikan pekerjaan secara tepat waktu, efisien dan bertanggung jawab.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-primary/5 p-3 rounded-xl h-fit">
                <Users className="text-primary w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Tim Profesional</h4>
                <p className="text-xs text-slate-500">Didukung oleh tim yang berpengalaman dan manajemen yang profesional.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-primary/5 p-3 rounded-xl h-fit">
                <Award className="text-primary w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Integritas</h4>
                <p className="text-xs text-slate-500">Berintegritas tinggi dalam memberikan layanan konstruksi dan pengadaan.</p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-slate-50 rounded-2xl border-l-4 border-secondary mb-8">
            <h4 className="font-bold text-primary mb-2 italic">"Kerja Aman, Karya Berkualitas"</h4>
            <p className="text-sm text-slate-600">Visi kami adalah menjadi perusahaan kontraktor dan supplier yang profesional, kompetitif, dan berintegritas tinggi.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const WhyChooseUs = () => (
  <section className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">Keunggulan Kami</h2>
        <h3 className="text-4xl font-bold text-slate-900 mb-6">Alasan Tepat Memilih CV SRIKARYA MANDIRI</h3>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { title: 'Fokus Keselamatan (K3)', desc: 'Standar keselamatan yang jelas dan terukur untuk menjaga keamanan tenaga kerja.', icon: ShieldCheck },
          { title: 'Layanan Lengkap', desc: 'Menyediakan jasa konstruksi, MEP, katering, hingga seragam kerja secara efisien.', icon: LayoutDashboard },
          { title: 'Kualitas & Tepat Waktu', desc: 'Pekerjaan diselesaikan sesuai spesifikasi teknis, standar mutu, dan jadwal.', icon: Clock },
          { title: 'Tim Profesional', desc: 'Didukung tenaga kerja kompeten yang terbiasa bekerja dengan tuntutan tinggi.', icon: Users },
          { title: 'Fleksibel & Administrasi', desc: 'Penawaran jelas, konsultasi awal, dan dukungan administrasi proyek yang lengkap.', icon: FileText },
        ].map((item, idx) => (
          <div key={idx} className="p-8 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all">
            <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
              <item.icon className="text-primary w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 mb-3">{item.title}</h4>
            <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const HSESection = () => (
  <section className="py-24 bg-primary text-white overflow-hidden relative">
    <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/10 -skew-x-12 translate-x-1/2" />
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-sm font-bold text-secondary uppercase tracking-widest mb-4">K3 / HSE</h2>
          <h3 className="text-4xl font-bold mb-8">Komitmen Keselamatan & Kesehatan Kerja</h3>
          <p className="text-primary-foreground/80 mb-10 leading-relaxed">
            Kami menerapkan sistem K3 secara konsisten di setiap lini pekerjaan untuk memastikan lingkungan kerja yang aman bagi semua pihak.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              'Safety Induction & Briefing',
              'Penggunaan APD Lengkap',
              'Inspeksi Alat & Lingkungan',
              'Job Safety Analysis (JSA)',
              'Pengawasan Safety Officer',
              'Budaya Kerja Aman'
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-white/10 p-4 rounded-xl border border-white/10">
                <CheckCircle2 className="text-secondary w-5 h-5 shrink-0" />
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <img 
            src="https://picsum.photos/seed/safety/800/600" 
            className="rounded-3xl shadow-2xl border-8 border-white/10"
            alt="Safety first"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -top-6 -left-6 bg-secondary text-white p-6 rounded-2xl shadow-xl font-bold text-center">
            <ShieldCheck className="w-8 h-8 mx-auto mb-2" />
            <p className="text-xs uppercase tracking-tighter">Safety First</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const LegalSection = () => (
  <section className="py-24 bg-slate-50">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">Legalitas</h2>
          <h3 className="text-4xl font-bold text-slate-900 mb-8">Dokumen & Perizinan Resmi</h3>
          <p className="text-slate-600 mb-10 leading-relaxed">
            Sebagai perusahaan profesional, kami menjamin seluruh aspek legalitas usaha kami telah terpenuhi sesuai dengan regulasi pemerintah Republik Indonesia.
          </p>
          <div className="space-y-4">
            {[
              { label: 'NIB (Nomor Induk Berusaha)', code: '2801260150259' },
              { label: 'NPWP', code: '1000 0000 0795 1469' },
              { label: 'Izin Lokasi & Lingkungan (SPPL)', status: 'Terbit' },
              { label: 'Sertifikat Standar Usaha', status: 'Aktif' }
            ].map((doc, idx) => (
              <div key={idx} className="flex justify-between items-center p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3">
                  <FileText className="text-primary w-5 h-5" />
                  <span className="font-bold text-slate-700 text-sm">{doc.label}</span>
                </div>
                <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-500">
                  {doc.code || doc.status}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="bg-white p-2 rounded-2xl shadow-md border border-slate-100">
              <img src="https://picsum.photos/seed/doc1/400/500" className="rounded-xl grayscale hover:grayscale-0 transition-all" alt="Document" referrerPolicy="no-referrer" />
            </div>
            <div className="bg-white p-2 rounded-2xl shadow-md border border-slate-100">
              <img src="https://picsum.photos/seed/doc2/400/300" className="rounded-xl grayscale hover:grayscale-0 transition-all" alt="Document" referrerPolicy="no-referrer" />
            </div>
          </div>
          <div className="space-y-4 pt-8">
            <div className="bg-white p-2 rounded-2xl shadow-md border border-slate-100">
              <img src="https://picsum.photos/seed/doc3/400/300" className="rounded-xl grayscale hover:grayscale-0 transition-all" alt="Document" referrerPolicy="no-referrer" />
            </div>
            <div className="bg-white p-2 rounded-2xl shadow-md border border-slate-100">
              <img src="https://picsum.photos/seed/doc4/400/500" className="rounded-xl grayscale hover:grayscale-0 transition-all" alt="Document" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Services = ({ services }: { services: Service[] }) => (
  <section className="py-24 bg-slate-50">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">Layanan Kami</h2>
        <h3 className="text-4xl font-bold text-slate-900 mb-6">Cakupan Layanan Profesional & Terintegrasi</h3>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, idx) => {
          const Icon = IconMap[service.icon] || Building2;
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all group border border-slate-100"
            >
              <div className="bg-primary/5 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary transition-colors">
                <Icon className="text-primary w-8 h-8 group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h4>
              <p className="text-slate-500 mb-8 text-sm leading-relaxed">
                {service.description}
              </p>
              <button className="text-sm font-bold text-primary flex items-center gap-2 group-hover:gap-3 transition-all">
                Detail Layanan <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

const ServiceScopeContent = () => {
  const categories = [
    {
      title: 'Proyek & Konstruksi',
      items: ['Pekerjaan Konstruksi Sipil dan Bangunan', 'Renovasi dan Perawatan Bangunan', 'Pekerjaan Finishing serta Perbaikan Bangunan'],
      icon: Building2
    },
    {
      title: 'Pekerjaan Sipil Industri',
      items: ['Pembangunan Lantai Produksi (Beton Bertulang, Epoxy Floor)', 'Pondasi Mesin & Equipment (Machine Foundation)', 'Struktur Bangunan Pabrik & Gudang', 'Drainase Area Produksi & Utilitas', 'Jalan Area Industri & Loading Dock'],
      icon: Factory
    },
    {
      title: 'Pekerjaan Struktur',
      items: ['Struktur Baja Ringan & Berat', 'Platform Kerja & Catwalk', 'Tangga Industri & Handrail/Ralling', 'Dudukan Pipa & Pipe Support', 'Canopy & Shelter Area Mesin'],
      icon: Construction
    },
    {
      title: 'Pekerjaan Mechanical',
      items: ['Instalasi Mesin Produksi', 'Instalasi Pompa Industri', 'Conveyor System', 'HVAC Area Produksi', 'Alignment & Commissioning Mesin'],
      icon: Settings
    },
    {
      title: 'Pekerjaan Electrical',
      items: ['Instalasi Listrik Industri', 'Panel Listrik LV/MV', 'Cable Tray & Cable Ladder', 'Penerangan Area Produksi', 'Sistem Grounding & Penangkal Petir'],
      icon: Zap
    },
    {
      title: 'Pekerjaan Plumbing & Piping',
      items: ['Instalasi Pipa Proses', 'Instalasi Pipa Air Bersih & Air Kotor', 'Pipa Hydrant & Fire Fighting', 'Pipa Compressed Air', 'Pipa Steam & Condensate'],
      icon: HardHat
    },
    {
      title: 'Mechanical, Electrical, and Plumbing (MEP)',
      items: ['Instalasi Sistem Listrik', 'Instalasi Mekanikal', 'Instalasi Plumbing', 'Perawatan dan Perbaikan Sistem MEP'],
      icon: Briefcase
    },
    {
      title: 'Pekerjaan Fire Protection',
      items: ['Sistem Hydrant & Sprinkler', 'Fire Pump & Jockey Pump', 'Fire Alarm & Smoke Detector', 'APAR & Fire Cabinet', 'Uji Fungsi & Commissioning Sistem Kebakaran'],
      icon: ShieldCheck
    },
    {
      title: 'Pekerjaan Welding & Fabrication',
      items: ['Pengelasan Pipa & Struktur', 'Fabrikasi Pipe Support', 'Fabrikasi Ralling & Platform', 'Painting & Coating Industri'],
      icon: Factory
    },
    {
      title: 'Pekerjaan Maintenance & Shutdown',
      items: ['Layanan pemeliharaan rutin dan perbaikan besar selama masa shutdown operasional pabrik.'],
      icon: Clock
    },
    {
      title: 'Jasa Katering',
      items: ['Katering Proyek', 'Katering Kantor', 'Katering Kegiatan dan Acara', 'Penyediaan Konsumsi Harian dan Tenaga Kerja'],
      icon: Utensils
    },
    {
      title: 'Pembuatan Kaos & Seragam Kerja',
      items: ['Seragam Proyek', 'Kaos Kerja dan Kaos Event', 'Rompi dan Atribut Kerja', 'Desain dan Produksi sesuai Kebutuhan Klien'],
      icon: Shirt
    }
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-24">
      {categories.map((cat, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          viewport={{ once: true }}
          className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-primary/5 p-3 rounded-xl group-hover:bg-primary transition-colors">
              <cat.icon className="text-primary w-6 h-6 group-hover:text-white transition-colors" />
            </div>
            <h4 className="font-bold text-slate-900 leading-tight">{cat.title}</h4>
          </div>
          <ul className="space-y-3">
            {cat.items.map((item, i) => (
              <li key={i} className="flex gap-3 text-sm text-slate-500 leading-relaxed">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0 mt-1.5" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
};

const CollapsibleServiceScope = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-12 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex justify-between items-center group hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="bg-primary/5 p-3 rounded-xl group-hover:bg-primary transition-colors">
              <Briefcase className="text-primary w-6 h-6 group-hover:text-white transition-colors" />
            </div>
            <div className="text-left">
              <h3 className="text-2xl font-bold text-slate-900">Cakupan Layanan Kami</h3>
              <p className="text-sm text-slate-500">Klik untuk melihat detail layanan teknis & operasional CV SRIKARYA MANDIRI</p>
            </div>
          </div>
          <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
            <ChevronRight className="w-8 h-8 text-primary rotate-90" />
          </div>
        </button>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-12">
                <ServiceScopeContent />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const Portfolio = ({ projects }: { projects: Project[] }) => {
  const [filter, setFilter] = useState('Semua');
  const categories = ['Semua', ...new Set(projects.map(p => p.category))];
  
  const filteredProjects = filter === 'Semua' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">Portfolio</h2>
            <h3 className="text-4xl font-bold text-slate-900 mb-6">Proyek yang Telah Kami Selesaikan</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  filter === cat 
                    ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-3xl aspect-[4/3] mb-6">
                  <img 
                    src={project.image_url} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt={project.title}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                    <span className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">{project.category}</span>
                    <h4 className="text-white font-bold text-xl">{project.title}</h4>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-slate-900 uppercase">
                    {project.status}
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">{project.title}</h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {project.location} • {project.year}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-sm font-bold text-secondary uppercase tracking-widest mb-4">Hubungi Kami</h2>
            <h3 className="text-4xl font-bold mb-8">Siap Memulai Proyek Anda? Mari Berdiskusi.</h3>
            <p className="text-slate-400 mb-12 leading-relaxed">
              Tim ahli kami siap membantu Anda merencanakan dan mengeksekusi proyek industri dengan standar tertinggi.
            </p>

            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="bg-white/5 p-4 rounded-2xl">
                  <MapPin className="text-secondary w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Alamat Kantor</h4>
                  <p className="text-slate-400 text-sm">KP. Pajaten, Desa Tarumajaya, Kec. Kertasari, Kab. Bandung.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="bg-white/5 p-4 rounded-2xl">
                  <Phone className="text-secondary w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Telepon & WhatsApp</h4>
                  <p className="text-slate-400 text-sm">0811 8881 0926</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="bg-white/5 p-4 rounded-2xl">
                  <Mail className="text-secondary w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Email</h4>
                  <p className="text-slate-400 text-sm">msrikarya@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-10 text-slate-900">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="bg-green-100 p-4 rounded-full mb-6">
                  <CheckCircle2 className="text-green-600 w-12 h-12" />
                </div>
                <h4 className="text-2xl font-bold mb-2">Pesan Terkirim!</h4>
                <p className="text-slate-500 mb-8">Terima kasih telah menghubungi kami. Tim kami akan segera merespon pesan Anda.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="bg-primary text-white px-8 py-3 rounded-xl font-bold"
                >
                  Kirim Pesan Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Nama Lengkap</label>
                    <input 
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      type="text" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all" 
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Email</label>
                    <input 
                      required
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      type="email" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all" 
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Subjek</label>
                  <input 
                    required
                    value={formData.subject}
                    onChange={e => setFormData({...formData, subject: e.target.value})}
                    type="text" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all" 
                    placeholder="Konsultasi Proyek Baru"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Pesan</label>
                  <textarea 
                    required
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    rows={4} 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none" 
                    placeholder="Ceritakan kebutuhan proyek Anda..."
                  />
                </div>
                <button 
                  disabled={isSubmitting}
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/40 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Mengirim...' : 'Kirim Pesan Sekarang'}
                  {!isSubmitting && <ArrowRight className="w-5 h-5" />}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const AdminDashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeView, setActiveView] = useState('overview');

  useEffect(() => {
    fetch('/api/admin/stats').then(res => res.json()).then(setStats);
    fetch('/api/admin/messages').then(res => res.json()).then(setMessages);
  }, []);

  const SidebarItem = ({ id, label, icon: Icon }: any) => (
    <button
      onClick={() => setActiveView(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        activeView === id ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:bg-slate-100'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-semibold text-sm">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex pt-20">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col gap-2 hidden md:flex">
        <SidebarItem id="overview" label="Overview" icon={LayoutDashboard} />
        <SidebarItem id="projects" label="Proyek" icon={Briefcase} />
        <SidebarItem id="messages" label="Pesan Masuk" icon={MessageSquare} />
        <SidebarItem id="subcontractors" label="Subkontraktor" icon={Users} />
        <SidebarItem id="documents" label="Dokumen" icon={FileText} />
        <div className="mt-auto pt-6 border-t border-slate-100">
          <SidebarItem id="settings" label="Pengaturan" icon={Settings} />
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all mt-2">
            <LogOut className="w-5 h-5" />
            <span className="font-semibold text-sm">Keluar</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {activeView === 'overview' ? 'Dashboard Overview' : 
               activeView === 'messages' ? 'Pesan Masuk' : 
               activeView.charAt(0).toUpperCase() + activeView.slice(1)}
            </h1>
            <p className="text-slate-500 text-sm">Selamat datang kembali, Admin SRIKARYA.</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => window.open('/api/download-project', '_blank')}
              className="flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-lg shadow-secondary/20"
            >
              <Download className="w-4 h-4" />
              Export Project (ZIP)
            </button>
            <div className="bg-white p-2 rounded-full border border-slate-200 relative">
              <MessageSquare className="w-5 h-5 text-slate-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {stats?.unreadMessages || 0}
              </span>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold">
              S
            </div>
          </div>
        </header>

        {activeView === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { label: 'Total Proyek', value: stats?.totalProjects || 0, icon: Briefcase, color: 'primary' },
                { label: 'Pesan Baru', value: stats?.unreadMessages || 0, icon: MessageSquare, color: 'secondary' },
                { label: 'Subkontraktor', value: stats?.totalSubcontractors || 0, icon: Users, color: 'slate' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                  <div className={`bg-slate-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-4`}>
                    <stat.icon className={`text-slate-600 w-6 h-6`} />
                  </div>
                  <p className="text-slate-500 text-sm font-medium mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Recent Messages Table */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-6 border-bottom border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-900">Pesan Terbaru</h3>
                <button onClick={() => setActiveView('messages')} className="text-blue-600 text-sm font-bold">Lihat Semua</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Pengirim</th>
                      <th className="px-6 py-4">Subjek</th>
                      <th className="px-6 py-4">Tanggal</th>
                      <th className="px-6 py-4">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {messages.slice(0, 5).map((msg) => (
                      <tr key={msg.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-bold text-slate-900 text-sm">{msg.name}</p>
                          <p className="text-xs text-slate-500">{msg.email}</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">{msg.subject}</td>
                        <td className="px-6 py-4 text-sm text-slate-500">
                          {new Date(msg.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-blue-600 hover:text-blue-800 font-bold text-xs">Detail</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeView === 'messages' && (
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Pengirim</th>
                      <th className="px-6 py-4">Pesan</th>
                      <th className="px-6 py-4">Tanggal</th>
                      <th className="px-6 py-4">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {messages.map((msg) => (
                      <tr key={msg.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-bold text-slate-900 text-sm">{msg.name}</p>
                          <p className="text-xs text-slate-500">{msg.email}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-bold text-slate-900 text-sm">{msg.subject}</p>
                          <p className="text-xs text-slate-500 line-clamp-1">{msg.message}</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">
                          {new Date(msg.created_at).toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-3">
                            <button className="text-blue-600 hover:text-blue-800 font-bold text-xs">Balas</button>
                            <button className="text-red-500 hover:text-red-700 font-bold text-xs">Hapus</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
          </div>
        )}
      </main>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [adminPassword, setAdminPassword] = useState("");
  useEffect(() => {
    fetch('/api/projects').then(res => res.json()).then(setProjects);
    fetch('/api/services').then(res => res.json()).then(setServices);
  }, []);

  return (
    <div className="font-sans text-slate-900 antialiased">
      {activeTab !== 'admin' && <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />}
      
      <main>
        {activeTab === 'home' && (
          <>
            <Hero onContact={() => setActiveTab('contact')} />
            <About />
            <WhyChooseUs />
            <HSESection />
            <LegalSection />
            <Contact />
            <CollapsibleServiceScope />
          </>
        )}

        {activeTab === 'portfolio' && (
          <div className="pt-20">
            <Portfolio projects={projects} />
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="pt-20">
            <Contact />
          </div>
        )}

       {activeTab === 'admin' && (
  <div className="relative">

    {!isLoggedIn ? (
      <div className="flex items-center justify-center min-h-screen bg-slate-100">
        <div className="bg-white p-6 rounded-xl shadow-lg w-80">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Login Admin
          </h2>

          <input
            type="password"
            placeholder="Masukkan Password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />

          <button
            onClick={() => {
              if (adminPassword === "srikarya") {
                setIsLoggedIn(true);
              } else {
                alert("Password salah!");
              }
            }}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </div>
      </div>
    ) : (
      <>
        <button 
          onClick={() => {
            setActiveTab('home');
            setIsLoggedIn(false);
          }}
          className="fixed top-4 left-4 z-[60] bg-white p-2 rounded-full shadow-lg border border-slate-200 hover:bg-slate-50"
        >
          <ArrowRight className="rotate-180 w-5 h-5" />
        </button>

        <AdminDashboard />
      </>
    )}

  </div>
)}
      </main>

      {activeTab !== 'admin' && (
        <footer className="bg-slate-950 text-white py-20 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <Logo className="w-12 h-12" />
                <div className="flex flex-col">
                  <span className="text-xl font-bold tracking-tight">CV SRIKARYA</span>
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-secondary">MANDIRI</span>
                </div>
              </div>
              <p className="text-slate-400 max-w-md leading-relaxed mb-8">
                General Contractor & General Supplier terpercaya. Kami berkomitmen memberikan pelayanan terbaik dengan mengutamakan kualitas pekerjaan, ketepatan waktu, dan keselamatan kerja.
              </p>
              <div className="flex gap-4">
                {/* Social placeholders */}
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer" />
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-6">Tautan Cepat</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><button onClick={() => setActiveTab('home')} className="hover:text-secondary">Beranda</button></li>
                <li><button onClick={() => setActiveTab('portfolio')} className="hover:text-secondary">Portfolio</button></li>
                <li><button onClick={() => setActiveTab('contact')} className="hover:text-secondary">Kontak</button></li>
                <li><button className="hover:text-secondary">Layanan</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">Layanan Utama</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li>Proyek & Konstruksi</li>
                <li>Sipil Industri</li>
                <li>Mechanical & Electrical</li>
                <li>Jasa Katering</li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs">
            <p>© 2024 CV SRIKARYA MANDIRI. All rights reserved.</p>
            <div className="flex gap-8">
              <button className="hover:text-white">Privacy Policy</button>
              <button className="hover:text-white">Terms of Service</button>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
