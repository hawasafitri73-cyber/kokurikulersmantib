/**
 * Ekspor Dokumen Modul Kokurikuler SMA
 * Mendukung format Microsoft Word (.doc / .docx kompatibel), Cetak / PDF, dan Teks Lengkap
 */

import { KokurikulerModule } from '../types/module';

export function exportToWord(module: KokurikulerModule): void {
  const contentHtml = generateDocumentHtml(module);
  
  const paperSize = module.identitas.kertasCetak || 'F4';
  const header = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' 
          xmlns:w='urn:schemas-microsoft-com:office:word' 
          xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>${module.identitas.temaKegiatan} - Modul Kokurikuler SMA</title>
      <style>
        @page Section1 {
          size: ${paperSize === 'A4' ? '210mm 297mm' : '215mm 330mm'};
          margin: 2cm 2cm 2cm 2cm;
          mso-header-margin: 36pt;
          mso-footer-margin: 36pt;
          mso-paper-source: 0;
        }
        div.Section1 { page: Section1; }
        body { font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.5; color: #000; }
        h1 { font-size: 16pt; font-weight: bold; text-align: center; color: #24345B; margin-bottom: 4pt; }
        h2 { font-size: 13pt; font-weight: bold; color: #24345B; border-bottom: 2pt solid #4169E1; padding-bottom: 3pt; margin-top: 16pt; }
        h3 { font-size: 12pt; font-weight: bold; color: #24345B; margin-top: 10pt; }
        table { width: 100%; border-collapse: collapse; margin-top: 8pt; margin-bottom: 12pt; }
        th { background-color: #F4F6FA; border: 1pt solid #24345B; padding: 6pt; text-align: left; font-size: 10pt; font-weight: bold; color: #24345B; }
        td { border: 1pt solid #24345B; padding: 6pt; font-size: 10pt; vertical-align: top; }
        .meta-box { border: 1pt solid #A7D8F0; background-color: #F4F6FA; padding: 10pt; margin-bottom: 15pt; }
        .badge { background-color: #FCE4EC; color: #24345B; padding: 2pt 6pt; font-weight: bold; font-size: 9pt; }
        .footer { font-size: 9pt; text-align: center; color: #666; margin-top: 30pt; }
      </style>
    </head>
    <body>
      <div class="Section1">
  `;
  const footer = `
        <div class="footer">
          <p>Dokumen Resmi Modul Kokurikuler SMA &mdash; Berdasarkan Panduan Kokurikuler 2025 &amp; 8 Dimensi Profil Lulusan &bull; Ukuran Kertas: ${paperSize === 'A4' ? 'A4 (210 x 297 mm)' : 'F4 / Folio (215 x 330 mm)'}</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const fullHtml = header + contentHtml + footer;
  const blob = new Blob(['\ufeff', fullHtml], {
    type: 'application/msword'
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const sanitizedTitle = module.identitas.temaKegiatan.replace(/[^a-zA-Z0-9]/g, '_');
  a.download = `MODUL_KOKURIKULER_${module.identitas.kelas.replace(' ', '_')}_${sanitizedTitle}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function printModule(paperSize: 'F4' | 'A4' = 'F4'): void {
  let styleEl = document.getElementById('print-page-style') as HTMLStyleElement | null;
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = 'print-page-style';
    document.head.appendChild(styleEl);
  }

  if (paperSize === 'F4') {
    styleEl.textContent = `
      @media print {
        @page {
          size: 215mm 330mm !important;
          margin: 1.5cm 1.5cm 1.5cm 1.5cm !important;
        }
      }
    `;
  } else {
    styleEl.textContent = `
      @media print {
        @page {
          size: A4 portrait !important;
          margin: 1.5cm 1.5cm 1.5cm 1.5cm !important;
        }
      }
    `;
  }

  window.print();
}

export function exportToJson(module: KokurikulerModule): void {
  const jsonStr = JSON.stringify(module, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const sanitizedTitle = module.identitas.temaKegiatan.replace(/[^a-zA-Z0-9]/g, '_');
  a.download = `MODUL_DATA_${sanitizedTitle}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function copyModuleToClipboard(module: KokurikulerModule): Promise<void> {
  const text = generatePlainText(module);
  return navigator.clipboard.writeText(text);
}

function generateDocumentHtml(module: KokurikulerModule): string {
  const { identitas, dimensi, tujuanPembelajaran, praktikPedagogis, lingkungan, kemitraan, teknologi, rangkaianKegiatan, asesmen, karyaMurid, refleksiMurid, refleksiGuru, pelaporan, evaluasiTindakLanjut, lampiran } = module;

  let streamHtml = '';
  if (praktikPedagogis.integrasiStream) {
    const s = praktikPedagogis.integrasiStream;
    streamHtml = `
      <h3>Integrasi Unsur STREAM (Science, Technology, Religion, Engineering, Arts, Mathematics)</h3>
      <table>
        <tr><th style="width: 25%;">Unsur STREAM</th><th>Aktivitas Nyata dalam Proyek</th></tr>
        <tr><td><strong>Science (Sains)</strong></td><td>${s.science}</td></tr>
        <tr><td><strong>Technology (Teknologi)</strong></td><td>${s.technology}</td></tr>
        <tr><td><strong>Religion (Religi & Etika)</strong></td><td>${s.religion}</td></tr>
        <tr><td><strong>Engineering (Rekayasa)</strong></td><td>${s.engineering}</td></tr>
        <tr><td><strong>Arts (Seni & Estetika)</strong></td><td>${s.arts}</td></tr>
        <tr><td><strong>Mathematics (Matematika)</strong></td><td>${s.mathematics}</td></tr>
      </table>
    `;
  }

  const mapelRows = identitas.mataPelajaranTerkait.map((m, idx) => `
    <tr>
      <td style="width: 5%; text-align: center;">${idx + 1}</td>
      <td style="width: 30%;"><strong>${m.nama}</strong></td>
      <td style="width: 35%;">${m.kontribusi}</td>
      <td style="width: 30%;">${m.kompetensi}</td>
    </tr>
  `).join('');

  const dimensiRows = dimensi.indikatorPerilaku.map((d, idx) => `
    <tr>
      <td style="width: 5%; text-align: center;">${idx + 1}</td>
      <td style="width: 30%;"><strong>${d.dimensi}</strong></td>
      <td style="width: 35%;">${d.indikator}</td>
      <td style="width: 30%;">${d.buktiPerkembangan}</td>
    </tr>
  `).join('');

  const kemitraanRows = kemitraan.map(k => `
    <tr>
      <td style="width: 5%; text-align: center;">${k.no}</td>
      <td style="width: 25%;"><strong>${k.mitra}</strong></td>
      <td style="width: 25%;">${k.peran}</td>
      <td style="width: 30%;">${k.bentukKeterlibatan}</td>
      <td style="width: 15%;">${k.waktuKeterlibatan}</td>
    </tr>
  `).join('');

  const sessionsHtml = rangkaianKegiatan.sesi.map(s => `
    <div style="border: 1pt solid #A7D8F0; padding: 10pt; margin-bottom: 12pt; background-color: #FAFCFE;">
      <h3 style="margin-top: 0; color: #4169E1;">${s.namaSesi} (${s.alokasiJp} JP &mdash; Tahap: ${s.tahapPengalaman})</h3>
      <p><strong>Tujuan Sesi:</strong> ${s.tujuanSesi}</p>
      <p><strong>Aktivitas Fasilitator/Guru:</strong> ${s.aktivitasGuru}</p>
      <p><strong>Aktivitas Murid:</strong> ${s.aktivitasMurid}</p>
      <p><strong>Integrasi Mapel / STREAM:</strong> ${s.integrasiMapelAtauStream}</p>
      <p><strong>Alat dan Bahan:</strong> ${s.alatDanBahan}</p>
      <table style="margin-top: 6pt;">
        <tr>
          <th style="width: 33%;">Hasil Sementara Sesi Ini</th>
          <th style="width: 33%;">Hubungan dengan Sesi Berikutnya</th>
          <th style="width: 34%;">Bukti Perkembangan yang Disimpan</th>
        </tr>
        <tr>
          <td>${s.hasilSementara}</td>
          <td>${s.hubunganDenganSesiBerikutnya}</td>
          <td>${s.buktiPerkembangan}</td>
        </tr>
      </table>
    </div>
  `).join('');

  const formativeRows = asesmen.formatif.tabelPengamatan.map(f => `
    <tr>
      <td style="text-align: center;">${f.no}</td>
      <td><strong>${f.namaMurid}</strong></td>
      <td>${f.dimensiDiamati}</td>
      <td>${f.indikatorBukti}</td>
      <td>${f.catatanPerkembangan}</td>
      <td>${f.umpanBalik}</td>
    </tr>
  `).join('');

  const summativeRows = asesmen.sumatif.rubrikAnalitik.map(r => `
    <tr>
      <td style="width: 20%;"><strong>${r.kriteria}</strong><br><small>Dimensi: ${r.dimensiTerkait}</small></td>
      <td style="width: 20%;">${r.sangatBaik}</td>
      <td style="width: 20%;">${r.baik}</td>
      <td style="width: 20%;">${r.cukup}</td>
      <td style="width: 20%;">${r.perluBimbingan}</td>
    </tr>
  `).join('');

  return `
    <!-- KOP SURAT RESMI SMA NEGERI 03 BOMBANA -->
    <table style="width: 100%; border: none; border-bottom: 3pt double #000; padding-bottom: 8pt; margin-bottom: 16pt;">
      <tr style="border: none;">
        <td style="width: 15%; text-align: center; border: none; vertical-align: middle;">
          <img src="https://i.ibb.co.com/xtyCYn3F/logo-sultra.webp" width="75" height="75" alt="Logo Sulawesi Tenggara" style="display: block; margin: auto;" />
        </td>
        <td style="width: 70%; text-align: center; border: none; vertical-align: middle; line-height: 1.25;">
          <p style="margin: 0; font-size: 11pt; font-weight: bold; letter-spacing: 0.5pt; color: #000;">PEMERINTAH PROVINSI SULAWESI TENGGARA</p>
          <p style="margin: 1pt 0; font-size: 11pt; font-weight: bold; letter-spacing: 0.5pt; color: #000;">DINAS PENDIDIKAN DAN KEBUDAYAAN</p>
          <p style="margin: 2pt 0; font-size: 14pt; font-weight: bold; letter-spacing: 0.5pt; color: #000;">SMA NEGERI 3 BOMBANA</p>
          <p style="margin: 1pt 0; font-size: 8.5pt; font-style: italic; color: #222;">Jalan Tina Orima No. 4 Kabupaten Bombana, Sulawesi Tenggara 93771</p>
          <p style="margin: 1pt 0; font-size: 8.5pt; color: #222;">Telepon (0401) 3087433, Website: <a href="https://www.sman03bombana.sch.id/" style="color: #000; text-decoration: underline;">https://www.sman03bombana.sch.id/</a></p>
        </td>
        <td style="width: 15%; text-align: center; border: none; vertical-align: middle;">
          <img src="https://i.ibb.co.com/Gff1Td4F/sman.jpg" width="75" height="75" alt="Logo SMAN 03 Bombana" style="display: block; margin: auto;" />
        </td>
      </tr>
    </table>

    <div style="text-align: center; margin-bottom: 20pt;">
      <h1 style="margin: 0; font-size: 18pt;">MODUL KOKURIKULER SMA</h1>
      <p style="margin: 4pt 0; font-size: 13pt; font-weight: bold; color: #4169E1;">${identitas.temaKegiatan.toUpperCase()}</p>
      <p style="margin: 2pt 0; font-size: 11pt;">${identitas.namaSatuanPendidikan} &bull; ${identitas.kelas} (${identitas.fase}) &bull; Tahun Ajaran ${identitas.tahunPelajaran} (${identitas.semester})</p>
    </div>

    <h2>A. IDENTITAS KEGIATAN</h2>
    <table>
      <tr><td style="width: 30%;"><strong>Nama Satuan Pendidikan</strong></td><td>${identitas.namaSatuanPendidikan}</td></tr>
      <tr><td><strong>Jenjang / Kelas / Fase</strong></td><td>${identitas.jenjang} / ${identitas.kelas} / ${identitas.fase}</td></tr>
      <tr><td><strong>Tahun Pelajaran &amp; Semester</strong></td><td>${identitas.tahunPelajaran} &bull; Semester ${identitas.semester}</td></tr>
      <tr><td><strong>Tema Kegiatan</strong></td><td>${identitas.temaKegiatan}</td></tr>
      <tr><td><strong>Bentuk Kokurikuler</strong></td><td>${identitas.bentukKokurikuler}</td></tr>
      <tr><td><strong>Alokasi Waktu Total</strong></td><td>${identitas.alokasiWaktu} (Total: ${identitas.totalJp} JP / ${identitas.jumlahSesi} Sesi)</td></tr>
      <tr><td><strong>Lokasi Kegiatan</strong></td><td>${identitas.lokasiKegiatan}</td></tr>
      <tr><td><strong>Koordinator Kokurikuler (Nomor 1 di Rombel)</strong></td><td><strong>${identitas.koordinatorKokurikuler}</strong>${identitas.nipKoordinator ? `<br><small>NIP. ${identitas.nipKoordinator}</small>` : '<br><small>NIP. -</small>'}</td></tr>
      <tr><td><strong>Guru &amp; Tim Fasilitator Pendamping</strong></td><td>
        1. <strong>${identitas.guruFasilitator1 || '-'}</strong>${identitas.nipGuruFasilitator1 ? ` (NIP. ${identitas.nipGuruFasilitator1})` : ' (NIP. -)'}<br>
        2. <strong>${identitas.guruFasilitator2 || '-'}</strong>${identitas.nipGuruFasilitator2 ? ` (NIP. ${identitas.nipGuruFasilitator2})` : ' (NIP. -)'}
        ${identitas.guruFasilitator3 ? `<br>3. <strong>${identitas.guruFasilitator3}</strong>${identitas.nipGuruFasilitator3 ? ` (NIP. ${identitas.nipGuruFasilitator3})` : ' (NIP. -)'}` : ''}
        ${identitas.rombelGrup ? `<br><em>Kelompok Rombel: ${identitas.rombelGrup}</em>` : ''}
      </td></tr>
    </table>

    <h3>Mata Pelajaran Terintegrasi</h3>
    <table>
      <tr><th>No</th><th>Mata Pelajaran SMA</th><th>Kontribusi terhadap Proyek</th><th>Kompetensi yang Diperkuat</th></tr>
      ${mapelRows}
    </table>

    <h2>B. 8 DIMENSI PROFIL LULUSAN</h2>
    <p><strong>Dimensi yang Menjadi Fokus:</strong> ${dimensi.fokusDimensi.join(', ')}</p>
    <p><strong>Alasan Pemilihan Dimensi:</strong> ${dimensi.alasanPemilihan}</p>
    <p><strong>Hubungan Dimensi dengan Proyek:</strong> ${dimensi.hubunganDenganProyek}</p>
    <table>
      <tr><th>No</th><th>Dimensi Profil Lulusan</th><th>Indikator Perilaku Murid</th><th>Bukti Perkembangan yang Diamati</th></tr>
      ${dimensiRows}
    </table>

    <h2>C. TUJUAN PEMBELAJARAN</h2>
    <ol>
      ${tujuanPembelajaran.map(t => `<li style="margin-bottom: 4pt;">${t}</li>`).join('')}
    </ol>

    <h2>D. PRAKTIK PEDAGOGIS</h2>
    <p><strong>Pendekatan:</strong> ${praktikPedagogis.pendekatan}</p>
    <p><strong>Alasan Penggunaan:</strong> ${praktikPedagogis.alasanPenggunaan}</p>
    <p><strong>Peran Guru Fasilitator:</strong> ${praktikPedagogis.peranGuru}</p>
    <p><strong>Peran Murid:</strong> ${praktikPedagogis.peranMurid}</p>
    <p><strong>Pola Kerja Kelompok:</strong> ${praktikPedagogis.polaKerjaKelompok}</p>
    <p><strong>Strategi Pendampingan (Scaffolding):</strong> ${praktikPedagogis.strategiPendampingan}</p>
    ${streamHtml}

    <h2>E. LINGKUNGAN PEMBELAJARAN</h2>
    <p><strong>Tempat &amp; Sarana:</strong> ${lingkungan.tempat}</p>
    <p><strong>Sumber Belajar:</strong> ${lingkungan.sumberBelajar}</p>
    <p><strong>Kondisi Lingkungan Psikososial:</strong> ${lingkungan.kondisiLingkungan}</p>
    <p><strong>Keselamatan, Aksesibilitas, dan Inklusi:</strong> ${lingkungan.keselamatanDanInklusi}</p>

    <h2>F. KEMITRAAN PEMBELAJARAN</h2>
    <table>
      <tr><th>No</th><th>Mitra</th><th>Peran</th><th>Bentuk Keterlibatan</th><th>Waktu</th></tr>
      ${kemitraanRows}
    </table>

    <h2>G. PEMANFAATAN TEKNOLOGI DIGITAL</h2>
    <p><strong>Perangkat &amp; Aplikasi yang Digunakan:</strong></p>
    <ul>
      ${teknologi.perangkatDanAplikasi.map(p => `<li>${p}</li>`).join('')}
    </ul>
    <p><strong>Fungsi Teknologi pada Setiap Tahap:</strong> ${teknologi.fungsiTeknologiPerTahap}</p>
    <p><strong>Etika Pemanfaatan AI &amp; Literasi Digital:</strong> ${teknologi.etikaAIdanLiterasiDigital}</p>

    <h2>H. RANGKAIAN KEGIATAN PROYEK BERKESINAMBUNGAN</h2>
    <div style="background-color: #F4F6FA; border: 1pt solid #A7D8F0; padding: 8pt; margin-bottom: 12pt;">
      <strong>Peta Perkembangan Produk Antarsesi:</strong>
      <pre style="white-space: pre-wrap; font-family: inherit; margin: 4pt 0 0 0;">${rangkaianKegiatan.petaPerkembanganProduk}</pre>
    </div>
    ${sessionsHtml}

    <h2>I. ASESMEN KOKURIKULER</h2>
    <h3>1. Asesmen Formatif</h3>
    <p><strong>Tujuan:</strong> ${asesmen.formatif.tujuan}</p>
    <p><strong>Waktu Pelaksanaan:</strong> ${asesmen.formatif.waktuPelaksanaan}</p>
    <p><strong>Teknik &amp; Instrumen:</strong> ${asesmen.formatif.teknikInstrumen}</p>
    <table>
      <tr><th>No</th><th>Nama Murid</th><th>Dimensi Diamati</th><th>Indikator / Bukti</th><th>Catatan Perkembangan</th><th>Umpan Balik Guru</th></tr>
      ${formativeRows}
    </table>

    <h3>2. Asesmen Sumatif (Rubrik Analitik 4 Tingkat)</h3>
    <p><strong>Teknik Penilaian:</strong> ${asesmen.sumatif.teknik}</p>
    <table>
      <tr>
        <th>Kriteria &amp; Dimensi</th>
        <th style="background-color: #E8F5E9;">Sangat Baik (Skor 4)</th>
        <th style="background-color: #E3F2FD;">Baik (Skor 3)</th>
        <th style="background-color: #FFF9C4;">Cukup (Skor 2)</th>
        <th style="background-color: #FFEBEE;">Perlu Bimbingan (Skor 1)</th>
      </tr>
      ${summativeRows}
    </table>

    <h2>J. HASIL / KARYA NYATA MURID</h2>
    <p><strong>Produk Utama:</strong> ${karyaMurid.produkUtama}</p>
    <p><strong>Bukti Sementara Antarsesi:</strong> ${karyaMurid.buktiSementaraSesi}</p>
    <p><strong>Spesifikasi &amp; Kriteria Keberhasilan:</strong> ${karyaMurid.spesifikasiKriteria}</p>
    <p><strong>Bentuk Presentasi &amp; Publikasi:</strong> ${karyaMurid.bentukPublikasi}</p>
    <p><strong>Manfaat bagi Sekolah dan Masyarakat:</strong> ${karyaMurid.manfaatBagiSekolahMasyarakat}</p>
    <p><strong>Bukti Proses yang Perlu Disimpan:</strong> ${karyaMurid.buktiProsesDisimpan}</p>

    <h2>K. REFLEKSI MURID</h2>
    <p>${refleksiMurid.panduanPengerjaan}</p>
    <ol>
      ${refleksiMurid.pertanyaan.map(q => `<li style="margin-bottom: 4pt;">${q}</li>`).join('')}
    </ol>

    <h2>L. REFLEKSI GURU / FASILITATOR</h2>
    <table>
      <tr><th style="width: 40%;">Aspek Refleksi Guru</th><th>Panduan Evaluasi Diri Fasilitator</th></tr>
      ${refleksiGuru.aspek.map(a => `<tr><td><strong>${a.pertanyaan}</strong></td><td>${a.panduanEvaluasi}</td></tr>`).join('')}
    </table>

    <h2>M. PELAPORAN RAPOR KOKURIKULER</h2>
    <pre style="background: #F4F6FA; border: 1pt solid #A7D8F0; padding: 8pt; white-space: pre-wrap; font-family: inherit;">${pelaporan.formatRapor}</pre>
    <p><strong>Contoh Narasi Capaian Sangat Baik:</strong><br>${pelaporan.contohSangatBaik}</p>
    <p><strong>Contoh Narasi Capaian Baik:</strong><br>${pelaporan.contohBaik}</p>
    <p><strong>Contoh Narasi Capaian Cukup:</strong><br>${pelaporan.contohCukup}</p>
    <p><strong>Contoh Narasi Capaian Perlu Bimbingan:</strong><br>${pelaporan.contohPerluBimbingan}</p>

    <h2>N. EVALUASI DAN TINDAK LANJUT</h2>
    <p><strong>Evaluasi Input:</strong> ${evaluasiTindakLanjut.evaluasiInput}</p>
    <p><strong>Evaluasi Proses:</strong> ${evaluasiTindakLanjut.evaluasiProses}</p>
    <p><strong>Evaluasi Output/Hasil:</strong> ${evaluasiTindakLanjut.evaluasiOutput}</p>
    <p><strong>Status Rekomendasi Tindak Lanjut:</strong> <span class="badge">${evaluasiTindakLanjut.statusTindakLanjut}</span></p>
    <p><strong>Rencana Aksi Tindak Lanjut:</strong><br>${evaluasiTindakLanjut.rencanaTindakLanjut}</p>

    <h2>O. LAMPIRAN DOKUMEN SIAP PAKAI</h2>
    <div style="border: 1pt solid #24345B; padding: 10pt; margin-bottom: 10pt;">
      <h3 style="margin-top: 0;">1. Jadwal dan Pembagian Sesi</h3>
      <pre style="white-space: pre-wrap; font-family: inherit;">${lampiran.jadwalSesi}</pre>
      
      <h3>2. Pembagian Peran Kelompok Murid</h3>
      <pre style="white-space: pre-wrap; font-family: inherit;">${lampiran.pembagianPeranKelompok}</pre>
      
      <h3>3. Lembar Observasi &amp; Investigasi</h3>
      <pre style="white-space: pre-wrap; font-family: inherit;">${lampiran.lembarObservasi}</pre>
      
      <h3>4. Jurnal Perkembangan Proyek</h3>
      <pre style="white-space: pre-wrap; font-family: inherit;">${lampiran.jurnalProyek}</pre>
      
      <h3>5. Lembar Umpan Balik Antarteman (Peer Review)</h3>
      <pre style="white-space: pre-wrap; font-family: inherit;">${lampiran.lembarUmpanBalikTeman}</pre>
      
      <h3>6. Rekapitulasi Penilaian Akhir</h3>
      <pre style="white-space: pre-wrap; font-family: inherit;">${lampiran.rekapAsesmen}</pre>
    </div>

    <div style="text-align: right; margin-top: 25pt; margin-bottom: 6pt; font-size: 11pt; font-weight: bold; color: #24345B;">
      Ditetapkan di: Rumbia, ${identitas.tanggalPengesahan?.includes('Rumbia') ? identitas.tanggalPengesahan.replace('Rumbia, ', '') : (identitas.tanggalPengesahan || '14 Juli 2025')}
    </div>

    <table style="width: 100%; border: none; margin-top: 6pt; text-align: center;">
      <tr style="border: none;">
        <td style="width: 50%; border: none; padding: 12pt; vertical-align: top;">
          Mengetahui,<br><strong>Kepala SMA Negeri 3 Bombana</strong>
          <br><br><br><br>
          <u><strong>${identitas.namaKepalaSekolah || 'Andi Dewi Kusumawati, S.Pd., M.Pd.'}</strong></u><br>
          <small>${identitas.nipKepalaSekolah ? `NIP. ${identitas.nipKepalaSekolah}` : 'NIP. -'}</small>
        </td>
        <td style="width: 50%; border: none; padding: 12pt; vertical-align: top;">
          Disahkan,<br><strong>Koordinator Projek (Nomor 1 Rombel ${identitas.rombelGrup || ''})</strong>
          <br><br><br><br>
          <u><strong>${identitas.koordinatorKokurikuler}</strong></u><br>
          <small>${identitas.nipKoordinator ? `NIP. ${identitas.nipKoordinator}` : 'NIP. -'}</small>
        </td>
      </tr>
      <tr style="border: none;">
        <td style="width: 50%; border: none; padding: 12pt; vertical-align: top;">
          Fasilitator Pendamping 1,<br><strong>Guru / Fasilitator 1</strong>
          <br><br><br><br>
          <u><strong>${identitas.guruFasilitator1 || '-'}</strong></u><br>
          <small>${identitas.nipGuruFasilitator1 ? `NIP. ${identitas.nipGuruFasilitator1}` : 'NIP. -'}</small>
        </td>
        <td style="width: 50%; border: none; padding: 12pt; vertical-align: top;">
          Fasilitator Pendamping 2,<br><strong>Guru / Fasilitator 2</strong>
          <br><br><br><br>
          <u><strong>${identitas.guruFasilitator2 || '-'}</strong></u><br>
          <small>${identitas.nipGuruFasilitator2 ? `NIP. ${identitas.nipGuruFasilitator2}` : 'NIP. -'}</small>
        </td>
      </tr>
      ${identitas.guruFasilitator3 ? `
      <tr style="border: none;">
        <td colspan="2" style="border: none; padding: 12pt; text-align: center; vertical-align: top;">
          Fasilitator Pendamping 3,<br><strong>Guru / Fasilitator 3</strong>
          <br><br><br><br>
          <u><strong>${identitas.guruFasilitator3}</strong></u><br>
          <small>${identitas.nipGuruFasilitator3 ? `NIP. ${identitas.nipGuruFasilitator3}` : 'NIP. -'}</small>
        </td>
      </tr>` : ''}
    </table>
  `;
}

function generatePlainText(module: KokurikulerModule): string {
  const { identitas, dimensi, tujuanPembelajaran, praktikPedagogis, lingkungan, rangkaianKegiatan, asesmen, karyaMurid, pelaporan, evaluasiTindakLanjut } = module;

  return `
MODUL KOKURIKULER SMA (Panduan 2025)
Tema: ${identitas.temaKegiatan}
Satuan Pendidikan: ${identitas.namaSatuanPendidikan}
Kelas/Fase: ${identitas.kelas} (${identitas.fase})
Tahun Ajaran: ${identitas.tahunPelajaran} - Semester ${identitas.semester}
Total Alokasi: ${identitas.alokasiWaktu}

==================================================
A. IDENTITAS KEGIATAN
- Bentuk Kokurikuler: ${identitas.bentukKokurikuler}
- Koordinator Kokurikuler (1 Orang): ${identitas.koordinatorKokurikuler}${identitas.nipKoordinator ? ` (NIP. ${identitas.nipKoordinator})` : ''}
- Guru & Fasilitator Pendamping (2 Orang):
  1. ${identitas.guruFasilitator1 || '-'}${identitas.nipGuruFasilitator1 ? ` (NIP. ${identitas.nipGuruFasilitator1})` : ''}
  2. ${identitas.guruFasilitator2 || '-'}${identitas.nipGuruFasilitator2 ? ` (NIP. ${identitas.nipGuruFasilitator2})` : ''}
${identitas.rombelGrup ? `- Kelompok / Rombel: ${identitas.rombelGrup}\n` : ''}- Lokasi: ${identitas.lokasiKegiatan}
- Mapel Terkait: ${identitas.mataPelajaranTerkait.map(m => m.nama).join(', ')}

==================================================
B. 8 DIMENSI PROFIL LULUSAN
Fokus: ${dimensi.fokusDimensi.join(', ')}
Alasan: ${dimensi.alasanPemilihan}

==================================================
C. TUJUAN PEMBELAJARAN
${tujuanPembelajaran.map((t, i) => `${i + 1}. ${t}`).join('\n')}

==================================================
D. PRAKTIK PEDAGOGIS
Pendekatan: ${praktikPedagogis.pendekatan}
Rasional: ${praktikPedagogis.alasanPenggunaan}

==================================================
H. RANGKAIAN KEGIATAN BERKESINAMBUNGAN
${rangkaianKegiatan.sesi.map(s => `
[${s.namaSesi} - ${s.alokasiJp} JP (${s.tahapPengalaman})]
- Tujuan: ${s.tujuanSesi}
- Aktivitas Murid: ${s.aktivitasMurid}
- Hasil Sementara: ${s.hasilSementara}
- Bukti Perkembangan: ${s.buktiPerkembangan}
- Hubungan Sesi Berikutnya: ${s.hubunganDenganSesiBerikutnya}
`).join('\n')}

==================================================
J. HASIL / KARYA MURID
Produk Utama: ${karyaMurid.produkUtama}
Publikasi: ${karyaMurid.bentukPublikasi}

==================================================
M. PELAPORAN RAPOR
${pelaporan.contohSangatBaik}

==================================================
N. EVALUASI DAN TINDAK LANJUT
Status: ${evaluasiTindakLanjut.statusTindakLanjut}
Rencana: ${evaluasiTindakLanjut.rencanaTindakLanjut}
  `.trim();
}
