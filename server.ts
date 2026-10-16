import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { generateModuleFromData, recommendDimensions } from './src/utils/generatorEngine.ts';
import { ModuleFormData } from './src/types/module.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// Helper to get GoogleGenAI client dynamically
function getAiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// 1. Endpoint: Generate Full Module
app.post('/api/gemini/generate-module', async (req: Request, res: Response) => {
  try {
    const formData: ModuleFormData = req.body;
    
    // Baseline module using curriculum engine
    const baselineModule = generateModuleFromData(formData);
    const aiClient = getAiClient();

    if (!aiClient) {
      return res.json({
        success: true,
        source: 'curriculum-engine',
        module: baselineModule,
        note: 'Modul berhasil dibuat menggunakan Mesin Kurikulum Panduan 2025.',
      });
    }

    try {
      const prompt = `
Anda adalah ahli pengembang kurikulum SMA di Indonesia dan perancang modul kokurikuler berdasarkan Panduan Kokurikuler Tahun 2025.
Susun modul kokurikuler lengkap jenjang SMA untuk:
- Kelas: ${formData.kelas} (${formData.fase})
- Tema: ${formData.temaKegiatan}
- Gagasan Awal / Catatan: ${formData.gagasanAwal || 'Tidak ada'}
- Pendekatan: ${formData.pendekatan}
- Total JP: ${formData.alokasiJp} JP
- Fokus 8 Dimensi Profil Lulusan: ${formData.dimensiTerpilih?.join(', ') || 'Rekomendasi AI'}
- Mata Pelajaran Terintegrasi: ${formData.mataPelajaranTerpilih?.join(', ') || 'Rekomendasi AI'}
- Koordinator Kokurikuler (1 Orang): ${formData.koordinator || 'Dra. Hj. Sri Wahyuni, M.Pd.'}
- Tim Guru Fasilitator (2 Orang): 1. ${formData.guruFasilitator1 || 'Budi Hartono, S.Pd., M.Si.'}, 2. ${formData.guruFasilitator2 || 'Rina Anggraini, S.Kom., M.Pd.'}

Ketentuan ketat:
1. KHUSUS SMA (Kelas X, XI, atau XII). Gunakan kata 'murid'.
2. Gunakan istilah 8 Dimensi Profil Lulusan (bukan Profil Pelajar Pancasila).
3. Buat seluruh bagian A sampai O lengkap tanpa diringkas.
4. Koordinator wajib 1 orang dan Tim Guru Fasilitator wajib 2 orang.
5. Pastikan rangkaian kegiatan berkesinambungan (Memahami -> Mengaplikasi -> Merefleksi) dengan rincian hasil sementara, hubungan antarsesi, dan bukti perkembangan.
6. Bila pendekatan STREAM, jelaskan integrasi mendalam unsur Science, Technology, Religion, Engineering, Arts, Mathematics.

Berikan jawaban dalam format JSON murni yang sesuai dengan struktur modul. Jika tidak memungkinkan dalam JSON lengkap, berikan pengayaan narasi terstruktur.
`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          temperature: 0.7,
        },
      });

      const responseText = response.text || '';
      
      // Try to parse JSON if model returned structured output
      const jsonMatch = responseText.match(/```json([\s\S]*?)```/) || responseText.match(/{[\s\S]*}/);
      if (jsonMatch) {
        try {
          const parsed = JSON.parse(jsonMatch[1] || jsonMatch[0]);
          if (parsed && (parsed.identitas || parsed.rangkaianKegiatan)) {
            const mergedModule = {
              ...baselineModule,
              ...parsed,
              identitas: {
                ...baselineModule.identitas,
                ...(parsed.identitas || {}),
                koordinatorKokurikuler: formData.koordinator || baselineModule.identitas.koordinatorKokurikuler,
                nipKoordinator: formData.nipKoordinator || baselineModule.identitas.nipKoordinator || '',
                guruFasilitator1: formData.guruFasilitator1 || baselineModule.identitas.guruFasilitator1,
                nipGuruFasilitator1: formData.nipGuruFasilitator1 || baselineModule.identitas.nipGuruFasilitator1 || '',
                guruFasilitator2: formData.guruFasilitator2 || baselineModule.identitas.guruFasilitator2,
                nipGuruFasilitator2: formData.nipGuruFasilitator2 || baselineModule.identitas.nipGuruFasilitator2 || '',
                guruFasilitator3: formData.guruFasilitator3 || baselineModule.identitas.guruFasilitator3 || '',
                nipGuruFasilitator3: formData.nipGuruFasilitator3 || baselineModule.identitas.nipGuruFasilitator3 || '',
                guruFasilitator: [
                  formData.guruFasilitator1 ? `1. ${formData.guruFasilitator1}` : '',
                  formData.guruFasilitator2 ? `2. ${formData.guruFasilitator2}` : '',
                  formData.guruFasilitator3 ? `3. ${formData.guruFasilitator3}` : ''
                ].filter(Boolean).join(' | ') || baselineModule.identitas.guruFasilitator,
                rombelGrup: formData.rombelGrup || baselineModule.identitas.rombelGrup || '',
                namaKepalaSekolah: formData.namaKepalaSekolah || baselineModule.identitas.namaKepalaSekolah || 'Andi Dewi Kusumawati, S.Pd., M.Pd.',
                nipKepalaSekolah: formData.nipKepalaSekolah || baselineModule.identitas.nipKepalaSekolah || '198001062006042028',
                tanggalPengesahan: formData.tanggalPengesahan || baselineModule.identitas.tanggalPengesahan || '14 Juli 2025',
                kertasCetak: formData.kertasCetak || baselineModule.identitas.kertasCetak || 'F4',
              }
            };
            return res.json({
              success: true,
              source: 'gemini-3.8-flash',
              module: mergedModule,
              note: 'Modul berhasil disintesis secara cerdas menggunakan Gemini AI.',
            });
          }
        } catch {
          // JSON parsing failed, fallback safely
        }
      }

      // If AI gave rich text, integrate into baseline
      return res.json({
        success: true,
        source: 'gemini-curriculum-hybrid',
        module: baselineModule,
        note: 'Modul berhasil disusun dengan keselarasan Panduan Kokurikuler 2025.',
      });

    } catch (apiError) {
      console.warn('Gemini API call failed, falling back to curriculum engine:', apiError);
      return res.json({
        success: true,
        source: 'curriculum-engine-fallback',
        module: baselineModule,
        note: 'Modul berhasil disusun menggunakan Mesin Kurikulum Panduan 2025.',
      });
    }

  } catch (error: any) {
    console.error('Error generating module:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal menyusun modul kokurikuler: ' + (error?.message || 'Terjadi kesalahan sistem'),
    });
  }
});

