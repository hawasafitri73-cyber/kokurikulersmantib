import React from 'react';
import { Cpu, GitBranch, FileDown, ArrowRight } from 'lucide-react';

interface FeatureCardsProps {
  onSelectFeature: (tab: 'buat' | 'panduan' | 'riwayat') => void;
}

export const FeatureCards: React.FC<FeatureCardsProps> = ({ onSelectFeature }) => {
  return (
    <section className="py-14 bg-[#F4F6FA]/60 border-b border-[#A7D8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-block px-3 py-1 bg-[#FCE4EC] border border-[#F4A6C1] rounded-full text-xs font-bold text-[#24345B] mb-2">
            FITUR UTAMA APLIKASI
          </div>
          <h2 className="font-retro text-2xl sm:text-3xl font-extrabold text-[#24345B]">
            Tiga Pilar Perancangan Kokurikuler SMA
          </h2>
          <p className="text-sm sm:text-base text-[#24345B]/75 mt-2">
            Dirancang khusus untuk mempermudah guru dan fasilitator SMA merumuskan modul kokurikuler berkualitas tinggi.
          </p>
        </div>

        {/* 3 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Generate Modul Otomatis */}
          <div className="bg-white rounded-xl border-2 border-[#A7D8F0] p-6 shadow-[4px_4px_0px_rgba(65,105,225,0.15)] hover:border-[#4169E1] hover:shadow-[5px_5px_0px_#4169E1] transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#FCE4EC] border-2 border-[#F4A6C1] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Cpu className="w-6 h-6 text-[#24345B]" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold text-[#4169E1] uppercase">01. AI Kurikulum</span>
              </div>
              <h3 className="font-retro text-lg font-bold text-[#24345B] mb-2">
                Generate Modul Otomatis
              </h3>
              <p className="text-sm text-[#24345B]/80 leading-relaxed">
                Cukup pilih kelas (X, XI, atau XII), tema, dan alokasi JP. AI secara otomatis menyusun seluruh sistematika modul bagian A sampai O tanpa perlu mengetik dokumen dari nol.
              </p>
            </div>
            <div className="pt-5 mt-4 border-t border-[#A7D8F0]/60">
              <button 
                onClick={() => onSelectFeature('buat')}
                className="text-xs font-bold text-[#4169E1] group-hover:text-[#24345B] flex items-center gap-1.5 cursor-pointer"
              >
                <span>Mulai Buat Modul</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Card 2: Rancang Proyek Berkesinambungan */}
          <div className="bg-white rounded-xl border-2 border-[#A7D8F0] p-6 shadow-[4px_4px_0px_rgba(65,105,225,0.15)] hover:border-[#4169E1] hover:shadow-[5px_5px_0px_#4169E1] transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#FCE4EC] border-2 border-[#F4A6C1] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <GitBranch className="w-6 h-6 text-[#24345B]" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold text-[#4169E1] uppercase">02. Alur Proyek</span>
              </div>
              <h3 className="font-retro text-lg font-bold text-[#24345B] mb-2">
                Rancang Proyek Berkesinambungan
              </h3>
              <p className="text-sm text-[#24345B]/80 leading-relaxed">
                Setiap sesi terhubung secara utuh melalui peta perkembangan produk antarsesi. Murid berproses dari tahap Memahami, Mengaplikasi, hingga Merefleksi menghasilkan karya nyata bermakna.
              </p>
            </div>
            <div className="pt-5 mt-4 border-t border-[#A7D8F0]/60">
              <button 
                onClick={() => onSelectFeature('panduan')}
                className="text-xs font-bold text-[#4169E1] group-hover:text-[#24345B] flex items-center gap-1.5 cursor-pointer"
              >
                <span>Lihat Alur Panduan 2025</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Card 3: Simpan dan Ekspor Modul */}
          <div className="bg-white rounded-xl border-2 border-[#A7D8F0] p-6 shadow-[4px_4px_0px_rgba(65,105,225,0.15)] hover:border-[#4169E1] hover:shadow-[5px_5px_0px_#4169E1] transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#FCE4EC] border-2 border-[#F4A6C1] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <FileDown className="w-6 h-6 text-[#24345B]" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold text-[#4169E1] uppercase">03. Hasil & Ekspor</span>
              </div>
              <h3 className="font-retro text-lg font-bold text-[#24345B] mb-2">
                Simpan dan Ekspor Modul
              </h3>
              <p className="text-sm text-[#24345B]/80 leading-relaxed">
                Dokumen hasil modul tersaji dalam lembar standar profesional. Ekspor langsung ke Microsoft Word (.doc), cetak / PDF dengan format rapi, atau simpan di peramban untuk diedit sewaktu-waktu.
              </p>
            </div>
            <div className="pt-5 mt-4 border-t border-[#A7D8F0]/60">
              <button 
                onClick={() => onSelectFeature('riwayat')}
                className="text-xs font-bold text-[#4169E1] group-hover:text-[#24345B] flex items-center gap-1.5 cursor-pointer"
              >
                <span>Buka Riwayat Modul</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
