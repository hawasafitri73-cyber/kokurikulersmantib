/**
 * Mesin Generator Modul Kokurikuler SMA
 * Berdasarkan Panduan Kokurikuler 2025 & 8 Dimensi Profil Lulusan
 */

import { KokurikulerModule, ModuleFormData, ProjectSession, StreamIntegration } from '../types/module';
import { DELAPAN_DIMENSI_PROFIL_LULUSAN } from '../data/constants';

export function recommendDimensions(formData: Partial<ModuleFormData>): {
  dimensi: string[];
  alasan: string;
} {
  const tema = (formData.temaKegiatan || '').toLowerCase();
  const pendekatan = (formData.pendekatan || '').toLowerCase();
  const kelas = formData.kelas || 'Kelas XII';

  let recommended: string[] = [];
  let alasan = '';

  if (tema.includes('lingkungan') || tema.includes('keberlanjutan')) {
    recommended = [
      'Penalaran Kritis',
      'Kewargaan',
      'Kreativitas',
      'Kolaborasi'
    ];
    alasan = `Untuk tema "${formData.temaKegiatan}", dimensi Penalaran Kritis diperlukan murid ${kelas} dalam meneliti dampak ekologis secara ilmiah, Kewargaan menumbuhkan tanggung jawab sosial terhadap pelestarian bumi, Kreativitas untuk menciptakan inovasi ramah lingkungan, serta Kolaborasi untuk kerja tim lintas bidang.`;
  } else if (tema.includes('digital') || tema.includes('ai') || tema.includes('teknologi')) {
    recommended = [
      'Penalaran Kritis',
      'Komunikasi',
      'Kemandirian',
      'Kreativitas'
    ];
    alasan = `Tema teknologi digital dan kecerdasan artifisial membutuhkan dimensi Penalaran Kritis untuk memfilter etika dan disinformasi, Kemandirian dalam mengeksplorasi alat digital, Kreativitas dalam menghasilkan konten/prototipe orisinal, serta Komunikasi dalam menyampaikan pesan secara aman di ruang siber.`;
  } else if (tema.includes('kewirausahaan') || tema.includes('hemat') || tema.includes('produktif')) {
    recommended = [
      'Kreativitas',
      'Kemandirian',
      'Kolaborasi',
      'Penalaran Kritis'
    ];
    alasan = `Kegiatan kewirausahaan murid SMA melatih Kreativitas penciptaan nilai produk bernilai ekonomis, Kemandirian dalam manajemen risiko dan keuangan, Kolaborasi dalam tim produksi dan pemasaran, serta Penalaran Kritis dalam menganalisis peluang pasar.`;
  } else if (tema.includes('kesehatan') || tema.includes('kebiasaan') || tema.includes('bugar')) {
    recommended = [
      'Kesehatan',
      'Kemandirian',
      'Keimanan dan Ketakwaan terhadap Tuhan Yang Maha Esa',
      'Kolaborasi'
    ];
    alasan = `Penguatan gaya hidup sehat dan kebiasaan baik murid SMA difokuskan pada dimensi Kesehatan fisik-mental, Kemandirian mengontrol rutinitas harian, serta Keimanan dan Ketakwaan sebagai wujud rasa syukur memelihara anugerah raga dan jiwa.`;
  } else if (tema.includes('budaya') || tema.includes('kearifan') || tema.includes('kebinekaan')) {
    recommended = [
      'Kewargaan',
      'Kreativitas',
      'Komunikasi',
      'Kolaborasi'
    ];
    alasan = `Eksplorasi budaya dan kearifan lokal memperkuat rasa Kewargaan yang bangga akan identitas bangsa, Kreativitas dalam merevitalisasi tradisi ke media modern, Komunikasi untuk menyuarakan narasi budaya, serta Kolaborasi dengan komunitas lokal.`;
  } else {
    recommended = [
      'Penalaran Kritis',
      'Kolaborasi',
      'Kreativitas',
      'Komunikasi'
    ];
    alasan = `Kombinasi empat dimensi inti (Penalaran Kritis, Kolaborasi, Kreativitas, dan Komunikasi) membentuk fondasi komprehensif bagi murid ${kelas} dalam merumuskan solusi nyata yang bermakna bagi tema ${formData.temaKegiatan || 'terpilih'}.`;
  }

  if (pendekatan.includes('stream')) {
    if (!recommended.includes('Keimanan dan Ketakwaan terhadap Tuhan Yang Maha Esa')) {
      recommended.unshift('Keimanan dan Ketakwaan terhadap Tuhan Yang Maha Esa');
      recommended = recommended.slice(0, 4);
    }
    alasan += ' Integrasi Religion pada pendekatan STREAM memperkuat akhlak mulia dan pertimbangan etis religius dalam pemanfaatan sains dan teknologi.';
  }

  return { dimensi: recommended, alasan };
}

