// ============================================================================
// CEKAT Clinical Decision Support System (CDSS)
// Berdasarkan Dokumen Standar Pelayanan Medis Nasional Indonesia:
// 1. PNPK Hipertensi Dewasa (Kepmenkes RI No. HK.01.07/MENKES/303/2026)
// 2. PNPK Obesitas Dewasa (Kepmenkes RI No. HK.01.07/MENKES/509/2025)
// 3. Pedoman Pengelolaan & Pencegahan DM Tipe 2 Dewasa (PERKENI 2024)
// 4. Buku Saku Pencegahan & Tata Laksana Gizi Buruk pada Balita (Kemenkes RI 2020)
// 5. Pendekatan Diagnostik, Tatalaksana & Pencegahan ADB (J. Ked. N. Med 2023)
// ============================================================================

export interface ScreeningEvaluationResult {
  moduleId: 'hipertensi' | 'diabetes' | 'stunting' | 'obesitas';
  moduleTitle: string;
  riskLevel: 'Rendah' | 'Sedang' | 'Tinggi' | 'Kritis';
  score: number;
  maxScore: number;
  summary: string;
  clinicalFindings: string[];
  nutritionPrescription: {
    title: string;
    description: string;
    points: string[];
  };
  exercisePrescription: {
    frequency: string;
    intensity: string;
    time: string;
    type: string;
    caution: string;
  };
  referralGuidance: {
    level: 'Mandiri / Posyandu' | 'Puskesmas (FKTP)' | 'Rumah Sakit (FKRTL)';
    actionText: string;
    urgencyText: string;
  };
  theoryBasis: {
    standardDocument: string;
    guidelineNumber: string;
    scientificEvidenceLevel: string;
    methodology: string;
    keyPoints: string[];
  };
}

