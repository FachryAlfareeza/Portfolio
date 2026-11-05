import { portfolio } from "./index";
import type { Locale, PortfolioData } from "./types";

export interface UiCopy {
  skipToContent: string;
  nav: {
    about: string;
    skills: string;
    projects: string;
    experience: string;
    credentials: string;
    getInTouch: string;
    openMenu: string;
    closeMenu: string;
  };
  logoMenu: {
    ambigramTitle: string;
    ambigramNote: string;
    flip180: string;
    resetFlip: string;
    copySvg: string;
    copiedSvg: string;
    brandPdf: string;
  };
  hero: {
    emailMe: string;
    viewProjects: string;
    downloadCv: string;
    localTimeSr: string;
  };
  about: {
    sectionLabel: string;
    headingPrefix: string;
    headingEm: string;
    headingSuffix: string;
    depthLabel: string;
    depthQuick: string;
    depthStory: string;
  };
  github: {
    title: string;
    contributionsInYear: string;
    less: string;
    more: string;
    scrollHint: string;
  };
  skills: {
    sectionLabel: string;
    heading: string;
  };
  projects: {
    sectionLabel: string;
    heading: string;
    allFilter: string;
    featuredBadge: string;
    sourceCode: string;
    livePreview: string;
    showingSr: (shown: number, total: number, filter: string) => string;
  };
  experience: {
    sectionLabel: string;
  };
  credentials: {
    sectionLabel: string;
    heading: string;
    trainingTitle: string;
    awardsTitle: string;
  };
  contact: {
    kicker: string;
    headingPrefix: string;
    headingEm: string;
    headingSuffix: string;
    downloadCv: string;
    copyEmail: string;
    copied: string;
    form: {
      nameLabel: string;
      emailLabel: string;
      messageLabel: string;
      send: string;
      sending: string;
      sent: string;
      fallbackPrefix: string;
      errors: {
        nameRequired: string;
        emailRequired: string;
        emailInvalid: string;
        messageRequired: string;
        messageMax: (max: number) => string;
        timeout: string;
        generic: string;
      };
    };
  };
  footer: {
    builtWith: string;
    llmsTxt: string;
  };
  controls: {
    switchToLight: string;
    switchToDark: string;
    switchLanguage: string;
    muteSound: string;
    unmuteSound: string;
    backToTop: string;
  };
  palette: {
    open: string;
    title: string;
    placeholder: string;
    empty: string;
    groupNavigate: string;
    groupActions: string;
    groupLinks: string;
    contact: string;
    copyEmail: string;
    copiedEmail: string;
    closeHint: string;
  };
}

