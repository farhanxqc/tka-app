export interface VideoItem {
  id: string;
  title: string;
  channel: string;
}

export interface VideoCategory {
  name: string;
  description: string;
  videos: VideoItem[];
}

export const VIDEO_CATEGORIES: VideoCategory[] = [
  {
    name: "Bahasa Indonesia",
    description: "Literasi bacaan, teks editorial, dan trik cepat UTBK.",
    videos: [
      {
        id: "q6PgFN5Wupc",
        title: "Soal TPS UTBK: Literasi dalam Bahasa Indonesia",
        channel: "Privat Al Faiz",
      },
      {
        id: "dXsql9-pyis",
        title: "Trik Cepat Soal Literasi Bahasa Indonesia UTBK SNBT",
        channel: "Ruangguru",
      },
      {
        id: "Efyc2APg1X0",
        title: "Struktur Teks Editorial — Materi Kelas 12",
        channel: "Zenius",
      },
      {
        id: "B2AqQ4qD7fg",
        title: "Pembahasan Lengkap Teks Editorial Kelas 12",
        channel: "Belajar Prestasi",
      },
      {
        id: "lt-S9z3RCko",
        title: "Latihan Soal Literasi Bahasa Indonesia | Persiapan UTBK 2026",
        channel: "Pembelajaran BI",
      },
      {
        id: "i5FChVjcVj4",
        title: "Soal UTBK SNBT 2026 | Literasi Bahasa Indonesia Part 3",
        channel: "KIM UD",
      },
      {
        id: "3D8RTOcpEKo",
        title: "Cara Menentukan Ide Pokok dan Ide Pendukung dalam Paragraf",
        channel: "MISS IMAS",
      },
    ],
  },
  {
    name: "Matematika",
    description: "Fondasi bilangan, eksponen, fungsi kuadrat, hingga integral.",
    videos: [
      {
        id: "uONNNvPbx5M",
        title: "Ringkasan Materi Bilangan Real + Soal TKA 2025",
        channel: "Ruang Tentor",
      },
      {
        id: "AlrOq3W7IZ4",
        title: "Eksponen Itu Asyik! — Kelas 10",
        channel: "Mantappu Academy",
      },
      {
        id: "IwFQPIdqqqQ",
        title: "Fungsi Kuadrat — Matematika Wajib Kelas X",
        channel: "m4th-lab",
      },
      {
        id: "E86ckq8yLUU",
        title: "Belajar Integral dari Dasar dalam 12 Menit",
        channel: "Zero Tutorial Matematika",
      },
      {
        id: "T6e0NRTIQ0o",
        title: "Lengkap: Integral Tak Tentu, Tentu, Substitusi & Parsial",
        channel: "Matematika Hebat",
      },
      {
        id: "hm8VQuLe3OU",
        title: "Trik Pengetahuan Kuantitatif SNBT — Pasti Keluar!",
        channel: "Mantappu Academy",
      },
      {
        id: "2iTbfPEMCeo",
        title: "Perbandingan Trigonometri pada Segitiga Siku-siku — Kelas X",
        channel: "m4th-lab",
      },
      {
        id: "StakP78CIio",
        title: "[Part 24] Matematika Dasar UM UGM 2026 | Persamaan dan Fungsi Kuadrat",
        channel: "Ruang Tentor",
      },
      {
        id: "_rMYPtmdN4E",
        title: "Definisi, Jenis dan Operasi Matriks",
        channel: "Ratri Ferawati SMAN 11 SMD Kaltim",
      },
    ],
  },
  {
    name: "Bahasa Inggris",
    description: "Grammar inti dan strategi literasi bahasa Inggris.",
    videos: [
      {
        id: "B2IldXHBDA0",
        title: "Cara Mudah Memahami 16 Tenses",
        channel: "Titik Nol English Course",
      },
      {
        id: "0huBpDmmr9A",
        title: "Trik Pahami Soal Literasi Bahasa Inggris UTBK SNBT",
        channel: "Ruangguru",
      },
      {
        id: "-WIlmONKHlY",
        title: "Narrative Text Bahasa Inggris Kelas 10 SMA — PAKET C",
        channel: "PKBM Insan Desa",
      },
      {
        id: "Ea6rzcCAI1E",
        title: "Learn All 12 English Tenses in 45 Minutes",
        channel: "EngliMation",
      },
      {
        id: "d0wV9EC3t14",
        title: "ALL English Tenses in 20 Minutes — Basic English Grammar",
        channel: "EnglishClass101",
      },
      {
        id: "O9S70oJAivI",
        title: "Learn all the Tenses in English: Complete Course",
        channel: "Learn English with Rebecca · engVid",
      },
      {
        id: "cGb4qwKV-to",
        title: "ALL 12 Verb Tenses in English… EXPLAINED!",
        channel: "English with Greg",
      },
    ],
  },
  {
    name: "Produk Kreatif dan Kewirausahaan",
    description: "Konsep kewirausahaan dan pengembangan produk kreatif.",
    videos: [
      {
        id: "eYwZ9oCRBYo",
        title: "Kewirausahaan — Materi Ekonomi SMA & Ujian Mandiri",
        channel: "Edcent",
      },
      {
        id: "TNnIrDESckc",
        title: "Wirausaha & Kewirausahaan PKK Kelas XI",
        channel: "Zona SMK",
      },
      {
        id: "5gawasYcTxo",
        title: "5 Contoh Produk Kreatif dan Kewirausahaan",
        channel: "Trikves",
      },
      {
        id: "NYjCKcPdr78",
        title: "Sikap dan Perilaku Wirausahawan",
        channel: "Midalia",
      },
      {
        id: "i7Ce95V6nz4",
        title: "Perencanaan Usaha Makanan Internasional — Bagian 1",
        channel: "PKWU SMAN 1 Banjar",
      },
    ],
  },
];
