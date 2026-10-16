import React, { useState } from 'react';
import { 
  FileText, Download, Printer, Copy, Save, Edit3, Check, 
  RefreshCw, Plus, Trash2, ChevronRight, AlertCircle, Sparkles, BookOpen 
} from 'lucide-react';
import { KokurikulerModule, ProjectSession } from '../types/module';
import { exportToWord, printModule, copyModuleToClipboard } from '../utils/exportUtils';

interface ModulePreviewProps {
  module: KokurikulerModule;
  onUpdateModule: (updated: KokurikulerModule) => void;
  onSaveToHistory: (module: KokurikulerModule) => void;
  onBackToForm: () => void;
}

export const ModulePreview: React.FC<ModulePreviewProps> = ({
  module,
  onUpdateModule,
  onSaveToHistory,
  onBackToForm
}) => {
  const [activeSection, setActiveSection] = useState<string>('sec-a');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [copyStatus, setCopyStatus] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<boolean>(false);
  const [editingModule, setEditingModule] = useState<KokurikulerModule>(module);
  const [toastMessage, setToastMessage] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [logoSultraFailed, setLogoSultraFailed] = useState<boolean>(false);
  const [logoSmanFailed, setLogoSmanFailed] = useState<boolean>(false);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Sync when prop changes
  React.useEffect(() => {
    setEditingModule(module);
  }, [module]);

  const handleCopy = async () => {
    await copyModuleToClipboard(editingModule);
    setCopyStatus(true);
    showToast('Teks lengkap modul berhasil disalin ke clipboard!', 'success');
    setTimeout(() => setCopyStatus(false), 2000);
  };

  const handleSave = () => {
    onSaveToHistory(editingModule);
    setSaveStatus(true);
    showToast('Perubahan modul tersimpan ke riwayat!', 'success');
    setTimeout(() => setSaveStatus(false), 2000);
  };

  const handleWordExport = () => {
    exportToWord(editingModule);
    showToast('Dokumen Word (.doc) berhasil diunduh.', 'success');
  };

  const handlePrint = (paperSize: 'F4' | 'A4' = 'F4') => {
    showToast(`Membuka dialog cetak PDF ukuran ${paperSize === 'F4' ? 'F4 / Folio (215 x 330 mm)' : 'A4 (210 x 297 mm)'}. Pada tujuan printer, pilih 'Simpan sebagai PDF' (Save as PDF).`, 'info');
    printModule(paperSize);
  };

  // Add Session
  const handleAddSession = () => {
    const currentSessions = [...editingModule.rangkaianKegiatan.sesi];
    const newSessionNum = currentSessions.length + 1;
    const newSession: ProjectSession = {
      nomorSesi: newSessionNum,
      namaSesi: `Sesi ${newSessionNum}: Pengayaan Solusi dan Pendalaman Karya`,
      alokasiJp: 3,
      tahapPengalaman: 'Mengaplikasi',
      tujuanSesi: `Murid memperdalam analisis teknis dan memperkuat ketahanan prototipe solusi.`,
      aktivitasGuru: `Guru memberikan arahan teknis khusus dan memvalidasi penyempurnaan desain.`,
      aktivitasMurid: `Murid menyempurnakan aspek prototipe yang masih memiliki catatan evaluasi.`,
      integrasiMapelAtauStream: `Terintegrasi dengan Informatika dan Matematika.`,
      alatDanBahan: `Alat perakitan prototipe dan lembar uji coba.`,
      hasilSementara: `Catatan revisi prototipe tahap lanjutan.`,
      hubunganDenganSesiBerikutnya: `Hasil penyempurnaan ini akan diintegrasikan pada sesi presentasi karya.`,
      buktiPerkembangan: `Foto bukti modifikasi prototipe dan log pengerjaan.`
    };

    const updatedModule = {
      ...editingModule,
      identitas: {
        ...editingModule.identitas,
        jumlahSesi: newSessionNum,
        totalJp: editingModule.identitas.totalJp + 3,
        alokasiWaktu: `${editingModule.identitas.totalJp + 3} JP (${newSessionNum} Sesi)`
      },
      rangkaianKegiatan: {
        ...editingModule.rangkaianKegiatan,
        sesi: [...currentSessions, newSession]
      }
    };

    setEditingModule(updatedModule);
    onUpdateModule(updatedModule);
    showToast(`Sesi 0${newSessionNum} berhasil ditambahkan.`, 'success');
  };

  // Delete Session
  const handleDeleteSession = (index: number) => {
    if (editingModule.rangkaianKegiatan.sesi.length <= 3) {
      showToast('Minimal modul kokurikuler SMA memiliki 3 sesi terpadu (Memahami, Mengaplikasi, Merefleksi).', 'info');
      return;
    }

    const filtered = editingModule.rangkaianKegiatan.sesi
      .filter((_, idx) => idx !== index)
      .map((s, idx) => ({ ...s, nomorSesi: idx + 1, namaSesi: s.namaSesi.replace(/Sesi \d+/, `Sesi ${idx + 1}`) }));

    const updatedModule = {
      ...editingModule,
      identitas: {
        ...editingModule.identitas,
        jumlahSesi: filtered.length,
        totalJp: Math.max(12, editingModule.identitas.totalJp - 3),
        alokasiWaktu: `${Math.max(12, editingModule.identitas.totalJp - 3)} JP (${filtered.length} Sesi)`
      },
      rangkaianKegiatan: {
        ...editingModule.rangkaianKegiatan,
        sesi: filtered
      }
    };

    setEditingModule(updatedModule);
    onUpdateModule(updatedModule);
    showToast('Sesi berhasil dihapus dan nomor sesi diperbarui.', 'info');
  };

  // Section items for Navigation A to O
  const sectionNav = [
    { id: 'sec-a', code: 'A', title: 'Identitas Kegiatan' },
    { id: 'sec-b', code: 'B', title: '8 Dimensi Profil Lulusan' },
    { id: 'sec-c', code: 'C', title: 'Tujuan Pembelajaran' },
    { id: 'sec-d', code: 'D', title: 'Praktik Pedagogis & STREAM' },
    { id: 'sec-e', code: 'E', title: 'Lingkungan Pembelajaran' },
    { id: 'sec-f', code: 'F', title: 'Kemitraan Pembelajaran' },
    { id: 'sec-g', code: 'G', title: 'Pemanfaatan Teknologi Digital' },
    { id: 'sec-h', code: 'H', title: 'Rangkaian Kegiatan (Sesi)' },
    { id: 'sec-i', code: 'I', title: 'Asesmen Formatif & Sumatif' },
    { id: 'sec-j', code: 'J', title: 'Hasil / Karya Murid' },
    { id: 'sec-k', code: 'K', title: 'Refleksi Murid (7 Pertanyaan)' },
    { id: 'sec-l', code: 'L', title: 'Refleksi Guru (10 Aspek)' },
    { id: 'sec-m', code: 'M', title: 'Pelaporan Rapor Kokurikuler' },
    { id: 'sec-n', code: 'N', title: 'Evaluasi & Tindak Lanjut' },
    { id: 'sec-o', code: 'O', title: 'Lampiran Instrumen Siap Pakai' }
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6">
      
      {/* Action Toolbar Header (Sticky on screen) */}
      <div className="no-print sticky top-18 z-30 bg-white/95 backdrop-blur-md rounded-2xl border-2 border-[#A7D8F0] p-4 mb-8 shadow-[4px_4px_0px_#4169E1]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToForm}
              className="retro-button-secondary px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              &larr; Pengaturan Modul
            </button>
            <div className="hidden sm:block h-6 w-px bg-[#A7D8F0]" />
            <div>
              <span className="text-xs font-bold text-[#4169E1] uppercase font-mono">
                {editingModule.identitas.kelas} ({editingModule.identitas.fase}) &bull; {editingModule.identitas.totalJp} JP
              </span>
              <h2 className="text-sm font-bold text-[#24345B] truncate max-w-xs sm:max-w-md">
                {editingModule.identitas.temaKegiatan}
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            
            {/* Inline Edit Toggle */}
            <button
              onClick={() => {
                if (isEditing) {
                  onUpdateModule(editingModule);
                }
                setIsEditing(!isEditing);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer border transition-all ${
                isEditing
                  ? 'bg-[#24345B] text-white border-[#24345B] shadow-xs'
                  : 'bg-white text-[#24345B] border-[#A7D8F0] hover:border-[#4169E1]'
              }`}
            >
              {isEditing ? <Check className="w-3.5 h-3.5 text-[#F4A6C1]" /> : <Edit3 className="w-3.5 h-3.5 text-[#4169E1]" />}
              <span>{isEditing ? 'Selesai Edit' : 'Edit Dokumen'}</span>
            </button>

            {/* Save to Local History */}
            <button
              onClick={handleSave}
              className="retro-button-primary px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{saveStatus ? 'Tersimpan!' : 'Simpan'}</span>
            </button>

            {/* Word Export */}
            <button
              onClick={handleWordExport}
              className="retro-button-pink px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Ekspor Word (.doc)</span>
            </button>

            {/* Print / PDF Export F4 (Folio 215x330mm) Standar Sekolah */}
            <button
              onClick={() => handlePrint('F4')}
              className="retro-button-primary px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="Cetak atau Simpan sebagai PDF ukuran Folio/F4 (215 x 330 mm) standar sekolah"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Export PDF (F4)</span>
            </button>

            {/* Print / PDF Export A4 (210x297mm) */}
            <button
              onClick={() => handlePrint('A4')}
              className="retro-button-secondary px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
              title="Cetak atau Simpan sebagai PDF ukuran standar A4"
            >
              <span>PDF A4</span>
            </button>

            {/* Copy All */}
            <button
              onClick={handleCopy}
              className="retro-button-secondary px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5 text-[#24345B]" />
              <span>{copyStatus ? 'Tersalin!' : 'Salin'}</span>
            </button>

          </div>

        </div>
      </div>

      {/* Main Content Layout: Sidebar A-O Navigator + Document Sheet */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Navigation Sidebar A–O (Left Column) */}
        <aside className="no-print lg:col-span-3 sticky top-38 max-h-[calc(100vh-160px)] overflow-y-auto space-y-1 p-3 bg-white border-2 border-[#A7D8F0] rounded-2xl shadow-[4px_4px_0px_rgba(65,105,225,0.12)] no-scrollbar">
          <div className="px-3 py-2 border-b border-[#A7D8F0] mb-2 flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold text-[#4169E1] uppercase">Daftar Bagian A–O</span>
            <span className="text-[10px] bg-[#FCE4EC] text-[#24345B] font-bold px-1.5 py-0.5 rounded">15 Bagian</span>
          </div>

          {sectionNav.map(sec => (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2.5 transition-all cursor-pointer ${
                activeSection === sec.id
                  ? 'bg-[#4169E1] text-white shadow-xs font-bold'
                  : 'text-[#24345B]/85 hover:bg-[#F4F6FA] hover:text-[#4169E1]'
              }`}
            >
              <span className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-mono font-bold shrink-0 ${
                activeSection === sec.id ? 'bg-[#F4A6C1] text-[#24345B]' : 'bg-[#FCE4EC] text-[#24345B]'
              }`}>
                {sec.code}
              </span>
              <span className="truncate">{sec.title}</span>
            </button>
          ))}
        </aside>

        {/* Professional Document Sheet (Right Column) */}
        <main className="lg:col-span-9 bg-white border-2 border-[#A7D8F0] rounded-2xl p-6 sm:p-12 shadow-[6px_6px_0px_rgba(65,105,225,0.12)] document-sheet space-y-12">
          
          {/* KOP SURAT RESMI SMA NEGERI 3 BOMBANA */}
          <div className="pb-1 mb-6 relative">
            <div className="flex items-center justify-between gap-3 sm:gap-6">
              
              {/* Logo Kiri: Logo Provinsi Sulawesi Tenggara */}
              <div className="w-18 h-18 sm:w-24 sm:h-24 shrink-0 flex items-center justify-center">
                {!logoSultraFailed ? (
                  <img
                    src="https://i.ibb.co.com/xtyCYn3F/logo-sultra.webp"
                    alt="Logo Provinsi Sulawesi Tenggara"
                    className="w-full h-full object-contain filter drop-shadow-xs"
                    crossOrigin="anonymous"
                    loading="eager"
                    onError={() => setLogoSultraFailed(true)}
                  />
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-[#F4F6FA] border-2 border-[#24345B] flex flex-col items-center justify-center text-center p-1">
                    <span className="text-[10px] font-bold text-[#24345B] uppercase leading-tight font-mono">SULTRA</span>
                    <span className="text-[9px] text-[#4169E1] font-semibold">1964</span>
                  </div>
                )}
              </div>

              {/* Teks Tengah Kop Surat Resmi */}
              <div className="flex-1 text-center px-1 sm:px-2">
                <h3 className="font-retro font-bold text-[11px] sm:text-xs md:text-sm tracking-wider uppercase text-[#24345B] leading-tight">
                  PEMERINTAH PROVINSI SULAWESI TENGGARA
                </h3>
                <h3 className="font-retro font-bold text-[11px] sm:text-xs md:text-sm tracking-wide uppercase text-[#24345B] leading-tight mt-0.5">
                  DINAS PENDIDIKAN DAN KEBUDAYAAN
                </h3>
                <h2 className="font-retro font-black text-base sm:text-xl md:text-2xl tracking-normal text-[#24345B] leading-snug mt-1 uppercase">
                  SMA NEGERI 3 BOMBANA
                </h2>
                <p className="text-[10px] sm:text-xs text-[#24345B]/90 italic mt-0.5 font-serif leading-tight">
                  Jalan Tina Orima No. 4 Kabupaten Bombana, Sulawesi Tenggara 93771
                </p>
                <p className="text-[10px] sm:text-xs text-[#24345B]/90 mt-0.5 font-medium leading-tight">
                  Telepon (0401) 3087433, Website:{' '}
                  <a
                    href="https://www.sman03bombana.sch.id/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-[#24345B] hover:text-[#4169E1]"
                  >
                    https://www.sman03bombana.sch.id/
                  </a>
                </p>
              </div>

              {/* Logo Kanan: Logo SMA Negeri 3 Bombana */}
              <div className="w-18 h-18 sm:w-24 sm:h-24 shrink-0 flex items-center justify-center">
                {!logoSmanFailed ? (
                  <img
                    src="https://i.ibb.co.com/Gff1Td4F/sman.jpg"
                    alt="Logo SMA Negeri 3 Bombana"
                    className="w-full h-full object-contain filter drop-shadow-xs"
                    crossOrigin="anonymous"
                    loading="eager"
                    onError={() => setLogoSmanFailed(true)}
                  />
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-[#FCE4EC] border-2 border-[#24345B] flex flex-col items-center justify-center text-center p-1">
                    <span className="text-[10px] font-bold text-[#24345B] uppercase leading-tight font-mono">SMAN 3</span>
                    <span className="text-[9px] text-[#4169E1] font-semibold">BOMBANA</span>
                  </div>
                )}
              </div>

            </div>

            {/* Garis Ganda Pembatas Kop Surat Resmi (2.5px tebal + 1px tipis khas surat dinas) */}
            <div className="w-full mt-3">
              <div className="border-b-[2.5px] border-[#24345B]" />
              <div className="border-b border-[#24345B] mt-[2px]" />
            </div>
          </div>

          {/* Document Official Title */}
          <div className="text-center pb-6 border-b border-[#A7D8F0]">
            <div className="inline-block px-3 py-1 bg-[#FCE4EC] border border-[#F4A6C1] rounded-full text-xs font-bold text-[#24345B] mb-2">
              DOKUMEN RESMI KURIKULUM SMA &bull; PANDUAN KOKURIKULER 2025
            </div>
            <h1 className="font-retro text-2xl sm:text-3xl font-extrabold text-[#24345B] tracking-tight uppercase">
              MODUL KOKURIKULER SMA
            </h1>
            <p className="font-retro text-lg sm:text-xl font-bold text-[#4169E1] mt-1">
              {editingModule.identitas.temaKegiatan}
            </p>
            <p className="text-xs text-[#24345B]/80 mt-1 font-medium">
              {editingModule.identitas.namaSatuanPendidikan} &bull; {editingModule.identitas.kelas} ({editingModule.identitas.fase}) &bull; Semester {editingModule.identitas.semester} &bull; Tahun Ajaran {editingModule.identitas.tahunPelajaran}
            </p>
          </div>

          {/* ================= SECTION A: IDENTITAS KEGIATAN ================= */}
          <section id="sec-a" className="scroll-mt-36">
            <div className="flex items-center gap-2 pb-2 mb-4 border-b border-[#A7D8F0]">
              <span className="px-2 py-0.5 bg-[#FCE4EC] text-[#24345B] font-mono font-bold text-xs rounded border border-[#F4A6C1]">A</span>
              <h2 className="font-retro text-lg font-bold text-[#24345B]">IDENTITAS KEGIATAN</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse border border-[#A7D8F0]">
                <tbody>
                  <tr className="border-b border-[#A7D8F0]">
                    <td className="p-2.5 bg-[#F4F6FA] font-bold text-[#24345B] w-1/3">Nama Satuan Pendidikan</td>
                    <td className="p-2.5">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editingModule.identitas.namaSatuanPendidikan}
                          onChange={e => setEditingModule({
                            ...editingModule,
                            identitas: { ...editingModule.identitas, namaSatuanPendidikan: e.target.value }
                          })}
                          className="w-full p-1 border rounded"
                        />
                      ) : editingModule.identitas.namaSatuanPendidikan}
                    </td>
                  </tr>
                  <tr className="border-b border-[#A7D8F0]">
                    <td className="p-2.5 bg-[#F4F6FA] font-bold text-[#24345B]">Jenjang / Kelas / Fase</td>
                    <td className="p-2.5">SMA &bull; {editingModule.identitas.kelas} &bull; {editingModule.identitas.fase}</td>
                  </tr>
                  <tr className="border-b border-[#A7D8F0]">
                    <td className="p-2.5 bg-[#F4F6FA] font-bold text-[#24345B]">Tahun Pelajaran & Semester</td>
                    <td className="p-2.5">{editingModule.identitas.tahunPelajaran} &bull; Semester {editingModule.identitas.semester}</td>
                  </tr>
                  <tr className="border-b border-[#A7D8F0]">
                    <td className="p-2.5 bg-[#F4F6FA] font-bold text-[#24345B]">Tema Kegiatan</td>
                    <td className="p-2.5 font-bold text-[#4169E1]">{editingModule.identitas.temaKegiatan}</td>
                  </tr>
                  <tr className="border-b border-[#A7D8F0]">
                    <td className="p-2.5 bg-[#F4F6FA] font-bold text-[#24345B]">Bentuk Kokurikuler</td>
                    <td className="p-2.5">{editingModule.identitas.bentukKokurikuler}</td>
                  </tr>
                  <tr className="border-b border-[#A7D8F0]">
                    <td className="p-2.5 bg-[#F4F6FA] font-bold text-[#24345B]">Alokasi Waktu & Sesi</td>
                    <td className="p-2.5 font-bold text-[#24345B]">
                      {editingModule.identitas.alokasiWaktu} (Total: {editingModule.identitas.totalJp} JP &bull; {editingModule.identitas.jumlahSesi} Sesi)
                    </td>
                  </tr>
                  <tr className="border-b border-[#A7D8F0]">
                    <td className="p-2.5 bg-[#F4F6FA] font-bold text-[#24345B]">Lokasi Kegiatan</td>
                    <td className="p-2.5">{editingModule.identitas.lokasiKegiatan}</td>
                  </tr>
                  <tr className="border-b border-[#A7D8F0]">
                    <td className="p-2.5 bg-[#F4F6FA] font-bold text-[#24345B]">
                      Koordinator Projek <span className="text-[#4169E1] font-mono text-[10px]">(No. 1 Rombel {editingModule.identitas.rombelGrup || ''})</span>
                    </td>
                    <td className="p-2.5">
                      {isEditing ? (
                        <div className="space-y-1.5">
                          <input
                            type="text"
                            placeholder="Nama Koordinator & Gelar"
                            value={editingModule.identitas.koordinatorKokurikuler}
                            onChange={e => setEditingModule({
                              ...editingModule,
                              identitas: { ...editingModule.identitas, koordinatorKokurikuler: e.target.value }
                            })}
                            className="w-full p-1.5 border rounded text-xs font-bold"
                          />
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-bold text-[#24345B]/70 shrink-0">NIP:</span>
                            <input
                              type="text"
                              placeholder="NIP Koordinator (atau '-' bila non-PNS/PPPK)"
                              value={editingModule.identitas.nipKoordinator || ''}
                              onChange={e => setEditingModule({
                                ...editingModule,
                                identitas: { ...editingModule.identitas, nipKoordinator: e.target.value }
                              })}
                              className="w-full p-1 border rounded text-xs font-mono"
                            />
                          </div>
                        </div>
                      ) : (
                        <div>
                          <span className="font-bold text-[#24345B] block">{editingModule.identitas.koordinatorKokurikuler}</span>
                          <span className="text-[11px] text-[#24345B]/75 font-mono">
                            {editingModule.identitas.nipKoordinator ? `NIP. ${editingModule.identitas.nipKoordinator}` : 'NIP. -'}
                          </span>
                        </div>
                      )}
                    </td>
                  </tr>
                  <tr className="border-b border-[#A7D8F0]">
                    <td className="p-2.5 bg-[#F4F6FA] font-bold text-[#24345B]">
                      Guru &amp; Tim Fasilitator Pendamping
                      {editingModule.identitas.rombelGrup && (
                        <span className="block mt-1 text-[10px] font-mono font-bold text-[#4169E1] bg-[#FCE4EC] px-1.5 py-0.5 rounded border border-[#F4A6C1] w-fit">
                          Rombel: {editingModule.identitas.rombelGrup}
                        </span>
                      )}
                    </td>
                    <td className="p-2.5">
                      {isEditing ? (
                        <div className="space-y-2">
                          {/* Fasilitator 1 */}
                          <div className="p-2 bg-[#F4F6FA] rounded border border-[#A7D8F0] space-y-1">
                            <span className="text-[10px] font-bold text-[#4169E1] uppercase">Fasilitator 1:</span>
                            <input
                              type="text"
                              placeholder="Nama Fasilitator 1"
                              value={editingModule.identitas.guruFasilitator1 || ''}
                              onChange={e => {
                                const f1 = e.target.value;
                                const f2 = editingModule.identitas.guruFasilitator2 || '';
                                const f3 = editingModule.identitas.guruFasilitator3 || '';
                                setEditingModule({
                                  ...editingModule,
                                  identitas: {
                                    ...editingModule.identitas,
                                    guruFasilitator1: f1,
                                    guruFasilitator: [f1 ? `1. ${f1}` : '', f2 ? `2. ${f2}` : '', f3 ? `3. ${f3}` : ''].filter(Boolean).join(' | ')
                                  }
                                });
                              }}
                              className="w-full p-1 border rounded text-xs font-medium"
                            />
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-bold text-[#24345B]/70 shrink-0">NIP:</span>
                              <input
                                type="text"
                                placeholder="NIP Fasilitator 1"
                                value={editingModule.identitas.nipGuruFasilitator1 || ''}
                                onChange={e => setEditingModule({
                                  ...editingModule,
                                  identitas: { ...editingModule.identitas, nipGuruFasilitator1: e.target.value }
                                })}
                                className="w-full p-1 border rounded text-xs font-mono"
                              />
                            </div>
                          </div>

                          {/* Fasilitator 2 */}
                          <div className="p-2 bg-[#F4F6FA] rounded border border-[#A7D8F0] space-y-1">
                            <span className="text-[10px] font-bold text-[#4169E1] uppercase">Fasilitator 2:</span>
                            <input
                              type="text"
                              placeholder="Nama Fasilitator 2"
                              value={editingModule.identitas.guruFasilitator2 || ''}
                              onChange={e => {
                                const f1 = editingModule.identitas.guruFasilitator1 || '';
                                const f2 = e.target.value;
                                const f3 = editingModule.identitas.guruFasilitator3 || '';
                                setEditingModule({
                                  ...editingModule,
                                  identitas: {
                                    ...editingModule.identitas,
                                    guruFasilitator2: f2,
                                    guruFasilitator: [f1 ? `1. ${f1}` : '', f2 ? `2. ${f2}` : '', f3 ? `3. ${f3}` : ''].filter(Boolean).join(' | ')
                                  }
                                });
                              }}
                              className="w-full p-1 border rounded text-xs font-medium"
                            />
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-bold text-[#24345B]/70 shrink-0">NIP:</span>
                              <input
                                type="text"
                                placeholder="NIP Fasilitator 2"
                                value={editingModule.identitas.nipGuruFasilitator2 || ''}
                                onChange={e => setEditingModule({
                                  ...editingModule,
                                  identitas: { ...editingModule.identitas, nipGuruFasilitator2: e.target.value }
                                })}
                                className="w-full p-1 border rounded text-xs font-mono"
                              />
                            </div>
                          </div>

                          {/* Fasilitator 3 */}
                          <div className="p-2 bg-[#F4F6FA] rounded border border-[#A7D8F0] space-y-1">
                            <span className="text-[10px] font-bold text-[#4169E1] uppercase">Fasilitator 3 (Opsional / Tambahan):</span>
                            <input
                              type="text"
                              placeholder="Nama Fasilitator 3"
                              value={editingModule.identitas.guruFasilitator3 || ''}
                              onChange={e => {
                                const f1 = editingModule.identitas.guruFasilitator1 || '';
                                const f2 = editingModule.identitas.guruFasilitator2 || '';
                                const f3 = e.target.value;
                                setEditingModule({
                                  ...editingModule,
                                  identitas: {
                                    ...editingModule.identitas,
                                    guruFasilitator3: f3,
                                    guruFasilitator: [f1 ? `1. ${f1}` : '', f2 ? `2. ${f2}` : '', f3 ? `3. ${f3}` : ''].filter(Boolean).join(' | ')
                                  }
                                });
                              }}
                              className="w-full p-1 border rounded text-xs font-medium"
                            />
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-bold text-[#24345B]/70 shrink-0">NIP:</span>
                              <input
                                type="text"
                                placeholder="NIP Fasilitator 3"
                                value={editingModule.identitas.nipGuruFasilitator3 || ''}
                                onChange={e => setEditingModule({
                                  ...editingModule,
                                  identitas: { ...editingModule.identitas, nipGuruFasilitator3: e.target.value }
                                })}
                                className="w-full p-1 border rounded text-xs font-mono"
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <span className="w-4 h-4 rounded-full bg-[#4169E1] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</span>
                            <div>
                              <span className="font-semibold text-[#24345B] block">{editingModule.identitas.guruFasilitator1 || '-'}</span>
                              <span className="text-[11px] text-[#24345B]/70 font-mono">
                                {editingModule.identitas.nipGuruFasilitator1 ? `NIP. ${editingModule.identitas.nipGuruFasilitator1}` : 'NIP. -'}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="w-4 h-4 rounded-full bg-[#4169E1] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</span>
                            <div>
                              <span className="font-semibold text-[#24345B] block">{editingModule.identitas.guruFasilitator2 || '-'}</span>
                              <span className="text-[11px] text-[#24345B]/70 font-mono">
                                {editingModule.identitas.nipGuruFasilitator2 ? `NIP. ${editingModule.identitas.nipGuruFasilitator2}` : 'NIP. -'}
                              </span>
                            </div>
                          </div>
                          {editingModule.identitas.guruFasilitator3 && (
                            <div className="flex items-start gap-2">
                              <span className="w-4 h-4 rounded-full bg-[#4169E1] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">3</span>
                              <div>
                                <span className="font-semibold text-[#24345B] block">{editingModule.identitas.guruFasilitator3}</span>
                                <span className="text-[11px] text-[#24345B]/70 font-mono">
                                  {editingModule.identitas.nipGuruFasilitator3 ? `NIP. ${editingModule.identitas.nipGuruFasilitator3}` : 'NIP. -'}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Integrated Subjects Table */}
            <div className="mt-4">
              <h3 className="text-xs font-bold text-[#24345B] uppercase tracking-wider mb-2">
                Mata Pelajaran SMA yang Terintegrasi
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse border border-[#A7D8F0]">
                  <thead>
                    <tr className="bg-[#4169E1] text-white">
                      <th className="p-2.5 w-10 text-center">No</th>
                      <th className="p-2.5 w-1/4">Mata Pelajaran SMA</th>
                      <th className="p-2.5 w-1/3">Kontribusi terhadap Proyek</th>
                      <th className="p-2.5">Kompetensi yang Diperkuat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {editingModule.identitas.mataPelajaranTerkait.map((m, idx) => (
                      <tr key={idx} className="border-b border-[#A7D8F0] hover:bg-[#F4F6FA]">
                        <td className="p-2.5 text-center font-bold">{idx + 1}</td>
                        <td className="p-2.5 font-bold text-[#24345B]">{m.nama}</td>
                        <td className="p-2.5 text-[#24345B]/85">{m.kontribusi}</td>
                        <td className="p-2.5 text-[#24345B]/85">{m.kompetensi}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ================= SECTION B: 8 DIMENSI PROFIL LULUSAN ================= */}
          <section id="sec-b" className="scroll-mt-36">
            <div className="flex items-center gap-2 pb-2 mb-4 border-b border-[#A7D8F0]">
              <span className="px-2 py-0.5 bg-[#FCE4EC] text-[#24345B] font-mono font-bold text-xs rounded border border-[#F4A6C1]">B</span>
              <h2 className="font-retro text-lg font-bold text-[#24345B]">TARGET 8 DIMENSI PROFIL LULUSAN</h2>
            </div>

            <div className="space-y-3 text-xs leading-relaxed">
              <p>
                <strong className="text-[#24345B]">Dimensi Fokus:</strong>{' '}
                <span className="text-[#4169E1] font-bold">{editingModule.dimensi.fokusDimensi.join(', ')}</span>
              </p>
              <p>
                <strong className="text-[#24345B]">Alasan Pemilihan Dimensi:</strong>{' '}
                {editingModule.dimensi.alasanPemilihan}
              </p>
              <p>
                <strong className="text-[#24345B]">Keterkaitan dengan Proyek:</strong>{' '}
                {editingModule.dimensi.hubunganDenganProyek}
              </p>

              {/* Behavioral Indicators Table */}
              <div className="overflow-x-auto pt-2">
                <table className="w-full text-xs text-left border-collapse border border-[#A7D8F0]">
                  <thead>
                    <tr className="bg-[#FCE4EC] text-[#24345B]">
                      <th className="p-2.5 w-10 text-center">No</th>
                      <th className="p-2.5 w-1/3">Dimensi Profil Lulusan</th>
                      <th className="p-2.5 w-1/3">Indikator Perilaku Murid</th>
                      <th className="p-2.5">Bukti Perkembangan yang Diamati</th>
                    </tr>
                  </thead>
                  <tbody>
                    {editingModule.dimensi.indikatorPerilaku.map((d, idx) => (
                      <tr key={idx} className="border-b border-[#A7D8F0] hover:bg-[#F4F6FA]">
                        <td className="p-2.5 text-center font-bold">{idx + 1}</td>
                        <td className="p-2.5 font-bold text-[#24345B]">{d.dimensi}</td>
                        <td className="p-2.5">{d.indikator}</td>
                        <td className="p-2.5 text-[#24345B]/85">{d.buktiPerkembangan}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ================= SECTION C: TUJUAN PEMBELAJARAN ================= */}
          <section id="sec-c" className="scroll-mt-36">
            <div className="flex items-center gap-2 pb-2 mb-4 border-b border-[#A7D8F0]">
              <span className="px-2 py-0.5 bg-[#FCE4EC] text-[#24345B] font-mono font-bold text-xs rounded border border-[#F4A6C1]">C</span>
              <h2 className="font-retro text-lg font-bold text-[#24345B]">TUJUAN PEMBELAJARAN</h2>
            </div>

            <ol className="list-decimal pl-5 space-y-2 text-xs text-[#24345B] leading-relaxed">
              {editingModule.tujuanPembelajaran.map((goal, idx) => (
                <li key={idx} className="pl-1">
                  {isEditing ? (
                    <input
                      type="text"
                      value={goal}
                      onChange={e => {
                        const updatedGoals = [...editingModule.tujuanPembelajaran];
                        updatedGoals[idx] = e.target.value;
                        setEditingModule({ ...editingModule, tujuanPembelajaran: updatedGoals });
                      }}
                      className="w-full p-1 border rounded"
                    />
                  ) : goal}
                </li>
              ))}
            </ol>
          </section>

          {/* ================= SECTION D: PRAKTIK PEDAGOGIS ================= */}
          <section id="sec-d" className="scroll-mt-36">
            <div className="flex items-center gap-2 pb-2 mb-4 border-b border-[#A7D8F0]">
              <span className="px-2 py-0.5 bg-[#FCE4EC] text-[#24345B] font-mono font-bold text-xs rounded border border-[#F4A6C1]">D</span>
              <h2 className="font-retro text-lg font-bold text-[#24345B]">PRAKTIK PEDAGOGIS & PENDEKATAN</h2>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-[#24345B]">
              <p><strong>Pendekatan Terpilih:</strong> <span className="font-bold text-[#4169E1]">{editingModule.praktikPedagogis.pendekatan}</span></p>
              <p><strong>Rasional Penggunaan:</strong> {editingModule.praktikPedagogis.alasanPenggunaan}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-3 bg-[#F4F6FA] border border-[#A7D8F0] rounded-xl">
                  <h4 className="font-bold text-[#4169E1] mb-1">Peran Guru / Fasilitator</h4>
                  <p>{editingModule.praktikPedagogis.peranGuru}</p>
                </div>
                <div className="p-3 bg-[#F4F6FA] border border-[#A7D8F0] rounded-xl">
                  <h4 className="font-bold text-[#4169E1] mb-1">Peran Murid SMA</h4>
                  <p>{editingModule.praktikPedagogis.peranMurid}</p>
                </div>
              </div>
              <p><strong>Pola Kerja Kelompok:</strong> {editingModule.praktikPedagogis.polaKerjaKelompok}</p>
              <p><strong>Strategi Pendampingan (Scaffolding):</strong> {editingModule.praktikPedagogis.strategiPendampingan}</p>

              {/* STREAM Breakdown Table if available */}
              {editingModule.praktikPedagogis.integrasiStream && (
                <div className="mt-4">
                  <h4 className="font-bold text-xs text-[#4169E1] uppercase tracking-wider mb-2">
                    Integrasi 6 Unsur STREAM dalam Proyek
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left border-collapse border border-[#A7D8F0]">
                      <thead>
                        <tr className="bg-[#4169E1] text-white">
                          <th className="p-2.5 w-1/4">Unsur STREAM</th>
                          <th className="p-2.5">Aktivitas Nyata Murid dalam Proyek</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-[#A7D8F0]">
                          <td className="p-2.5 font-bold text-[#24345B]">Science (Sains)</td>
                          <td className="p-2.5">{editingModule.praktikPedagogis.integrasiStream.science}</td>
                        </tr>
                        <tr className="border-b border-[#A7D8F0]">
                          <td className="p-2.5 font-bold text-[#24345B]">Technology (Teknologi)</td>
                          <td className="p-2.5">{editingModule.praktikPedagogis.integrasiStream.technology}</td>
                        </tr>
                        <tr className="border-b border-[#A7D8F0]">
                          <td className="p-2.5 font-bold text-[#24345B]">Religion (Religi & Etika)</td>
                          <td className="p-2.5">{editingModule.praktikPedagogis.integrasiStream.religion}</td>
                        </tr>
                        <tr className="border-b border-[#A7D8F0]">
                          <td className="p-2.5 font-bold text-[#24345B]">Engineering (Rekayasa)</td>
                          <td className="p-2.5">{editingModule.praktikPedagogis.integrasiStream.engineering}</td>
                        </tr>
                        <tr className="border-b border-[#A7D8F0]">
                          <td className="p-2.5 font-bold text-[#24345B]">Arts (Seni & Estetika)</td>
                          <td className="p-2.5">{editingModule.praktikPedagogis.integrasiStream.arts}</td>
                        </tr>
                        <tr className="border-b border-[#A7D8F0]">
                          <td className="p-2.5 font-bold text-[#24345B]">Mathematics (Matematika)</td>
                          <td className="p-2.5">{editingModule.praktikPedagogis.integrasiStream.mathematics}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* ================= SECTION E: LINGKUNGAN PEMBELAJARAN ================= */}
          <section id="sec-e" className="scroll-mt-36">
            <div className="flex items-center gap-2 pb-2 mb-4 border-b border-[#A7D8F0]">
              <span className="px-2 py-0.5 bg-[#FCE4EC] text-[#24345B] font-mono font-bold text-xs rounded border border-[#F4A6C1]">E</span>
              <h2 className="font-retro text-lg font-bold text-[#24345B]">LINGKUNGAN PEMBELAJARAN</h2>
            </div>

            <div className="space-y-2.5 text-xs text-[#24345B]">
              <p><strong>Tempat & Sarana:</strong> {editingModule.lingkungan.tempat}</p>
              <p><strong>Sumber Belajar:</strong> {editingModule.lingkungan.sumberBelajar}</p>
              <p><strong>Kondisi Lingkungan Psikososial:</strong> {editingModule.lingkungan.kondisiLingkungan}</p>
              <p><strong>Keselamatan, Aksesibilitas & Inklusi:</strong> {editingModule.lingkungan.keselamatanDanInklusi}</p>
            </div>
          </section>

          {/* ================= SECTION F: KEMITRAAN PEMBELAJARAN ================= */}
          <section id="sec-f" className="scroll-mt-36">
            <div className="flex items-center gap-2 pb-2 mb-4 border-b border-[#A7D8F0]">
              <span className="px-2 py-0.5 bg-[#FCE4EC] text-[#24345B] font-mono font-bold text-xs rounded border border-[#F4A6C1]">F</span>
              <h2 className="font-retro text-lg font-bold text-[#24345B]">KEMITRAAN PEMBELAJARAN</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse border border-[#A7D8F0]">
                <thead>
                  <tr className="bg-[#4169E1] text-white">
                    <th className="p-2.5 w-10 text-center">No</th>
                    <th className="p-2.5 w-1/4">Mitra Pembelajaran</th>
                    <th className="p-2.5 w-1/4">Peran Strategis</th>
                    <th className="p-2.5">Bentuk Keterlibatan Nyata</th>
                    <th className="p-2.5 w-24">Waktu</th>
                  </tr>
                </thead>
                <tbody>
                  {editingModule.kemitraan.map(k => (
                    <tr key={k.no} className="border-b border-[#A7D8F0] hover:bg-[#F4F6FA]">
                      <td className="p-2.5 text-center font-bold">{k.no}</td>
                      <td className="p-2.5 font-bold text-[#24345B]">{k.mitra}</td>
                      <td className="p-2.5">{k.peran}</td>
                      <td className="p-2.5">{k.bentukKeterlibatan}</td>
                      <td className="p-2.5 text-[#24345B]/80">{k.waktuKeterlibatan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ================= SECTION G: PEMANFAATAN TEKNOLOGI DIGITAL ================= */}
          <section id="sec-g" className="scroll-mt-36">
            <div className="flex items-center gap-2 pb-2 mb-4 border-b border-[#A7D8F0]">
              <span className="px-2 py-0.5 bg-[#FCE4EC] text-[#24345B] font-mono font-bold text-xs rounded border border-[#F4A6C1]">G</span>
              <h2 className="font-retro text-lg font-bold text-[#24345B]">PEMANFAATAN TEKNOLOGI DIGITAL & ETIKA AI</h2>
            </div>

            <div className="space-y-3 text-xs text-[#24345B]">
              <div>
                <strong>Perangkat & Aplikasi Terpilih:</strong>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  {editingModule.teknologi.perangkatDanAplikasi.map((p, idx) => (
                    <li key={idx}>{p}</li>
                  ))}
                </ul>
              </div>
              <p><strong>Fungsi Teknologi per Tahapan:</strong> {editingModule.teknologi.fungsiTeknologiPerTahap}</p>
              <div className="p-3 bg-[#FCE4EC]/50 border border-[#F4A6C1] rounded-xl">
                <strong className="text-[#4169E1]">Etika Pemanfaatan AI & Perlindungan Data:</strong>
                <p className="mt-1">{editingModule.teknologi.etikaAIdanLiterasiDigital}</p>
              </div>
            </div>
          </section>

          {/* ================= SECTION H: RANGKAIAN KEGIATAN PROYEK ================= */}
          <section id="sec-h" className="scroll-mt-36">
            <div className="flex items-center justify-between pb-2 mb-4 border-b border-[#A7D8F0]">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#FCE4EC] text-[#24345B] font-mono font-bold text-xs rounded border border-[#F4A6C1]">H</span>
                <h2 className="font-retro text-lg font-bold text-[#24345B]">
                  RANGKAIAN KEGIATAN PROYEK BERKESINAMBUNGAN
                </h2>
              </div>
              
              <button
                onClick={handleAddSession}
                className="retro-button-secondary no-print px-2.5 py-1 text-[11px] font-bold rounded-lg flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-[#4169E1]" />
                <span>+ Tambah Sesi</span>
              </button>
            </div>

            {/* Product Progression Map */}
            <div className="p-4 bg-[#F4F6FA] border border-[#A7D8F0] rounded-xl mb-6 text-xs text-[#24345B]">
              <strong className="text-[#4169E1] font-retro text-sm block mb-1">
                Peta Perkembangan Produk Antarsesi:
              </strong>
              <pre className="whitespace-pre-wrap font-sans text-xs leading-relaxed text-[#24345B]/90">
                {editingModule.rangkaianKegiatan.petaPerkembanganProduk}
              </pre>
            </div>

            {/* List of Sessions */}
            <div className="space-y-6">
              {editingModule.rangkaianKegiatan.sesi.map((session, sIdx) => (
                <div
                  key={session.nomorSesi}
                  className="p-5 bg-white border-2 border-[#A7D8F0] rounded-xl shadow-xs space-y-3 text-xs text-[#24345B]"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#A7D8F0] pb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-[#4169E1] text-white font-mono font-bold text-[10px] rounded">
                        SESI 0{session.nomorSesi}
                      </span>
                      <h3 className="font-retro font-bold text-sm text-[#24345B]">
                        {session.namaSesi}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-[#FCE4EC] border border-[#F4A6C1] text-[#24345B] font-bold text-[10px] rounded">
                        Tahap: {session.tahapPengalaman}
                      </span>
                      <span className="px-2 py-0.5 bg-[#F4F6FA] border border-[#A7D8F0] text-[#24345B] font-bold text-[10px] rounded">
                        {session.alokasiJp} JP
                      </span>
                      
                      <button
                        onClick={() => handleDeleteSession(sIdx)}
                        className="no-print p-1 text-red-500 hover:bg-red-50 rounded cursor-pointer"
                        title="Hapus Sesi"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p><strong>Tujuan Sesi:</strong> {session.tujuanSesi}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-2.5 bg-[#F4F6FA] rounded-lg">
                      <strong className="text-[#4169E1] block mb-0.5">Aktivitas Fasilitator/Guru:</strong>
                      <p>{session.aktivitasGuru}</p>
                    </div>
                    <div className="p-2.5 bg-[#F4F6FA] rounded-lg">
                      <strong className="text-[#4169E1] block mb-0.5">Aktivitas Murid SMA:</strong>
                      <p>{session.aktivitasMurid}</p>
                    </div>
                  </div>

                  <p><strong>Integrasi Mapel / STREAM:</strong> {session.integrasiMapelAtauStream}</p>
                  <p><strong>Alat dan Bahan:</strong> {session.alatDanBahan}</p>

                  {/* Inter-Session Continuity Table */}
                  <div className="overflow-x-auto pt-1">
                    <table className="w-full text-[11px] text-left border-collapse border border-[#A7D8F0]">
                      <thead>
                        <tr className="bg-[#FCE4EC] text-[#24345B]">
                          <th className="p-2 w-1/3">Hasil Sementara Sesi Ini</th>
                          <th className="p-2 w-1/3">Hubungan dengan Sesi Berikutnya</th>
                          <th className="p-2">Bukti Perkembangan Disimpan</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-2 border border-[#A7D8F0] font-medium">{session.hasilSementara}</td>
                          <td className="p-2 border border-[#A7D8F0] text-[#4169E1] font-medium">{session.hubunganDenganSesiBerikutnya}</td>
                          <td className="p-2 border border-[#A7D8F0]">{session.buktiPerkembangan}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                </div>
              ))}
            </div>
          </section>

          {/* ================= SECTION I: ASESMEN ================= */}
          <section id="sec-i" className="scroll-mt-36">
            <div className="flex items-center gap-2 pb-2 mb-4 border-b border-[#A7D8F0]">
              <span className="px-2 py-0.5 bg-[#FCE4EC] text-[#24345B] font-mono font-bold text-xs rounded border border-[#F4A6C1]">I</span>
              <h2 className="font-retro text-lg font-bold text-[#24345B]">ASESMEN KOKURIKULER</h2>
            </div>

            {/* 1. Asesmen Formatif */}
            <div className="mb-6 space-y-2 text-xs text-[#24345B]">
              <h3 className="font-bold text-sm text-[#4169E1]">1. Asesmen Formatif (Proses & Karakter)</h3>
              <p><strong>Tujuan:</strong> {editingModule.asesmen.formatif.tujuan}</p>
              <p><strong>Waktu & Teknik:</strong> {editingModule.asesmen.formatif.waktuPelaksanaan} &bull; {editingModule.asesmen.formatif.teknikInstrumen}</p>

              <div className="overflow-x-auto pt-2">
                <table className="w-full text-xs text-left border-collapse border border-[#A7D8F0]">
                  <thead>
                    <tr className="bg-[#4169E1] text-white">
                      <th className="p-2 text-center w-8">No</th>
                      <th className="p-2 w-28">Nama Murid</th>
                      <th className="p-2 w-1/4">Dimensi Diamati</th>
                      <th className="p-2">Indikator Bukti</th>
                      <th className="p-2">Catatan Perkembangan</th>
                      <th className="p-2">Umpan Balik Guru</th>
                    </tr>
                  </thead>
                  <tbody>
                    {editingModule.asesmen.formatif.tabelPengamatan.map(f => (
                      <tr key={f.no} className="border-b border-[#A7D8F0] hover:bg-[#F4F6FA]">
                        <td className="p-2 text-center font-bold">{f.no}</td>
                        <td className="p-2 font-bold text-[#24345B]">{f.namaMurid}</td>
                        <td className="p-2 text-[#4169E1] font-semibold">{f.dimensiDiamati}</td>
                        <td className="p-2">{f.indikatorBukti}</td>
                        <td className="p-2">{f.catatanPerkembangan}</td>
                        <td className="p-2 text-[#24345B]/85">{f.umpanBalik}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 2. Asesmen Sumatif Rubrik Analitik */}
            <div className="space-y-2 text-xs text-[#24345B]">
              <h3 className="font-bold text-sm text-[#4169E1]">2. Asesmen Sumatif (Rubrik Analitik 4 Tingkat)</h3>
              <p><strong>Teknik Penilaian:</strong> {editingModule.asesmen.sumatif.teknik}</p>

              <div className="overflow-x-auto pt-2">
                <table className="w-full text-xs text-left border-collapse border border-[#A7D8F0]">
                  <thead>
                    <tr className="bg-[#24345B] text-white">
                      <th className="p-2.5 w-1/5 font-bold">Kriteria &amp; Dimensi</th>
                      <th className="p-2.5 w-1/5 font-bold border-l border-white/20">Sangat Baik (Skor 4)</th>
                      <th className="p-2.5 w-1/5 font-bold border-l border-white/20">Baik (Skor 3)</th>
                      <th className="p-2.5 w-1/5 font-bold border-l border-white/20">Cukup (Skor 2)</th>
                      <th className="p-2.5 w-1/5 font-bold border-l border-white/20">Perlu Bimbingan (Skor 1)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {editingModule.asesmen.sumatif.rubrikAnalitik.map((r, rIdx) => (
                      <tr key={rIdx} className="border-b border-[#A7D8F0] hover:bg-[#F4F6FA]">
                        <td className="p-2.5 font-bold text-[#24345B] bg-[#F4F6FA]">
                          {r.kriteria}
                          <span className="block text-[10px] font-mono text-[#4169E1] mt-0.5">
                            Dimensi: {r.dimensiTerkait}
                          </span>
                        </td>
                        <td className="p-2.5 text-[#24345B]/90">{r.sangatBaik}</td>
                        <td className="p-2.5 text-[#24345B]/90">{r.baik}</td>
                        <td className="p-2.5 text-[#24345B]/90">{r.cukup}</td>
                        <td className="p-2.5 text-[#24345B]/90">{r.perluBimbingan}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ================= SECTION J: HASIL / KARYA MURID ================= */}
          <section id="sec-j" className="scroll-mt-36">
            <div className="flex items-center gap-2 pb-2 mb-4 border-b border-[#A7D8F0]">
              <span className="px-2 py-0.5 bg-[#FCE4EC] text-[#24345B] font-mono font-bold text-xs rounded border border-[#F4A6C1]">J</span>
              <h2 className="font-retro text-lg font-bold text-[#24345B]">HASIL / KARYA NYATA MURID</h2>
            </div>

            <div className="space-y-3 text-xs text-[#24345B]">
              <p><strong>Produk Utama:</strong> <span className="font-bold text-[#4169E1]">{editingModule.karyaMurid.produkUtama}</span></p>
              <p><strong>Bukti Sementara per Sesi:</strong> {editingModule.karyaMurid.buktiSementaraSesi}</p>
              <p><strong>Spesifikasi & Kriteria Keberhasilan:</strong> {editingModule.karyaMurid.spesifikasiKriteria}</p>
              <p><strong>Bentuk Presentasi & Publikasi:</strong> {editingModule.karyaMurid.bentukPublikasi}</p>
              <p><strong>Kemanfaatan bagi Sekolah dan Masyarakat:</strong> {editingModule.karyaMurid.manfaatBagiSekolahMasyarakat}</p>
              <p><strong>Bukti Proses yang Perlu Disimpan:</strong> {editingModule.karyaMurid.buktiProsesDisimpan}</p>
            </div>
          </section>

          {/* ================= SECTION K: REFLEKSI MURID ================= */}
          <section id="sec-k" className="scroll-mt-36">
            <div className="flex items-center gap-2 pb-2 mb-4 border-b border-[#A7D8F0]">
              <span className="px-2 py-0.5 bg-[#FCE4EC] text-[#24345B] font-mono font-bold text-xs rounded border border-[#F4A6C1]">K</span>
              <h2 className="font-retro text-lg font-bold text-[#24345B]">REFLEKSI MURID (7 PERTANYAAN KUNCI)</h2>
            </div>

            <div className="space-y-2.5 text-xs text-[#24345B]">
              <p className="italic text-[#24345B]/70">{editingModule.refleksiMurid.panduanPengerjaan}</p>
              <ol className="list-decimal pl-5 space-y-2">
                {editingModule.refleksiMurid.pertanyaan.map((q, idx) => (
                  <li key={idx} className="font-medium">
                    {q}
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* ================= SECTION L: REFLEKSI GURU ================= */}
          <section id="sec-l" className="scroll-mt-36">
            <div className="flex items-center gap-2 pb-2 mb-4 border-b border-[#A7D8F0]">
              <span className="px-2 py-0.5 bg-[#FCE4EC] text-[#24345B] font-mono font-bold text-xs rounded border border-[#F4A6C1]">L</span>
              <h2 className="font-retro text-lg font-bold text-[#24345B]">REFLEKSI GURU / FASILITATOR (10 ASPEK)</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse border border-[#A7D8F0]">
                <thead>
                  <tr className="bg-[#4169E1] text-white">
                    <th className="p-2.5 w-1/3">Aspek Refleksi Guru</th>
                    <th className="p-2.5">Panduan Evaluasi Diri Fasilitator</th>
                  </tr>
                </thead>
                <tbody>
                  {editingModule.refleksiGuru.aspek.map((a, idx) => (
                    <tr key={idx} className="border-b border-[#A7D8F0] hover:bg-[#F4F6FA]">
                      <td className="p-2.5 font-bold text-[#24345B]">{idx + 1}. {a.pertanyaan}</td>
                      <td className="p-2.5 text-[#24345B]/85">{a.panduanEvaluasi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ================= SECTION M: PELAPORAN RAPOR ================= */}
          <section id="sec-m" className="scroll-mt-36">
            <div className="flex items-center gap-2 pb-2 mb-4 border-b border-[#A7D8F0]">
              <span className="px-2 py-0.5 bg-[#FCE4EC] text-[#24345B] font-mono font-bold text-xs rounded border border-[#F4A6C1]">M</span>
              <h2 className="font-retro text-lg font-bold text-[#24345B]">PELAPORAN RAPOR KOKURIKULER</h2>
            </div>

            <div className="space-y-3 text-xs text-[#24345B]">
              <div className="p-3 bg-[#F4F6FA] border border-[#A7D8F0] rounded-xl font-mono text-[11px]">
                {editingModule.pelaporan.formatRapor}
              </div>

              <div className="space-y-2 pt-2">
                <div className="p-3.5 border border-emerald-200 bg-emerald-50/40 rounded-xl">
                  <strong className="text-emerald-900 block mb-1">Contoh Narasi Capaian Sangat Baik:</strong>
                  <p className="text-[#24345B] leading-relaxed">{editingModule.pelaporan.contohSangatBaik}</p>
                </div>

                <div className="p-3.5 border border-blue-200 bg-blue-50/40 rounded-xl">
                  <strong className="text-blue-900 block mb-1">Contoh Narasi Capaian Baik:</strong>
                  <p className="text-[#24345B] leading-relaxed">{editingModule.pelaporan.contohBaik}</p>
                </div>

                <div className="p-3.5 border border-amber-200 bg-amber-50/40 rounded-xl">
                  <strong className="text-amber-900 block mb-1">Contoh Narasi Capaian Cukup:</strong>
                  <p className="text-[#24345B] leading-relaxed">{editingModule.pelaporan.contohCukup}</p>
                </div>

                <div className="p-3.5 border border-rose-200 bg-rose-50/40 rounded-xl">
                  <strong className="text-rose-900 block mb-1">Contoh Narasi Capaian Perlu Bimbingan:</strong>
                  <p className="text-[#24345B] leading-relaxed">{editingModule.pelaporan.contohPerluBimbingan}</p>
                </div>
              </div>
            </div>
          </section>

          {/* ================= SECTION N: EVALUASI & TINDAK LANJUT ================= */}
          <section id="sec-n" className="scroll-mt-36">
            <div className="flex items-center gap-2 pb-2 mb-4 border-b border-[#A7D8F0]">
              <span className="px-2 py-0.5 bg-[#FCE4EC] text-[#24345B] font-mono font-bold text-xs rounded border border-[#F4A6C1]">N</span>
              <h2 className="font-retro text-lg font-bold text-[#24345B]">EVALUASI DAN TINDAK LANJUT</h2>
            </div>

            <div className="space-y-3 text-xs text-[#24345B]">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-[#F4F6FA] border border-[#A7D8F0] rounded-xl">
                  <strong className="text-[#4169E1] block mb-1">Evaluasi Input:</strong>
                  <p>{editingModule.evaluasiTindakLanjut.evaluasiInput}</p>
                </div>
                <div className="p-3 bg-[#F4F6FA] border border-[#A7D8F0] rounded-xl">
                  <strong className="text-[#4169E1] block mb-1">Evaluasi Proses:</strong>
                  <p>{editingModule.evaluasiTindakLanjut.evaluasiProses}</p>
                </div>
                <div className="p-3 bg-[#F4F6FA] border border-[#A7D8F0] rounded-xl">
                  <strong className="text-[#4169E1] block mb-1">Evaluasi Output / Hasil:</strong>
                  <p>{editingModule.evaluasiTindakLanjut.evaluasiOutput}</p>
                </div>
              </div>

              <div className="p-3 bg-[#FCE4EC] border border-[#F4A6C1] rounded-xl flex items-center justify-between">
                <span><strong>Status Rekomendasi Tindak Lanjut:</strong></span>
                <span className="px-3 py-1 bg-[#4169E1] text-white font-bold rounded-lg text-xs">
                  {editingModule.evaluasiTindakLanjut.statusTindakLanjut}
                </span>
              </div>

              <div>
                <strong>Rencana Aksi Tindak Lanjut:</strong>
                <pre className="mt-1 whitespace-pre-wrap font-sans text-xs bg-[#F4F6FA] p-3 border border-[#A7D8F0] rounded-xl text-[#24345B]">
                  {editingModule.evaluasiTindakLanjut.rencanaTindakLanjut}
                </pre>
              </div>
            </div>
          </section>

          {/* ================= SECTION O: LAMPIRAN SIAP PAKAI ================= */}
          <section id="sec-o" className="scroll-mt-36">
            <div className="flex items-center gap-2 pb-2 mb-4 border-b border-[#A7D8F0]">
              <span className="px-2 py-0.5 bg-[#FCE4EC] text-[#24345B] font-mono font-bold text-xs rounded border border-[#F4A6C1]">O</span>
              <h2 className="font-retro text-lg font-bold text-[#24345B]">LAMPIRAN INSTRUMEN SIAP PAKAI</h2>
            </div>

            <div className="space-y-4 text-xs text-[#24345B]">
              <div className="p-4 bg-white border border-[#A7D8F0] rounded-xl space-y-2">
                <h4 className="font-bold text-[#4169E1] text-xs uppercase">1. Jadwal dan Pembagian Sesi</h4>
                <pre className="whitespace-pre-wrap font-sans text-xs text-[#24345B]/90 bg-[#F4F6FA] p-2.5 rounded-lg">
                  {editingModule.lampiran.jadwalSesi}
                </pre>
              </div>

              <div className="p-4 bg-white border border-[#A7D8F0] rounded-xl space-y-2">
                <h4 className="font-bold text-[#4169E1] text-xs uppercase">2. Pembagian Peran Kelompok Murid</h4>
                <pre className="whitespace-pre-wrap font-sans text-xs text-[#24345B]/90 bg-[#F4F6FA] p-2.5 rounded-lg">
                  {editingModule.lampiran.pembagianPeranKelompok}
                </pre>
              </div>

              <div className="p-4 bg-white border border-[#A7D8F0] rounded-xl space-y-2">
                <h4 className="font-bold text-[#4169E1] text-xs uppercase">3. Lembar Observasi & Investigasi Lapangan</h4>
                <pre className="whitespace-pre-wrap font-sans text-xs text-[#24345B]/90 bg-[#F4F6FA] p-2.5 rounded-lg">
                  {editingModule.lampiran.lembarObservasi}
                </pre>
              </div>

              <div className="p-4 bg-white border border-[#A7D8F0] rounded-xl space-y-2">
                <h4 className="font-bold text-[#4169E1] text-xs uppercase">4. Jurnal Perkembangan Proyek</h4>
                <pre className="whitespace-pre-wrap font-sans text-xs text-[#24345B]/90 bg-[#F4F6FA] p-2.5 rounded-lg">
                  {editingModule.lampiran.jurnalProyek}
                </pre>
              </div>

              <div className="p-4 bg-white border border-[#A7D8F0] rounded-xl space-y-2">
                <h4 className="font-bold text-[#4169E1] text-xs uppercase">5. Lembar Umpan Balik Antarteman (Peer Review)</h4>
                <pre className="whitespace-pre-wrap font-sans text-xs text-[#24345B]/90 bg-[#F4F6FA] p-2.5 rounded-lg">
                  {editingModule.lampiran.lembarUmpanBalikTeman}
                </pre>
              </div>

              <div className="p-4 bg-white border border-[#A7D8F0] rounded-xl space-y-2">
                <h4 className="font-bold text-[#4169E1] text-xs uppercase">6. Format Rekapitulasi Asesmen</h4>
                <pre className="whitespace-pre-wrap font-sans text-xs text-[#24345B]/90 bg-[#F4F6FA] p-2.5 rounded-lg">
                  {editingModule.lampiran.rekapAsesmen}
                </pre>
              </div>
            </div>
          </section>

          {/* Document Footer Signatures: Kepala Sekolah, 1 Koordinator, & 2 Guru Fasilitator */}
          <div className="pt-8 border-t-2 border-[#A7D8F0] space-y-6 text-xs text-center text-[#24345B] break-inside-avoid">
            <div className="text-center mb-1">
              <span className="px-3 py-1 bg-[#FCE4EC] border border-[#F4A6C1] rounded-full text-[11px] font-bold text-[#24345B]">
                LEMBAR PENGESAHAN DOKUMEN MODUL KOKURIKULER SMA
              </span>
            </div>

            {/* Endorsement Location & Date Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between pb-3 border-b border-[#A7D8F0] text-xs">
              <span className="font-bold text-[#24345B] uppercase tracking-wide">
                Pengesahan Pelaksanaan Kokurikuler
              </span>
              <div className="flex items-center gap-1.5 mt-1 sm:mt-0 font-medium text-[#24345B]">
                <span className="text-[#24345B]/70">Ditetapkan di:</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={editingModule.identitas.tanggalPengesahan || 'Rumbia, 14 Juli 2025'}
                    onChange={e => setEditingModule({
                      ...editingModule,
                      identitas: { ...editingModule.identitas, tanggalPengesahan: e.target.value }
                    })}
                    placeholder="Contoh: Rumbia, 14 Juli 2025"
                    className="p-1 border rounded text-xs font-semibold text-right"
                  />
                ) : (
                  <span className="font-semibold text-[#4169E1]">
                    {editingModule.identitas.tanggalPengesahan?.includes('Rumbia') 
                      ? editingModule.identitas.tanggalPengesahan 
                      : `Rumbia, ${editingModule.identitas.tanggalPengesahan || '14 Juli 2025'}`}
                  </span>
                )}
              </div>
            </div>

            {/* Row 1: Mengetahui Kepala Sekolah & Disahkan Koordinator Kokurikuler (1 Orang) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-4 bg-[#F4F6FA] border border-[#A7D8F0] rounded-xl text-center">
                <p className="text-[11px] text-[#24345B]/70">Mengetahui,</p>
                <p className="font-bold mt-1 text-[#24345B]">Kepala SMA Negeri 3 Bombana</p>
                <div className="h-14" />
                {isEditing ? (
                  <div className="space-y-1">
                    <input
                      type="text"
                      value={editingModule.identitas.namaKepalaSekolah || 'Andi Dewi Kusumawati, S.Pd., M.Pd.'}
                      onChange={e => setEditingModule({
                        ...editingModule,
                        identitas: { ...editingModule.identitas, namaKepalaSekolah: e.target.value }
                      })}
                      className="w-full p-1 border rounded text-xs font-bold text-center"
                    />
                    <input
                      type="text"
                      value={editingModule.identitas.nipKepalaSekolah || '198001062006042028'}
                      onChange={e => setEditingModule({
                        ...editingModule,
                        identitas: { ...editingModule.identitas, nipKepalaSekolah: e.target.value }
                      })}
                      className="w-full p-1 border rounded text-[11px] text-center font-mono"
                    />
                  </div>
                ) : (
                  <>
                    <p className="font-bold underline">{editingModule.identitas.namaKepalaSekolah || 'Andi Dewi Kusumawati, S.Pd., M.Pd.'}</p>
                    <p className="text-[10px] text-[#24345B]/70 font-mono">
                      NIP. {editingModule.identitas.nipKepalaSekolah || '198001062006042028'}
                    </p>
                  </>
                )}
              </div>

              <div className="p-4 bg-[#F4F6FA] border border-[#A7D8F0] rounded-xl text-center">
                <p className="text-[11px] text-[#24345B]/70">Disahkan,</p>
                <p className="font-bold mt-1 text-[#4169E1]">
                  Koordinator Projek <span className="text-[10px] font-mono text-[#24345B]">(No. 1 Rombel {editingModule.identitas.rombelGrup || ''})</span>
                </p>
                <div className="h-14" />
                {isEditing ? (
                  <div className="space-y-1">
                    <input
                      type="text"
                      value={editingModule.identitas.koordinatorKokurikuler}
                      onChange={e => setEditingModule({
                        ...editingModule,
                        identitas: { ...editingModule.identitas, koordinatorKokurikuler: e.target.value }
                      })}
                      className="w-full p-1 border rounded text-xs font-bold text-center"
                    />
                    <input
                      type="text"
                      placeholder="NIP Koordinator"
                      value={editingModule.identitas.nipKoordinator || ''}
                      onChange={e => setEditingModule({
                        ...editingModule,
                        identitas: { ...editingModule.identitas, nipKoordinator: e.target.value }
                      })}
                      className="w-full p-1 border rounded text-[11px] text-center font-mono"
                    />
                  </div>
                ) : (
                  <>
                    <p className="font-bold underline">{editingModule.identitas.koordinatorKokurikuler}</p>
                    <p className="text-[10px] text-[#24345B]/70 font-mono">
                      {editingModule.identitas.nipKoordinator ? `NIP. ${editingModule.identitas.nipKoordinator}` : 'NIP. -'}
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Row 2: Guru & Fasilitator Pendamping */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-4 bg-white border border-[#A7D8F0] rounded-xl text-center">
                <p className="text-[11px] text-[#4169E1] font-bold">Tim Fasilitator (Orang ke-1)</p>
                <p className="font-bold mt-1 text-[#24345B]">Guru / Fasilitator 1</p>
                <div className="h-14" />
                {isEditing ? (
                  <div className="space-y-1">
                    <input
                      type="text"
                      placeholder="Nama Fasilitator 1"
                      value={editingModule.identitas.guruFasilitator1 || ''}
                      onChange={e => {
                        const f1 = e.target.value;
                        const f2 = editingModule.identitas.guruFasilitator2 || '';
                        const f3 = editingModule.identitas.guruFasilitator3 || '';
                        setEditingModule({
                          ...editingModule,
                          identitas: {
                            ...editingModule.identitas,
                            guruFasilitator1: f1,
                            guruFasilitator: [f1 ? `1. ${f1}` : '', f2 ? `2. ${f2}` : '', f3 ? `3. ${f3}` : ''].filter(Boolean).join(' | ')
                          }
                        });
                      }}
                      className="w-full p-1 border rounded text-xs font-bold text-center"
                    />
                    <input
                      type="text"
                      placeholder="NIP Fasilitator 1"
                      value={editingModule.identitas.nipGuruFasilitator1 || ''}
                      onChange={e => setEditingModule({
                        ...editingModule,
                        identitas: { ...editingModule.identitas, nipGuruFasilitator1: e.target.value }
                      })}
                      className="w-full p-1 border rounded text-[11px] text-center font-mono"
                    />
                  </div>
                ) : (
                  <>
                    <p className="font-bold underline">{editingModule.identitas.guruFasilitator1 || '-'}</p>
                    <p className="text-[10px] text-[#24345B]/70 font-mono">
                      {editingModule.identitas.nipGuruFasilitator1 ? `NIP. ${editingModule.identitas.nipGuruFasilitator1}` : 'NIP. -'}
                    </p>
                  </>
                )}
              </div>

              <div className="p-4 bg-white border border-[#A7D8F0] rounded-xl text-center">
                <p className="text-[11px] text-[#4169E1] font-bold">Tim Fasilitator (Orang ke-2)</p>
                <p className="font-bold mt-1 text-[#24345B]">Guru / Fasilitator 2</p>
                <div className="h-14" />
                {isEditing ? (
                  <div className="space-y-1">
                    <input
                      type="text"
                      placeholder="Nama Fasilitator 2"
                      value={editingModule.identitas.guruFasilitator2 || ''}
                      onChange={e => {
                        const f1 = editingModule.identitas.guruFasilitator1 || '';
                        const f2 = e.target.value;
                        const f3 = editingModule.identitas.guruFasilitator3 || '';
                        setEditingModule({
                          ...editingModule,
                          identitas: {
                            ...editingModule.identitas,
                            guruFasilitator2: f2,
                            guruFasilitator: [f1 ? `1. ${f1}` : '', f2 ? `2. ${f2}` : '', f3 ? `3. ${f3}` : ''].filter(Boolean).join(' | ')
                          }
                        });
                      }}
                      className="w-full p-1 border rounded text-xs font-bold text-center"
                    />
                    <input
                      type="text"
                      placeholder="NIP Fasilitator 2"
                      value={editingModule.identitas.nipGuruFasilitator2 || ''}
                      onChange={e => setEditingModule({
                        ...editingModule,
                        identitas: { ...editingModule.identitas, nipGuruFasilitator2: e.target.value }
                      })}
                      className="w-full p-1 border rounded text-[11px] text-center font-mono"
                    />
                  </div>
                ) : (
                  <>
                    <p className="font-bold underline">{editingModule.identitas.guruFasilitator2 || '-'}</p>
                    <p className="text-[10px] text-[#24345B]/70 font-mono">
                      {editingModule.identitas.nipGuruFasilitator2 ? `NIP. ${editingModule.identitas.nipGuruFasilitator2}` : 'NIP. -'}
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Row 3: Guru Fasilitator 3 (Jika Ada / Rombel 4 Orang) */}
            {(isEditing || editingModule.identitas.guruFasilitator3) && (
              <div className="mt-4 max-w-md mx-auto p-4 bg-white border border-[#A7D8F0] rounded-xl text-center">
                <p className="text-[11px] text-[#4169E1] font-bold">Tim Fasilitator (Orang ke-3)</p>
                <p className="font-bold mt-1 text-[#24345B]">Guru / Fasilitator 3</p>
                <div className="h-14" />
                {isEditing ? (
                  <div className="space-y-1">
                    <input
                      type="text"
                      placeholder="Nama Fasilitator 3 (Opsional)"
                      value={editingModule.identitas.guruFasilitator3 || ''}
                      onChange={e => {
                        const f1 = editingModule.identitas.guruFasilitator1 || '';
                        const f2 = editingModule.identitas.guruFasilitator2 || '';
                        const f3 = e.target.value;
                        setEditingModule({
                          ...editingModule,
                          identitas: {
                            ...editingModule.identitas,
                            guruFasilitator3: f3,
                            guruFasilitator: [f1 ? `1. ${f1}` : '', f2 ? `2. ${f2}` : '', f3 ? `3. ${f3}` : ''].filter(Boolean).join(' | ')
                          }
                        });
                      }}
                      className="w-full p-1 border rounded text-xs font-bold text-center"
                    />
                    <input
                      type="text"
                      placeholder="NIP Fasilitator 3"
                      value={editingModule.identitas.nipGuruFasilitator3 || ''}
                      onChange={e => setEditingModule({
                        ...editingModule,
                        identitas: { ...editingModule.identitas, nipGuruFasilitator3: e.target.value }
                      })}
                      className="w-full p-1 border rounded text-[11px] text-center font-mono"
                    />
                  </div>
                ) : (
                  <>
                    <p className="font-bold underline">{editingModule.identitas.guruFasilitator3}</p>
                    <p className="text-[10px] text-[#24345B]/70 font-mono">
                      {editingModule.identitas.nipGuruFasilitator3 ? `NIP. ${editingModule.identitas.nipGuruFasilitator3}` : 'NIP. -'}
                    </p>
                  </>
                )}
              </div>
            )}
          </div>

        </main>

      </div>

      {/* Floating In-App Toast Notification */}
      {toastMessage && (
        <div className="no-print fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-[#24345B] text-white rounded-xl shadow-[4px_4px_0px_#4169E1] border border-[#A7D8F0] text-xs font-medium max-w-sm animate-in fade-in slide-in-from-bottom-2">
          {toastMessage.type === 'success' && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
          {toastMessage.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
          {toastMessage.type === 'info' && <Sparkles className="w-4 h-4 text-[#A7D8F0] shrink-0" />}
          <span className="flex-1">{toastMessage.message}</span>
        </div>
      )}

    </div>
  );
};