export const UI_COPY: Record<Locale, UiCopy> = {
  en: {
    skipToContent: "Skip to content",
    nav: {
      about: "About",
      skills: "Skills",
      projects: "Projects",
      experience: "Experience",
      credentials: "Credentials",
      getInTouch: "Get in touch",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    logoMenu: {
      ambigramTitle: "Eja Ambigram Mark",
      ambigramNote: "180° rotational palindrome — reads the same upside down.",
      flip180: "Rotate 180° (Ambigram)",
      resetFlip: "Reset orientation (0°)",
      copySvg: "Copy Logo SVG",
      copiedSvg: "Copied SVG ✓",
      brandPdf: "Brand Guidelines (PDF) ↗",
    },
    hero: {
      emailMe: "Email me",
      viewProjects: "View projects",
      downloadCv: "Download CV",
      localTimeSr: "Local time: ",
    },
    about: {
      sectionLabel: "About",
      headingPrefix: "Building ",
      headingEm: "practical",
      headingSuffix: " software and data tools.",
      depthLabel: "Bio length",
      depthQuick: "Quick",
      depthStory: "Full story",
    },
    github: {
      title: "GitHub activity",
      contributionsInYear: "contributions in the past year",
      less: "Less",
      more: "More",
      scrollHint: "Scroll horizontally to explore the year",
    },
    skills: {
      sectionLabel: "Skills",
      heading: "Toolbox",
    },
    projects: {
      sectionLabel: "Projects",
      heading: "Selected work",
      allFilter: "All",
      featuredBadge: "Featured",
      sourceCode: "Source code ↗",
      livePreview: "Live preview ↗",
      showingSr: (shown, total, filter) =>
        `Showing ${shown} of ${total} projects${filter === "All" ? "" : ` in ${filter}`}`,
    },
    experience: {
      sectionLabel: "Experience",
    },
    credentials: {
      sectionLabel: "Credentials",
      heading: "Education & recognition",
      trainingTitle: "Training",
      awardsTitle: "Awards",
    },
    contact: {
      kicker: "Contact",
      headingPrefix: "Let's ",
      headingEm: "work",
      headingSuffix: " together.",
      downloadCv: "Download CV",
      copyEmail: "Copy email",
      copied: "Copied ✓",
      form: {
        nameLabel: "Name",
        emailLabel: "Email",
        messageLabel: "Message",
        send: "Send message",
        sending: "Sending…",
        sent: "Thanks, your message is on its way.",
        fallbackPrefix: "You can also email",
        errors: {
          nameRequired: "Please enter your name.",
          emailRequired: "Please enter your email.",
          emailInvalid: "That email doesn't look right.",
          messageRequired: "Please write a message.",
          messageMax: (max) => `Keep it under ${max} characters.`,
          timeout: "The request timed out.",
          generic: "Something went wrong.",
        },
      },
    },
    footer: {
      builtWith: "Built with Next.js and Tailwind.",
      llmsTxt: "llms.txt",
    },
    controls: {
      switchToLight: "Switch to light theme",
      switchToDark: "Switch to dark theme",
      switchLanguage: "Switch language to Bahasa Indonesia",
      muteSound: "Mute UI sounds",
      unmuteSound: "Unmute UI sounds",
      backToTop: "Back to top",
    },
    palette: {
      open: "Open command menu",
      title: "Command menu",
      placeholder: "Type a command or search…",
      empty: "No matching commands.",
      groupNavigate: "Go to",
      groupActions: "Actions",
      groupLinks: "Links",
      contact: "Contact",
      copyEmail: "Copy email address",
      copiedEmail: "Email copied ✓",
      closeHint: "to close",
    },
  },
  id: {
    skipToContent: "Langsung ke konten",
    nav: {
      about: "Tentang",
      skills: "Keahlian",
      projects: "Proyek",
      experience: "Pengalaman",
      credentials: "Kredensial",
      getInTouch: "Hubungi saya",
      openMenu: "Buka menu",
      closeMenu: "Tutup menu",
    },
    logoMenu: {
      ambigramTitle: "Logomark Ambigram Eja",
      ambigramNote: "Palindrom rotasi 180° — terbaca sama saat diputar terbalik.",
      flip180: "Putar 180° (Ambigram)",
      resetFlip: "Kembalikan posisi (0°)",
      copySvg: "Salin SVG Logo",
      copiedSvg: "SVG Tersalin ✓",
      brandPdf: "Panduan Brand (PDF) ↗",
    },
    hero: {
      emailMe: "Kirim email",
      viewProjects: "Lihat proyek",
      downloadCv: "Unduh CV",
      localTimeSr: "Waktu lokal: ",
    },
    about: {
      sectionLabel: "Tentang",
      headingPrefix: "Membangun perangkat lunak dan alat data yang ",
      headingEm: "praktis",
      headingSuffix: ".",
      depthLabel: "Kedalaman profil",
      depthQuick: "Ringkas",
      depthStory: "Cerita lengkap",
    },
    github: {
      title: "Aktivitas GitHub",
      contributionsInYear: "kontribusi dalam satu tahun terakhir",
      less: "Sedikit",
      more: "Banyak",
      scrollHint: "Geser untuk melihat aktivitas setahun penuh",
    },
    skills: {
      sectionLabel: "Keahlian",
      heading: "Perangkat & Teknologi",
    },
    projects: {
      sectionLabel: "Proyek",
      heading: "Karya pilihan",
      allFilter: "Semua",
      featuredBadge: "Unggulan",
      sourceCode: "Kode sumber ↗",
      livePreview: "Pratinjau langsung ↗",
      showingSr: (shown, total, filter) =>
        `Menampilkan ${shown} dari ${total} proyek${filter === "All" ? "" : ` di kategori ${filter}`}`,
    },
    experience: {
      sectionLabel: "Pengalaman",
    },
    credentials: {
      sectionLabel: "Kredensial",
      heading: "Pendidikan & penghargaan",
      trainingTitle: "Pelatihan",
      awardsTitle: "Penghargaan",
    },
    contact: {
      kicker: "Kontak",
      headingPrefix: "Mari ",
      headingEm: "bekerja",
      headingSuffix: " bersama.",
      downloadCv: "Unduh CV",
      copyEmail: "Salin email",
      copied: "Tersalin ✓",
      form: {
        nameLabel: "Nama",
        emailLabel: "Email",
        messageLabel: "Pesan",
        send: "Kirim pesan",
        sending: "Mengirim…",
        sent: "Terima kasih, pesan Anda sedang dikirim.",
        fallbackPrefix: "Anda juga dapat mengirim email ke",
        errors: {
          nameRequired: "Silakan masukkan nama Anda.",
          emailRequired: "Silakan masukkan alamat email Anda.",
          emailInvalid: "Format email belum sesuai.",
          messageRequired: "Silakan tulis pesan Anda.",
          messageMax: (max) => `Maksimal ${max} karakter.`,
          timeout: "Waktu permintaan habis.",
          generic: "Terjadi kesalahan.",
        },
      },
    },
    footer: {
      builtWith: "Dibangun dengan Next.js dan Tailwind.",
      llmsTxt: "llms.txt",
    },
    controls: {
      switchToLight: "Beralih ke tema terang",
      switchToDark: "Beralih ke tema gelap",
      switchLanguage: "Switch language to English",
      muteSound: "Matikan suara antarmuka",
      unmuteSound: "Nyalakan suara antarmuka",
      backToTop: "Kembali ke atas",
    },
    palette: {
      open: "Buka menu perintah",
      title: "Menu perintah",
      placeholder: "Ketik perintah atau cari…",
      empty: "Tidak ada perintah yang cocok.",
      groupNavigate: "Buka bagian",
      groupActions: "Aksi",
      groupLinks: "Tautan",
      contact: "Kontak",
      copyEmail: "Salin alamat email",
      copiedEmail: "Email tersalin ✓",
      closeHint: "untuk menutup",
    },
  },
};

const ID_PORTFOLIO: PortfolioData = {
  ...portfolio,
  profile: {
    ...portfolio.profile,
    headline: "Rekayasa perangkat lunak, data, dan AI terapan.",
    tagline:
      "Mahasiswa Teknik Informasi di Universitas Gadjah Mada yang membangun solusi praktis berbasis data dan kecerdasan buatan.",
    availability: "Terbuka untuk kolaborasi perangkat lunak, data, dan AI terapan",
    about:
      "Saya menempuh studi Teknik Informasi di Universitas Gadjah Mada dan membangun perangkat yang memanfaatkan data untuk mempermudah pengambilan keputusan. Belakangan ini fokus tersebut mencakup agen penilaian kredit UMKM, peta risiko banjir dan longsor, pipeline kualitas udara, serta dasbor energi. Saya juga menjalani satu semester pertukaran mahasiswa dengan beasiswa penuh di Kırıkkale University, Türkiye.",
    aboutLong: [
      "Saya mempelajari Teknik Informasi di Universitas Gadjah Mada, Yogyakarta, tempat fondasi algoritma, probabilitas, matematika diskrit, dan aljabar linear bertemu langsung dengan rekayasa perangkat lunak dan data. Saya senang mengerjakan persoalan ketika data dunia nyata yang kompleks—seperti arus kas harian UMKM, data cuaca multi-sumber, maupun dokumen pengadaan pemerintah—harus diolah menjadi keputusan yang jelas dan dapat diaudit.",
      "Di luar perkuliahan, saya melakukan riset AI terapan di Artificial Intelligence Talent Factory (AITF) dan memimpin riset blockchain di UGM Blockchain Club. Banyak proyek favorit saya lahir dari kompetisi dan riset tim: mulai dari membangun agen risiko kredit mikro berbasis event untuk FinTechathon 2026, memetakan risiko banjir dengan grid heksagonal Uber H3, hingga meraih Medali Perunggu di SEA Quantathon 2026 dan menjadi finalis nasional Pekan Ilmiah Nasional.",
      "Pada tahun 2026, saya menjalani satu semester pertukaran mahasiswa dengan beasiswa penuh di jurusan Teknik Elektro dan Elektronika, Kırıkkale University, Türkiye. Pengalaman belajar dan tinggal lintas budaya membentuk cara saya berkolaborasi—sebuah cara pandang adaptif yang juga tercermin pada logomark personal saya, 'Eja', sebuah ambigram yang tetap terbaca sama saat diputar 180°."
    ],
  },
  skillGroups: [
    {
      name: "Pemrograman",
      items: ["Python", "TypeScript", "JavaScript", "C#", "Kotlin", "SQL / PLpgSQL"],
    },
    {
      name: "Pengembangan web",
      items: ["React", "FastAPI", "REST APIs", "HTML", "CSS", "Git"],
    },
    {
      name: "Data & analitik",
      items: [
        "Pandas",
        "NumPy",
        "scikit-learn",
        "statsmodels",
        "Pembersihan data",
        "Analisis eksploratif",
      ],
    },
    {
      name: "Area minat",
      items: [
        "Data geospasial / H3",
        "AI terapan",
        "Regresi",
        "Pengembangan dasbor",
      ],
    },
  ],
  projects: [
    {
      name: "WeBank-AI",
      track: "Perangkat Lunak & AI",
      description:
        "Menilai kelayakan kredit mikro UMKM dari arus kas harian. Agen perbankan berbasis event dengan skor risiko DSCR, bukti privasi HMAC, pertahanan prompt-injection, dan kontrol penghapusan data. Dibangun untuk FinTechathon 2026.",
      tech: ["Python", "React", "FastAPI", "Qwen2.5"],
      repo: "https://github.com/FachryAlfareeza/WeBank-AI",
      featured: true,
    },
    {
      name: "InaFlews",
      track: "Data & analitik",
      description:
        "Memetakan risiko banjir dan tanah longsor menggunakan sel heksagonal Uber H3. Purwarupa dasbor geospasial untuk mendeteksi wilayah berisiko tinggi.",
      tech: ["TypeScript", "H3"],
      repo: "https://github.com/FachryAlfareeza/InaFlews",
      demo: "https://fachryalfareeza.github.io/InaFlews",
      featured: true,
    },
    {
      name: "AITF_Web (Airen)",
      track: "Perangkat Lunak & AI",
      description:
        "Meninjau dokumen KAK/TOR dan RAB instansi pemerintah terhadap daftar periksa penyaringan dua tahap. Antarmuka frontend yang menampilkan hasil tinjauan AI dan menyerahkan keputusan akhir kepada peninjau manusia.",
      tech: ["React", "TypeScript", "Vite", "Tailwind"],
      repo: "https://github.com/FachryAlfareeza/AITF_Web",
      demo: "https://fachryalfareeza.github.io/AITF_Web",
      featured: true,
    },
    {
      name: "AirQuality_Report",
      track: "Data & analitik",
      description:
        "Membersihkan dan menggabungkan data dari beberapa API cuaca menjadi satu dataset terpadu melalui pipeline Python.",
      tech: ["Python", "API data", "Preprocessing"],
      repo: "https://github.com/FachryAlfareeza/AirQuality_Report",
    },
    {
      name: "IETO-Dashboard",
      track: "Data & analitik",
      description:
        "Membandingkan pembangkitan energi terbarukan dan non-terbarukan secara berdampingan dalam purwarupa dasbor pemantauan energi.",
      tech: ["TypeScript", "Data visualization"],
      repo: "https://github.com/FachryAlfareeza/IETO-Dashboard",
      demo: "https://fachryalfareeza.github.io/IETO-Dashboard/",
    },
    {
      name: "SolarWise",
      track: "Perangkat Lunak & AI",
      description:
        "Menghitung potensi lokasi pemasangan panel surya paling optimal beserta estimasi imbal hasilnya. Konsep aplikasi web aksi iklim.",
      tech: ["C#"],
      repo: "https://github.com/FachryAlfareeza/SolarWise",
    },
  ],
  experience: [
    {
      title: "Peneliti (Researcher)",
      organization: "Artificial Intelligence Talent Factory (AITF)",
      date: "Agu 2026 — Sekarang",
      description:
        "Berkolaborasi dalam penerapan kecerdasan buatan untuk permasalahan dunia nyata melalui riset tim dan pembuatan purwarupa.",
    },
    {
      title: "Peneliti Utama (Lead Researcher)",
      organization: "UGM Blockchain Club",
      date: "Nov 2025 — Sekarang",
      description:
        "Meneliti topik-topik blockchain untuk publikasi klub serta berkontribusi dalam jejaring komunitas blockchain nasional dan internasional.",
    },
  ],
  education: [
    {
      title: "Sarjana Teknik (S.T.) — Teknik Informasi",
      organization: "Universitas Gadjah Mada · Yogyakarta, Indonesia",
      date: "Agu 2024 — Sekarang",
      description:
        "Mata kuliah relevan meliputi pemrograman, algoritma dan struktur data, probabilitas, matematika diskrit, kalkulus, dan aljabar linear.",
    },
    {
      title: "Pertukaran Mahasiswa Teknik — Teknik Elektro dan Elektronika",
      organization: "Kırıkkale University · Türkiye",
      date: "Feb 2026 — Jul 2026",
      description:
        "Program pertukaran mahasiswa satu semester dengan pendanaan penuh melalui Turkey International Exchange Scholarship.",
    },
  ],
  training: [
    "Associate Data Scientist + Python — Digital Talent Academy, Digital Talent Scholarship 2026 (31 jam)",
    "DataCamp: Pembersihan data Python, analisis data eksploratif, statistika, regresi, reduksi dimensi, dan rekayasa data (2025–2026)",
    "QBronze dan QCobalt — QWorld",
  ],
  awards: [
    "Medali Perunggu — SEA Quantathon 2026",
    "Finalis — Pekan Ilmiah Nasional, GFT Competition 2026",
    "Finalis — Pekan Ilmiah Nasional, GFT Competition 2025",
    "Medali Perak — Hong Kong International Science Olympiads 2024",
    "Finalis — Olimpiade Sains Nasional (OSN) Bidang Astronomi 2023",
    "Medali Perunggu — Geoweek UGM Earth Science Quiz 2023",
  ],
};

export function getPortfolioData(locale: Locale): PortfolioData {
  return locale === "id" ? ID_PORTFOLIO : portfolio;
}
