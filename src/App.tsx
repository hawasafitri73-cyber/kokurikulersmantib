/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FeatureCards } from './components/FeatureCards';
import { ModuleForm } from './components/ModuleForm';
import { ModulePreview } from './components/ModulePreview';
import { ModuleHistory } from './components/ModuleHistory';
import { GuideSection } from './components/GuideSection';
import { KokurikulerModule, ModuleFormData } from './types/module';
import { generateModuleFromData } from './utils/generatorEngine';
import { Sparkles, BookOpen, AlertCircle, Heart } from 'lucide-react';

const STORAGE_KEY = 'sma_saved_kokurikuler_modules';

export default function App() {
  const [activeTab, setActiveTab] = useState<'beranda' | 'buat' | 'pratinjau' | 'riwayat' | 'panduan'>('beranda');
  const [savedModules, setSavedModules] = useState<KokurikulerModule[]>([]);
  const [currentModule, setCurrentModule] = useState<KokurikulerModule | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Load saved modules on initial mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const updated = parsed.map(m => {
            if (m.identitas) {
              const isOldPlaceholder = m.identitas.koordinatorKokurikuler === 'Drs. Arfani, M.MPd' && m.identitas.rombelGrup === 'F1 - F3';
              const koordinator = isOldPlaceholder ? 'St. Inaya Fahmi, S.Pd' : m.identitas.koordinatorKokurikuler;
              const nipKoordinator = isOldPlaceholder ? '19850421 200903 2 007' : (m.identitas.nipKoordinator || '19850421 200903 2 007');
              const guruFasilitator1 = isOldPlaceholder ? 'Hasmawati Harfin, S.Pd' : (m.identitas.guruFasilitator1 || 'Hasmawati Harfin, S.Pd');
              const nipGuruFasilitator1 = isOldPlaceholder ? '19890615 201504 2 003' : (m.identitas.nipGuruFasilitator1 || '19890615 201504 2 003');
              const guruFasilitator2 = isOldPlaceholder ? 'Samsidar, S.Pd' : (m.identitas.guruFasilitator2 || 'Samsidar, S.Pd');
              const nipGuruFasilitator2 = isOldPlaceholder ? '19880414 201402 2 004' : (m.identitas.nipGuruFasilitator2 || '19880414 201402 2 004');
              const rombel = (m.identitas.rombelGrup === 'E7 - E8' || m.identitas.rombelGrup === 'E7-E8')
                ? 'E7 - E9'
                : (m.identitas.rombelGrup || 'F1 - F3');
              return {
                ...m,
                identitas: {
                  ...m.identitas,
                  namaSatuanPendidikan: 'SMA Negeri 3 Bombana',
                  koordinatorKokurikuler: koordinator,
                  nipKoordinator: nipKoordinator,
                  guruFasilitator1: guruFasilitator1,
                  nipGuruFasilitator1: nipGuruFasilitator1,
                  guruFasilitator2: guruFasilitator2,
                  nipGuruFasilitator2: nipGuruFasilitator2,
                  guruFasilitator3: m.identitas.guruFasilitator3 || '',
                  nipGuruFasilitator3: m.identitas.nipGuruFasilitator3 || '',
                  guruFasilitator: `1. ${guruFasilitator1} | 2. ${guruFasilitator2}`,
                  rombelGrup: rombel,
                  namaKepalaSekolah: m.identitas.namaKepalaSekolah || 'Andi Dewi Kusumawati, S.Pd., M.Pd.',
                  nipKepalaSekolah: m.identitas.nipKepalaSekolah || '198001062006042028',
                  tanggalPengesahan: m.identitas.tanggalPengesahan || '14 Juli 2025',
                  kertasCetak: m.identitas.kertasCetak || 'F4',
                }
              };
            }
            return m;
          });
          setSavedModules(updated);
          setCurrentModule(updated[0]);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
          localStorage.setItem('sma_school_name', 'SMA Negeri 3 Bombana');
          return;
        }
      }

      localStorage.setItem('sma_school_name', 'SMA Negeri 3 Bombana');

      // Seed initial high-quality sample module for SMA Kelas XII
      // Di setiap rombel: Guru nomor 1 adalah Koordinator Projek!
      const sampleSeedData: ModuleFormData = {
        namaSatuanPendidikan: 'SMA Negeri 3 Bombana',
        kelas: 'Kelas XII',
        fase: 'Fase F',
        tahunPelajaran: '2025/2026',
        semester: 'Ganjil',
        bentukKokurikuler: 'Pembelajaran kolaboratif lintas disiplin ilmu',
        kategoriTema: 'lintas_mapel',
        temaKegiatan: 'Inovasi Teknologi Berlandaskan Nilai Keagamaan',
        pendekatan: 'STREAM (Science, Technology, Religion, Engineering, Arts, Mathematics)',
        lingkungan: ['Lingkungan kelas/sekolah', 'Lingkungan digital/maya', 'Perpustakaan/laboratorium'],
        alokasiJp: 36,
        modeAlokasi: 'rekomendasi_panduan',
        durasiMinggu: 12,
        mataPelajaranTerpilih: ['Pendidikan Agama dan Budi Pekerti', 'Informatika', 'Bahasa Indonesia', 'Fisika', 'Matematika'],
        mataPelajaranTambahan: [],
        dimensiTerpilih: [
          'Keimanan dan Ketakwaan terhadap Tuhan Yang Maha Esa',
          'Penalaran Kritis',
          'Kreativitas',
          'Kolaborasi'
        ],
        rombelGrup: 'F1 - F3',
        koordinator: 'St. Inaya Fahmi, S.Pd',
        nipKoordinator: '19850421 200903 2 007',
        guruFasilitator1: 'Hasmawati Harfin, S.Pd',
        nipGuruFasilitator1: '19890615 201504 2 003',
        guruFasilitator2: 'Samsidar, S.Pd',
        nipGuruFasilitator2: '19880414 201402 2 004',
        guruFasilitator: '1. Hasmawati Harfin, S.Pd | 2. Samsidar, S.Pd',
        namaKepalaSekolah: 'Andi Dewi Kusumawati, S.Pd., M.Pd.',
        nipKepalaSekolah: '198001062006042028',
        tanggalPengesahan: '14 Juli 2025',
        kertasCetak: 'F4',
        lokasi: 'Laboratorium Komputer & Ruang Kolaborasi SMAN 3 Bombana'
      };

      const initialModule = generateModuleFromData(sampleSeedData);
      setSavedModules([initialModule]);
      setCurrentModule(initialModule);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([initialModule]));
    } catch {
      // Fallback
    }
  }, []);

  const showNotification = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Generate Module via API or Engine
  const handleGenerate = async (formData: ModuleFormData) => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/gemini/generate-module', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      
      let newModule: KokurikulerModule;
      if (result.success && result.module) {
        newModule = result.module;
      } else {
        newModule = generateModuleFromData(formData);
      }

      // Save to state and storage
      setCurrentModule(newModule);
      const updatedList = [newModule, ...savedModules.filter(m => m.id !== newModule.id)];
      setSavedModules(updatedList);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));

      setActiveTab('pratinjau');
      showNotification('Modul Kokurikuler SMA berhasil disusun dan siap ditinjau!', 'success');
    } catch (err) {
      // Offline / Engine fallback
      const fallbackModule = generateModuleFromData(formData);
      setCurrentModule(fallbackModule);
      const updatedList = [fallbackModule, ...savedModules.filter(m => m.id !== fallbackModule.id)];
      setSavedModules(updatedList);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));

      setActiveTab('pratinjau');
      showNotification('Modul berhasil disusun dengan Mesin Kurikulum Panduan 2025!', 'success');
    } finally {
      setIsGenerating(false);
    }
  };

  // Save changes to history
  const handleSaveToHistory = (moduleToSave: KokurikulerModule) => {
    const existingIndex = savedModules.findIndex(m => m.id === moduleToSave.id);
    let updated: KokurikulerModule[];
    if (existingIndex >= 0) {
      updated = [...savedModules];
      updated[existingIndex] = {
        ...moduleToSave,
        updatedAt: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
      };
    } else {
      updated = [moduleToSave, ...savedModules];
    }
    setSavedModules(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    showNotification('Perubahan modul berhasil disimpan ke riwayat lokal.', 'success');
  };

  // Open module from history
  const handleOpenModule = (mod: KokurikulerModule) => {
    setCurrentModule(mod);
    setActiveTab('pratinjau');
  };

  // Edit module settings
  const handleEditModule = (mod: KokurikulerModule) => {
    setCurrentModule(mod);
    setActiveTab('buat');
  };

  // Duplicate module
  const handleDuplicateModule = (mod: KokurikulerModule) => {
    const duplicated: KokurikulerModule = {
      ...mod,
      id: `modul-${Date.now()}`,
      identitas: {
        ...mod.identitas,
        temaKegiatan: `${mod.identitas.temaKegiatan} (Salinan)`
      },
      createdAt: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }),
      updatedAt: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
    };
    const updated = [duplicated, ...savedModules];
    setSavedModules(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    showNotification(`Modul "${duplicated.identitas.temaKegiatan}" berhasil diduplikasi.`, 'success');
  };

  // Delete module
  const handleDeleteModule = (id: string) => {
    const updated = savedModules.filter(m => m.id !== id);
    setSavedModules(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    if (currentModule?.id === id) {
      setCurrentModule(updated[0] || null);
    }
    showNotification('Modul telah dihapus dari riwayat.', 'info');
  };

  // Import modules from JSON
  const handleImportModules = (imported: KokurikulerModule[]) => {
    const combined = [...imported, ...savedModules.filter(m => !imported.some(imp => imp.id === m.id))];
    setSavedModules(combined);
    if (imported.length > 0) {
      setCurrentModule(imported[0]);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(combined));
    showNotification(`Berhasil menyinkronkan ${imported.length} modul cadangan.`, 'success');
  };

  return (
    <div className="min-h-screen bg-white text-[#24345B] flex flex-col font-sans selection:bg-[#F4A6C1] selection:text-[#24345B]">
      
      {/* Toast Notification */}
      {notification && (
        <div className="no-print fixed bottom-6 right-6 z-50 animate-bounce">
          <div className="px-4 py-3 bg-[#24345B] text-white rounded-xl shadow-[4px_4px_0px_#4169E1] border border-[#A7D8F0] flex items-center gap-2.5 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-[#F4A6C1]" />
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Header Top Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        hasActiveModule={!!currentModule}
      />

      {/* Main Page Routing */}
      <main className="flex-1">
        {activeTab === 'beranda' && (
          <div>
            <HeroSection
              onStartClick={() => setActiveTab('buat')}
              onGuideClick={() => setActiveTab('panduan')}
            />
            <FeatureCards
              onSelectFeature={(tab) => setActiveTab(tab)}
            />
            {/* Quick module prompt strip */}
            {currentModule && (
              <section className="py-12 bg-white border-b border-[#A7D8F0]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="p-6 bg-[#FCE4EC]/40 border-2 border-[#F4A6C1] rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#4169E1] text-white flex items-center justify-center font-bold shrink-0 shadow-[2px_2px_0px_#24345B]">
                        <BookOpen className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-bold text-[#4169E1] uppercase">Modul Terakhir Anda:</span>
                        <h4 className="font-retro font-bold text-base text-[#24345B]">
                          {currentModule.identitas.temaKegiatan}
                        </h4>
                        <p className="text-xs text-[#24345B]/75">
                          {currentModule.identitas.kelas} &bull; {currentModule.identitas.fase} &bull; {currentModule.identitas.alokasiWaktu}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveTab('pratinjau')}
                        className="retro-button-primary px-4 py-2 rounded-lg text-xs font-bold cursor-pointer"
                      >
                        Buka Pratinjau
                      </button>
                      <button
                        onClick={() => setActiveTab('riwayat')}
                        className="retro-button-secondary px-4 py-2 rounded-lg text-xs font-bold cursor-pointer"
                      >
                        Lihat Semua Riwayat
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
        )}

        {activeTab === 'buat' && (
          <ModuleForm
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
            initialData={currentModule ? {
              namaSatuanPendidikan: currentModule.identitas.namaSatuanPendidikan,
              kelas: currentModule.identitas.kelas,
              fase: currentModule.identitas.fase,
              tahunPelajaran: currentModule.identitas.tahunPelajaran,
              semester: currentModule.identitas.semester,
              bentukKokurikuler: currentModule.identitas.bentukKokurikuler,
              temaKegiatan: currentModule.identitas.temaKegiatan,
              pendekatan: currentModule.praktikPedagogis.pendekatan,
              lingkungan: currentModule.lingkungan.tempat ? currentModule.lingkungan.tempat.split(', ') : [],
              alokasiJp: currentModule.identitas.totalJp,
              dimensiTerpilih: currentModule.dimensi.fokusDimensi,
              mataPelajaranTerpilih: currentModule.identitas.mataPelajaranTerkait.map(m => m.nama),
              koordinator: currentModule.identitas.koordinatorKokurikuler,
              guruFasilitator1: currentModule.identitas.guruFasilitator1 || 'Budi Hartono, S.Pd., M.Si.',
              guruFasilitator2: currentModule.identitas.guruFasilitator2 || 'Rina Anggraini, S.Kom., M.Pd.',
              guruFasilitator: currentModule.identitas.guruFasilitator,
              lokasi: currentModule.identitas.lokasiKegiatan
            } : undefined}
          />
        )}

        {activeTab === 'pratinjau' && currentModule && (
          <ModulePreview
            module={currentModule}
            onUpdateModule={(updated) => {
              setCurrentModule(updated);
              handleSaveToHistory(updated);
            }}
            onSaveToHistory={handleSaveToHistory}
            onBackToForm={() => setActiveTab('buat')}
          />
        )}

        {activeTab === 'pratinjau' && !currentModule && (
          <div className="max-w-4xl mx-auto py-16 px-4 text-center">
            <div className="p-8 bg-white border-2 border-dashed border-[#A7D8F0] rounded-2xl">
              <div className="w-16 h-16 rounded-2xl bg-[#FCE4EC] border-2 border-[#F4A6C1] flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-[#24345B]" />
              </div>
              <h3 className="font-retro text-xl font-bold text-[#24345B]">
                Belum Ada Modul yang Dipilih
              </h3>
              <p className="text-sm text-[#24345B]/70 max-w-md mx-auto mt-2 mb-6">
                Silakan buat modul baru atau buka salah satu modul dari daftar riwayat tersimpan untuk melihat dokumen lengkapnya.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setActiveTab('buat')}
                  className="retro-button-primary px-5 py-2.5 rounded-lg text-xs font-bold cursor-pointer"
                >
                  + Buat Modul Sekarang
                </button>
                <button
                  onClick={() => setActiveTab('riwayat')}
                  className="retro-button-secondary px-5 py-2.5 rounded-lg text-xs font-bold cursor-pointer"
                >
                  Buka Riwayat
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'riwayat' && (
          <ModuleHistory
            savedModules={savedModules}
            onOpenModule={handleOpenModule}
            onEditModule={handleEditModule}
            onDuplicateModule={handleDuplicateModule}
            onDeleteModule={handleDeleteModule}
            onImportModules={handleImportModules}
            onCreateNew={() => setActiveTab('buat')}
          />
        )}

        {activeTab === 'panduan' && (
          <GuideSection
            onStartClick={() => setActiveTab('buat')}
          />
        )}
      </main>

      {/* Footer adhering to Anti-Slop & Editorial Cleanliness */}
      <footer className="no-print bg-[#F4F6FA] border-t-2 border-[#A7D8F0] py-8 text-[#24345B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-[#4169E1] text-white flex items-center justify-center font-bold text-xs">
                SMA
              </div>
              <span className="font-retro font-bold text-sm text-[#24345B]">
                MODUL KOKURIKULER SMA
              </span>
              <span className="text-xs text-[#24345B]/60">
                &mdash; Panduan Kokurikuler 2025
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold text-[#24345B]/75">
              <button onClick={() => setActiveTab('beranda')} className="hover:text-[#4169E1] cursor-pointer">Beranda</button>
              <button onClick={() => setActiveTab('buat')} className="hover:text-[#4169E1] cursor-pointer">Buat Modul</button>
              <button onClick={() => setActiveTab('riwayat')} className="hover:text-[#4169E1] cursor-pointer">Riwayat</button>
              <button onClick={() => setActiveTab('panduan')} className="hover:text-[#4169E1] cursor-pointer">Panduan 2025</button>
            </div>

            <p className="text-xs text-[#24345B]/60">
              Tema Retro Modern Blue, Pink & White &bull; Khusus Kelas X, XI, XII
            </p>

          </div>
        </div>
      </footer>

    </div>
  );
}