export function generateModuleFromData(formData: ModuleFormData): KokurikulerModule {
  const kelas = formData.kelas || 'Kelas XII';
  const fase = kelas === 'Kelas X' ? 'Fase E' : 'Fase F';
  const tema = formData.temaKegiatan || 'Inovasi Teknologi Ramah Lingkungan';
  const pendekatan = formData.pendekatan || 'Project Based Learning (PjBL)';
  const totalJp = Number(formData.alokasiJp) || 36;
  const jpPerSesi = totalJp <= 24 ? 3 : totalJp <= 48 ? 3 : 4;
  const calculatedSessions = Math.max(6, Math.round(totalJp / jpPerSesi));

  // Determine focus dimensions
  let fokusDimensi = formData.dimensiTerpilih;
  if (!fokusDimensi || fokusDimensi.length === 0) {
    fokusDimensi = recommendDimensions(formData).dimensi;
  }

  // Dimension indicators
  const indikatorPerilaku = fokusDimensi.map(dimNama => {
    const matched = DELAPAN_DIMENSI_PROFIL_LULUSAN.find(d => d.nama === dimNama);
    const contoh = matched ? matched.contohIndikator : [];
    return {
      dimensi: dimNama,
      indikator: contoh[0] || `Menunjukkan pemahaman mendalam dan tindakan nyata terkait ${dimNama.toLowerCase()}`,
      buktiPerkembangan: contoh[1] || `Karya portofolio, jurnal proyek, dan perilaku kolaboratif murid selama kegiatan kokurikuler.`
    };
  });

  // Selected subjects
  const mapelList = formData.mataPelajaranTerpilih.length > 0
    ? formData.mataPelajaranTerpilih
    : ['Bahasa Indonesia', 'Informatika', 'Matematika', 'Biologi', 'Pendidikan Pancasila'];

  const mataPelajaranTerkait = mapelList.map(mapel => {
    return {
      nama: mapel,
      kontribusi: generateSubjectContribution(mapel, tema),
      kompetensi: generateSubjectCompetence(mapel, kelas)
    };
  });

  // STREAM details if selected
  let streamIntegration: StreamIntegration | undefined;
  if (pendekatan.toLowerCase().includes('stream')) {
    streamIntegration = {
      science: `Murid menyelidiki prinsip ilmiah di balik ${tema}, melakukan observasi empiris, dan menganalisis variabel penyebab serta dampak lingkungan/sosial.`,
      technology: `Murid memanfaatkan piranti digital, platform pengolahan data, simulasi virtual, serta AI secara etis untuk memvisualisasikan temuan dan merancang solusi.`,
      religion: `Murid merefleksikan nilai spiritual, tanggung jawab amanah menjaga ciptaan Tuhan, etika kejujuran akademik, serta kepedulian sosial tanpa pamrih.`,
      engineering: `Murid mempraktikkan proses rekayasa: merumuskan spesifikasi masalah, merancang prototipe, menguji kinerja, dan menyempurnakan solusi berulang (iterasi).`,
      arts: `Murid mendesain estetika visual karya, infografis komunikatif, kemasan ramah lingkungan, dan narasi presentasi persuasif yang memikat audiens.`,
      mathematics: `Murid menghitung kalkulasi proporsi, anggaran biaya, estimasi efisiensi, interpretasi grafik statistik, dan pengukuran dimensi produk secara presisi.`
    };
  } else if (pendekatan.toLowerCase().includes('steam')) {
    streamIntegration = {
      science: `Murid menginvestigasi konsep ilmiah dan pengamatan data faktual terkait ${tema}.`,
      technology: `Murid menggunakan aplikasi digital, platform komputasi, dan dokumentasi multimedia.`,
      religion: `Terintegrasi dalam nilai etika moral dan tanggung jawab keilmuan untuk kemaslahatan bersama.`,
      engineering: `Murid merancang diagram teknis alur kerja dan merekayasa prototipe fungsional.`,
      arts: `Murid menyusun tata letak visual, ilustrasi informatif, dan retorika presentasi kreatif.`,
      mathematics: `Murid menerapkan analisis kuantitatif, estimasi biaya, dan pemodelan data terukur.`
    };
  }

  // Generate continuous sessions
  const sesi = generateContinuousSessions(calculatedSessions, totalJp, tema, kelas, pendekatan, mapelList);

  // Generate learning goals
  const tujuanPembelajaran = [
    `Murid mampu menganalisis permasalahan riil di lingkungan sekitar terkait "${tema}" dengan menerapkan penalaran kritis dan bukti data yang sahih.`,
    `Murid mampu merancang dan mewujudkan prototipe/solusi karya nyata yang inovatif dan aplikatif melalui kerja sama kolaboratif antarmurid.`,
    `Murid mampu mengomunikasikan proses dan karya akhir kokurikuler secara runtut, etis, dan persuasif di hadapan warga sekolah dan mitra masyarakat.`,
    `Murid mampu merefleksikan proses belajar serta menginternalisasi dimensi karakter profil lulusan dalam pola pikir dan tindakan kehidupan sehari-hari.`
  ];

  const now = new Date();
  const dateStr = now.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });

  return {
    id: `modul-${Date.now()}`,
    createdAt: dateStr,
    updatedAt: dateStr,

    // A. Identitas Kegiatan
    identitas: {
      namaSatuanPendidikan: formData.namaSatuanPendidikan || 'SMA Negeri 3 Bombana',
      jenjang: 'SMA',
      kelas: kelas,
      fase: fase,
      tahunPelajaran: formData.tahunPelajaran || '2025/2026',
      semester: formData.semester || 'Ganjil',
      temaKegiatan: tema,
      bentukKokurikuler: formData.bentukKokurikuler || 'Pembelajaran kolaboratif lintas disiplin ilmu',
      alokasiWaktu: `${totalJp} JP (${calculatedSessions} Sesi x ${jpPerSesi} JP)`,
      totalJp: totalJp,
      jumlahSesi: calculatedSessions,
      lokasiKegiatan: formData.lokasi || 'Lingkungan Sekolah, Laboratorium, dan Komunitas Sekitar',
      koordinatorKokurikuler: formData.koordinator || 'St. Inaya Fahmi, S.Pd',
      nipKoordinator: formData.nipKoordinator || '19850421 200903 2 007',
      guruFasilitator1: formData.guruFasilitator1 || 'Hasmawati Harfin, S.Pd',
      nipGuruFasilitator1: formData.nipGuruFasilitator1 || '19890615 201504 2 003',
      guruFasilitator2: formData.guruFasilitator2 || 'Samsidar, S.Pd',
      nipGuruFasilitator2: formData.nipGuruFasilitator2 || '19880414 201402 2 004',
      guruFasilitator3: formData.guruFasilitator3 || '',
      nipGuruFasilitator3: formData.nipGuruFasilitator3 || '',
      guruFasilitator: [
        formData.guruFasilitator1 ? `1. ${formData.guruFasilitator1}` : '',
        formData.guruFasilitator2 ? `2. ${formData.guruFasilitator2}` : '',
        formData.guruFasilitator3 ? `3. ${formData.guruFasilitator3}` : ''
      ].filter(Boolean).join(' | ') || (formData.guruFasilitator || '1. Hasmawati Harfin, S.Pd | 2. Samsidar, S.Pd'),
      rombelGrup: formData.rombelGrup || 'F1 - F3',
      namaKepalaSekolah: formData.namaKepalaSekolah || 'Andi Dewi Kusumawati, S.Pd., M.Pd.',
      nipKepalaSekolah: formData.nipKepalaSekolah || '198001062006042028',
      tanggalPengesahan: formData.tanggalPengesahan || '14 Juli 2025',
      kertasCetak: formData.kertasCetak || 'F4',
      mataPelajaranTerkait: mataPelajaranTerkait
    },

    // B. Dimensi Profil Lulusan
    dimensi: {
      fokusDimensi: fokusDimensi,
      alasanPemilihan: recommendDimensions(formData).alasan,
      indikatorPerilaku: indikatorPerilaku,
      hubunganDenganProyek: `Dimensi profil lulusan yang dipilih tidak berdiri sendiri, melainkan diaktualisasikan secara bertahap pada setiap sesi: tahap Memahami melatih Penalaran Kritis, tahap Mengaplikasi mengasah Kreativitas dan Kolaborasi, serta tahap Merefleksi memupuk Kemandirian dan Komunikasi murid SMA.`
    },

    // C. Tujuan Pembelajaran
    tujuanPembelajaran: tujuanPembelajaran,

    // D. Praktik Pedagogis
    praktikPedagogis: {
      pendekatan: pendekatan,
      alasanPenggunaan: `Pendekatan ${pendekatan} menempatkan murid ${kelas} sebagai subjek aktif (student-centered). Pola pembelajaran mendalam (Mindful, Meaningful, Joyful) memastikan murid mengalami perenungan sadar makna atas proyek yang dikerjakan, menghubungkan teori kelas dengan realitas sosial, serta merasakan kegembiraan berkarya secara autentik.`,
      peranGuru: `Guru bertindak sebagai fasilitator, pemandu inkuiri (inquiry coach), mediator dinamika kelompok, serta penilai autentik yang memberi umpan balik berkelanjutan (formative feedback), bukan penceramah tunggal.`,
      peranMurid: `Murid berperan sebagai peneliti muda, perancang gagasan (co-creator), pengambil keputusan bersama dalam tim kerja, pengembang produk nyata, dan presenter karya yang bertanggung jawab.`,
      polaKerjaKelompok: `Kelompok dibentuk secara heterogen terdiri dari 4–5 murid per tim dengan pembagian peran terstruktur (Ketua Proyek, Periset/Dokumentasi, Perancang Teknis, Desainer/Komunikasi Kreatif, dan Pengelola Logistik/Waktu).`,
      strategiPendampingan: `Pendampingan bertingkat (scaffolding): pendampingan intensif pada sesi penentuan topik dan perumusan masalah, pendampingan konsultatif pada tahap eksekusi prototipe, serta pendampingan reflektif pada tahap evaluasi dan gelar karya.`,
      integrasiStream: streamIntegration
    },

    // E. Lingkungan Pembelajaran
    lingkungan: {
      tempat: formData.lingkungan && formData.lingkungan.length > 0 ? formData.lingkungan.join(', ') : 'Ruang Kelas Kolaboratif, Laboratorium Sains/Komputer, dan Lingkungan Sekolah',
      sumberBelajar: `Modul ajar digital, buku referensi perpustakaan, jurnal ilmiah remaja, narasumber ahli/praktisi lokal, platform simulasi, serta observasi data lingkungan riil.`,
      kondisiLingkungan: `Suasana belajar yang aman secara psikologis, mendorong murid berani mencoba gagasan baru tanpa takut salah, saling menghargai pendapat, dan bebas perundungan.`,
      keselamatanDanInklusi: `Pemberlakuan SOP keselamatan kerja (K3) saat eksplorasi lapangan/alat, penyediaan sarana yang ramah bagi seluruh murid tanpa diskriminasi, serta penghormatan atas keberagaman latar belakang murid.`
    },

    // F. Kemitraan Pembelajaran
    kemitraan: [
      {
        no: 1,
        mitra: 'Kepala Sekolah & Manajemen SMA',
        peran: 'Pengarah Kebijakan dan Penyedia Fasilitas',
        bentukKeterlibatan: 'Memberikan persetujuan program, fasilitasi anggaran sarana, dan membuka kegiatan pameran karya.',
        waktuKeterlibatan: 'Awal semester dan sesi pameran karya akhir'
      },
      {
        no: 2,
        mitra: 'Guru Mata Pelajaran Terintegrasi',
        peran: 'Konsultan Substansi Keilmuan',
        bentukKeterlibatan: 'Membimbing keterkaitan konsep materi pelajaran dengan proyek murid saat sesi konsultasi terarah.',
        waktuKeterlibatan: 'Sesi investigasi data dan rancang prototipe (Sesi 2 s.d. 8)'
      },
      {
        no: 3,
        mitra: 'Orang Tua / Wali Murid',
        peran: 'Pendukung Emosional dan Mitra Dialog Rumah',
        bentukKeterlibatan: 'Memberikan motivasi, mendampingi penyelesaian tugas mandiri di rumah, dan hadir sebagai audiens gelar karya.',
        waktuKeterlibatan: 'Sepanjang periode proyek dan sesi gelar pameran karya'
      },
      {
        no: 4,
        mitra: 'Praktisi Komunitas / Mitra Lingkungan Terkait',
        peran: 'Narasumber Ahli Kontekstual',
        bentukKeterlibatan: 'Memberikan wawasan aplikatif dunia nyata, memvalidasi ide solusi murid, dan menjadi penguji tamu.',
        waktuKeterlibatan: 'Sesi pengenalan wawasan dan sesi uji coba prototipe'
      }
    ],

    // G. Pemanfaatan Teknologi Digital
    teknologi: {
      perangkatDanAplikasi: [
        'Laptop / Gawai Pintar untuk penelusuran literatur dan penulisan laporan',
        'Google Workspace / Spreadsheet untuk tabulasi data dan pembagian tugas tim',
        'Canva / Figma untuk perancangan visual, poster promosi, dan materi presentasi',
        'Perangkat Lunak Analisis Data & Dokumentasi Multimedia (kamera gawai/video editor)',
        'Kecerdasan Artifisial (AI) sebagai mitra curah pendapat (brainstorming partner) dan pembuat draf ide'
      ],
      fungsiTeknologiPerTahap: `Tahap Memahami: pencarian referensi kredibel dan survei daring. Tahap Mengaplikasi: desain prototipe digital, simulasi, pengolahan angka, dan kolaborasi berkas bersama. Tahap Merefleksi: pembuatan video dokumentasi proses dan presentasi interaktif.`,
      etikaAIdanLiterasiDigital: `Menjunjung tinggi integritas akademik: AI hanya digunakan sebagai stimulan gagasan awal bukan pembuat karya instan; murid wajib mencantumkan atribusi sumber, memvalidasi fakta secara independen (fact-checking), serta menjaga privasi data pribadi.`
    },

    // H. Rangkaian Kegiatan
    rangkaianKegiatan: {
      petaPerkembanganProduk: `Peta Alur Produk Berkesinambungan:
[Sesi Awal: Analisis Masalah & Lembar Observasi Kritis] 
    ➔ [Sesi Riset: Matriks Data Faktual & Rumusan Hipotesis Solusi] 
    ➔ [Sesi Konsep: Sketsa / Cetak Biru (Blueprint) Prototipe Solusi] 
    ➔ [Sesi Fabrikasi: Prototipe Awal / Draf Karya Nyata] 
    ➔ [Sesi Uji Coba: Umpan Balik Rekan & Lembar Catatan Revisi] 
    ➔ [Sesi Penyempurnaan: Produk Final yang Layak dan Siap Dipamerkan] 
    ➔ [Sesi Akhir: Gelar Karya Komunikatif & Portofolio Dokumentasi Terbuka].`,
      sesi: sesi
    },

    // I. Asesmen
    asesmen: {
      formatif: {
        tujuan: 'Memantau perkembangan proses berpikir kritis, keaktifan kolaborasi, dan tanggung jawab murid di setiap tahapan proyek tanpa fokus tunggal pada angka akhir.',
        waktuPelaksanaan: 'Dilakukan berkelanjutan pada sesi 2, 5, 8, dan 10 selama proses pengerjaan karya.',
        teknikInstrumen: 'Observasi langsung fasilitator, catatan anekdotal, penilaian diri (self-assessment), dan penilaian antarteman (peer-review).',
        tabelPengamatan: [
          {
            no: 1,
            namaMurid: 'Ahmad Fauzan',
            dimensiDiamati: 'Penalaran Kritis & Kolaborasi',
            indikatorBukti: 'Mampu memverifikasi data rujukan dan membagi tugas tim secara adil.',
            catatanPerkembangan: 'Sangat aktif mengidentifikasi kelemahan data awal dan berinisiatif merumuskan alternatif metode survei.',
            umpanBalik: 'Pertahankan daya kritis dan tingkatkan pendampingan kepada rekan yang belum terbiasa dengan alat analisis.'
          },
          {
            no: 2,
            namaMurid: 'Dewi Lestari',
            dimensiDiamati: 'Kreativitas & Komunikasi',
            indikatorBukti: 'Menghasilkan desain infografis interaktif dan memaparkan alur kerja secara runtut.',
            catatanPerkembangan: 'Dapat mentransformasikan data teknis yang rumit menjadi sajian visual yang sangat mudah dicerna audiens umum.',
            umpanBalik: 'Pertahankan estetika visual dan pastikan sumber data ilmiah dicantumkan di sudut karya.'
          },
          {
            no: 3,
            namaMurid: 'Budi Santoso',
            dimensiDiamati: 'Kemandirian',
            indikatorBukti: 'Menyelesaikan log jurnal proyek tepat waktu dan mengelola jadwal kelompok.',
            catatanPerkembangan: 'Mulai menunjukkan inisiatif mandiri saat tim mengalami kendala teknis pembuatan prototipe.',
            umpanBalik: 'Lanjutkan kedisiplinan jadwal dan berani menyampaikan ide saat diskusi pleno kelompok.'
          }
        ]
      },
      sumatif: {
        teknik: 'Penilaian Kinerja Produk Akhir, Portofolio Dokumen Proyek, dan Presentasi Gelar Karya di hadapan Penguji/Fasilitator.',
        rubrikAnalitik: [
          {
            kriteria: 'Kedalaman Penalaran Kritis & Basis Bukti',
            dimensiTerkait: 'Penalaran Kritis',
            sangatBaik: 'Menganalisis masalah secara komprehensif, argumen didukung data faktual valid, serta mengidentifikasi kelemahan solusi secara jujur dan mendalam.',
            baik: 'Menganalisis masalah dengan baik, argumen didukung data relevan, dan mampu menjelaskan rasionalitas solusi yang dipilih.',
            cukup: 'Menjelaskan masalah dengan data terbatas, beberapa argumen masih berbasis opini tanpa rujukan kuat.',
            perluBimbingan: 'Belum mampu membedakan fakta dan opini, analisis masalah dangkal tanpa rujukan bukti yang dapat diverifikasi.'
          },
          {
            kriteria: 'Orisinalitas & Nilai Kemanfaatan Karya',
            dimensiTerkait: 'Kreativitas',
            sangatBaik: 'Produk/solusi sangat orisinal, memiliki kebaruan ide, estetis, fungsional, dan memberikan dampak nyata yang dapat diterapkan langsung.',
            baik: 'Produk/solusi memodifikasi ide yang ada secara kreatif, berfungsi dengan baik, dan relevan dengan konteks sekolah/masyarakat.',
            cukup: 'Produk/solusi merupakan replika karya umum dengan sedikit modifikasi, fungsi berjalan namun masih ada kekurangan teknis.',
            perluBimbingan: 'Produk belum selesai atau hanya menyalin karya pihak lain tanpa modifikasi bermakna dan fungsi belum teruji.'
          },
          {
            kriteria: 'Dinamika Kerja Sama & Tanggung Jawab Tim',
            dimensiTerkait: 'Kolaborasi & Kemandirian',
            sangatBaik: 'Semua anggota berkontribusi setara, saling mendukung, menyelesaikan konflik secara bijak, dan menunjukkan komitmen tinggi pada target.',
            baik: 'Kerja sama tim berjalan harmonis, pembagian tugas jelas, dan sebagian besar target terselesaikan tepat waktu.',
            cukup: 'Kerja sama terjadi tetapi masih didominasi oleh 1–2 murid, koordinasi tim kurang lancar pada beberapa bagian.',
            perluBimbingan: 'Kelompok pasif, terjadi konflik pembagian tugas yang belum terselesaikan, dan target proyek terlambat.'
          },
          {
            kriteria: 'Kualitas Artikulasi & Presentasi Publik',
            dimensiTerkait: 'Komunikasi',
            sangatBaik: 'Presentasi memukau, visualisasi data sangat komunikatif, menjawab pertanyaan audiens secara tangkas, santun, dan meyakinkan.',
            baik: 'Presentasi jelas dan terstruktur, media visual mendukung penjelasan, dan mampu merespons pertanyaan dengan baik.',
            cukup: 'Presentasi terdengar ragu, media visual minim informasi, respons terhadap pertanyaan audiens masih terbatas.',
            perluBimbingan: 'Presentasi tidak terstruktur, membaca teks penuh, tidak mampu menjelaskan substansi produk yang dibuat.'
          }
        ]
      }
    },

    // J. Hasil/Karya Murid
    karyaMurid: {
      produkUtama: `Prototipe / Karya Solutif Nyata "${tema}" yang dilengkapi dengan Laporan Riset Populer, Infografis Panduan Aksi, dan Media Digital Edukatif yang siap dimanfaatkan oleh warga sekolah dan masyarakat sekitar.`,
      buktiSementaraSesi: `Lembar Observasi Lapangan (Sesi 1), Matriks Tabulasi Masalah (Sesi 2), Cetak Biru / Sketsa Rancangan Solusi (Sesi 4), Prototipe Setengah Jadi (Sesi 6), Lembar Catatan Uji Coba & Revisi (Sesi 8).`,
      spesifikasiKriteria: `1) Memecahkan minimal 1 masalah konkret di lingkungan sekitar; 2) Menggunakan bahan/sumber daya yang mudah diakses dan ramah lingkungan; 3) Memiliki nilai estetika dan keamanan penggunaan; 4) Dilengkapi dokumentasi proses autentik.`,
      bentukPublikasi: `Pameran Gelar Karya Sekolah (Exhibition Day), Publikasi Media Digital Sekolah (Web/Media Sosial), dan Penyerahan Rekomendasi Aksi kepada Pihak Sekolah/Mitra Terkait.`,
      manfaatBagiSekolahMasyarakat: `Menyediakan solusi praktis terhadap isu lingkungan/sosial, mengedukasi warga sekolah, serta membangun portofolio keunggulan murid untuk persiapan jenjang perguruan tinggi dan dunia kerja.`,
      buktiProsesDisimpan: `Folder portofolio fisik/digital yang memuat: log harian kerja, foto/video perkembangan proyek, draf revisi karya, lembar refleksi diri, dan rekap penilaian rekan.`
    },

    // K. Refleksi Murid
    refleksiMurid: {
      pertanyaan: [
        'Apa hal paling berharga dan baru yang saya pelajari selama mengerjakan proyek kokurikuler ini?',
        'Pengalaman atau peristiwa apa yang paling bermakna dan menantang bagi saya pribadi?',
        'Apa kontribusi nyata yang telah saya berikan untuk keberhasilan tim kerja saya?',
        'Masalah atau kebuntuan apa yang berhasil kami pecahkan bersama rekan kelompok?',
        'Bagaimana karya kami berkembang dan bertransformasi dari sketsa awal hingga wujud akhir?',
        'Aspek apa dari diri saya atau karya tim yang masih perlu diperbaiki di masa mendatang?',
        'Langkah konkret apa yang akan saya terapkan dalam kehidupan sehari-hari setelah kegiatan ini selesai?'
      ],
      panduanPengerjaan: `Refleksi diisi secara jujur, mendalam, dan personal pada lembar refleksi mandiri di sesi akhir sebelum penilaian sumatif. Fasilitator membaca refleksi murid untuk memberikan catatan perkembangan bermakna.`
    },

    // L. Refleksi Guru
    refleksiGuru: {
      aspek: [
        {
          pertanyaan: 'Ketercapaian tujuan pembelajaran kokurikuler',
          panduanEvaluasi: 'Apakah sebagian besar murid berhasil menganalisis masalah dan menghasilkan karya nyata sesuai kriteria ketercapaian?'
        },
        {
          pertanyaan: 'Keterlibatan dan antusiasme murid',
          panduanEvaluasi: 'Apakah murid terlibat aktif, merasa memiliki proyek, dan menikmati proses pembelajaran mendalam (mindful, meaningful, joyful)?'
        },
        {
          pertanyaan: 'Perkembangan dimensi profil lulusan',
          panduanEvaluasi: 'Dimensi profil lulusan mana yang berkembang paling signifikan, dan dimensi mana yang masih memerlukan intervensi lanjutan?'
        },
        {
          pertanyaan: 'Kesinambungan proyek antarsesi',
          panduanEvaluasi: 'Apakah alur pengerjaan dari sesi ke sesi mengalir secara berkesinambungan tanpa ada sesi yang terputus atau mengulang materi sia-sia?'
        },
        {
          pertanyaan: 'Efektivitas pendekatan pedagogis',
          panduanEvaluasi: 'Apakah model pembelajaran (PjBL / STEAM / STREAM / Deep Learning) mampu merangsang daya inkuiri dan kreativitas murid SMA?'
        },
        {
          pertanyaan: 'Pemanfaatan lingkungan belajar dan kemitraan',
          panduanEvaluasi: 'Apakah sarana laboratorium, lingkungan sekolah, dan mitra eksternal berhasil dioptimalkan secara aman dan inklusif?'
        },
        {
          pertanyaan: 'Pemanfaatan teknologi digital dan etika AI',
          panduanEvaluasi: 'Apakah murid menggunakan gawai dan teknologi secara produktif, kritis terhadap disinformasi, serta menjunjung etika integritas?'
        },
        {
          pertanyaan: 'Kendala teknis dan manajerial yang dihadapi',
          panduanEvaluasi: 'Kendala apa yang muncul (manajemen waktu, bahan, dinamika kelompok) dan bagaimana strategi mitigasi yang dilakukan?'
        },
        {
          pertanyaan: 'Kualitas dan orisinalitas produk akhir',
          panduanEvaluasi: 'Apakah karya yang dihasilkan autentik dari proses berpikir murid sendiri dan memiliki kebermanfaatan nyata?'
        },
        {
          pertanyaan: 'Perbaikan untuk pelaksanaan kegiatan berikutnya',
          panduanEvaluasi: 'Rekomendasi apa yang perlu disiapkan bagi perbaikan desain modul, alokasi JP, dan rubrik asesmen pada semester depan?'
        }
      ]
    },

    // M. Pelaporan
    pelaporan: {
      formatRapor: `Format Rapor Kokurikuler SMA:
Kegiatan: [Nama Kegiatan / Tema Modul]
Deskripsi Capaian: Murid mampu [Kompetensi Teramati] melalui kegiatan [Proyek / Aksi Nyata] serta menunjukkan perkembangan istimewa pada dimensi [Dimensi Profil Lulusan Terkait].`,
      contohSangatBaik: `Kegiatan: ${tema} (Kokurikuler ${kelas} ${fase})
Deskripsi: Murid menunjukkan penalaran kritis yang sangat tajam dalam memvalidasi data faktual dan berinisiatif tinggi merancang prototipe inovatif. Sangat proaktif berkolaborasi memimpin kelompok, mengomunikasikan gagasan secara persuasif, serta konsisten menunjukkan kemandirian dan integritas akhlak mulia.`,
      contohBaik: `Kegiatan: ${tema} (Kokurikuler ${kelas} ${fase})
Deskripsi: Murid mampu menganalisis masalah lingkungan dengan baik dan berkontribusi aktif dalam penyusunan produk tim. Bekerja sama harmonis dengan rekan sejawat, menyelesaikan tugas mandiri tepat waktu, serta menunjukkan komunikasi yang santun dan terbuka saat presentasi karya.`,
      contohCukup: `Kegiatan: ${tema} (Kokurikuler ${kelas} ${fase})
Deskripsi: Murid mampu memahami pokok permasalahan dan berpartisipasi dalam pembuatan karya kelompok dengan bimbingan fasilitator. Menunjukkan sikap kerja sama dasar dan menyelesaikan tanggung jawab yang didelegasikan tim.`,
      contohPerluBimbingan: `Kegiatan: ${tema} (Kokurikuler ${kelas} ${fase})
Deskripsi: Murid memerlukan pendampingan berkelanjutan dalam memfokuskan perhatian pada proses inkuiri proyek, mengelola waktu penyelesaian tugas kelompok, dan membangun kepercayaan diri dalam mengemukakan pendapat di hadapan tim.`
    },

    // N. Evaluasi dan Tindak Lanjut
    evaluasiTindakLanjut: {
      evaluasiInput: 'Kesiapan sarana, keselarasan jadwal kalender akademik, dan pemahaman awal guru fasilitator telah memenuhi syarat, dengan catatan pasokan alat lab perlu dipastikan 1 minggu lebih awal.',
      evaluasiProses: 'Tingkat keterlaksanaan rangkaian sesi mencapai 95%, murid antusias dalam proses pembuatan prototipe, dinamika kelompok berjalan produktif dengan scaffolding terarah.',
      evaluasiOutput: 'Produk karya nyata berhasil diselesaikan oleh 100% kelompok murid, dipamerkan dalam gelar karya sekolah, dan mendapatkan apresiasi positif dari mitra dan orang tua murid.',
      statusTindakLanjut: 'Kegiatan dilanjutkan',
      rencanaTindakLanjut: `1. Mengembangkan produk unggulan murid menjadi program advokasi berkelanjutan di lingkungan sekolah;
2. Menjalin kemitraan lebih luas dengan perguruan tinggi/dinas terkait untuk pengujian standar karya;
3. Menyimpan karya terbaik sebagai portofolio inspiratif bagi adik kelas angkatan berikutnya;
4. Memberikan pendampingan pengayaan pada dimensi kemandirian dan komunikasi teknis.`
    },

    // O. Lampiran
    lampiran: {
      jadwalSesi: `Jadwal Pelaksanaan Sesi Kokurikuler:
Total Alokasi: ${totalJp} JP (${calculatedSessions} Sesi Terjadwal)
Pertemuan dilaksanakan secara terstruktur setiap pekan (@ ${jpPerSesi} JP) memadukan sesi kelas, laboratorium, dan observasi lapangan mandiri.`,
      pembagianPeranKelompok: `Matriks Peran Kelompok Murid (4–5 orang):
1. Koordinator Proyek: Bertanggung jawab atas keteraturan alur kerja, komunikasi tim, dan tenggat waktu.
2. Periset & Verifikator Data: Mengumpulkan data literatur, fakta lapangan, dan verifikasi keabsahan sumber.
3. Teknisi Prototipe: Memimpin perancangan mekanik, tata letak, dan pembuatan fisik/digital produk.
4. Desainer Komunikasi: Mengelola estetika karya, presentasi visual, infografis, dan materi publikasi.
5. Manajer Logistik & K3: Memastikan ketersediaan alat bahan dan standar keselamatan kerja tim.`,
      lembarObservasi: `Lembar Observasi Murid (Tahap Memahami):
- Fokus Masalah: Fenomena konkret yang diamati di lingkungan.
- Fakta Terukur: Angka, frekuensi kejadian, atau dampak visual.
- Narasumber Ditemui: Pihak terdampak atau saksi di lapangan.
- Pertanyaan Pemantik Utama: "Mengapa masalah ini terjadi dan bagaimana sains/teknologi dapat menyelesaikannya secara etis?"`,
      jurnalProyek: `Jurnal Perkembangan Proyek Mingguan:
- Tanggal & Sesi: [Sesi ...]
- Target Capaian Pekan Ini: [Sesuai Peta Produk]
- Aktivitas Nyata yang Dikerjakan: [...]
- Kendala yang Dihadapi & Solusi yang Diambil: [...]
- Validasi Fasilitator: [Paraf & Catatan Guru]`,
      lembarRefleksiMurid: `Lembar Refleksi Diri Murid (7 Pertanyaan Kunci):
Murid menuliskan respon naratif atas pertanyaan refleksi Bagian K secara personal sebelum sesi asesmen sumatif ditutup.`,
      rubrikAsesmen: `Panduan Penggunaan Rubrik Sumatif:
Fasilitator menggunakan rubrik analitik 4 tingkat (Sangat Baik: Skor 4, Baik: Skor 3, Cukup: Skor 2, Perlu Bimbingan: Skor 1) dengan mengacu pada deskriptor perilaku di Bagian I.`,
      lembarUmpanBalikTeman: `Lembar Umpan Balik Antarteman (Peer Review):
- Nama Murid Penilai: [...] | Nama Rekan Dinilai: [...]
- 2 Hal yang Sangat Baik dari Rekan: [...]
- 1 Saran Konstruktif untuk Pengembangan Rekan: [...]`,
      rekapAsesmen: `Format Rekap Nilai Akhir Kokurikuler:
Kolom: No | NISN | Nama Murid | Kelas | Skor Dimensi (1-8) | Capaian Kinerja Produk | Deskripsi Rapor Akhir.`
    }
  };
}

