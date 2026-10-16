/**
 * Type definitions for Modul Kokurikuler SMA
 * Berdasarkan Panduan Kokurikuler 2025 & 8 Dimensi Profil Lulusan
 */

export type SMAClass = 'Kelas X' | 'Kelas XI' | 'Kelas XII';
export type SMAFase = 'Fase E' | 'Fase F';
export type Semester = 'Ganjil' | 'Genap';
export type LearningStage = 'Memahami' | 'Mengaplikasi' | 'Merefleksi';

export interface IntegratedSubject {
  nama: string;
  kontribusi: string;
  kompetensi: string;
}

export interface DimensionIndicator {
  dimensi: string;
  indikator: string;
  buktiPerkembangan: string;
}

export interface StreamIntegration {
  science: string;
  technology: string;
  religion: string;
  engineering: string;
  arts: string;
  mathematics: string;
}

export interface Partnership {
  no: number;
  mitra: string;
  peran: string;
  bentukKeterlibatan: string;
  waktuKeterlibatan: string;
}

export interface ProjectSession {
  nomorSesi: number;
  namaSesi: string;
  alokasiJp: number;
  tahapPengalaman: LearningStage;
  tujuanSesi: string;
  aktivitasGuru: string;
  aktivitasMurid: string;
  integrasiMapelAtauStream: string;
  alatDanBahan: string;
  hasilSementara: string;
  hubunganDenganSesiBerikutnya: string;
  buktiPerkembangan: string;
}

export interface FormativeObservation {
  no: number;
  namaMurid: string;
  dimensiDiamati: string;
  indikatorBukti: string;
  catatanPerkembangan: string;
  umpanBalik: string;
}

export interface SummativeRubricRow {
  kriteria: string;
  dimensiTerkait: string;
  sangatBaik: string;
  baik: string;
  cukup: string;
  perluBimbingan: string;
}

export interface KokurikulerModule {
  id: string;
  createdAt: string;
  updatedAt: string;

  // A. Identitas Kegiatan
  identitas: {
    namaSatuanPendidikan: string;
    jenjang: 'SMA';
    kelas: SMAClass;
    fase: SMAFase;
    tahunPelajaran: string;
    semester: Semester;
    temaKegiatan: string;
    bentukKokurikuler: string;
    alokasiWaktu: string;
    totalJp: number;
    jumlahSesi: number;
    lokasiKegiatan: string;
    koordinatorKokurikuler: string;
    nipKoordinator?: string;
    guruFasilitator1?: string;
    nipGuruFasilitator1?: string;
    guruFasilitator2?: string;
    nipGuruFasilitator2?: string;
    guruFasilitator3?: string;
    nipGuruFasilitator3?: string;
    guruFasilitator: string;
    rombelGrup?: string;
    namaKepalaSekolah?: string;
    nipKepalaSekolah?: string;
    tanggalPengesahan?: string;
    kertasCetak?: 'F4' | 'A4';
    mataPelajaranTerkait: IntegratedSubject[];
  };

  // B. Dimensi Profil Lulusan
  dimensi: {
    fokusDimensi: string[];
    alasanPemilihan: string;
    indikatorPerilaku: DimensionIndicator[];
    hubunganDenganProyek: string;
  };

  // C. Tujuan Pembelajaran
  tujuanPembelajaran: string[];

  // D. Praktik Pedagogis
  praktikPedagogis: {
    pendekatan: string;
    alasanPenggunaan: string;
    peranGuru: string;
    peranMurid: string;
    polaKerjaKelompok: string;
    strategiPendampingan: string;
    integrasiStream?: StreamIntegration;
  };

  // E. Lingkungan Pembelajaran
  lingkungan: {
    tempat: string;
    sumberBelajar: string;
    kondisiLingkungan: string;
    keselamatanDanInklusi: string;
  };

  // F. Kemitraan Pembelajaran
  kemitraan: Partnership[];

  // G. Pemanfaatan Teknologi Digital
  teknologi: {
    perangkatDanAplikasi: string[];
    fungsiTeknologiPerTahap: string;
    etikaAIdanLiterasiDigital: string;
  };

  // H. Rangkaian Kegiatan
  rangkaianKegiatan: {
    petaPerkembanganProduk: string;
    sesi: ProjectSession[];
  };

  // I. Asesmen
  asesmen: {
    formatif: {
      tujuan: string;
      waktuPelaksanaan: string;
      teknikInstrumen: string;
      tabelPengamatan: FormativeObservation[];
    };
    sumatif: {
      teknik: string;
      rubrikAnalitik: SummativeRubricRow[];
    };
  };

  // J. Hasil/Karya Murid
  karyaMurid: {
    produkUtama: string;
    buktiSementaraSesi: string;
    spesifikasiKriteria: string;
    bentukPublikasi: string;
    manfaatBagiSekolahMasyarakat: string;
    buktiProsesDisimpan: string;
  };

  // K. Refleksi Murid
  refleksiMurid: {
    pertanyaan: string[];
    panduanPengerjaan: string;
  };

  // L. Refleksi Guru
  refleksiGuru: {
    aspek: Array<{
      pertanyaan: string;
      panduanEvaluasi: string;
    }>;
  };

  // M. Pelaporan
  pelaporan: {
    formatRapor: string;
    contohSangatBaik: string;
    contohBaik: string;
    contohCukup: string;
    contohPerluBimbingan: string;
  };

  // N. Evaluasi dan Tindak Lanjut
  evaluasiTindakLanjut: {
    evaluasiInput: string;
    evaluasiProses: string;
    evaluasiOutput: string;
    statusTindakLanjut: 'Kegiatan dilanjutkan' | 'Kegiatan diperbaiki' | 'Kegiatan dikembangkan' | 'Kegiatan dihentikan' | 'Dimensi tertentu perlu diperkuat';
    rencanaTindakLanjut: string;
  };

  // O. Lampiran
  lampiran: {
    jadwalSesi: string;
    pembagianPeranKelompok: string;
    lembarObservasi: string;
    jurnalProyek: string;
    lembarRefleksiMurid: string;
    rubrikAsesmen: string;
    lembarUmpanBalikTeman: string;
    rekapAsesmen: string;
  };
}

export interface ModuleFormData {
  namaSatuanPendidikan: string;
  kelas: SMAClass;
  fase: SMAFase;
  tahunPelajaran: string;
  semester: Semester;
  bentukKokurikuler: string;
  bentukKustom?: string;
  kategoriTema: 'lintas_mapel' | 'tujuh_kebiasaan' | 'bebas';
  temaKegiatan: string;
  gagasanAwal?: string;
  pendekatan: string;
  pendekatanKustom?: string;
  lingkungan: string[];
  lingkunganKustom?: string;
  alokasiJp: number;
  modeAlokasi: 'rekomendasi_panduan' | 'kustom' | 'satu_semester' | 'satu_tahun';
  durasiMinggu: number;
  mataPelajaranTerpilih: string[];
  mataPelajaranTambahan: string[];
  dimensiTerpilih: string[];
  koordinator: string;
  nipKoordinator?: string;
  guruFasilitator1?: string;
  nipGuruFasilitator1?: string;
  guruFasilitator2?: string;
  nipGuruFasilitator2?: string;
  guruFasilitator3?: string;
  nipGuruFasilitator3?: string;
  guruFasilitator: string;
  rombelGrup?: string;
  namaKepalaSekolah?: string;
  nipKepalaSekolah?: string;
  tanggalPengesahan?: string;
  kertasCetak?: 'F4' | 'A4';
  lokasi: string;
}