// ----------------------------------------------------------------------------
// 1. Evaluator Hipertensi Dewasa
// Acuan: Kepmenkes RI No. HK.01.07/MENKES/303/2026
// ----------------------------------------------------------------------------
export function evaluateHipertensi(answers: Record<string, string>): ScreeningEvaluationResult {
  let riskScore = 0;
  const findings: string[] = [];

  // Q1: Riwayat diagnosis
  const q1 = answers['hipertensi_q1'] || '';
  if (q1 === 'Ya') {
    riskScore += 3;
    findings.push('Memiliki riwayat diagnosis hipertensi sebelumnya');
  } else if (q1 === 'Tidak yakin') {
    riskScore += 1;
  }

  // Q2: Keteraturan minum obat
  const q2 = answers['hipertensi_q2'] || '';
  if (q2 === 'Ya, tetapi tidak rutin') {
    riskScore += 3;
    findings.push('Kepatuhan minum obat antihipertensi masih suboptimal (risiko fluktuasi TD)');
  } else if (q2 === 'Tidak' && q1 === 'Ya') {
    riskScore += 4;
    findings.push('Pernah didiagnosis hipertensi namun saat ini tidak menjalani terapi obat');
  }

  // Q3: Menghentikan obat tanpa konsultasi
  const q3 = answers['hipertensi_q3'] || '';
  if (q3 === 'Ya') {
    riskScore += 2;
    findings.push('Riwayat penghentian atau penurunan dosis obat antihipertensi tanpa supervisi dokter');
  }

  // Q4: Riwayat komorbid kardiometabolik
  const q4 = answers['hipertensi_q4'] || '';
  if (q4.includes('Diabetes') || q4.includes('ginjal') || q4.includes('jantung') || q4.includes('Stroke')) {
    riskScore += 4;
    findings.push(`Adanya komorbid vaskular/metabolik: ${q4}`);
  }

  // Q5: Riwayat keluarga
  const q5 = answers['hipertensi_q5'] || '';
  if (q5 === 'Ya') {
    riskScore += 2;
    findings.push('Terdapat riwayat hipertensi atau penyakit kardiovaskular pada keluarga kandung');
  }

  // Q6: Merokok
  const q6 = answers['hipertensi_q6'] || '';
  if (q6 === 'Saat ini') {
    riskScore += 3;
    findings.push('Perokok aktif (faktor risiko aterosklerosis dan vaskulopati arterial)');
  }

  // Q7: Pola konsumsi natrium/garam
  const q7 = answers['hipertensi_q7'] || '';
  if (q7 === 'Sering') {
    riskScore += 3;
    findings.push('Pola diet tinggi natrium/garam dapur melebihi rekomendasi 2 g Na/hari');
  } else if (q7 === 'Kadang-kadang') {
    riskScore += 1;
  }

  // Q8: Gejala HMOD / kardiak (nyeri dada / sesak / berdebar)
  const q8 = answers['hipertensi_q8'] || '';
  if (q8 === 'Sering') {
    riskScore += 3;
    findings.push('Sering merasakan keluhan dada berdebar / sesak saat beraktivitas ringan');
  } else if (q8 === 'Kadang-kadang') {
    riskScore += 1;
  }

  // Q9: Rutinitas olahraga aerobik
  const q9 = answers['hipertensi_q9'] || '';
  if (q9 === 'Jarang' || q9 === 'Tidak pernah') {
    riskScore += 2;
    findings.push('Kurangnya aktivitas fisik teratur (<150 menit/minggu)');
  }

  // Q10: Gejala neurologis berat / krisis
  const q10 = answers['hipertensi_q10'] || '';
  if (q10 === 'Pernah') {
    riskScore += 5;
    findings.push('Pernah mengalami sakit kepala berat mendadak, vertigo akut, atau penurunan kesadaran');
  }

  let riskLevel: 'Rendah' | 'Sedang' | 'Tinggi' | 'Kritis' = 'Rendah';
  if (q10 === 'Pernah' || riskScore >= 18) {
    riskLevel = 'Kritis';
  } else if (riskScore >= 12) {
    riskLevel = 'Tinggi';
  } else if (riskScore >= 6) {
    riskLevel = 'Sedang';
  }

  return {
    moduleId: 'hipertensi',
    moduleTitle: 'Hipertensi Dewasa',
    riskLevel,
    score: riskScore,
    maxScore: 28,
    summary: riskLevel === 'Kritis'
      ? 'Terindikasi risiko komplikasi hipertensi derajat tinggi atau keterlibatan target organ (HMOD). Segera periksakan diri ke dokter faskes.'
      : riskLevel === 'Tinggi'
      ? 'Profil risiko hipertensi tinggi dengan faktor pemicu gaya hidup dan komorbid yang perlu intervensi medis terstruktur.'
      : riskLevel === 'Sedang'
      ? 'Risiko hipertensi sedang. Modifikasi gaya hidup sehat dan pemantauan tensi berkala sangat disarankan.'
      : 'Profil risiko hipertensi dalam kategori rendah dan terkendali. Pertahankan pola hidup sehat dan pencegahan primer.',
    clinicalFindings: findings.length ? findings : ['Tidak ditemukan tanda bahaya atau komorbid vaskular yang menonjol'],
    nutritionPrescription: {
      title: 'Pola Makan Pendekatan DASH (Dietary Approaches to Stop Hypertension)',
      description: 'Sesuai PNPK Hipertensi 2026 Bab III Bagian D, restriksi asupan natrium dan pola DASH terbukti menurunkan TDS hingga 8-14 mmHg.',
      points: [
        'Batasi asupan natrium maksimal <2 gram Na/hari (setara 1 sendok teh atau 5-6 gram garam dapur NaCl/hari).',
        'Tingkatkan porsi sayuran hijau (4-5 porsi/hari) dan buah-buahan segar (4-5 porsi/hari) kaya kalium dan magnesium alami.',
        'Utamakan sumber protein nabati (tempe, tahu, kacang-kacangan) dan ikan laut tinggi asam lemak tak jenuh (omega-3).',
        'Batasi daging merah, santan kental berlebih, makanan kalengan berpengawet, dan bumbu penyedap berkadar natrium pekat.',
      ]
    },
    exercisePrescription: {
      frequency: '5–7 hari per minggu (rutin tanpa jeda lebih dari 2 hari berturut-turut)',
      intensity: 'Intensitas sedang (40–59% Heart Rate Reserve / masih dapat berbicara tanpa terengah-engah)',
      time: '30–60 menit per sesi (akumulasi minimal 150 menit per minggu)',
      type: 'Olahraga aerobik dinamis (jalan cepat, bersepeda, berenang, atau senam peregangan aerobik)',
      caution: 'Hindari manuver Valsava (menahan napas saat angkat beban berat). Hentikan latihan jika tensi >180/110 mmHg atau timbul nyeri dada.'
    },
    referralGuidance: {
      level: riskLevel === 'Kritis' ? 'Rumah Sakit (FKRTL)' : riskLevel === 'Tinggi' ? 'Puskesmas (FKTP)' : 'Mandiri / Posyandu',
      actionText: riskLevel === 'Kritis'
        ? 'Rujuk segera ke IGD/Poli Spesialis Penyakit Dalam atau Jantung untuk evaluasi HMOD dan penyesuaian terapi antihipertensi.'
        : riskLevel === 'Tinggi'
        ? 'Kunjungi Puskesmas/Klinik Pratama dalam 3-7 hari ke depan untuk pemeriksaan konfirmasi tekanan darah (HBPM/ABPM) dan inisiasi terapi.'
        : 'Lakukan pemeriksaan tekanan darah berkala di Posyandu/Kiosk Station minimal 1 bulan sekali dan pertahankan pola hidup aktif.',
      urgencyText: riskLevel === 'Kritis' ? 'Tindakan Segera (<24 Jam)' : riskLevel === 'Tinggi' ? 'Tindak Lanjut Faskes (3-7 Hari)' : 'Pemantauan Rutin Bulanan'
    },
    theoryBasis: {
      standardDocument: 'Keputusan Menteri Kesehatan Republik Indonesia Nomor HK.01.07/MENKES/303/2026',
      guidelineNumber: 'PNPK Tata Laksana Hipertensi Dewasa 2026 (Mencabut KMK No. HK.01.07/MENKES/4634/2021)',
      scientificEvidenceLevel: 'Peringkat Bukti Kelas I, Derajat Rekomendasi A (Meta-analisis Uji Klinis Acak Terkontrol)',
      methodology: 'Adaptasi Konsensus PERHI 2021, ESC 2024 Guidelines on Elevated Blood Pressure, dan WHO-HEARTS Technical Package.',
      keyPoints: [
        'Definisi Hipertensi: Tekanan Darah Sistolik ≥140 mmHg dan/atau Diastolik ≥90 mmHg.',
        'Target Terapi: <140/90 mmHg untuk semua pasien, diupayakan mencapai 130/80 mmHg jika dapat ditoleransi.',
        'Inisiasi Terapi: Terapi kombinasi dua obat (Single Pill Combination - SPC) lini pertama (RAS blocker + CCB atau Diuretik tiazid).',
        'Penapisan HMOD: Pemeriksaan EKG, fungsi ginjal (eGFR & rasio albumin:kreatinin), funduskopi mata, dan ABI.'
      ]
    }
  };
}