function generateContinuousSessions(
  numSessions: number,
  totalJp: number,
  tema: string,
  kelas: string,
  pendekatan: string,
  mapelList: string[]
): ProjectSession[] {
  const sessions: ProjectSession[] = [];
  const jpPerSession = Math.floor(totalJp / numSessions);
  const remainder = totalJp % numSessions;

  // Breakdown stages: Memahami (~30%), Mengaplikasi (~50%), Merefleksi (~20%)
  const understandCount = Math.max(2, Math.round(numSessions * 0.3));
  const reflectCount = Math.max(2, Math.round(numSessions * 0.2));
  const applyCount = numSessions - understandCount - reflectCount;

  let sessionIdx = 1;

  // 1. TAHAP MEMAHAMI
  for (let i = 0; i < understandCount; i++) {
    const jp = jpPerSession + (sessionIdx <= remainder ? 1 : 0);
    const isFirst = i === 0;
    const isLastUnderstand = i === understandCount - 1;

    sessions.push({
      nomorSesi: sessionIdx,
      namaSesi: isFirst 
        ? `Sesi ${sessionIdx}: Orientasi Tema, Pemantik Kritis, dan Pembentukan Tim`
        : `Sesi ${sessionIdx}: Investigasi Lapangan, Pengumpulan Data, dan Pemetaan Masalah`,
      alokasiJp: jp,
      tahapPengalaman: 'Memahami',
      tujuanSesi: isFirst
        ? `Murid memahami latar belakang konteks "${tema}", menyepakati komitmen bersama tim proyek, dan merumuskan pertanyaan pemantik inkuiri.`
        : `Murid mengumpulkan data empiris lapangan dan telaah literatur ilmiah untuk memvalidasi akar persoalan secara objektif.`,
      aktivitasGuru: isFirst
        ? `Guru memutarkan video/studi kasus kontekstual murid SMA, memfasilitasi diskusi pemantik curah pendapat, dan memandu pembentukan kelompok kerja heterogen.`
        : `Guru mendampingi teknik penyusunan instrumen observasi, memastikan etika wawancara narasumber, dan memvalidasi metode pengumpulan data tim.`,
      aktivitasMurid: isFirst
        ? `Murid menyimak studi kasus, mengajukan pertanyaan kritis tentang realitas di sekolah/masyarakat, membentuk tim, dan menyepakati pembagian peran internal.`
        : `Murid melakukan survei lapangan, mencatat data faktual, mewawancarai narasumber terkait, dan mentabulasi temuan ke dalam lembar kerja digital.`,
      integrasiMapelAtauStream: `Terintegrasi dengan ${mapelList[0] || 'Bahasa Indonesia'} (literasi dan teknik wawancara) & ${mapelList[1] || 'Informatika'} (pencarian data digital).`,
      alatDanBahan: `Gawai/laptop, lembar panduan observasi, modul pengantar tema, proyektor, dan papan kerja kolaboratif.`,
      hasilSementara: isFirst
        ? `Daftar rumusan pertanyaan pemantik dan struktur pembagian peran kelompok yang disepakati.`
        : `Matriks tabulasi data hasil observasi lapangan dan identifikasi akar masalah (root-cause analysis).`,
      hubunganDenganSesiBerikutnya: isFirst
        ? `Pertanyaan pemantik sesi ini menjadi panduan menyusun instrumen pengumpulan data pada Sesi ${sessionIdx + 1}.`
        : `Data hasil observasi sesi ini akan dianalisis untuk menentukan konsep solusi prototipe pada Sesi ${sessionIdx + 1}.`,
      buktiPerkembangan: isFirst
        ? `Lembar kesepakatan tim proyek dan daftar rumusan masalah awal.`
        : `Laporan ringkas observasi lapangan dan transkrip data wawancara.`
    });
    sessionIdx++;
  }

  // 2. TAHAP MENGAPLIKASI
  for (let i = 0; i < applyCount; i++) {
    const jp = jpPerSession + (sessionIdx <= remainder ? 1 : 0);
    const stepInApply = i + 1;

    let sessionName = '';
    let sessionGoal = '';
    let teacherAct = '';
    let studentAct = '';
    let interimResult = '';
    let linkNext = '';
    let evidence = '';

    if (stepInApply === 1) {
      sessionName = `Sesi ${sessionIdx}: Perumusan Konsep Solusi dan Cetak Biru (Blueprint) Desain`;
      sessionGoal = `Murid mampu merumuskan alternatif solusi berbasis data dan menyusun cetak biru teknis prototipe karya.`;
      teacherAct = `Guru memberikan umpan balik atas kelayakan teknis ide murid, membantu pertimbangan keselamatan, dan efisiensi sumber daya.`;
      studentAct = `Murid mendiskusikan alternatif ide, memilih ide solusi terbaik berdasarkan matriks prioritas, dan menggambar sketsa/diagram alur kerja produk.`;
      interimResult = `Dokumen cetak biru (blueprint) desain prototipe lengkap dengan daftar estimasi bahan dan rincian ukuran.`;
      linkNext = `Cetak biru yang disahkan sesi ini menjadi panduan utama pelaksanaan fabrikasi prototipe pada Sesi ${sessionIdx + 1}.`;
      evidence = `Lembar sketsa teknis berdimensi dan matriks pemilihan solusi tim.`;
    } else if (stepInApply === 2) {
      sessionName = `Sesi ${sessionIdx}: Fabrikasi Prototipe Awal dan Eksekusi Rancangan`;
      sessionGoal = `Murid mempraktikkan proses perakitan/pembuatan prototipe awal secara kolaboratif sesuai spesifikasi cetak biru.`;
      teacherAct = `Guru memantau kedisiplinan K3 saat kerja mandiri, mengarahkan pembagian beban kerja antaranggota tim, dan memfasilitasi kebutuhan alat.`;
      studentAct = `Murid bekerja sama merangkai bahan, menguji coba modul fungsional awal, mencatat tantangan perakitan, dan merekam dokumentasi proses.`;
      interimResult = `Prototipe awal (versi 1.0) atau draf karya nyata yang sudah dapat dioperasikan secara fungsional.`;
      linkNext = `Prototipe versi awal ini akan diuji coba secara sistematis pada Sesi ${sessionIdx + 1}.`;
      evidence = `Foto/video dokumentasi perakitan dan catatan teknis pengerjaan di jurnal proyek.`;
    } else if (stepInApply === 3) {
      sessionName = `Sesi ${sessionIdx}: Uji Coba Kinerja, Pengujian Pengguna (User Testing), dan Pencatatan Evaluasi`;
      sessionGoal = `Murid menguji efektivitas dan kinerja prototipe di lingkungan nyata serta mengumpulkan umpan balik dari pengguna sasaran.`;
      teacherAct = `Guru memfasilitasi lembar instrumen uji coba, mendampingi proses pengetesan, dan memandu analisis data kegagalan teknis.`;
      studentAct = `Murid menjalankan prosedur pengujian, mengukur indikator keberhasilan produk, mewawancarai calon pengguna, dan merangkum evaluasi kekurangan.`;
      interimResult = `Data kuantitatif/kualitatif hasil pengujian dan daftar catatan perbaikan spesifik produk.`;
      linkNext = `Catatan perbaikan sesi ini menjadi dasar wajib untuk melakukan modifikasi dan penyempurnaan pada Sesi ${sessionIdx + 1}.`;
      evidence = `Lembar rekaman data uji coba kinerja dan formulir masukan calon pengguna.`;
    } else {
      sessionName = `Sesi ${sessionIdx}: Iterasi, Perbaikan Desain, dan Finalisasi Produk Karya Nyata`;
      sessionGoal = `Murid menyempurnakan prototipe karya berdasarkan umpan balik pengujian hingga mencapai standar kelayakan pameran.`;
      teacherAct = `Guru memverifikasi perbaikan yang telah dilakukan tim dan menilai kesiapan akhir produk menyambut pameran publik.`;
      studentAct = `Murid memodifikasi bagian yang kurang optimal, menyempurnakan aspek estetika dan ketahanan, serta merapikan kemasan/media pendukung.`;
      interimResult = `Produk akhir yang tuntas, berfungsi stabil, estetis, dan memenuhi seluruh kriteria keberhasilan proyek.`;
      linkNext = `Produk final ini siap ditampilkan dan dipresentasikan di hadapan publik pada Sesi ${sessionIdx + 1}.`;
      evidence = `Wujud fisik/digital produk final dan dokumen spesifikasi akhir karya.`;
    }

    sessions.push({
      nomorSesi: sessionIdx,
      namaSesi: sessionName,
      alokasiJp: jp,
      tahapPengalaman: 'Mengaplikasi',
      tujuanSesi: sessionGoal,
      aktivitasGuru: teacherAct,
      aktivitasMurid: studentAct,
      integrasiMapelAtauStream: `Terintegrasi dengan ${mapelList[2] || 'Matematika'} (kalkulasi teknis & anggaran), ${mapelList[3] || 'Fisika/Biologi'} (prinsip keilmuan), dan ${mapelList[4] || 'Prakarya'} (rekayasa).`,
      alatDanBahan: `Peralatan perakitan prototipe, bahan ramah lingkungan, alat ukur presisi, gawai dokumentasi, dan lembar catatan uji coba.`,
      hasilSementara: interimResult,
      hubunganDenganSesiBerikutnya: linkNext,
      buktiPerkembangan: evidence
    });
    sessionIdx++;
  }

  // 3. TAHAP MEREFLEKSI
  for (let i = 0; i < reflectCount; i++) {
    const jp = jpPerSession + (sessionIdx <= remainder ? 1 : 0);
    const isPenultimate = i === reflectCount - 2 || reflectCount === 2 && i === 0;

    let sessionName = '';
    let sessionGoal = '';
    let teacherAct = '';
    let studentAct = '';
    let interimResult = '';
    let linkNext = '';
    let evidence = '';

    if (isPenultimate) {
      sessionName = `Sesi ${sessionIdx}: Gelar Karya (Exhibition Day), Presentasi Publik, dan Asesmen Sumatif`;
      sessionGoal = `Murid mengomunikasikan proses dan karya nyata di hadapan audiens warga sekolah serta menerima asesmen sumatif dari fasilitator.`;
      teacherAct = `Guru membuka sesi pameran karya, mengoordinasikan alur kunjungan audiens, dan melakukan penilaian sumatif berbasis rubrik analitik.`;
      studentAct = `Murid menata gerai pameran, menyajikan demonstrasi produk, memaparkan laporan riset secara runtut, dan menjawab tanggapan audiens dengan percaya diri.`;
      interimResult = `Pelaksanaan presentasi gelar karya yang sukses dan kumpulan lembar apresiasi/umpan balik audiens.`;
      linkNext = `Hasil gelar karya dan umpan balik yang dihimpun sesi ini menjadi bahan renungan mendalam pada Sesi ${sessionIdx + 1}.`;
      evidence = `Lembar penilaian rubrik sumatif dari guru penguji dan foto dokumentasi presentasi publik.`;
    } else {
      sessionName = `Sesi ${sessionIdx}: Refleksi Mendalam Murid & Guru, Rekapitulasi Rapor, dan Rencana Tindak Lanjut`;
      sessionGoal = `Murid dan guru melakukan evaluasi menyeluruh atas proses belajar, mengisi lembar refleksi 7 pertanyaan, serta menyusun komitmen aksi lanjutan.`;
      teacherAct = `Guru memfasilitasi lingkaran refleksi bermakna (meaningful circle), mengapresiasi pertumbuhan karakter murid, dan merumuskan deskripsi rapor kokurikuler.`;
      studentAct = `Murid menuliskan refleksi jujur atas 7 pertanyaan kunci, memberikan umpan balik apresiatif antarteman, dan menandatangani komitmen aksi nyata di kehidupan sehari-hari.`;
      interimResult = `Dokumen portofolio utuh modul kokurikuler dan draf narasi deskripsi capaian rapor masing-masing murid.`;
      linkNext = `Dokumen akhir ini diarsipkan ke dalam rekam jejak portofolio sekolah dan menjadi panduan tindak lanjut program kokurikuler berikutnya.`;
      evidence = `Lembar refleksi pribadi murid yang terisi lengkap, draf rapor kokurikuler, dan lembar rencana tindak lanjut.`;
    }

    sessions.push({
      nomorSesi: sessionIdx,
      namaSesi: sessionName,
      alokasiJp: jp,
      tahapPengalaman: 'Merefleksi',
      tujuanSesi: sessionGoal,
      aktivitasGuru: teacherAct,
      aktivitasMurid: studentAct,
      integrasiMapelAtauStream: `Terintegrasi dengan ${mapelList[0] || 'Bahasa Indonesia'} (retorika presentasi publik) & ${mapelList[1] || 'Pendidikan Pancasila'} (refleksi etika kemasyarakatan).`,
      alatDanBahan: `Stan pameran, media poster/video presentasi, lembar rubrik penilaian sumatif, dan lembar refleksi murid.`,
      hasilSementara: interimResult,
      hubunganDenganSesiBerikutnya: linkNext,
      buktiPerkembangan: evidence
    });
    sessionIdx++;
  }

  return sessions;
}

