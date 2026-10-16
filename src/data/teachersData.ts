/**
 * Data Resmi Guru & Tim Fasilitator Kokurikuler SMA Negeri 3 Bombana
 * Berdasarkan SK Pembagian Tugas Kokurikuler Tahun Pelajaran 2025/2026
 */

export interface TeacherGroup {
  rombel: string;
  guru: string[];
}

export interface ClassTeacherGroups {
  'Kelas X': TeacherGroup[];
  'Kelas XI': TeacherGroup[];
  'Kelas XII': TeacherGroup[];
}

export const GURU_KOKURIKULER_SMAN3_BOMBANA: ClassTeacherGroups = {
  'Kelas X': [
    {
      rombel: 'E1 - E3',
      guru: [
        'Wahyuni Pua Aru, S.Pd., M.Pd',
        'Asis Lawa, S.Pd., M.Geo',
        'Siska Damayanti S, S.Pd., M.Pd',
        'Muhammad Ikbal, S.Pd'
      ]
    },
    {
      rombel: 'E4 - E6',
      guru: [
        'Jumriani Hatta, S.Pd',
        'Dahlia Tangka, S.Pd',
        'Sumarni, S.Pd, M.Pd',
        'ST. Hardinati, S.Pd'
      ]
    },
    {
      rombel: 'E7 - E9',
      guru: [
        'Eminarti, S.Pd',
        'Rahayana Djaila, ST.M.Si',
        'Feri Angriawan, S.Pd., M.Hum'
      ]
    },
    {
      rombel: 'E10',
      guru: [
        'Darmawati, S.Pd',
        'Ira Riswana, S.Pd'
      ]
    }
  ],
  'Kelas XI': [
    {
      rombel: 'F1 - F3',
      guru: [
        'Muhibudin, S.Pd., M.Geo',
        'Yahya, S.Pd',
        'Erjiansyah, S.Pd'
      ]
    },
    {
      rombel: 'F4 - F6',
      guru: [
        'Karaeng Nur Riskillah, S.Pd',
        'Rukmana Panaungi, S.Pd',
        'TRI FAISAL F.A., S.PD'
      ]
    },
    {
      rombel: 'F7 - F9',
      guru: [
        'Nola Okta Vilia. N, S.Pd',
        'fitrawan, S.Pd',
        'IKMAL, S.Pd'
      ]
    },
    {
      rombel: 'F10',
      guru: [
        'Suci Rega Yasa, S.Pd',
        'Ihdina Fauzia Rahmi, S.Pd'
      ]
    }
  ],
  'Kelas XII': [
    {
      rombel: 'F1 - F3',
      guru: [
        'St. Inaya Fahmi, S.Pd',
        'Hasmawati Harfin, S.Pd',
        'Samsidar, S.Pd'
      ]
    },
    {
      rombel: 'F4 - F6',
      guru: [
        'Lisdayanti, S.Pd',
        'Hawa Safitri, S.Pd',
        'Yessi Paska Lina, S.Pd'
      ]
    },
    {
      rombel: 'F7 - F9',
      guru: [
        'Nana Mardiana, S.Pd',
        'Andi Hamriana Rapik, S.Pd., M.Pd',
        'Drs. Arfani, M.MPd'
      ]
    }
  ]
};

// Daftar unik seluruh guru untuk auto-suggest / picker
export const DAFTAR_SEMUA_GURU_SMAN3_BOMBANA: string[] = Array.from(
  new Set([
    ...GURU_KOKURIKULER_SMAN3_BOMBANA['Kelas X'].flatMap(g => g.guru),
    ...GURU_KOKURIKULER_SMAN3_BOMBANA['Kelas XI'].flatMap(g => g.guru),
    ...GURU_KOKURIKULER_SMAN3_BOMBANA['Kelas XII'].flatMap(g => g.guru),
  ])
).sort((a, b) => a.localeCompare(b));

export const KEPALA_SEKOLAH_DEFAULT = {
  nama: 'Andi Dewi Kusumawati, S.Pd., M.Pd.',
  nip: '198001062006042028',
  jabatan: 'Kepala SMA Negeri 3 Bombana'
};

// Database NIP guru SMAN 3 Bombana untuk auto-fill
export const NIP_GURU_SMAN3_BOMBANA: Record<string, string> = {
  'Andi Dewi Kusumawati, S.Pd., M.Pd.': '198001062006042028',
  'Drs. Arfani, M.MPd': '19680512 199412 1 002',
  'St. Inaya Fahmi, S.Pd': '19850421 200903 2 007',
  'Hasmawati Harfin, S.Pd': '19890615 201504 2 003',
  'Samsidar, S.Pd': '19880414 201402 2 004',
  'Wahyuni Pua Aru, S.Pd., M.Pd': '19790408 200502 2 004',
  'Asis Lawa, S.Pd., M.Geo': '19810612 200801 1 009',
  'Siska Damayanti S, S.Pd., M.Pd': '19870321 201101 2 012',
  'Muhammad Ikbal, S.Pd': '19900815 201903 1 007',
  'Jumriani Hatta, S.Pd': '19860712 201101 2 015',
  'Dahlia Tangka, S.Pd': '19840310 200902 2 005',
  'Sumarni, S.Pd, M.Pd': '19830918 200804 2 007',
  'ST. Hardinati, S.Pd': '19870524 201403 2 002',
  'Eminarti, S.Pd': '19840215 200903 2 008',
  'Rahayana Djaila, ST.M.Si': '19800822 200604 2 011',
  'Feri Angriawan, S.Pd., M.Hum': '19891114 201504 1 002',
  'Darmawati, S.Pd': '19810920 200804 2 005',
  'Ira Riswana, S.Pd': '19910408 201903 2 014',
  'Muhibudin, S.Pd., M.Geo': '19750814 200604 1 008',
  'Yahya, S.Pd': '19820510 200902 1 004',
  'Erjiansyah, S.Pd': '19880922 201503 1 002',
  'Karaeng Nur Riskillah, S.Pd': '19871103 201403 2 002',
  'Rukmana Panaungi, S.Pd': '19890615 201704 2 003',
  'TRI FAISAL F.A., S.PD': '19910214 201903 1 009',
  'Nola Okta Vilia. N, S.Pd': '19901025 201704 2 003',
  'fitrawan, S.Pd': '19920311 202012 1 006',
  'IKMAL, S.Pd': '19881205 201403 1 003',
  'Suci Rega Yasa, S.Pd': '19920819 201903 2 010',
  'Ihdina Fauzia Rahmi, S.Pd': '19930514 202012 2 011',
  'Lisdayanti, S.Pd': '19820311 200903 2 006',
  'Hawa Safitri, S.Pd': '19930718 202012 2 018',
  'Yessi Paska Lina, S.Pd': '19910328 201903 2 009',
  'Nana Mardiana, S.Pd': '19830510 201001 2 021',
  'Andi Hamriana Rapik, S.Pd., M.Pd': '19860412 201001 2 028',
};

export function getNipForTeacher(namaGuru: string): string {
  if (!namaGuru) return '';
  const trimmed = namaGuru.trim();
  if (NIP_GURU_SMAN3_BOMBANA[trimmed]) {
    return NIP_GURU_SMAN3_BOMBANA[trimmed];
  }
  // Case-insensitive or partial match
  const foundKey = Object.keys(NIP_GURU_SMAN3_BOMBANA).find(
    k => k.toLowerCase() === trimmed.toLowerCase()
  );
  if (foundKey) {
    return NIP_GURU_SMAN3_BOMBANA[foundKey];
  }
  return '-';
}