// ----------------------------------------------------------------------------
// 2. Evaluator Diabetes Melitus Tipe 2
// Acuan: Pedoman Pengelolaan & Pencegahan DMT2 Dewasa PERKENI 2024
// ----------------------------------------------------------------------------
export function evaluateDiabetes(answers: Record<string, string>): ScreeningEvaluationResult {
  let riskScore = 0;
  const findings: string[] = [];

  // Q1: Poliuria & Polidipsia (sering kencing & haus)
  const q1 = answers['diabetes_q1'] || '';
  if (q1 === 'Ya') {
    riskScore += 3;
    findings.push('Mengalami gejala kardinal poliuria (sering kencing) dan polidipsia (rasa haus berlebih)');
  }

  // Q2: Polifagia & BB turun
  const q2 = answers['diabetes_q2'] || '';
  if (q2 === 'Ya') {
    riskScore += 3;
    findings.push('Mengalami nafsu makan berlebih dengan penurunan berat badan yang tidak terencana (defisit insulin seluler)');
  }

  // Q3: Riwayat tes glukosa
  const q3 = answers['diabetes_q3'] || '';
  if (q3.includes('Tinggi') || q3 === 'Ya') {
    riskScore += 4;
    findings.push('Pernah tercatat memiliki kadar glukosa darah abnormal (GDP ≥100 mg/dL atau GDS ≥140 mg/dL)');
  }

  // Q4: Riwayat keluarga kandung
  const q4 = answers['diabetes_q4'] || '';
  if (q4 === 'Ya') {
    riskScore += 2;
    findings.push('Faktor predisposisi genetik: orang tua atau saudara kandung mengidap Diabetes Melitus');
  }

  // Q5: Konsumsi makanan/minuman manis
  const q5 = answers['diabetes_q5'] || '';
  if (q5 === 'Sering (hampir setiap hari)') {
    riskScore += 3;
    findings.push('Pola konsumsi gula sederhana dan minuman berpemanis tinggi frekuensi');
  } else if (q5 === 'Kadang-kadang') {
    riskScore += 1;
  }

  // Q6: Gejala neuropati perifer (kebas / kesemutan)
  const q6 = answers['diabetes_q6'] || '';
  if (q6 === 'Ya, sering') {
    riskScore += 3;
    findings.push('Keluhan neuropati sensorik distal: kesemutan atau rasa tebal/panas pada telapak kaki');
  } else if (q6 === 'Kadang-kadang') {
    riskScore += 1;
  }

  // Q7: Penyembuhan luka lambat
  const q7 = answers['diabetes_q7'] || '';
  if (q7 === 'Ya') {
    riskScore += 3;
    findings.push('Penyembuhan luka lambat atau rentan mengalami infeksi kulit berulang');
  }

  // Q8: Acanthosis Nigricans / Lingkar perut
  const q8 = answers['diabetes_q8'] || '';
  if (q8 === 'Ya') {
    riskScore += 2;
    findings.push('Tanda resistensi insulin jaringan (adanya lipatan kulit gelap / lingkar pinggang berlebih)');
  }

  // Q9: Riwayat kebiasaan merokok / alkohol
  const q9 = answers['diabetes_q9'] || '';
  if (q9 === 'Saat ini') {
    riskScore += 2;
    findings.push('Kebiasaan merokok aktif yang mempercepat disfungsi endotel dan komplikasi makrovaskular');
  }

  // Q10: Gaya hidup sedenter
  const q10 = answers['diabetes_q10'] || '';
  if (q10 === 'Jarang' || q10 === 'Tidak pernah') {
    riskScore += 2;
    findings.push('Aktivitas fisik harian kurang dari rekomendasi PERKENI (kurang dari 150 menit/minggu)');
  }

  let riskLevel: 'Rendah' | 'Sedang' | 'Tinggi' | 'Kritis' = 'Rendah';
  if (riskScore >= 18 || (q1 === 'Ya' && q2 === 'Ya' && q3.includes('Tinggi'))) {
    riskLevel = 'Tinggi';
  } else if (riskScore >= 10) {
    riskLevel = 'Sedang';
  }

  return {
    moduleId: 'diabetes',
    moduleTitle: 'Diabetes Melitus Tipe 2',
    riskLevel,
    score: riskScore,
    maxScore: 27,
    summary: riskLevel === 'Tinggi'
      ? 'Kecurigaan tinggi ke arah Diabetes Melitus Tipe 2 atau intoleransi glukosa bermakna. Diperlukan konfirmasi laboratorium resmi (GDP, TTGO, atau HbA1c).'
      : riskLevel === 'Sedang'
      ? 'Terindikasi potensi Prediabetes (Glukosa Darah Puasa Terganggu / Toleransi Glukosa Terganggu). Modifikasi gaya hidup intensif sangat dianjurkan.'
      : 'Profil risiko diabetes melitus saat ini tergolong rendah. Pertahankan kontrol berat badan dan konsumsi serat tinggi.',
    clinicalFindings: findings.length ? findings : ['Tidak ditemukan tanda kardinal hiperglikemia atau komplikasi diabetik'],
    nutritionPrescription: {
      title: 'Terapi Nutrisi Medis (TNM) Standar PERKENI 2024',
      description: 'Perencanaan makan seimbang dengan distribusi kalori terbagi (Makan Pagi 20%, Siang 30%, Malam 25%, Selingan 10-15%).',
      points: [
        'Prioritaskan karbohidrat kompleks kaya serat tinggi (≥14 gram serat per 1.000 kkal) seperti beras merah, gandum, oatmeal, dan sayuran.',
        'Hindari gula sederhana (sirup, madu olahan, pemanis kemasan, kental manis) yang cepat memicu lonjakan glukosa darah post-prandial.',
        'Porsi protein sehat 15-20% total kalori harian (ikan, tempe, tahu, dada ayam tanpa kulit).',
        'Batasi lemak jenuh <10% kalori total, utamakan lemak tak jenuh ganda/tunggal (minyak kelapa sawit terbatas, minyak zaitun, alpukat).',
      ]
    },
    exercisePrescription: {
      frequency: '3–5 hari per minggu (tidak boleh ada jeda istirahat berturut-turut lebih dari 2 hari)',
      intensity: 'Intensitas sedang (50–70% denyut jantung maksimal: 220 - usia)',
      time: 'Minimal 150 menit per minggu atau 30–45 menit per sesi',
      type: 'Kombinasi latihan aerobik (jalan cepat, bersepeda) dengan latihan resistensi beban ringan/elastis (2–3 kali seminggu)',
      caution: 'Bila menggunakan obat penurun gula darah, selalu sediakan karbohidrat cepat serap (permen/larutan glukosa) untuk antisipasi hipoglikemia.'
    },
    referralGuidance: {
      level: riskLevel === 'Tinggi' ? 'Puskesmas (FKTP)' : 'Mandiri / Posyandu',
      actionText: riskLevel === 'Tinggi'
        ? 'Periksakan glukosa darah vena puasa (GDP) dan 2 jam pasca pembebanan (TTGO) atau tes HbA1c di laboratorium Puskesmas.'
        : 'Lakukan pemeriksaan skrining glukosa darah berkala minimal 1 tahun sekali di Posbindu/Puskesmas.',
      urgencyText: riskLevel === 'Tinggi' ? 'Kunjungan Medis (1-3 Hari)' : 'Pencegahan Primer Mandiri'
    },
    theoryBasis: {
      standardDocument: 'Pedoman Pengelolaan dan Pencegahan Diabetes Melitus Tipe 2 Dewasa di Indonesia 2024',
      guidelineNumber: 'PB PERKENI (Perkumpulan Endokrinologi Indonesia) Revisi ke-8 Tahun 2024',
      scientificEvidenceLevel: 'Level of Evidence 1A / Grade A (Studi DPP, Da Qing Study, dan Finnish DPS)',
      methodology: 'Standar Internasional ADA (American Diabetes Association) 2024 dan Kemenkes RI.',
      keyPoints: [
        'Kriteria Prediabetes: GDP 100-125 mg/dL atau TTGO 140-199 mg/dL atau HbA1c 5,7-6,4%.',
        'Kriteria Diabetes: GDP ≥126 mg/dL, TTGO ≥200 mg/dL, GDS ≥200 mg/dL + gejala klasik, atau HbA1c ≥6,5%.',
        'Manajemen Berat Badan: Target penurunan 5–7% BB awal dalam 6 bulan untuk mencegah progresivitas diabetes hingga 58%.',
        'Edukasi Perawatan Kaki: Waspadai neuropati perifer simetris dengan inspeksi harian dan pencegahan ulkus diabetik.'
      ]
    }
  };
}

