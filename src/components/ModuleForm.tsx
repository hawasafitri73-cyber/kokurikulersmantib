import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Check, Plus, AlertCircle, Compass, 
  HelpCircle, ChevronRight, Layers, Award, Users,
  ChevronDown, ChevronUp, UserCheck, CheckCircle2, Bookmark
} from 'lucide-react';
import { ModuleFormData, SMAClass, SMAFase } from '../types/module';
import { 
  DELAPAN_DIMENSI_PROFIL_LULUSAN, 
  TEMA_LINTAS_MAPEL, 
  TUJUH_KEBIASAAN, 
  PENDEKATAN_PEMBELAJARAN, 
  LINGKUNGAN_PEMBELAJARAN, 
  MATA_PELAJARAN_SMA, 
  ALOKASI_JP_PANDUAN_SMA 
} from '../data/constants';
import { 
  GURU_KOKURIKULER_SMAN3_BOMBANA, 
  DAFTAR_SEMUA_GURU_SMAN3_BOMBANA, 
  KEPALA_SEKOLAH_DEFAULT,
  getNipForTeacher
} from '../data/teachersData';
import { recommendDimensions } from '../utils/generatorEngine';

interface ModuleFormProps {
  onGenerate: (data: ModuleFormData) => Promise<void>;
  isGenerating: boolean;
  initialData?: Partial<ModuleFormData>;
}

