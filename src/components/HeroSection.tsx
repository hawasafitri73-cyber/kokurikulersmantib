import React from 'react';
import { Sparkles, ArrowRight, BookOpen, Lightbulb, Compass, Award, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onStartClick: () => void;
  onGuideClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartClick, onGuideClick }) => {
  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-20 border-b border-[#A7D8F0]">
      {/* Decorative Retro Grid & Geometric Background */}
      <div className="absolute inset-0 bg-retro-grid opacity-70 pointer-events-none" />
      
      {/* Retro Geometric Floating Accents */}
      <div className="absolute top-10 left-6 w-14 h-14 rounded-full bg-[#FCE4EC] border-2 border-[#F4A6C1] -rotate-12 hidden md:flex items-center justify-center opacity-80 pointer-events-none">
        <Sparkles className="w-6 h-6 text-[#24345B]" />
      </div>
      <div className="absolute bottom-8 right-12 w-16 h-16 bg-[#A7D8F0]/40 border-2 border-[#4169E1] rotate-12 hidden md:flex items-center justify-center pointer-events-none">
        <div className="w-8 h-8 rounded-full bg-[#F4A6C1]/50" />
      </div>
      <div className="absolute top-1/2 right-6 w-6 h-6 bg-[#4169E1] rotate-45 hidden lg:block opacity-60" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Retro Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FCE4EC] border border-[#F4A6C1] rounded-full text-xs font-bold text-[#24345B]">
              <span className="w-2 h-2 rounded-full bg-[#4169E1]" />
              <span>Panduan Kokurikuler SMA 2025 &bull; Khusus Kelas X, XI, XII</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-retro text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#24345B] tracking-tight leading-tight text-balance">
              Saatnya Merancang Kokurikuler yang Lebih <span className="text-[#4169E1] underline decoration-[#F4A6C1] decoration-wavy decoration-4">Kreatif!</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#24345B]/85 leading-relaxed max-w-2xl font-normal">
              Susun modul kokurikuler SMA secara otomatis, sistematis, dan bermakna. Didukung AI cerdas berlandaskan 
              <strong> 8 Dimensi Profil Lulusan</strong>, pendekatan mendalam (Deep Learning, STREAM, PjBL), 
              dan kewajiban proyek berkesinambungan antarsesi dari Sesi Awal hingga Gelar Karya.
            </p>

            {/* Key Bullet Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm font-semibold text-[#24345B]/90 pt-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4169E1] shrink-0" />
                <span>Otomatisasi Lengkap Bagian A sampai O</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4169E1] shrink-0" />
                <span>Alokasi JP Akurat Panduan SMA 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4169E1] shrink-0" />
                <span>Rubrik Asesmen & Instrumen Siap Pakai</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4169E1] shrink-0" />
                <span>Ekspor Langsung ke Word (.doc) & PDF</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={onStartClick}
                className="retro-button-primary px-6 py-3 rounded-xl font-bold text-base flex items-center gap-2.5 cursor-pointer shadow-[4px_4px_0px_#24345B]"
              >
                <span>+ Buat Modul Baru</span>
                <ArrowRight className="w-5 h-5 text-white" />
              </button>
              
              <button
                onClick={onGuideClick}
                className="retro-button-secondary px-5 py-3 rounded-xl font-bold text-sm text-[#24345B] flex items-center gap-2 cursor-pointer hover:bg-[#FCE4EC]/50"
              >
                <Compass className="w-4 h-4 text-[#4169E1]" />
                <span>Pelajari Panduan 2025</span>
              </button>
            </div>

          </div>

          {/* Right Column: Retro Illustration Visual Box */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md bg-white border-2 border-[#24345B] rounded-2xl p-6 shadow-[6px_6px_0px_#4169E1] bg-retro-dots">
              
              {/* Header Card Strip */}
              <div className="flex items-center justify-between pb-4 border-b border-[#A7D8F0]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#F4A6C1] border border-[#24345B]" />
                  <div className="w-3 h-3 rounded-full bg-[#A7D8F0] border border-[#24345B]" />
                  <div className="w-3 h-3 rounded-full bg-[#4169E1] border border-[#24345B]" />
                </div>
                <span className="text-[11px] font-mono font-bold text-[#4169E1]">
                  SMA KELAS X &bull; XI &bull; XII
                </span>
              </div>

              {/* Visual Body Elements */}
              <div className="py-6 space-y-4">
                
                {/* Feature Mini Tile 1 */}
                <div className="p-3.5 bg-white border border-[#A7D8F0] rounded-xl flex items-center gap-3 shadow-xs">
                  <div className="w-10 h-10 rounded-lg bg-[#FCE4EC] border border-[#F4A6C1] flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5 text-[#24345B]" />
                  </div>
                  <div>
                    <h2 className="text-xs font-bold text-[#24345B]">Kurikulum Berkesinambungan</h2>
                    <p className="text-[11px] text-[#24345B]/70">Tahap Memahami &rarr; Mengaplikasi &rarr; Merefleksi</p>
                  </div>
                </div>

                {/* Feature Mini Tile 2 */}
                <div className="p-3.5 bg-white border border-[#A7D8F0] rounded-xl flex items-center gap-3 shadow-xs">
                  <div className="w-10 h-10 rounded-lg bg-[#A7D8F0]/40 border border-[#4169E1] flex items-center justify-center shrink-0">
                    <Lightbulb className="w-5 h-5 text-[#4169E1]" />
                  </div>
                  <div>
                    <h2 className="text-xs font-bold text-[#24345B]">Pendekatan STREAM & PjBL</h2>
                    <p className="text-[11px] text-[#24345B]/70">Integrasi Sains, Teknologi, Religi, Rekayasa, Seni, Matematika</p>
                  </div>
                </div>

                {/* Feature Mini Tile 3 */}
                <div className="p-3.5 bg-white border border-[#A7D8F0] rounded-xl flex items-center gap-3 shadow-xs">
                  <div className="w-10 h-10 rounded-lg bg-[#FCE4EC] border border-[#F4A6C1] flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5 text-[#24345B]" />
                  </div>
                  <div>
                    <h2 className="text-xs font-bold text-[#24345B]">8 Dimensi Profil Lulusan</h2>
                    <p className="text-[11px] text-[#24345B]/70">Rekomendasi otomatis berbasis AI & rasional pedagogis</p>
                  </div>
                </div>

              </div>

              {/* Bottom Card Footer */}
              <div className="pt-3 border-t border-[#A7D8F0] flex items-center justify-between text-[11px] font-bold text-[#24345B]">
                <span className="flex items-center gap-1.5 text-[#4169E1]">
                  <Sparkles className="w-3.5 h-3.5" />
                  Siap Cetak & Ekspor Word
                </span>
                <span className="bg-[#4169E1] text-white px-2 py-0.5 rounded text-[10px]">
                  Resmi 2025
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