// ----------------------------------------------------------------------------
// 3. Evaluator Stunting & Gizi Balita
// Acuan: Buku Saku Pencegahan & Tata Laksana Gizi Buruk Kemenkes RI 2020
// ----------------------------------------------------------------------------
export function evaluateStunting(answers: Record<string, string>): ScreeningEvaluationResult {
  let riskScore = 0;
  const findings: string[] = [];

  // Q1: Usia anak
  const q1 = answers['stunting_q1'] || '';

  // Q2: Riwayat BBLR / Prematur
  const q2 = answers['stunting_q2'] || '';
  if (q2 === 'Ya') {
    riskScore += 3;
    findings.push('Riwayat kelahiran berat lahir rendah (BBLR <2.500 gram) atau prematur');
  }

  // Q3: Tren grafik KMS
  const q3 = answers['stunting_q3'] || '';
  if (q3 === 'Tidak naik (T)' || q3 === 'Turun') {
    riskScore += 4;
    findings.push('Grafik berat badan di KMS menunjukkan kenaikan tidak memadai / growth faltering (T/2T)');
  }

  // Q4: Lingkar Lengan Atas (LiLA)
  const q4 = answers['stunting_q4'] || '';
  if (q4.includes('Merah') || q4.includes('<11,5')) {
    riskScore += 6;
    findings.push('Pengukuran LiLA berada di pita merah (<11,5 cm) - Indikasi Gizi Buruk Akut');
  } else if (q4.includes('Kuning') || q4.includes('11,5-12,4')) {
    riskScore += 3;
    findings.push('Pengukuran LiLA berada di pita kuning (11,5–12,4 cm) - Indikasi Gizi Kurang');
  }

  // Q5: Pitting Edema Bilateral
  const q5 = answers['stunting_q5'] || '';
  if (q5 === 'Ya, ada lekukan tertinggal') {
    riskScore += 8;
    findings.push('Terdapat tanda klinis Pitting Edema Bilateral pada kedua punggung kaki');
  }

  // Q6: ASI Eksklusif / MPASI
  const q6 = answers['stunting_q6'] || '';
  if (q6 === 'Tidak sesuai / belum memadai') {
    riskScore += 2;
    findings.push('Praktik pemberian ASI atau MPASI belum memenuhi standar emas PMBA');
  }

  // Q7: Protein hewani harian
  const q7 = answers['stunting_q7'] || '';
  if (q7 === 'Jarang' || q7 === 'Tidak pernah') {
    riskScore += 3;
    findings.push('Asupan protein hewani harian sangat rendah (faktor proteksi stunting suboptimal)');
  }

  // Q8: Nafsu makan balita
  const q8 = answers['stunting_q8'] || '';
  if (q8 === 'Sering menolak / buruk') {
    riskScore += 3;
    findings.push('Nafsu makan balita menurun atau menolak makanan padat gizi');
  }

  // Q9: Infeksi kronis / berulang (diare / batuk lama)
  const q9 = answers['stunting_q9'] || '';
  if (q9 === 'Ya, sering') {
    riskScore += 3;
    findings.push('Memiliki riwayat infeksi berulang (diare / ISPA kronis) yang menghambat penyerapan gizi');
  }

  // Q10: Akses sanitasi & air bersih
  const q10 = answers['stunting_q10'] || '';
  if (q10 === 'Terkendala / belum layak') {
    riskScore += 2;
    findings.push('Lingkungan tempat tinggal terkendala sanitasi jamban sehat atau air bersih');
  }

  let riskLevel: 'Rendah' | 'Sedang' | 'Tinggi' | 'Kritis' = 'Rendah';
  if (q5 === 'Ya, ada lekukan tertinggal' || q4.includes('Merah') || riskScore >= 16) {
    riskLevel = 'Kritis';
  } else if (riskScore >= 9) {
    riskLevel = 'Tinggi';
  } else if (riskScore >= 5) {
    riskLevel = 'Sedang';
  }

  return {
    moduleId: 'stunting',
    moduleTitle: 'Stunting & Status Gizi Balita',
    riskLevel,
    score: riskScore,
    maxScore: 34,
    summary: riskLevel === 'Kritis'
      ? 'Balita memenuhi kriteria klinis gizi buruk akut (LiLA merah / Pitting Edema). Memerlukan konfirmasi dan penanganan 10 Langkah Tata Laksana Gizi Buruk di faskes.'
      : riskLevel === 'Tinggi'
      ? 'Terindikasi hambatan pertumbuhan signifikan (Growth Faltering). Berisiko tinggi mengalami stunting bila tidak diintervensi PMT protein hewani.'
      : riskLevel === 'Sedang'
      ? 'Terdapat faktor risiko gizi kurang atau defisit mikronutrien. Perlu perbaikan pola makan dan pemantauan berat badan 2 minggu sekali.'
      : 'Pertumbuhan anak berada dalam lintasan normal dan sehat. Lanjutkan pemantauan rutin bulanan di Posyandu.',
    clinicalFindings: findings.length ? findings : ['Pertumbuhan dan perkembangan motorik anak terpantau sesuai umur'],
    nutritionPrescription: {
      title: 'Pemberian Makan Bayi dan Anak (PMBA) Standar Emas Kemenkes RI',
      description: 'Sesuai Pedoman Tata Laksana Gizi Buruk Kemenkes 2020: Penuhi energi 150-220 kkal/kgBB/hari dan protein 4-6 g/kgBB/hari pada fase pemulihan.',
      points: [
        'Wajib berikan minimal 1 sumber protein hewani pada setiap sesi makan (telur ayam, ikan kembung/lele, hati ayam, susu sapi/formula).',
        'Terapkan tekstur dan porsi makanan padat gizi bertahap sesuai usia tanpa memaksa anak saat jam makan.',
        'Tambahkan sumber lemak sehat efisien (1 sendok teh minyak sayur/santan/margarin) pada MPASI untuk mencukupi kebutuhan kalori balita.',
        'Jaga kebersihan alat makan dan sanitasi air minum untuk mencegah diare yang menyebabkan gagal tumbuh.',
      ]
    },
    exercisePrescription: {
      frequency: 'Setiap hari secara aktif dalam suasana bermain yang menyenangkan',
      intensity: 'Stimulasi motorik kasar dan halus terstruktur sesuai buku KIA (15–30 menit/hari)',
      time: 'Interaksi aktif sepanjang hari diselingi istirahat tidur cukup',
      type: 'Bermain lempar tangkap bola, merangkak, berjalan di rumput, bernyanyi bersama orang tua',
      caution: 'Bila anak menunjukkan tanda gizi buruk berat atau edema, batasi aktivitas melelahkan dan hangatkan tubuh balita.'
    },
    referralGuidance: {
      level: riskLevel === 'Kritis' ? 'Puskesmas (FKTP)' : riskLevel === 'Tinggi' ? 'Puskesmas (FKTP)' : 'Mandiri / Posyandu',
      actionText: riskLevel === 'Kritis'
        ? 'Bawa balita hari ini ke Puskesmas (Poli MTBS/Gizi) untuk konfirmasi antropometri, tes nafsu makan RUTF/F100, dan penapisan komplikasi medis.'
        : riskLevel === 'Tinggi'
        ? 'Konsultasikan dengan Bidan Desa / Petugas Gizi Puskesmas untuk evaluasi konfirmasi kurva Z-score dan pendaftaran program PMT Pemulihan.'
        : 'Timbang balita setiap bulan di Posyandu dan pantau grafik berat badan di buku KIA/KMS.',
      urgencyText: riskLevel === 'Kritis' ? 'Rujukan Segera Hari Ini' : riskLevel === 'Tinggi' ? 'Kunjungan Faskes (1-3 Hari)' : 'Jadwal Posyandu Rutin'
    },
    theoryBasis: {
      standardDocument: 'Buku Saku Pencegahan dan Tata Laksana Gizi Buruk pada Balita di Layanan Rawat Jalan',
      guidelineNumber: 'Kementerian Kesehatan Republik Indonesia (Direktorat Gizi Masyarakat, 2020)',
      scientificEvidenceLevel: 'Standar Nasional Kementerian Kesehatan RI & WHO Child Growth Standards',
      methodology: 'Protokol MTBS (Manajemen Terpadu Balita Sakit) dan Alur 10 Langkah Tata Laksana Gizi Buruk Terintegrasi.',
      keyPoints: [
        'Kriteria Gizi Buruk: BB/PB atau BB/TB < -3 SD, atau LiLA < 11,5 cm, atau adanya Pitting Edema Bilateral (+1, +2, +3).',
        'Kriteria Rawat Jalan: Balita 6-59 bulan tanpa komplikasi medis, nafsu makan baik (lulus tes RUTF/F100), dan keluarga mampu merawat.',
        'Target Kenaikan Berat Badan Fase Rehabilitasi: Minimal 5 g/kgBB/hari atau 50 g/kgBB/minggu.',
        'Kriteria Sembuh: Z-score BB/PB atau BB/TB ≥ -2 SD, LiLA ≥ 12,5 cm, dan bebas edema bilateral selama 2 minggu berturut-turut.'
      ]
    }
  };
}

// ----------------------------------------------------------------------------
// Master Evaluator Dispatcher
// ----------------------------------------------------------------------------
export function evaluateScreeningResult(
  module: 'hipertensi' | 'diabetes' | 'stunting',
  answers: Record<string, string>
): ScreeningEvaluationResult {
  switch (module) {
    case 'hipertensi':
      return evaluateHipertensi(answers);
    case 'diabetes':
      return evaluateDiabetes(answers);
    case 'stunting':
      return evaluateStunting(answers);
    default:
      return evaluateHipertensi(answers);
  }
}