export const ModuleForm: React.FC<ModuleFormProps> = ({ onGenerate, isGenerating, initialData }) => {
  // Step navigation in form
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form states
  const [namaSatuanPendidikan, setNamaSatuanPendidikan] = useState<string>(
    localStorage.getItem('sma_school_name') || 'SMA Negeri 3 Bombana'
  );
  const [kelas, setKelas] = useState<SMAClass>('Kelas XII');
  const [fase, setFase] = useState<SMAFase>('Fase F');
  const [tahunPelajaran, setTahunPelajaran] = useState<string>('2025/2026');
  const [semester, setSemester] = useState<'Ganjil' | 'Genap'>('Ganjil');
  
  // Tim Guru & NIP (SMAN 3 Bombana)
  // Aturan Resmi: Koordinator projek adalah guru nomor 1 di setiap rombel!
  const [koordinator, setKoordinator] = useState<string>('St. Inaya Fahmi, S.Pd');
  const [nipKoordinator, setNipKoordinator] = useState<string>('19850421 200903 2 007');
  const [guruFasilitator1, setGuruFasilitator1] = useState<string>('Hasmawati Harfin, S.Pd');
  const [nipGuruFasilitator1, setNipGuruFasilitator1] = useState<string>('19890615 201504 2 003');
  const [guruFasilitator2, setGuruFasilitator2] = useState<string>('Samsidar, S.Pd');
  const [nipGuruFasilitator2, setNipGuruFasilitator2] = useState<string>('19880414 201402 2 004');
  const [guruFasilitator3, setGuruFasilitator3] = useState<string>('');
  const [nipGuruFasilitator3, setNipGuruFasilitator3] = useState<string>('');
  const [showFasilitator3, setShowFasilitator3] = useState<boolean>(false);
  const [rombelGrup, setRombelGrup] = useState<string>('F1 - F3');
  const [kertasCetak, setKertasCetak] = useState<'F4' | 'A4'>('F4');
  
  // Data Kepala Sekolah & Pengesahan
  const [namaKepalaSekolah, setNamaKepalaSekolah] = useState<string>(KEPALA_SEKOLAH_DEFAULT.nama);
  const [nipKepalaSekolah, setNipKepalaSekolah] = useState<string>(KEPALA_SEKOLAH_DEFAULT.nip);
  const [tanggalPengesahan, setTanggalPengesahan] = useState<string>('Rumbia, 14 Juli 2025');
  const [showKepalaSekolahEdit, setShowKepalaSekolahEdit] = useState<boolean>(false);

  const [lokasi, setLokasi] = useState<string>('Laboratorium Komputer & Ruang Kolaborasi SMAN 3 Bombana');

  // Theme & Shape
  const [bentukKokurikuler, setBentukKokurikuler] = useState<string>('Pembelajaran kolaboratif lintas disiplin ilmu');
  const [bentukKustom, setBentukKustom] = useState<string>('');
  
  const [kategoriTema, setKategoriTema] = useState<'lintas_mapel' | 'tujuh_kebiasaan' | 'bebas'>('lintas_mapel');
  const [temaKegiatan, setTemaKegiatan] = useState<string>('Inovasi Teknologi Berlandaskan Nilai Keagamaan');

  // Sync state if initialData is provided (e.g. from editing an existing module)
  useEffect(() => {
    if (initialData) {
      if (initialData.namaSatuanPendidikan) setNamaSatuanPendidikan(initialData.namaSatuanPendidikan);
      if (initialData.kelas) {
        setKelas(initialData.kelas);
        setFase(initialData.kelas === 'Kelas X' ? 'Fase E' : 'Fase F');
      }
      if (initialData.fase) setFase(initialData.fase);
      if (initialData.tahunPelajaran) setTahunPelajaran(initialData.tahunPelajaran);
      if (initialData.semester) setSemester(initialData.semester);
      if (initialData.temaKegiatan) setTemaKegiatan(initialData.temaKegiatan);
      if (initialData.bentukKokurikuler) setBentukKokurikuler(initialData.bentukKokurikuler);
      if (initialData.pendekatan) setPendekatan(initialData.pendekatan);
      if (initialData.alokasiJp) {
        setSelectedJpOption(initialData.alokasiJp);
        setCustomJp(initialData.alokasiJp);
      }
      if (initialData.lingkungan && initialData.lingkungan.length > 0) {
        setLingkunganTerpilih(initialData.lingkungan);
      }
      if (initialData.mataPelajaranTerpilih && initialData.mataPelajaranTerpilih.length > 0) {
        setMataPelajaranTerpilih(initialData.mataPelajaranTerpilih);
      }
      if (initialData.dimensiTerpilih && initialData.dimensiTerpilih.length > 0) {
        setDimensiTerpilih(initialData.dimensiTerpilih);
      }
      if (initialData.koordinator) setKoordinator(initialData.koordinator);
      if (initialData.nipKoordinator !== undefined) setNipKoordinator(initialData.nipKoordinator);
      if (initialData.guruFasilitator1) setGuruFasilitator1(initialData.guruFasilitator1);
      if (initialData.nipGuruFasilitator1 !== undefined) setNipGuruFasilitator1(initialData.nipGuruFasilitator1);
      if (initialData.guruFasilitator2) setGuruFasilitator2(initialData.guruFasilitator2);
      if (initialData.nipGuruFasilitator2 !== undefined) setNipGuruFasilitator2(initialData.nipGuruFasilitator2);
      if (initialData.guruFasilitator3 !== undefined) {
        setGuruFasilitator3(initialData.guruFasilitator3);
        if (initialData.guruFasilitator3) setShowFasilitator3(true);
      }
      if (initialData.nipGuruFasilitator3 !== undefined) setNipGuruFasilitator3(initialData.nipGuruFasilitator3);
      if (initialData.kertasCetak) setKertasCetak(initialData.kertasCetak);
      if (initialData.rombelGrup) setRombelGrup(initialData.rombelGrup);
      if (initialData.namaKepalaSekolah) setNamaKepalaSekolah(initialData.namaKepalaSekolah);
      if (initialData.nipKepalaSekolah) setNipKepalaSekolah(initialData.nipKepalaSekolah);
      if (initialData.tanggalPengesahan) setTanggalPengesahan(initialData.tanggalPengesahan);
      if (initialData.lokasi) setLokasi(initialData.lokasi);
      if (initialData.gagasanAwal) setGagasanAwal(initialData.gagasanAwal);
    }
  }, [initialData]);
  const [temaKustom, setTemaKustom] = useState<string>('');
  const [gagasanAwal, setGagasanAwal] = useState<string>('');

  // Approach & Environment
  const [pendekatan, setPendekatan] = useState<string>('STREAM (Science, Technology, Religion, Engineering, Arts, Mathematics)');
  const [pendekatanKustom, setPendekatanKustom] = useState<string>('');
  const [lingkunganTerpilih, setLingkunganTerpilih] = useState<string[]>([
    'Lingkungan kelas/sekolah',
    'Lingkungan alam sekitar',
    'Lingkungan digital/maya'
  ]);
  const [lingkunganKustom, setLingkunganKustom] = useState<string>('');

  // Time Allocation (Panduan SMA 2025)
  const [selectedJpOption, setSelectedJpOption] = useState<number>(36);
  const [customJp, setCustomJp] = useState<number>(36);
  const [isCustomJp, setIsCustomJp] = useState<boolean>(false);

  // Integrated Subjects
  const [mataPelajaranTerpilih, setMataPelajaranTerpilih] = useState<string[]>([
    'Pendidikan Agama dan Budi Pekerti',
    'Bahasa Indonesia',
    'Informatika',
    'Fisika',
    'Matematika'
  ]);
  const [mataPelajaranTambahan, setMataPelajaranTambahan] = useState<string[]>([]);
  const [newSubjectInput, setNewSubjectInput] = useState<string>('');
  const [showAddSubject, setShowAddSubject] = useState<boolean>(false);

  // 8 Dimensions
  const [dimensiTerpilih, setDimensiTerpilih] = useState<string[]>([
    'Keimanan dan Ketakwaan terhadap Tuhan Yang Maha Esa',
    'Penalaran Kritis',
    'Kreativitas',
    'Kolaborasi'
  ]);
  const [aiRationale, setAiRationale] = useState<string>('');
  const [isRecommendingDimensions, setIsRecommendingDimensions] = useState<boolean>(false);

  // Terapkan Tim Rombel: Guru Nomor 1 di setiap rombel adalah Koordinator Projek!
  const handleApplyRombel = (group: { rombel: string; guru: string[] }) => {
    setRombelGrup(group.rombel);
    // Guru 1 = Koordinator Projek
    const guru1 = group.guru[0] || '';
    const nip1 = getNipForTeacher(guru1);
    setKoordinator(guru1);
    setNipKoordinator(nip1);

    // Guru 2 = Fasilitator 1
    const guru2 = group.guru[1] || '';
    const nip2 = getNipForTeacher(guru2);
    setGuruFasilitator1(guru2);
    setNipGuruFasilitator1(nip2);

    // Guru 3 = Fasilitator 2
    const guru3 = group.guru[2] || '';
    const nip3 = getNipForTeacher(guru3);
    setGuruFasilitator2(guru3);
    setNipGuruFasilitator2(nip3);

    // Guru 4 = Fasilitator 3 (jika rombel memiliki 4 guru, misal E1-E3, E4-E6)
    const guru4 = group.guru[3] || '';
    const nip4 = getNipForTeacher(guru4);
    setGuruFasilitator3(guru4);
    setNipGuruFasilitator3(nip4);
    setShowFasilitator3(Boolean(guru4));
  };

  // Auto-fill Fase and default teacher team when Kelas changes
  const handleKelasChange = (newKelas: SMAClass) => {
    setKelas(newKelas);
    if (newKelas === 'Kelas X') {
      setFase('Fase E');
    } else {
      setFase('Fase F');
    }
    const groups = GURU_KOKURIKULER_SMAN3_BOMBANA[newKelas];
    if (groups && groups.length > 0) {
      handleApplyRombel(groups[0]);
    }
  };

  // Helper ketika nama guru diganti manual: NIP otomatis diisikan jika cocok di database
  const handleKoordinatorChange = (nama: string) => {
    setKoordinator(nama);
    const nip = getNipForTeacher(nama);
    if (nip && nip !== '-') setNipKoordinator(nip);
  };

  const handleFasilitator1Change = (nama: string) => {
    setGuruFasilitator1(nama);
    const nip = getNipForTeacher(nama);
    if (nip && nip !== '-') setNipGuruFasilitator1(nip);
  };

  const handleFasilitator2Change = (nama: string) => {
    setGuruFasilitator2(nama);
    const nip = getNipForTeacher(nama);
    if (nip && nip !== '-') setNipGuruFasilitator2(nip);
  };

  const handleFasilitator3Change = (nama: string) => {
    setGuruFasilitator3(nama);
    const nip = getNipForTeacher(nama);
    if (nip && nip !== '-') setNipGuruFasilitator3(nip);
  };

  // Save school name to localStorage on change
  const handleSchoolNameChange = (val: string) => {
    setNamaSatuanPendidikan(val);
    localStorage.setItem('sma_school_name', val);
  };

  // Toggle Subject
  const toggleSubject = (subject: string) => {
    if (mataPelajaranTerpilih.includes(subject)) {
      setMataPelajaranTerpilih(mataPelajaranTerpilih.filter(s => s !== subject));
    } else {
      setMataPelajaranTerpilih([...mataPelajaranTerpilih, subject]);
    }
  };

  // Add custom subject
  const handleAddCustomSubject = () => {
    if (newSubjectInput.trim() && !mataPelajaranTambahan.includes(newSubjectInput.trim())) {
      const added = newSubjectInput.trim();
      setMataPelajaranTambahan([...mataPelajaranTambahan, added]);
      setMataPelajaranTerpilih([...mataPelajaranTerpilih, added]);
      setNewSubjectInput('');
      setShowAddSubject(false);
    }
  };

  // Toggle Environment
  const toggleEnvironment = (env: string) => {
    if (lingkunganTerpilih.includes(env)) {
      setLingkunganTerpilih(lingkunganTerpilih.filter(e => e !== env));
    } else {
      setLingkunganTerpilih([...lingkunganTerpilih, env]);
    }
  };

  // Toggle Dimension
  const toggleDimension = (dimName: string) => {
    if (dimensiTerpilih.includes(dimName)) {
      if (dimensiTerpilih.length > 1) {
        setDimensiTerpilih(dimensiTerpilih.filter(d => d !== dimName));
      }
    } else {
      setDimensiTerpilih([...dimensiTerpilih, dimName]);
    }
  };

  // AI Recommendation for Dimensions
  const handleAiDimensionRecommendation = async () => {
    setIsRecommendingDimensions(true);
    try {
      const activeTema = kategoriTema === 'bebas' 
        ? gagasanAwal 
        : (temaKegiatan === 'Tema lainnya' ? temaKustom : temaKegiatan);
      
      const res = await fetch('/api/gemini/recommend-dimensions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          temaKegiatan: activeTema || 'Inovasi Teknologi SMA',
          kelas,
          pendekatan: pendekatan === 'Pendekatan lainnya' ? pendekatanKustom : pendekatan,
        })
      });

      const data = await res.json();
      if (data.success && data.dimensi) {
        setDimensiTerpilih(data.dimensi);
        setAiRationale(data.alasan || '');
      } else {
        const fallback = recommendDimensions({ temaKegiatan: activeTema, kelas, pendekatan });
        setDimensiTerpilih(fallback.dimensi);
        setAiRationale(fallback.alasan);
      }
    } catch {
      const activeTema = kategoriTema === 'bebas' ? gagasanAwal : temaKegiatan;
      const fallback = recommendDimensions({ temaKegiatan: activeTema, kelas, pendekatan });
      setDimensiTerpilih(fallback.dimensi);
      setAiRationale(fallback.alasan);
    } finally {
      setIsRecommendingDimensions(false);
    }
  };

  // Submit Form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const activeTema = kategoriTema === 'bebas'
      ? (gagasanAwal || 'Gagasan Kreatif Murid SMA')
      : (temaKegiatan === 'Tema lainnya' ? temaKustom : temaKegiatan);

    const activeBentuk = bentukKokurikuler === 'Bentuk kokurikuler lainnya'
      ? bentukKustom
      : bentukKokurikuler;

    const activePendekatan = pendekatan === 'Pendekatan lainnya'
      ? pendekatanKustom
      : pendekatan;

    const finalJp = isCustomJp ? Number(customJp) : Number(selectedJpOption);

    const formData: ModuleFormData = {
      namaSatuanPendidikan,
      kelas,
      fase,
      tahunPelajaran,
      semester,
      bentukKokurikuler: activeBentuk || 'Pembelajaran kolaboratif lintas disiplin ilmu',
      bentukKustom,
      kategoriTema,
      temaKegiatan: activeTema || 'Gaya Hidup Berkelanjutan',
      gagasanAwal,
      pendekatan: activePendekatan || 'Project Based Learning (PjBL)',
      pendekatanKustom,
      lingkungan: lingkunganTerpilih,
      lingkunganKustom,
      alokasiJp: finalJp,
      modeAlokasi: isCustomJp ? 'kustom' : 'rekomendasi_panduan',
      durasiMinggu: Math.ceil(finalJp / 3),
      mataPelajaranTerpilih,
      mataPelajaranTambahan,
      dimensiTerpilih,
      koordinator,
      nipKoordinator,
      guruFasilitator1,
      nipGuruFasilitator1,
      guruFasilitator2,
      nipGuruFasilitator2,
      guruFasilitator3,
      nipGuruFasilitator3,
      guruFasilitator: [
        guruFasilitator1 ? `1. ${guruFasilitator1}` : '',
        guruFasilitator2 ? `2. ${guruFasilitator2}` : '',
        guruFasilitator3 ? `3. ${guruFasilitator3}` : ''
      ].filter(Boolean).join(' | '),
      rombelGrup,
      namaKepalaSekolah,
      nipKepalaSekolah,
      tanggalPengesahan,
      kertasCetak,
      lokasi
    };

    onGenerate(formData);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      
      {/* Title & Progress Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-bold text-[#4169E1] mb-2">
          <span className="w-2 h-2 rounded-full bg-[#4169E1]" />
          <span>FORMULIR PERANCANGAN MODUL KOKURIKULER</span>
        </div>
        <h2 className="font-retro text-2xl sm:text-3xl font-extrabold text-[#24345B]">
          Rancang Modul Kokurikuler SMA
        </h2>
        <p className="text-sm text-[#24345B]/80 mt-1">
          Pilih preferensi kurikulum Anda. AI akan menyusun dokumen lengkap 15 bagian (A–O) secara otomatis.
        </p>

        {/* Step Indicator */}
        <div className="grid grid-cols-4 gap-2 mt-6">
          {[
            { num: 1, title: 'Identitas & Kelas' },
            { num: 2, title: 'Tema & Pendekatan' },
            { num: 3, title: 'Alokasi JP & Mapel' },
            { num: 4, title: '8 Dimensi Profil' }
          ].map(s => (
            <button
              key={s.num}
              type="button"
              onClick={() => setCurrentStep(s.num)}
              className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                currentStep === s.num
                  ? 'bg-[#4169E1] text-white border-[#24345B] shadow-[2px_2px_0px_#24345B]'
                  : currentStep > s.num
                  ? 'bg-[#FCE4EC] text-[#24345B] border-[#F4A6C1]'
                  : 'bg-white text-[#24345B]/70 border-[#A7D8F0]'
              }`}
            >
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider">Tahap 0{s.num}</div>
              <div className="text-xs font-bold truncate">{s.title}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Form Body */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border-2 border-[#A7D8F0] p-6 sm:p-8 shadow-[6px_6px_0px_rgba(65,105,225,0.12)] space-y-8">
        
        {/* ================= STEP 1: IDENTITAS & KELAS ================= */}
        {currentStep === 1 && (
          <div className="space-y-6">
            
            <div className="border-b border-[#A7D8F0] pb-3 flex items-center justify-between">
              <div>
                <h3 className="font-retro text-lg font-bold text-[#24345B]">
                  Tahap 1: Identitas Satuan Pendidikan & Kelas
                </h3>
                <p className="text-xs text-[#24345B]/70">Khusus jenjang Sekolah Menengah Atas (SMA).</p>
              </div>
              <span className="px-2.5 py-1 bg-[#FCE4EC] border border-[#F4A6C1] rounded text-xs font-bold text-[#24345B]">
                Jenjang: SMA
              </span>
            </div>

            {/* School Name */}
            <div>
              <label className="block text-xs font-bold text-[#24345B] mb-1">
                Nama Satuan Pendidikan (Tersimpan otomatis)
              </label>
              <input
                type="text"
                value={namaSatuanPendidikan}
                onChange={e => handleSchoolNameChange(e.target.value)}
                placeholder="Contoh: SMA Negeri 3 Bombana"
                required
                className="w-full px-4 py-2.5 rounded-lg border-1.5 border-[#A7D8F0] text-sm text-[#24345B] focus:border-[#4169E1] focus:outline-none focus:ring-2 focus:ring-[#4169E1]/20 font-medium"
              />
            </div>

            {/* Kelas & Auto-filled Fase */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#24345B] mb-1">
                  Pilih Kelas SMA
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Kelas X', 'Kelas XI', 'Kelas XII'] as SMAClass[]).map(k => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => handleKelasChange(k)}
                      className={`py-2.5 px-3 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                        kelas === k
                          ? 'bg-[#4169E1] text-white border-[#24345B] shadow-[2px_2px_0px_#24345B]'
                          : 'bg-[#F4F6FA] text-[#24345B] border-[#A7D8F0] hover:border-[#4169E1]'
                      }`}
                    >
                      {k}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#24345B] mb-1">
                  Fase Kurikulum (Otomatis)
                </label>
                <div className="px-4 py-2.5 rounded-lg border-1.5 border-[#A7D8F0] bg-[#FCE4EC]/40 text-sm font-bold text-[#24345B] flex items-center justify-between">
                  <span>{fase}</span>
                  <span className="text-[11px] font-normal text-[#24345B]/70">
                    {kelas === 'Kelas X' ? 'Fase E (Fondasi SMA)' : 'Fase F (Pematangan SMA)'}
                  </span>
                </div>
              </div>
            </div>

            {/* Tahun Pelajaran & Semester */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#24345B] mb-1">
                  Tahun Pelajaran
                </label>
                <select
                  value={tahunPelajaran}
                  onChange={e => setTahunPelajaran(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border-1.5 border-[#A7D8F0] text-sm text-[#24345B] bg-white focus:border-[#4169E1] focus:outline-none font-medium"
                >
                  <option value="2025/2026">2025/2026</option>
                  <option value="2026/2027">2026/2027</option>
                  <option value="2024/2025">2024/2025</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#24345B] mb-1">
                  Semester
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Ganjil', 'Genap'] as const).map(sem => (
                    <button
                      key={sem}
                      type="button"
                      onClick={() => setSemester(sem)}
                      className={`py-2 px-3 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                        semester === sem
                          ? 'bg-[#4169E1] text-white border-[#24345B] shadow-[2px_2px_0px_#24345B]'
                          : 'bg-[#F4F6FA] text-[#24345B] border-[#A7D8F0] hover:border-[#4169E1]'
                      }`}
                    >
                      Semester {sem}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Datalist untuk Autocomplete Guru SMAN 3 Bombana */}
            <datalist id="daftar-guru-sman3">
              {DAFTAR_SEMUA_GURU_SMAN3_BOMBANA.map((nama) => (
                <option key={nama} value={nama} />
              ))}
            </datalist>

            {/* Tim Guru SMAN 3 Bombana Berdasarkan SK Pembagian Tugas */}
            <div className="p-4 bg-[#F4F6FA] border-2 border-[#4169E1] rounded-xl space-y-4 shadow-[2px_2px_0px_#4169E1]">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#A7D8F0] pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4169E1]" />
                  <span className="text-xs font-bold text-[#24345B] uppercase font-mono">
                    Daftar Guru &amp; Tim Fasilitator Kokurikuler SMAN 3 Bombana
                  </span>
                </div>
                <span className="text-[10px] bg-[#FCE4EC] text-[#24345B] font-bold px-2 py-0.5 rounded border border-[#F4A6C1]">
                  Sesuai SK Pembagian Tugas {kelas}
                </span>
              </div>

              <p className="text-xs text-[#24345B]/80">
                Pilih rombongan belajar (rombel) di bawah. <strong>Guru nomor 1 di setiap rombel otomatis ditetapkan sebagai Koordinator Projek</strong>, didampingi oleh Guru Fasilitator berikutnya beserta NIP lengkap.
              </p>

              {/* Rombel Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {GURU_KOKURIKULER_SMAN3_BOMBANA[kelas]?.map((group) => {
                  const isCurrentRombel = rombelGrup === group.rombel;
                  return (
                    <div
                      key={group.rombel}
                      className={`p-3 rounded-xl border transition-all text-xs flex flex-col justify-between ${
                        isCurrentRombel
                          ? 'bg-white border-[#4169E1] shadow-[2px_2px_0px_#4169E1]'
                          : 'bg-white/80 border-[#A7D8F0] hover:border-[#4169E1]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono font-bold text-[#4169E1] text-[11px] bg-[#FCE4EC]/60 px-2 py-0.5 rounded border border-[#F4A6C1]">
                            Rombel {group.rombel}
                          </span>
                          {isCurrentRombel && (
                            <span className="text-[10px] font-bold text-[#4169E1] flex items-center gap-0.5">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Aktif</span>
                            </span>
                          )}
                        </div>

                        {/* Teachers in group */}
                        <ol className="space-y-1.5 mb-3">
                          {group.guru.map((guruNama, idx) => (
                            <li key={guruNama} className="flex items-center justify-between gap-1 text-[11px] leading-tight text-[#24345B]">
                              <div className="flex items-start gap-1 truncate">
                                <span className="font-mono text-[#4169E1] shrink-0 font-bold">{idx + 1}.</span>
                                <span className={`truncate ${idx === 0 ? 'font-bold text-[#24345B]' : 'font-medium'}`} title={guruNama}>
                                  {guruNama}
                                </span>
                              </div>
                              <span className={`text-[9px] px-1 py-0.2 rounded font-bold shrink-0 ${
                                idx === 0 
                                  ? 'bg-[#FCE4EC] text-[#24345B] border border-[#F4A6C1]' 
                                  : 'bg-[#F4F6FA] text-[#4169E1] border border-[#A7D8F0]'
                              }`}>
                                {idx === 0 ? 'Koordinator' : `Fasilitator ${idx}`}
                              </span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      {/* Quick Apply Button */}
                      <button
                        type="button"
                        onClick={() => handleApplyRombel(group)}
                        className={`w-full py-1.5 px-2 rounded-lg text-[11px] font-bold cursor-pointer transition-all flex items-center justify-center gap-1 ${
                          isCurrentRombel
                            ? 'bg-[#4169E1] text-white shadow-xs'
                            : 'bg-[#F4F6FA] text-[#24345B] border border-[#A7D8F0] hover:bg-[#FCE4EC]'
                        }`}
                      >
                        <UserCheck className="w-3 h-3" />
                        <span>{isCurrentRombel ? 'Tim Terpasang' : 'Terapkan Tim Rombel'}</span>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Rincian Input Form: Koordinator & Guru Fasilitator dengan NIP Lengkap */}
              <div className="pt-3 border-t border-[#A7D8F0] space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold text-[#24345B] block">
                      Formulir Tim Pelaksana &amp; Input NIP Resmi:
                    </span>
                    <span className="text-[11px] text-[#24345B]/75">
                      Guru No. 1 bertindak sebagai Koordinator Projek. NIP terisi otomatis dan dapat diedit.
                    </span>
                  </div>
                  {rombelGrup && (
                    <span className="text-[11px] font-bold text-[#4169E1] font-mono bg-white px-2.5 py-1 rounded-lg border border-[#A7D8F0]">
                      Kelompok Terpilih: Rombel {rombelGrup}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  {/* 1. Koordinator Projek (Guru Nomor 1 Rombel) */}
                  <div className="p-3 bg-white border-2 border-[#4169E1] rounded-xl space-y-2 shadow-xs">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-[#24345B]">
                        Koordinator Projek <span className="text-[#4169E1] font-mono text-[10px]">(No. 1 Rombel)</span>
                      </label>
                      <span className="text-[9px] bg-[#FCE4EC] text-[#24345B] font-bold px-1.5 py-0.5 rounded border border-[#F4A6C1]">
                        Ketua Tim
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-[#24345B]/70 block mb-0.5">Nama &amp; Gelar Lengkap:</span>
                      <input
                        type="text"
                        list="daftar-guru-sman3"
                        value={koordinator}
                        onChange={e => handleKoordinatorChange(e.target.value)}
                        placeholder="Ketik atau pilih nama guru..."
                        required
                        className="w-full px-2.5 py-1.5 rounded-lg border border-[#A7D8F0] text-xs text-[#24345B] bg-white focus:border-[#4169E1] focus:outline-none font-bold"
                      />
                    </div>

                    <div>
                      <span className="text-[10px] text-[#24345B]/70 block mb-0.5">NIP Koordinator:</span>
                      <input
                        type="text"
                        value={nipKoordinator}
                        onChange={e => setNipKoordinator(e.target.value)}
                        placeholder="Contoh: 19850421 200903 2 007"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-[#A7D8F0] text-xs text-[#24345B] bg-white focus:border-[#4169E1] focus:outline-none font-mono"
                      />
                      <span className="text-[9px] text-[#24345B]/60 mt-0.5 block italic">
                        *NIP terisi otomatis / isi '-' bila non-PNS
                      </span>
                    </div>
                  </div>

                  {/* 2. Guru Fasilitator 1 (Guru Nomor 2 Rombel) */}
                  <div className="p-3 bg-white border border-[#A7D8F0] rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-[#24345B]">
                        Guru Fasilitator 1 <span className="text-[#4169E1] font-mono text-[10px]">(No. 2 Rombel)</span>
                      </label>
                      <span className="text-[9px] bg-[#F4F6FA] text-[#4169E1] font-bold px-1.5 py-0.5 rounded border border-[#A7D8F0]">
                        Pendamping
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-[#24345B]/70 block mb-0.5">Nama &amp; Gelar Lengkap:</span>
                      <input
                        type="text"
                        list="daftar-guru-sman3"
                        value={guruFasilitator1}
                        onChange={e => handleFasilitator1Change(e.target.value)}
                        placeholder="Ketik atau pilih nama guru..."
                        required
                        className="w-full px-2.5 py-1.5 rounded-lg border border-[#A7D8F0] text-xs text-[#24345B] bg-white focus:border-[#4169E1] focus:outline-none font-medium"
                      />
                    </div>

                    <div>
                      <span className="text-[10px] text-[#24345B]/70 block mb-0.5">NIP Fasilitator 1:</span>
                      <input
                        type="text"
                        value={nipGuruFasilitator1}
                        onChange={e => setNipGuruFasilitator1(e.target.value)}
                        placeholder="Contoh: 19890615 201504 2 003"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-[#A7D8F0] text-xs text-[#24345B] bg-white focus:border-[#4169E1] focus:outline-none font-mono"
                      />
                      <span className="text-[9px] text-[#24345B]/60 mt-0.5 block italic">
                        *NIP terisi otomatis / isi '-' bila non-PNS
                      </span>
                    </div>
                  </div>

                  {/* 3. Guru Fasilitator 2 (Guru Nomor 3 Rombel) */}
                  <div className="p-3 bg-white border border-[#A7D8F0] rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-[#24345B]">
                        Guru Fasilitator 2 <span className="text-[#4169E1] font-mono text-[10px]">(No. 3 Rombel)</span>
                      </label>
                      <span className="text-[9px] bg-[#F4F6FA] text-[#4169E1] font-bold px-1.5 py-0.5 rounded border border-[#A7D8F0]">
                        Pendamping
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-[#24345B]/70 block mb-0.5">Nama &amp; Gelar Lengkap:</span>
                      <input
                        type="text"
                        list="daftar-guru-sman3"
                        value={guruFasilitator2}
                        onChange={e => handleFasilitator2Change(e.target.value)}
                        placeholder="Ketik atau pilih nama guru..."
                        className="w-full px-2.5 py-1.5 rounded-lg border border-[#A7D8F0] text-xs text-[#24345B] bg-white focus:border-[#4169E1] focus:outline-none font-medium"
                      />
                    </div>

                    <div>
                      <span className="text-[10px] text-[#24345B]/70 block mb-0.5">NIP Fasilitator 2:</span>
                      <input
                        type="text"
                        value={nipGuruFasilitator2}
                        onChange={e => setNipGuruFasilitator2(e.target.value)}
                        placeholder="Contoh: 19880414 201402 2 004"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-[#A7D8F0] text-xs text-[#24345B] bg-white focus:border-[#4169E1] focus:outline-none font-mono"
                      />
                      <span className="text-[9px] text-[#24345B]/60 mt-0.5 block italic">
                        *NIP terisi otomatis / isi '-' bila non-PNS
                      </span>
                    </div>
                  </div>

                </div>

                {/* Optional Fasilitator 3 (Orang ke-4 di rombel seperti E1-E3 atau E4-E6) */}
                <div>
                  {!showFasilitator3 && !guruFasilitator3 ? (
                    <button
                      type="button"
                      onClick={() => setShowFasilitator3(true)}
                      className="text-xs font-bold text-[#4169E1] hover:underline flex items-center gap-1 cursor-pointer py-1"
                    >
                      <span>+ Tambah Guru Fasilitator 3 (Fasilitator Tambahan / Rombel 4 Orang)</span>
                    </button>
                  ) : (
                    <div className="p-3 bg-[#F4F6FA] border border-[#A7D8F0] rounded-xl space-y-2 mt-2">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold text-[#24345B]">
                          Guru Fasilitator 3 <span className="text-[#4169E1] font-mono text-[10px]">(No. 4 Rombel)</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            setGuruFasilitator3('');
                            setNipGuruFasilitator3('');
                            setShowFasilitator3(false);
                          }}
                          className="text-[10px] text-rose-600 hover:underline cursor-pointer font-bold"
                        >
                          Hapus Fasilitator 3
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <span className="text-[10px] text-[#24345B]/70 block mb-0.5">Nama &amp; Gelar Lengkap:</span>
                          <input
                            type="text"
                            list="daftar-guru-sman3"
                            value={guruFasilitator3}
                            onChange={e => handleFasilitator3Change(e.target.value)}
                            placeholder="Ketik atau pilih nama guru..."
                            className="w-full px-2.5 py-1.5 rounded-lg border border-[#A7D8F0] text-xs text-[#24345B] bg-white font-medium"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] text-[#24345B]/70 block mb-0.5">NIP Fasilitator 3:</span>
                          <input
                            type="text"
                            value={nipGuruFasilitator3}
                            onChange={e => setNipGuruFasilitator3(e.target.value)}
                            placeholder="NIP Fasilitator 3"
                            className="w-full px-2.5 py-1.5 rounded-lg border border-[#A7D8F0] text-xs text-[#24345B] bg-white font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Collapsible Panel Kepala Sekolah untuk Lembar Pengesahan */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setShowKepalaSekolahEdit(!showKepalaSekolahEdit)}
                    className="text-xs font-bold text-[#4169E1] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Pengesahan Kepala Sekolah: {namaKepalaSekolah} (NIP. {nipKepalaSekolah})</span>
                    {showKepalaSekolahEdit ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {showKepalaSekolahEdit && (
                    <div className="mt-2 p-3 bg-white rounded border border-[#A7D8F0] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <span className="text-[10px] font-bold text-[#24345B] block mb-1">Nama Kepala Sekolah &amp; Gelar:</span>
                        <input
                          type="text"
                          value={namaKepalaSekolah}
                          onChange={e => setNamaKepalaSekolah(e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded border border-[#A7D8F0] text-xs text-[#24345B] font-medium"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-[#24345B] block mb-1">NIP Kepala Sekolah:</span>
                        <input
                          type="text"
                          value={nipKepalaSekolah}
                          onChange={e => setNipKepalaSekolah(e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded border border-[#A7D8F0] text-xs text-[#24345B] font-mono"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-[#24345B] block mb-1">Kota &amp; Tanggal Pengesahan:</span>
                        <input
                          type="text"
                          value={tanggalPengesahan}
                          onChange={e => setTanggalPengesahan(e.target.value)}
                          placeholder="Rumbia, 14 Juli 2025"
                          className="w-full px-2.5 py-1.5 rounded border border-[#A7D8F0] text-xs text-[#24345B] font-medium"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Lokasi Ruang Proyek */}
                <div className="pt-2 border-t border-[#A7D8F0]/60">
                  <label className="block text-xs font-bold text-[#24345B] mb-1">
                    Lokasi / Ruang Pelaksanaan Proyek Kokurikuler
                  </label>
                  <input
                    type="text"
                    value={lokasi}
                    onChange={e => setLokasi(e.target.value)}
                    placeholder="Contoh: Laboratorium Komputer & Ruang Kolaborasi SMAN 3 Bombana"
                    className="w-full px-3 py-2 rounded-lg border border-[#A7D8F0] text-xs text-[#24345B] bg-white focus:border-[#4169E1] focus:outline-none font-medium"
                  />
                </div>

                {/* Format Ukuran Kertas Cetak & Export PDF */}
                <div className="pt-2 border-t border-[#A7D8F0]/60">
                  <label className="block text-xs font-bold text-[#24345B] mb-1.5 flex items-center justify-between">
                    <span>Ukuran Kertas Resmi Dokumen &amp; Export PDF:</span>
                    <span className="text-[10px] bg-[#FCE4EC] text-[#24345B] px-2 py-0.5 rounded font-mono font-bold border border-[#F4A6C1]">
                      Default: Kertas F4
                    </span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setKertasCetak('F4')}
                      className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                        kertasCetak === 'F4'
                          ? 'border-[#4169E1] bg-white shadow-[2px_2px_0px_#4169E1]'
                          : 'border-[#A7D8F0] bg-white/70 hover:bg-[#F4F6FA]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[#24345B]">Kertas F4 / Folio (215 x 330 mm)</span>
                        <span className="text-[9px] bg-[#4169E1] text-white px-1.5 py-0.5 rounded font-bold">Standar Sekolah</span>
                      </div>
                      <p className="text-[11px] text-[#24345B]/70 mt-0.5">Ukuran baku HVS Folio / F4 untuk administrasi kurikulum sekolah di Indonesia.</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setKertasCetak('A4')}
                      className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                        kertasCetak === 'A4'
                          ? 'border-[#4169E1] bg-white shadow-[2px_2px_0px_#4169E1]'
                          : 'border-[#A7D8F0] bg-white/70 hover:bg-[#F4F6FA]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[#24345B]">Kertas A4 (210 x 297 mm)</span>
                        <span className="text-[9px] bg-[#F4F6FA] text-[#24345B] border border-[#A7D8F0] px-1.5 py-0.5 rounded font-bold">Internasional</span>
                      </div>
                      <p className="text-[11px] text-[#24345B]/70 mt-0.5">Ukuran lembar standar ISO A4 untuk pencetakan dokumen umum.</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bentuk Kokurikuler */}
            <div>
              <label className="block text-xs font-bold text-[#24345B] mb-2">
                Bentuk Kegiatan Kokurikuler
              </label>
              <div className="space-y-2">
                {[
                  'Pembelajaran kolaboratif lintas disiplin ilmu',
                  'Gerakan 7 Kebiasaan Anak Indonesia Hebat',
                  'Bentuk kokurikuler lainnya'
                ].map(b => (
                  <label
                    key={b}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      bentukKokurikuler === b
                        ? 'border-[#4169E1] bg-[#FCE4EC]/30 font-bold'
                        : 'border-[#A7D8F0] hover:bg-[#F4F6FA]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="bentuk"
                      checked={bentukKokurikuler === b}
                      onChange={() => setBentukKokurikuler(b)}
                      className="text-[#4169E1] focus:ring-[#4169E1]"
                    />
                    <span className="text-xs text-[#24345B]">{b}</span>
                  </label>
                ))}
              </div>

              {bentukKokurikuler === 'Bentuk kokurikuler lainnya' && (
                <div className="mt-2">
                  <input
                    type="text"
                    value={bentukKustom}
                    onChange={e => setBentukKustom(e.target.value)}
                    placeholder="Masukkan bentuk kegiatan kokurikuler yang diinginkan..."
                    className="w-full px-4 py-2.5 rounded-lg border-1.5 border-[#4169E1] text-xs text-[#24345B] focus:outline-none font-medium"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="retro-button-primary px-5 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 cursor-pointer"
              >
                <span>Lanjut ke Tema & Pendekatan</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

        {/* ================= STEP 2: TEMA & PENDEKATAN ================= */}
        {currentStep === 2 && (
          <div className="space-y-6">
            
            <div className="border-b border-[#A7D8F0] pb-3 flex items-center justify-between">
              <div>
                <h3 className="font-retro text-lg font-bold text-[#24345B]">
                  Tahap 2: Konten Tema, Pendekatan & Lingkungan
                </h3>
                <p className="text-xs text-[#24345B]/70">Pilih tema yang kontekstual bagi kehidupan murid SMA.</p>
              </div>
            </div>

            {/* Category Selector Tabs */}
            <div>
              <label className="block text-xs font-bold text-[#24345B] mb-2">
                Kategori Pengembangan Tema
              </label>
              <div className="grid grid-cols-3 gap-2 p-1.5 bg-[#F4F6FA] rounded-xl border border-[#A7D8F0]">
                <button
                  type="button"
                  onClick={() => setKategoriTema('lintas_mapel')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    kategoriTema === 'lintas_mapel'
                      ? 'bg-white text-[#4169E1] shadow-xs border border-[#A7D8F0]'
                      : 'text-[#24345B]/80 hover:text-[#4169E1]'
                  }`}
                >
                  Tema Lintas Mapel (21 Tema)
                </button>
                <button
                  type="button"
                  onClick={() => setKategoriTema('tujuh_kebiasaan')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    kategoriTema === 'tujuh_kebiasaan'
                      ? 'bg-white text-[#4169E1] shadow-xs border border-[#A7D8F0]'
                      : 'text-[#24345B]/80 hover:text-[#4169E1]'
                  }`}
                >
                  7 Kebiasaan Anak Indonesia
                </button>
                <button
                  type="button"
                  onClick={() => setKategoriTema('bebas')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    kategoriTema === 'bebas'
                      ? 'bg-white text-[#4169E1] shadow-xs border border-[#A7D8F0]'
                      : 'text-[#24345B]/80 hover:text-[#4169E1]'
                  }`}
                >
                  Tema Pilihan Bebas
                </button>
              </div>
            </div>

            {/* Theme Content by Category */}
            {kategoriTema === 'lintas_mapel' && (
              <div>
                <label className="block text-xs font-bold text-[#24345B] mb-1.5">
                  Daftar 21 Tema Lintas Mata Pelajaran SMA
                </label>
                <select
                  value={temaKegiatan}
                  onChange={e => setTemaKegiatan(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border-1.5 border-[#A7D8F0] text-sm text-[#24345B] bg-white focus:border-[#4169E1] focus:outline-none font-medium"
                >
                  {TEMA_LINTAS_MAPEL.map((t, idx) => (
                    <option key={t} value={t}>
                      {idx + 1}. {t}
                    </option>
                  ))}
                </select>

                {temaKegiatan === 'Tema lainnya' && (
                  <div className="mt-3">
                    <input
                      type="text"
                      value={temaKustom}
                      onChange={e => setTemaKustom(e.target.value)}
                      placeholder="Tuliskan tema kokurikuler SMA yang Anda rancang..."
                      className="w-full px-4 py-2.5 rounded-lg border-1.5 border-[#4169E1] text-xs text-[#24345B] focus:outline-none font-medium"
                    />
                  </div>
                )}
              </div>
            )}

            {kategoriTema === 'tujuh_kebiasaan' && (
              <div>
                <label className="block text-xs font-bold text-[#24345B] mb-2">
                  Pilih Fokus dari 7 Kebiasaan Anak Indonesia Hebat
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {TUJUH_KEBIASAAN.map(k => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setTemaKegiatan(`Gerakan 7 Kebiasaan: ${k}`)}
                      className={`p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                        temaKegiatan === `Gerakan 7 Kebiasaan: ${k}`
                          ? 'border-[#4169E1] bg-[#FCE4EC]/40 text-[#24345B] shadow-xs'
                          : 'border-[#A7D8F0] bg-white text-[#24345B]/80 hover:bg-[#F4F6FA]'
                      }`}
                    >
                      <span>{k}</span>
                      {temaKegiatan === `Gerakan 7 Kebiasaan: ${k}` && (
                        <Check className="w-4 h-4 text-[#4169E1]" />
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-[#24345B]/70 mt-2 italic">
                  *AI akan mengadaptasi kebiasaan ini secara matang sesuai pola kehidupan remaja SMA, bukan kegiatan anak kecil.
                </p>
              </div>
            )}

            {kategoriTema === 'bebas' && (
              <div>
                <label className="block text-xs font-bold text-[#24345B] mb-1">
                  Tuliskan Gagasan Awal Anda
                </label>
                <textarea
                  rows={3}
                  value={gagasanAwal}
                  onChange={e => setGagasanAwal(e.target.value)}
                  placeholder="Contoh: Kami ingin murid kelas XII membuat aplikasi web pendeteksi hoaks berbasis AI lokal dan melatih warga sekitar..."
                  className="w-full px-4 py-2.5 rounded-lg border-1.5 border-[#A7D8F0] text-xs text-[#24345B] focus:border-[#4169E1] focus:outline-none font-medium"
                />
                <p className="text-[11px] text-[#24345B]/70 mt-1">
                  AI akan mengelaborasi gagasan ini menjadi tema resmi, tujuan, alur proyek berkelanjutan, dan rubrik asesmen.
                </p>
              </div>
            )}

            {/* Pendekatan Pedagogis */}
            <div>
              <label className="block text-xs font-bold text-[#24345B] mb-1.5">
                Pendekatan dan Praktik Pedagogis
              </label>
              <select
                value={pendekatan}
                onChange={e => setPendekatan(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border-1.5 border-[#A7D8F0] text-sm text-[#24345B] bg-white focus:border-[#4169E1] focus:outline-none font-medium"
              >
                {PENDEKATAN_PEMBELAJARAN.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>

              {pendekatan === 'Pendekatan lainnya' && (
                <div className="mt-2">
                  <input
                    type="text"
                    value={pendekatanKustom}
                    onChange={e => setPendekatanKustom(e.target.value)}
                    placeholder="Tuliskan pendekatan pembelajaran lain..."
                    className="w-full px-4 py-2.5 rounded-lg border-1.5 border-[#4169E1] text-xs text-[#24345B] focus:outline-none font-medium"
                  />
                </div>
              )}

              {pendekatan.includes('STREAM') && (
                <div className="mt-3 p-3 bg-[#FCE4EC]/50 border border-[#F4A6C1] rounded-xl text-xs text-[#24345B]">
                  <span className="font-bold text-[#4169E1]">Integrasi STREAM Aktif:</span> AI akan membedah integrasi mendalam untuk 
                  <strong> Science</strong> (inkuiri), <strong>Technology</strong> (digital & AI), <strong>Religion</strong> (akhlak & etika), 
                  <strong> Engineering</strong> (prototipe), <strong>Arts</strong> (estetika visual), dan <strong>Mathematics</strong> (data presisi).
                </div>
              )}
            </div>

            {/* Lingkungan Pembelajaran */}
            <div>
              <label className="block text-xs font-bold text-[#24345B] mb-2">
                Lingkungan Pembelajaran yang Dilibatkan
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {LINGKUNGAN_PEMBELAJARAN.map(env => {
                  const isChecked = lingkunganTerpilih.includes(env);
                  return (
                    <label
                      key={env}
                      className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                        isChecked
                          ? 'border-[#4169E1] bg-[#FCE4EC]/30 font-bold'
                          : 'border-[#A7D8F0] hover:bg-[#F4F6FA]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleEnvironment(env)}
                        className="rounded text-[#4169E1] focus:ring-[#4169E1]"
                      />
                      <span className="text-[#24345B]">{env}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="retro-button-secondary px-4 py-2.5 rounded-lg text-xs font-bold cursor-pointer"
              >
                &larr; Kembali
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="retro-button-primary px-5 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 cursor-pointer"
              >
                <span>Lanjut ke Alokasi JP & Mapel</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

        {/* ================= STEP 3: ALOKASI JP & MAPEL ================= */}
        {currentStep === 3 && (
          <div className="space-y-6">
            
            <div className="border-b border-[#A7D8F0] pb-3 flex items-center justify-between">
              <div>
                <h3 className="font-retro text-lg font-bold text-[#24345B]">
                  Tahap 3: Alokasi JP Panduan 2025 & Integrasi Mapel SMA
                </h3>
                <p className="text-xs text-[#24345B]/70">Perhitungan pembagian sesi dan integrasi antar disiplin ilmu.</p>
              </div>
            </div>

            {/* JP Options based on Panduan Kokurikuler 2025 SMA */}
            <div>
              <label className="block text-xs font-bold text-[#24345B] mb-2">
                Pilih Alokasi Jam Pelajaran (JP) Berdasarkan Panduan SMA 2025
              </label>
              
              <div className="space-y-2.5">
                {ALOKASI_JP_PANDUAN_SMA.map(opt => {
                  const isSelected = !isCustomJp && selectedJpOption === opt.totalJp;
                  return (
                    <div
                      key={opt.totalJp}
                      onClick={() => {
                        setIsCustomJp(false);
                        setSelectedJpOption(opt.totalJp);
                      }}
                      className={`p-3.5 rounded-xl border-1.5 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#4169E1] bg-[#FCE4EC]/30 shadow-[2px_2px_0px_#4169E1]'
                          : 'border-[#A7D8F0] hover:bg-[#F4F6FA]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            checked={isSelected}
                            onChange={() => {}}
                            className="text-[#4169E1]"
                          />
                          <span className="font-bold text-xs sm:text-sm text-[#24345B]">{opt.label}</span>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-[#4169E1] text-white rounded">
                          {opt.totalJp} JP
                        </span>
                      </div>
                      <p className="text-[11px] text-[#24345B]/80 mt-1 pl-6">
                        {opt.keterangan}
                      </p>
                    </div>
                  );
                })}

                {/* Custom JP Option */}
                <div
                  onClick={() => setIsCustomJp(true)}
                  className={`p-3.5 rounded-xl border-1.5 cursor-pointer transition-all ${
                    isCustomJp
                      ? 'border-[#4169E1] bg-[#FCE4EC]/30 shadow-[2px_2px_0px_#4169E1]'
                      : 'border-[#A7D8F0] hover:bg-[#F4F6FA]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        checked={isCustomJp}
                        onChange={() => {}}
                        className="text-[#4169E1]"
                      />
                      <span className="font-bold text-xs sm:text-sm text-[#24345B]">Tentukan Alokasi JP Sendiri (Input Manual)</span>
                    </div>
                  </div>

                  {isCustomJp && (
                    <div className="mt-3 pl-6 flex items-center gap-3">
                      <input
                        type="number"
                        min={12}
                        max={180}
                        step={2}
                        value={customJp}
                        onChange={e => setCustomJp(Number(e.target.value))}
                        className="w-28 px-3 py-1.5 border border-[#4169E1] rounded-lg text-xs font-bold text-[#24345B]"
                      />
                      <span className="text-xs text-[#24345B]/80">
                        Total JP (AI akan otomatis menghitung jumlah sesi dan alur proyek)
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Mata Pelajaran SMA */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-[#24345B]">
                  Pilih Mata Pelajaran SMA yang Terintegrasi
                </label>
                <button
                  type="button"
                  onClick={() => setShowAddSubject(!showAddSubject)}
                  className="text-xs font-bold text-[#4169E1] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Mapel Lain</span>
                </button>
              </div>

              {showAddSubject && (
                <div className="p-3 bg-[#F4F6FA] border border-[#A7D8F0] rounded-xl mb-3 flex items-center gap-2">
                  <input
                    type="text"
                    value={newSubjectInput}
                    onChange={e => setNewSubjectInput(e.target.value)}
                    placeholder="Nama mata pelajaran / muatan baru..."
                    className="flex-1 px-3 py-1.5 rounded-lg border border-[#A7D8F0] text-xs text-[#24345B] bg-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomSubject}
                    className="px-3 py-1.5 bg-[#4169E1] text-white text-xs font-bold rounded-lg cursor-pointer"
                  >
                    Tambahkan
                  </button>
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[...MATA_PELAJARAN_SMA, ...mataPelajaranTambahan].map(subject => {
                  const isChecked = mataPelajaranTerpilih.includes(subject);
                  return (
                    <label
                      key={subject}
                      className={`flex items-center gap-2 p-2 rounded-lg border text-xs cursor-pointer transition-all ${
                        isChecked
                          ? 'border-[#4169E1] bg-[#FCE4EC]/30 font-bold'
                          : 'border-[#A7D8F0] hover:bg-[#F4F6FA]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleSubject(subject)}
                        className="rounded text-[#4169E1] focus:ring-[#4169E1]"
                      />
                      <span className="text-[#24345B] truncate">{subject}</span>
                    </label>
                  );
                })}
              </div>
              <p className="text-[11px] text-[#24345B]/70 mt-1.5 italic">
                *Pilih mata pelajaran yang relevan dengan tema. AI akan merumuskan kontribusi nyata masing-masing mapel terhadap proyek.
              </p>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="retro-button-secondary px-4 py-2.5 rounded-lg text-xs font-bold cursor-pointer"
              >
                &larr; Kembali
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="retro-button-primary px-5 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 cursor-pointer"
              >
                <span>Lanjut ke 8 Dimensi Profil</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

        {/* ================= STEP 4: 8 DIMENSI PROFIL LULUSAN ================= */}
        {currentStep === 4 && (
          <div className="space-y-6">
            
            <div className="border-b border-[#A7D8F0] pb-3 flex items-center justify-between">
              <div>
                <h3 className="font-retro text-lg font-bold text-[#24345B]">
                  Tahap 4: Target 8 Dimensi Profil Lulusan
                </h3>
                <p className="text-xs text-[#24345B]/70">Pilih dimensi fokus yang akan diasah dan dinilai dalam proyek.</p>
              </div>
              
              <button
                type="button"
                onClick={handleAiDimensionRecommendation}
                disabled={isRecommendingDimensions}
                className="retro-button-pink px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#24345B]" />
                <span>{isRecommendingDimensions ? 'Menganalisis...' : 'Rekomendasikan Dimensi dengan AI'}</span>
              </button>
            </div>

            {aiRationale && (
              <div className="p-3.5 bg-[#FCE4EC] border-1.5 border-[#F4A6C1] rounded-xl text-xs text-[#24345B]">
                <div className="flex items-center gap-2 font-bold mb-1">
                  <Sparkles className="w-4 h-4 text-[#4169E1]" />
                  <span>Rasional Pemilihan Dimensi oleh AI:</span>
                </div>
                <p className="leading-relaxed">{aiRationale}</p>
              </div>
            )}

            {/* 8 Dimensions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DELAPAN_DIMENSI_PROFIL_LULUSAN.map((dim, idx) => {
                const isSelected = dimensiTerpilih.includes(dim.nama);
                return (
                  <div
                    key={dim.id}
                    onClick={() => toggleDimension(dim.nama)}
                    className={`p-3.5 rounded-xl border-1.5 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#4169E1] bg-[#FCE4EC]/25 shadow-[2px_2px_0px_#4169E1]'
                        : 'border-[#A7D8F0] hover:bg-[#F4F6FA]'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 border ${
                        isSelected ? 'bg-[#4169E1] border-[#24345B] text-white' : 'border-[#A7D8F0] bg-white'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono font-bold text-[#4169E1]">0{idx + 1}.</span>
                          <h4 className="text-xs font-bold text-[#24345B]">{dim.nama}</h4>
                        </div>
                        <p className="text-[11px] text-[#24345B]/75 mt-0.5 leading-snug">
                          {dim.deskripsi}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary Box */}
            <div className="p-4 bg-[#F4F6FA] border border-[#A7D8F0] rounded-xl text-xs text-[#24345B]">
              <span className="font-bold">Dimensi Fokus Terpilih ({dimensiTerpilih.length}): </span>
              <span>{dimensiTerpilih.join(', ')}</span>
            </div>

            {/* Navigation & Submit CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#A7D8F0]">
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="w-full sm:w-auto retro-button-secondary px-4 py-2.5 rounded-lg text-xs font-bold cursor-pointer"
              >
                &larr; Kembali
              </button>

              <button
                type="submit"
                disabled={isGenerating}
                className="w-full sm:w-auto retro-button-primary px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer shadow-[4px_4px_0px_#24345B]"
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Menyusun Modul Kokurikuler SMA...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-[#F4A6C1]" />
                    <span>GENERATE MODUL KOKURIKULER</span>
                  </>
                )}
              </button>
            </div>

          </div>
        )}

      </form>

    </div>
  );
};
