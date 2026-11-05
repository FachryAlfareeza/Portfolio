import type { Locale } from "./types";

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
    highlightsLabel: string;
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
      highlightsLabel: "Highlights",
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
      highlightsLabel: "Sorotan",
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