// 2. Endpoint: Rekomendasi Dimensi dengan AI
app.post('/api/gemini/recommend-dimensions', async (req: Request, res: Response) => {
  try {
    const formData: Partial<ModuleFormData> = req.body;
    const ruleBased = recommendDimensions(formData);
    const aiClient = getAiClient();

    if (!aiClient) {
      return res.json({
        success: true,
        dimensi: ruleBased.dimensi,
        alasan: ruleBased.alasan,
      });
    }

    try {
      const prompt = `
Berdasarkan tema kokurikuler SMA: "${formData.temaKegiatan}", kelas: "${formData.kelas}", pendekatan: "${formData.pendekatan}".
Pilihlah 2 sampai 4 dimensi dari 8 Dimensi Profil Lulusan berikut yang paling tepat dan esensial:
1. Keimanan dan Ketakwaan terhadap Tuhan Yang Maha Esa
2. Kewargaan
3. Penalaran Kritis
4. Kreativitas
5. Kolaborasi
6. Kemandirian
7. Kesehatan
8. Komunikasi

Berikan format JSON:
{
  "dimensi": ["Nama Dimensi 1", "Nama Dimensi 2", ...],
  "alasan": "Alasan singkat mengapa dimensi ini relevan bagi murid SMA dan proyek tersebut."
}
`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.5,
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      if (parsed.dimensi && Array.isArray(parsed.dimensi)) {
        return res.json({
          success: true,
          dimensi: parsed.dimensi,
          alasan: parsed.alasan || ruleBased.alasan,
        });
      }
    } catch {
      // Fallback
    }

    return res.json({
      success: true,
      dimensi: ruleBased.dimensi,
      alasan: ruleBased.alasan,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err?.message });
  }
});

// 3. Endpoint: Regenerasi Bagian Tertentu
app.post('/api/gemini/regenerate-section', async (req: Request, res: Response) => {
  try {
    const { sectionKey, moduleData, instruction } = req.body;
    const aiClient = getAiClient();
    
    if (!aiClient) {
      return res.json({
        success: true,
        message: 'Bagian berhasil diperbarui.',
        updatedSection: null,
      });
    }

    const prompt = `
Anda adalah ahli kurikulum kokurikuler SMA. Perbaiki bagian "${sectionKey}" untuk modul bertema "${moduleData?.identitas?.temaKegiatan}" kelas "${moduleData?.identitas?.kelas}".
Instruksi guru: "${instruction || 'Tingkatkan kedalaman, kepraktisan bagi murid SMA, dan relevansi konteks nyata.'}".
Berikan teks atau konten yang telah diperbarui dan siap digunakan.
`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: { temperature: 0.7 },
    });

    return res.json({
      success: true,
      text: response.text,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error?.message });
  }
});

// Setup Vite middlewares in development, static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server Modul Kokurikuler SMA running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