function generateSubjectContribution(subject: string, tema: string): string {
  switch (subject) {
    case 'Bahasa Indonesia':
      return `Membimbing teknik penyusunan proposal proyek, penulisan laporan riset populer dengan bahasa baku dan komunikatif, serta retorika presentasi gelar karya.`;
    case 'Bahasa Inggris':
      return `Menelaah literatur internasional dan artikel ilmiah global terkait ${tema}, serta menyusun abstrak dwibahasa untuk publikasi karya.`;
    case 'Matematika':
      return `Menerapkan pemodelan matematika, estimasi rancangan anggaran biaya (RAB), kalkulasi proporsi bahan prototipe, serta visualisasi grafik statistik terukur.`;
    case 'Informatika':
      return `Mengelola platform kolaborasi digital, perancangan algoritma pemecahan masalah, penelusuran fakta daring, dan perancangan materi visual/infografis interaktif.`;
    case 'Fisika':
      return `Menganalisis prinsip mekanika, konversi energi, efisiensi termal, dan ketahanan material yang diterapkan pada prototipe solusi.`;
    case 'Kimia':
      return `Meneliti sifat kimiawi bahan baku, reaksi penguraian ramah lingkungan, uji keasaman/toksisitas, dan keselamatan pengelolaan zat di laboratorium.`;
    case 'Biologi':
      return `Mengamati keterkaitan ekologis organisme, analisis dampak terhadap keanekaragaman hayati lokal, dan pemanfaatan bahan hayati terbarukan.`;
    case 'Ekonomi':
      return `Menghitung kelayakan ekonomi, efisiensi modal, analisis pasar sasaran, dan potensi keberlanjutan produk jika diproduksi secara mandiri.`;
    case 'Sosiologi':
      return `Menganalisis dampak sosial kegiatan terhadap komunitas lokal, pola adaptasi kebiasaan masyarakat, dan metode wawancara sosial inklusif.`;
    case 'Geografi':
      return `Memetakan lokasi sebaran masalah, analisis spasial lingkungan sekitar sekolah, dan mitigasi risiko kerentanan wilayah.`;
    case 'Sejarah':
      return `Menggali nilai kearifan masa lalu dan tradisi lokal dalam mengatasi masalah lingkungan sebagai inspirasi karya modern.`;
    case 'Pendidikan Pancasila':
      return `Menanamkan kesadaran hak dan kewajiban warga negara, etika musyawarah dalam tim, dan penegakan keadilan sosial bagi seluruh masyarakat.`;
    case 'Pendidikan Agama dan Budi Pekerti':
      return `Menguatkan landasan spiritual bahwa menjaga kemaslahatan sesama dan kelestarian alam merupakan wujud ibadah dan integritas takwa kepada Tuhan.`;
    case 'Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)':
      return `Menjaga kebugaran fisik selama pengerjaan proyek lapangan, penerapan ergonomi kerja, dan pembiasaan gaya hidup sehat aktif.`;
    case 'Seni dan Budaya':
      return `Merancang estetika visual produk, tata letak poster pameran, harmonisasi warna, dan pengalaman artistik bagi pengunjung pameran.`;
    case 'Prakarya dan Kewirausahaan':
      return `Menguasai teknik rekayasa pertukangan/kerajinan, pembuatan purwarupa fungsional, dan pengemasan produk bernilai jual.`;
    default:
      return `Memperkuat fondasi konsep keilmuan yang relevan dengan tema "${tema}" dan mendampingi murid dalam penyelidikan kontekstual.`;
  }
}

function generateSubjectCompetence(subject: string, kelas: string): string {
  return `Kompetensi murid ${kelas} dalam ranah berpikir analitis, pemecahan masalah praktis, serta keterampilan aplikatif sesuai Capaian Pembelajaran (CP) yang berlaku.`;
}
