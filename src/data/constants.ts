/**
 * Konstanta Kurikulum Kokurikuler SMA 2025
 * Mengacu pada Panduan Kokurikuler SMA Tahun 2025 dan 8 Dimensi Profil Lulusan
 */

export interface DimensiInfo {
  id: string;
  nama: string;
  deskripsi: string;
  iconName: string;
  contohIndikator: string[];
}

export const DELAPAN_DIMENSI_PROFIL_LULUSAN: DimensiInfo[] = [
  {
    id: 'keimanan_ketakwaan',
    nama: 'Keimanan dan Ketakwaan terhadap Tuhan Yang Maha Esa',
    deskripsi: 'Memiliki nilai spiritual, moral, dan akhlak mulia dalam kehidupan sehari-hari.',
    iconName: 'Sparkles',
    contohIndikator: [
      'Menunjukkan integritas moral dan etika dalam penelitian dan kerja kelompok',
      'Menghayati keteraturan alam semesta sebagai bukti kebesaran Tuhan',
      'Mengedepankan empati dan sikap hormat dalam berinteraksi dengan sesama murid dan masyarakat'
    ]
  },
  {
    id: 'kewargaan',
    nama: 'Kewargaan',
    deskripsi: 'Memahami peran sebagai warga negara dan bagian dari masyarakat global yang bertanggung jawab.',
    iconName: 'Globe',
    contohIndikator: [
      'Berpartisipasi aktif dalam memecahkan persoalan lingkungan hidup dan sosial di sekitar sekolah',
      'Menghargai keragaman budaya, pendapat, dan hak-hak sesama warga negara',
      'Mengutamakan kepentingan umum di atas kepentingan pribadi atau kelompok'
    ]
  },
  {
    id: 'penalaran_kritis',
    nama: 'Penalaran Kritis',
    deskripsi: 'Mampu memproses informasi, menganalisis masalah, dan membuat keputusan yang tepat.',
    iconName: 'Brain',
    contohIndikator: [
      'Menganalisis validitas data, sumber informasi, dan fakta sebelum menarik kesimpulan',
      'Mengidentifikasi bias informasi serta membedakan opini dan fakta ilmiah',
      'Menyusun argumen berbasis bukti yang logis dan terstruktur dalam presentasi proyek'
    ]
  },
  {
    id: 'kreativitas',
    nama: 'Kreativitas',
    deskripsi: 'Memiliki daya cipta dan kemampuan menghasilkan gagasan baru yang orisinal.',
    iconName: 'Lightbulb',
    contohIndikator: [
      'Menghasilkan ide-ide orisinal dalam merancang prototipe atau produk kokurikuler',
      'Memodifikasi konsep yang sudah ada menjadi solusi yang lebih efektif dan kontekstual',
      'Mengekspresikan gagasan melalui media visual, teknologi, atau karya estetis yang bermakna'
    ]
  },
  {
    id: 'kolaborasi',
    nama: 'Kolaborasi',
    deskripsi: 'Mampu bekerja sama secara gotong royong untuk mencapai tujuan bersama.',
    iconName: 'Users',
    contohIndikator: [
      'Berbagi peran dan tanggung jawab secara adil dalam kelompok proyek',
      'Mendengarkan dan merespons masukan rekan kelompok dengan sikap terbuka dan konstruktif',
      'Menyelesaikan perselisihan secara musyawarah untuk mencapai keberhasilan karya tim'
    ]
  },
  {
    id: 'kemandirian',
    nama: 'Kemandirian',
    deskripsi: 'Bertanggung jawab atas proses dan hasil belajar tanpa bergantung pada orang lain.',
    iconName: 'UserCheck',
    contohIndikator: [
      'Mengelola waktu, target pencapaian mingguan, dan log aktivitas proyek secara disiplin',
      'Menunjukkan inisiatif mencari solusi saat menghadapi kendala teknis atau materi',
      'Melakukan refleksi jujur atas kelemahan dan merencanakan langkah perbaikan pribadi'
    ]
  },
  {
    id: 'kesehatan',
    nama: 'Kesehatan',
    deskripsi: 'Memiliki kesejahteraan fisik dan mental yang seimbang.',
    iconName: 'HeartPulse',
    contohIndikator: [
      'Menerapkan pola hidup seimbang antara aktivitas belajar, fisik, dan istirahat',
      'Menjaga keselamatan kerja di laboratorium, lingkungan lapangan, dan ruang digital',
      'Mengelola stres dan menjaga resiliensi mental saat menghadapi tantangan proyek'
    ]
  },
  {
    id: 'komunikasi',
    nama: 'Komunikasi',
    deskripsi: 'Mampu menyampaikan gagasan serta melakukan refleksi secara efektif.',
    iconName: 'MessageSquare',
    contohIndikator: [
      'Menyampaikan ide, hasil observasi, dan argumen proyek secara lisan maupun tertulis dengan santun',
      'Menyesuaikan gaya komunikasi dengan audiens (guru, teman sebaya, mitra masyarakat)',
      'Menggunakan media grafis, digital, atau presentasi visual secara efektif dan komunikatif'
    ]
  }
];

