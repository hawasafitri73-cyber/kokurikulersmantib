import React, { useRef, useState } from 'react';
import { 
  History, BookOpen, Edit3, Copy, Trash2, Download, Upload, 
  Plus, Calendar, Clock, Layers, Sparkles, AlertCircle, CheckCircle2, X 
} from 'lucide-react';
import { KokurikulerModule } from '../types/module';
import { exportToWord, exportToJson } from '../utils/exportUtils';

interface ModuleHistoryProps {
  savedModules: KokurikulerModule[];
  onOpenModule: (module: KokurikulerModule) => void;
  onEditModule: (module: KokurikulerModule) => void;
  onDuplicateModule: (module: KokurikulerModule) => void;
  onDeleteModule: (id: string) => void;
  onImportModules: (modules: KokurikulerModule[]) => void;
  onCreateNew: () => void;
}

export const ModuleHistory: React.FC<ModuleHistoryProps> = ({
  savedModules,
  onOpenModule,
  onEditModule,
  onDuplicateModule,
  onDeleteModule,
  onImportModules,
  onCreateNew
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);
  const [toastMessage, setToastMessage] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToastMessage({ message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleExportBackup = () => {
    if (savedModules.length === 0) {
      showToast('Belum ada modul yang tersimpan untuk dicadangkan.', 'info');
      return;
    }
    const jsonStr = JSON.stringify(savedModules, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CADANGAN_MODUL_KOKURIKULER_SMA_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Berkas cadangan JSON berhasil diunduh.', 'success');
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = event => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed) && parsed.length > 0) {
          onImportModules(parsed);
          showToast(`Berhasil mengimpor ${parsed.length} modul ke riwayat lokal.`, 'success');
        } else if (parsed && parsed.identitas) {
          onImportModules([parsed]);
          showToast('Berhasil mengimpor 1 modul ke riwayat lokal.', 'success');
        } else {
          showToast('Format berkas JSON cadangan tidak sesuai struktur modul.', 'error');
        }
      } catch {
        showToast('Gagal membaca berkas cadangan JSON.', 'error');
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      onDeleteModule(deleteTarget.id);
      showToast(`Modul "${deleteTarget.title}" berhasil dihapus.`, 'info');
      setDeleteTarget(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6">
      
      {/* Header with Title and Backup Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#4169E1] mb-1">
            <History className="w-4 h-4" />
            <span>RIWAYAT & PENYIMPANAN MODUL</span>
          </div>
          <h2 className="font-retro text-2xl sm:text-3xl font-extrabold text-[#24345B]">
            Koleksi Modul Kokurikuler Anda
          </h2>
          <p className="text-xs sm:text-sm text-[#24345B]/75 mt-0.5">
            Data tersimpan aman di peramban lokal perangkat Anda. Anda dapat membuka, menyunting, mengekspor, atau mencadangkan modul.
          </p>
        </div>

        {/* Action Buttons for Backup */}
        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImportFile}
            accept=".json"
            className="hidden"
          />
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="retro-button-secondary px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            title="Impor Modul dari Berkas JSON Cadangan"
          >
            <Upload className="w-3.5 h-3.5 text-[#4169E1]" />
            <span>Impor Cadangan</span>
          </button>

          <button
            onClick={handleExportBackup}
            className="retro-button-secondary px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            title="Unduh Seluruh Koleksi Modul sebagai JSON"
          >
            <Download className="w-3.5 h-3.5 text-[#4169E1]" />
            <span>Ekspor Cadangan</span>
          </button>

          <button
            onClick={onCreateNew}
            className="retro-button-primary px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-[2px_2px_0px_#24345B]"
          >
            <Plus className="w-4 h-4" />
            <span>+ Buat Baru</span>
          </button>
        </div>
      </div>

      {/* Storage Information Notice */}
      <div className="mb-6 p-3.5 bg-[#FCE4EC]/50 border border-[#F4A6C1] rounded-xl flex items-center justify-between text-xs text-[#24345B]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#4169E1] shrink-0" />
          <span>
            Total modul tersimpan: <strong>{savedModules.length} Modul</strong>. Penyimpanan lokal aktif &bull; Tanpa perlu login akun.
          </span>
        </div>
        <span className="hidden sm:inline-block text-[11px] font-mono text-[#24345B]/70">
          Status: Penyimpanan Lokal Sinkron
        </span>
      </div>

      {/* Modules List Grid */}
      {savedModules.length === 0 ? (
        <div className="text-center py-16 bg-white border-2 border-dashed border-[#A7D8F0] rounded-2xl p-8">
          <div className="w-16 h-16 rounded-2xl bg-[#FCE4EC] border-2 border-[#F4A6C1] flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-[#24345B]" />
          </div>
          <h3 className="font-retro text-lg font-bold text-[#24345B]">
            Belum Ada Modul Tersimpan
          </h3>
          <p className="text-xs sm:text-sm text-[#24345B]/70 max-w-md mx-auto mt-1 mb-6">
            Mulai susun modul kokurikuler SMA pertama Anda dengan generator otomatis berlandaskan Panduan Kokurikuler 2025.
          </p>
          <button
            onClick={onCreateNew}
            className="retro-button-primary px-6 py-3 rounded-xl font-bold text-sm cursor-pointer shadow-[3px_3px_0px_#24345B]"
          >
            + Mulai Buat Modul Sekarang
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedModules.map(item => (
            <div
              key={item.id}
              className="bg-white border-2 border-[#A7D8F0] rounded-2xl p-5 shadow-[4px_4px_0px_rgba(65,105,225,0.12)] hover:border-[#4169E1] hover:shadow-[5px_5px_0px_#4169E1] transition-all flex flex-col justify-between"
            >
              <div>
                
                {/* Card Top Badges */}
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-0.5 bg-[#4169E1] text-white font-mono font-bold text-[10px] rounded">
                    {item.identitas.kelas} &bull; {item.identitas.fase}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-[#24345B]/70">
                    {item.identitas.alokasiWaktu}
                  </span>
                </div>

                {/* Module Title */}
                <h3 className="font-retro text-base font-bold text-[#24345B] line-clamp-2 mb-2 leading-snug">
                  {item.identitas.temaKegiatan}
                </h3>

                <p className="text-xs text-[#24345B]/80 line-clamp-2 mb-3">
                  {item.identitas.namaSatuanPendidikan} &bull; Semester {item.identitas.semester} &bull; TP {item.identitas.tahunPelajaran}
                </p>

                {/* Focus Dimensions as Clean Unboxed Text with Separators */}
                <div className="text-[11px] text-[#24345B]/85 mb-3 flex flex-wrap items-center gap-1">
                  <span className="font-bold text-[#4169E1]">Dimensi:</span>
                  {item.dimensi.fokusDimensi.slice(0, 3).map((dim, idx) => (
                    <React.Fragment key={idx}>
                      {idx > 0 && <span aria-hidden="true" className="text-[#A7D8F0] font-bold">·</span>}
                      <span className="font-medium text-[#24345B]">{dim}</span>
                    </React.Fragment>
                  ))}
                  {item.dimensi.fokusDimensi.length > 3 && (
                    <>
                      <span aria-hidden="true" className="text-[#A7D8F0] font-bold">·</span>
                      <span className="text-[#24345B]/60 font-mono">+{item.dimensi.fokusDimensi.length - 3}</span>
                    </>
                  )}
                </div>

                {/* Meta details */}
                <div className="flex items-center gap-3 text-[11px] text-[#24345B]/65 border-t border-[#A7D8F0]/50 pt-2 mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#4169E1]" />
                    <span>{item.updatedAt || item.createdAt}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Layers className="w-3 h-3 text-[#4169E1]" />
                    <span>{item.identitas.jumlahSesi} Sesi</span>
                  </span>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-4 gap-1.5 pt-3 border-t border-[#A7D8F0]">
                
                {/* Buka */}
                <button
                  type="button"
                  onClick={() => onOpenModule(item)}
                  className="py-1.5 bg-[#4169E1] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1 hover:bg-[#3154b3] cursor-pointer"
                  title="Buka Pratinjau Dokumen"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Buka</span>
                </button>

                {/* Duplikat */}
                <button
                  type="button"
                  onClick={() => onDuplicateModule(item)}
                  className="py-1.5 bg-[#F4F6FA] text-[#24345B] border border-[#A7D8F0] text-xs font-bold rounded-lg flex items-center justify-center gap-1 hover:bg-[#FCE4EC] cursor-pointer"
                  title="Duplikat Modul"
                >
                  <Copy className="w-3.5 h-3.5 text-[#4169E1]" />
                  <span>Salin</span>
                </button>

                {/* Unduh Word */}
                <button
                  type="button"
                  onClick={() => exportToWord(item)}
                  className="py-1.5 bg-[#FCE4EC] text-[#24345B] border border-[#F4A6C1] text-xs font-bold rounded-lg flex items-center justify-center gap-1 hover:bg-[#F4A6C1]/50 cursor-pointer"
                  title="Unduh Format Microsoft Word (.doc)"
                >
                  <Download className="w-3.5 h-3.5 text-[#24345B]" />
                  <span>Word</span>
                </button>

                {/* Hapus */}
                <button
                  type="button"
                  onClick={() => setDeleteTarget({ id: item.id, title: item.identitas.temaKegiatan })}
                  className="py-1.5 bg-white text-red-600 border border-red-200 text-xs font-bold rounded-lg flex items-center justify-center gap-1 hover:bg-red-50 cursor-pointer"
                  title="Hapus Modul"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Hapus</span>
                </button>

              </div>

            </div>
          ))}
        </div>
      )}

      {/* In-App Delete Confirmation Modal (Replaces window.confirm) */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border-2 border-[#24345B] p-6 max-w-md w-full shadow-[6px_6px_0px_#24345B] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 border border-red-300 flex items-center justify-center text-red-600 shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-retro font-bold text-base text-[#24345B]">Konfirmasi Hapus Modul</h3>
                <p className="text-xs text-[#24345B]/70">Tindakan ini tidak dapat dibatalkan.</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#24345B] leading-relaxed">
              Apakah Anda yakin ingin menghapus modul kokurikuler bertema: <br />
              <strong className="text-red-600 mt-1 block font-semibold">&ldquo;{deleteTarget.title}&rdquo;</strong>?
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-[#A7D8F0]">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="retro-button-secondary px-4 py-2 rounded-lg text-xs font-bold cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-red-600 hover:bg-red-700 border border-red-800 shadow-[2px_2px_0px_#24345B] cursor-pointer"
              >
                Ya, Hapus Modul
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating In-App Toast Notification (Replaces window.alert) */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-[#24345B] text-white rounded-xl shadow-[4px_4px_0px_#4169E1] border border-[#A7D8F0] text-xs font-medium max-w-sm animate-in fade-in slide-in-from-bottom-2">
          {toastMessage.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
          {toastMessage.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
          {toastMessage.type === 'info' && <Sparkles className="w-4 h-4 text-[#A7D8F0] shrink-0" />}
          <span className="flex-1">{toastMessage.message}</span>
          <button 
            type="button" 
            onClick={() => setToastMessage(null)} 
            className="text-white/60 hover:text-white p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

    </div>
  );
};
