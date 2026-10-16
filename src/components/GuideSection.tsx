import React from 'react';
import { 
  BookOpen, Sparkles, CheckCircle2, Award, Clock, 
  Layers, Compass, ArrowRight, ShieldCheck 
} from 'lucide-react';
import { DELAPAN_DIMENSI_PROFIL_LULUSAN } from '../data/constants';

interface GuideSectionProps {
  onStartClick: () => void;
}

export const GuideSection: React.FC<GuideSectionProps> = ({ onStartClick }) => {
  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-10">
      
      {/* Title & Introduction */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-block px-3 py-1 bg-[#FCE4EC] border border-[#F4A6C1] rounded-full text-xs font-bold text-[#24345B] mb-2">
          PANDUAN KURIKULUM 2025
        </div>
        <h2 className="font-retro text-2xl sm:text-4xl font-extrabold text-[#24345B] tracking-tight">
          Panduan Lengkap Kokurikuler SMA
        </h2>
        <p className="text-sm sm:text-base text-[#24345B]/80 mt-2 leading-relaxed">
          Pahami regulasi kurikulum terbaru, sistematika 15 bagian dokumen modul, penerapan 8 Dimensi Profil Lulusan, serta integrasi pendekatan STREAM untuk siswa remaja SMA.
        </p>
      </div>

      {/* Card 1: Esensi Kokurikuler SMA Panduan 2025 */}
      <div className="bg-white rounded-2xl border-2 border-[#A7D8F0] p-6 sm:p-8 shadow-[4px_4px_0px_#4169E1] space-y-4">
        <div className="flex items-center gap-3 border-b border-[#A7D8F0] pb-3">
          <div className="w-10 h-10 rounded-lg bg-[#4169E1] text-white flex items-center justify-center font-bold">
            01
          </div>
          <div>
            <h3 className="font-retro text-lg font-bold text-[#24345B]">
              Esensi Kokurikuler SMA Berdasarkan Panduan 2025
            </h3>
            <p className="text-xs text-[#24345B]/70">Khusus Jenjang SMA Kelas X (Fase E), Kelas XI (Fase F), dan Kelas XII (Fase F)</p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#24345B]/85 leading-relaxed">
          Kegiatan kokurikuler pada jenjang SMA dirancang untuk memperdalam, memperluas, dan mengkonsolidasikan kompetensi intrakurikuler murid melalui penyelidikan kontekstual dan aksi nyata. Karakteristik murid SMA yang berada pada fase transisi menuju kedewasaan, perguruan tinggi, dunia usaha/kerja, dan kehidupan bermasyarakat menuntut kegiatan yang bernalar kritis, mandiri, kolaboratif, serta menghasilkan produk fungsional.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-3 bg-[#F4F6FA] border border-[#A7D8F0] rounded-xl">
            <strong className="text-[#4169E1] block mb-1">Kelas X (Fase E)</strong>
            <p className="text-[#24345B]/80">Fase fondasi adaptasi SMA: pembiasaan inkuiri ilmiah, eksplorasi minat karir, dan kesadaran lingkungan sekitar.</p>
          </div>
          <div className="p-3 bg-[#F4F6FA] border border-[#A7D8F0] rounded-xl">
            <strong className="text-[#4169E1] block mb-1">Kelas XI (Fase F)</strong>
            <p className="text-[#24345B]/80">Fase pendalaman: riset kolaboratif lintas rumpun mapel pilihan, prototipe rekayasa, dan kemitraan masyarakat.</p>
          </div>
          <div className="p-3 bg-[#F4F6FA] border border-[#A7D8F0] rounded-xl">
            <strong className="text-[#4169E1] block mb-1">Kelas XII (Fase F)</strong>
            <p className="text-[#24345B]/80">Fase puncak kemandirian: proyek akhir inovatif, publikasi karya profesional, dan advokasi sosial nyata.</p>
          </div>
        </div>
      </div>

      {/* Card 2: 8 Dimensi Profil Lulusan */}
      <div className="bg-white rounded-2xl border-2 border-[#A7D8F0] p-6 sm:p-8 shadow-[4px_4px_0px_#4169E1] space-y-4">
        <div className="flex items-center gap-3 border-b border-[#A7D8F0] pb-3">
          <div className="w-10 h-10 rounded-lg bg-[#F4A6C1] text-[#24345B] border border-[#24345B] flex items-center justify-center font-bold">
            02
          </div>
          <div>
            <h3 className="font-retro text-lg font-bold text-[#24345B]">
              Penerapan 8 Dimensi Profil Lulusan (Bukan P3)
            </h3>
            <p className="text-xs text-[#24345B]/70">Nomenklatur baku kurikulum nasional kokurikuler SMA 2025</p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#24345B]/85 leading-relaxed">
          Panduan terbaru menegaskan penggunaan istilah <strong>8 Dimensi Profil Lulusan</strong>. Guru tidak diwajibkan memilih seluruh 8 dimensi pada satu modul proyek; disarankan memilih <strong>2 hingga 4 dimensi utama</strong> sebagai fokus capaian agar pendampingan dan asesmen berjalan tajam dan autentik.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {DELAPAN_DIMENSI_PROFIL_LULUSAN.map((dim, idx) => (
            <div key={dim.id} className="p-3 bg-[#FCE4EC]/30 border border-[#F4A6C1] rounded-xl text-xs">
              <span className="font-mono text-[10px] font-bold text-[#4169E1]">0{idx + 1}.</span>
              <h4 className="font-bold text-[#24345B] mt-0.5">{dim.nama}</h4>
              <p className="text-[11px] text-[#24345B]/75 mt-1 leading-snug">{dim.deskripsi}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Card 3: Pendekatan STREAM & Praktik Pedagogis */}
      <div className="bg-white rounded-2xl border-2 border-[#A7D8F0] p-6 sm:p-8 shadow-[4px_4px_0px_#4169E1] space-y-4">
        <div className="flex items-center gap-3 border-b border-[#A7D8F0] pb-3">
          <div className="w-10 h-10 rounded-lg bg-[#4169E1] text-white flex items-center justify-center font-bold">
            03
          </div>
          <div>
            <h3 className="font-retro text-lg font-bold text-[#24345B]">
              Integrasi Pendekatan STREAM & Deep Learning
            </h3>
            <p className="text-xs text-[#24345B]/70">Sains, Teknologi, Religi, Rekayasa, Seni, dan Matematika dalam Satu Proyek</p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#24345B]/85 leading-relaxed">
          Dalam pendekatan <strong>STREAM</strong>, unsur <em>Religion</em> diintegrasikan secara inklusif dan etis: menanamkan nilai moral kejujuran ilmiah, tanggung jawab menjaga alam ciptaan Tuhan, etika kecerdasan artifisial, dan rasa syukur tanpa menghakimi keyakinan pribadi murid.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs text-center">
          <div className="p-3 bg-[#F4F6FA] border border-[#A7D8F0] rounded-xl">
            <strong className="text-[#4169E1] block text-sm">S</strong>
            <span className="font-bold">Science</span>
            <p className="text-[10px] text-[#24345B]/70 mt-1">Penyelidikan empiris & data ilmiah</p>
          </div>
          <div className="p-3 bg-[#F4F6FA] border border-[#A7D8F0] rounded-xl">
            <strong className="text-[#4169E1] block text-sm">T</strong>
            <span className="font-bold">Technology</span>
            <p className="text-[10px] text-[#24345B]/70 mt-1">Platform digital & kecerdasan AI</p>
          </div>
          <div className="p-3 bg-[#FCE4EC] border border-[#F4A6C1] rounded-xl">
            <strong className="text-[#24345B] block text-sm">R</strong>
            <span className="font-bold text-[#24345B]">Religion</span>
            <p className="text-[10px] text-[#24345B]/70 mt-1">Nilai etika moral & amanah spiritual</p>
          </div>
          <div className="p-3 bg-[#F4F6FA] border border-[#A7D8F0] rounded-xl">
            <strong className="text-[#4169E1] block text-sm">E</strong>
            <span className="font-bold">Engineering</span>
            <p className="text-[10px] text-[#24345B]/70 mt-1">Rancang bangun & iterasi prototipe</p>
          </div>
          <div className="p-3 bg-[#F4F6FA] border border-[#A7D8F0] rounded-xl">
            <strong className="text-[#4169E1] block text-sm">A</strong>
            <span className="font-bold">Arts</span>
            <p className="text-[10px] text-[#24345B]/70 mt-1">Desain estetis & komunikasi visual</p>
          </div>
          <div className="p-3 bg-[#F4F6FA] border border-[#A7D8F0] rounded-xl">
            <strong className="text-[#4169E1] block text-sm">M</strong>
            <span className="font-bold">Mathematics</span>
            <p className="text-[10px] text-[#24345B]/70 mt-1">Analisis statistik & kalkulasi biaya</p>
          </div>
        </div>
      </div>

      {/* Card 4: Kesinambungan Antarsesi */}
      <div className="bg-white rounded-2xl border-2 border-[#A7D8F0] p-6 sm:p-8 shadow-[4px_4px_0px_#4169E1] space-y-4">
        <div className="flex items-center gap-3 border-b border-[#A7D8F0] pb-3">
          <div className="w-10 h-10 rounded-lg bg-[#F4A6C1] text-[#24345B] border border-[#24345B] flex items-center justify-center font-bold">
            04
          </div>
          <div>
            <h3 className="font-retro text-lg font-bold text-[#24345B]">
              Kewajiban Kesinambungan Proyek Antarsesi
            </h3>
            <p className="text-xs text-[#24345B]/70">Peta Perkembangan Produk dari Sesi Pertama hingga Gelar Karya</p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#24345B]/85 leading-relaxed">
          Salah satu kesalahan umum dalam pelaksanaan kokurikuler adalah kegiatan yang terfragmentasi (tiap pertemuan berganti topik tanpa keterkaitan). Aplikasi ini mewajibkan <strong>kesinambungan antarsesi</strong>:
        </p>

        <div className="space-y-2 text-xs">
          <div className="p-3 bg-[#F4F6FA] rounded-xl flex items-start gap-3 border border-[#A7D8F0]">
            <span className="px-2 py-0.5 bg-[#4169E1] text-white font-mono font-bold text-[10px] rounded mt-0.5">Tahap 1</span>
            <div>
              <strong className="text-[#24345B]">Memahami:</strong>
              <p className="text-[#24345B]/80 mt-0.5">Pengenalan tema, studi kasus video/faktual, observasi lapangan, identifikasi masalah, perumusan pertanyaan pemantik, dan pembentukan kelompok kerja murid.</p>
            </div>
          </div>

          <div className="p-3 bg-[#F4F6FA] rounded-xl flex items-start gap-3 border border-[#A7D8F0]">
            <span className="px-2 py-0.5 bg-[#4169E1] text-white font-mono font-bold text-[10px] rounded mt-0.5">Tahap 2</span>
            <div>
              <strong className="text-[#24345B]">Mengaplikasi:</strong>
              <p className="text-[#24345B]/80 mt-0.5">Analisis data empiris, perumusan alternatif solusi, gambar cetak biru (blueprint), fabrikasi prototipe karya awal, uji coba lapangan, pengumpulan masukan pengguna, dan revisi penyempurnaan karya.</p>
            </div>
          </div>

          <div className="p-3 bg-[#F4F6FA] rounded-xl flex items-start gap-3 border border-[#A7D8F0]">
            <span className="px-2 py-0.5 bg-[#4169E1] text-white font-mono font-bold text-[10px] rounded mt-0.5">Tahap 3</span>
            <div>
              <strong className="text-[#24345B]">Merefleksi:</strong>
              <p className="text-[#24345B]/80 mt-0.5">Gelar karya (exhibition day), presentasi publik, asesmen sumatif dengan rubrik analitik 4 tingkat, pengisian lembar refleksi 7 pertanyaan murid, refleksi guru, dan perumusan deskripsi rapor kokurikuler.</p>
            </div>
          </div>
        </div>

      </div>

      {/* CTA Bottom Banner */}
      <div className="p-8 bg-[#24345B] text-white rounded-2xl border-2 border-[#24345B] shadow-[6px_6px_0px_#4169E1] text-center space-y-4">
        <h3 className="font-retro text-2xl font-bold text-white">
          Siap Merancang Modul Kokurikuler SMA Anda?
        </h3>
        <p className="text-xs sm:text-sm text-white/80 max-w-xl mx-auto">
          Buat modul otomatis lengkap dalam hitungan detik dengan tema Retro Modern Blue, Pink & White yang ceria dan profesional.
        </p>
        <button
          onClick={onStartClick}
          className="retro-button-pink px-6 py-3 rounded-xl font-bold text-sm cursor-pointer inline-flex items-center gap-2"
        >
          <span>+ Mulai Buat Modul Baru</span>
          <ArrowRight className="w-4 h-4 text-[#24345B]" />
        </button>
      </div>

    </div>
  );
};