export const TEMA_LINTAS_MAPEL: string[] = [
  'Literasi dan Numerasi',
  'Kesehatan dan Gaya Hidup Sehat',
  'Lingkungan Hidup dan Keberlanjutan',
  'Kewirausahaan',
  'Kewargaan dan Kebinekaan',
  'Digital Safety dan Literasi Digital',
  'Kreativitas dan Inovasi',
  'Kepemimpinan dan Kolaborasi',
  'Budaya dan Kearifan Lokal',
  'Pencegahan Perundungan dan Kekerasan',
  'Keselamatan dan Mitigasi Bencana',
  'Penguatan Karakter dan Etika Sosial',
  'Generasi Sehat dan Bugar',
  'Peduli dan Berbagi',
  'Aku Cinta Indonesia',
  'Hidup Hemat dan Produktif',
  'Berkarya untuk Sesama dan Bangsa',
  'Gaya Hidup Berkelanjutan',
  'Generasi Bijak Digital dan Cerdas AI',
  'Inovasi Teknologi Berlandaskan Nilai Keagamaan',
  'Tema lainnya'
];

export const TUJUH_KEBIASAAN: string[] = [
  'Bangun pagi',
  'Beribadah tepat waktu',
  'Berolahraga secara rutin',
  'Makan dan minum sehat serta bergizi',
  'Gemar belajar',
  'Bermasyarakat dan peduli lingkungan',
  'Tidur tepat waktu'
];

export const PENDEKATAN_PEMBELAJARAN: string[] = [
  'Pembelajaran Mendalam (Deep Learning): Mindful, Meaningful, Joyful',
  'Project Based Learning (PjBL)',
  'Problem Based Learning (PBL)',
  'Inquiry Based Learning',
  'Experiential Learning',
  'Service Learning',
  'STEAM (Science, Technology, Engineering, Arts, Mathematics)',
  'STREAM (Science, Technology, Religion, Engineering, Arts, Mathematics)',
  'Diskusi dan Kolaborasi',
  'Eksplorasi Lingkungan',
  'Pendekatan lainnya'
];

export const LINGKUNGAN_PEMBELAJARAN: string[] = [
  'Lingkungan kelas/sekolah',
  'Lingkungan alam sekitar',
  'Lingkungan masyarakat/pasar',
  'Lingkungan digital/maya',
  'Lingkungan rumah murid',
  'Perpustakaan/laboratorium',
  'Tempat ibadah',
  'Dunia usaha atau dunia kerja',
  'Komunitas dan potensi lokal',
  'Lingkungan lainnya'
];

export const MATA_PELAJARAN_SMA: string[] = [
  'Pendidikan Agama dan Budi Pekerti',
  'Pendidikan Pancasila',
  'Bahasa Indonesia',
  'Bahasa Inggris',
  'Matematika',
  'Informatika',
  'Fisika',
  'Kimia',
  'Biologi',
  'Ekonomi',
  'Sosiologi',
  'Geografi',
  'Sejarah',
  'Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)',
  'Seni dan Budaya',
  'Prakarya dan Kewirausahaan',
  'Muatan Lokal'
];

export interface JPOption {
  totalJp: number;
  label: string;
  pertemuan: number;
  jpPerPertemuan: number;
  keterangan: string;
  rekomendasiUntuk: string;
}

export const ALOKASI_JP_PANDUAN_SMA: JPOption[] = [
  {
    totalJp: 24,
    label: '24 JP (Mini Proyek / 8 Pertemuan x 3 JP)',
    pertemuan: 8,
    jpPerPertemuan: 3,
    keterangan: 'Panduan Kokurikuler 2025: Format intensif singkat, cocok untuk proyek awal semester atau integrasi 2–3 mata pelajaran.',
    rekomendasiUntuk: 'Kelas X, XI, XII (Tema Singkat / Awal Semester)'
  },
  {
    totalJp: 36,
    label: '36 JP (Standar 1 Proyek / 12 Pertemuan x 3 JP)',
    pertemuan: 12,
    jpPerPertemuan: 3,
    keterangan: 'Panduan Kokurikuler 2025: Alokasi standar satu proyek kokurikuler SMA berkesinambungan penuh selama 10–12 minggu.',
    rekomendasiUntuk: 'Rekomendasi Utama Kelas X, XI, XII'
  },
  {
    totalJp: 48,
    label: '48 JP (Proyek Menengah / 12 Pertemuan x 4 JP)',
    pertemuan: 12,
    jpPerPertemuan: 4,
    keterangan: 'Panduan Kokurikuler 2025: Proyek kolaboratif multidisiplin dengan riset lapangan dan prototipe karya nyata.',
    rekomendasiUntuk: 'Kelas XI & XII (PjBL / STEAM / STREAM)'
  },
  {
    totalJp: 72,
    label: '72 JP (Proyek Besar 1 Semester / 18 Pertemuan x 4 JP)',
    pertemuan: 18,
    jpPerPertemuan: 4,
    keterangan: 'Panduan Kokurikuler 2025: Alokasi 1 semester penuh untuk 1 proyek utama lintas rumpun mata pelajaran dan kemitraan masyarakat.',
    rekomendasiUntuk: 'Fase E (Kelas X) atau Fase F (Kelas XI) 1 Semester Penuh'
  },
  {
    totalJp: 108,
    label: '108 JP (Program Tahunan / Kompilasi Semester)',
    pertemuan: 27,
    jpPerPertemuan: 4,
    keterangan: 'Panduan Kokurikuler 2025: Alokasi total tahunan kokurikuler SMA (~25% dari total struktur kurikulum tahunan).',
    rekomendasiUntuk: 'Perencanaan Tahunan Sekolah'
  }
];
