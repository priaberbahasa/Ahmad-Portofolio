// ============================================================
// SITE CONFIG — Edit this file to update your portfolio
// ============================================================

export const siteConfig = {
  name: "Ahmad Auliadi Y",
  shortName: "Ahmad. Y",
  title: "Civil Engineering · Geotechnical Researcher · ASCE S.M (G-I)",
  tagline: "Computational Geotechnical Earthquake Engineering",
  bio: "Civil Engineering undergraduate at Institut Teknologi Sumatera with published research in geotechnical engineering, specializing in numerical methods for slope stability and soil-structure interaction.",

  // --- Contact (edit freely) ---
  email: "ahmad.122210045@student.itera.ac.id",
  whatsapp: "+62895631931645", // no spaces/dashes for the wa.me link
  whatsappDisplay: "(+62) 895-6319-31645",

  // --- Social & Academic Links ---
  links: {
    scholar: "https://scholar.google.com/citations?hl=en&authuser=3&user=VhhSzQYAAAAJ",
    linkedin: "https://www.linkedin.com/in/ahmadauliadiy",
    instagram: "https://instagram.com/ahmadauliadiyufr",
    linktree: "https://mez.ink/ahmadauliadiy",
    github: "https://github.com/priaberbahasa",
    orcid: "https://orcid.org/0009-0007-2401-3761",
  },

  // --- Education ---
  education: [
    { degree: "B.Eng. in Civil Engineering", institution: "Institut Teknologi Sumatera (ITERA)", location: "Lampung, Indonesia", year: "2022 – 2026", gpa: "3.75" },
    { degree: "Senior High School", institution: "SMAN 7 Bandar Lampung", location: "Bandar Lampung", year: "2019 – 2022", gpa: "" },
  ],

  thesis: "Numerical Study on the Effects of Geometry and Groundwater Table Position on Lateral Displacement of Liquefied Slopes",

  // --- Research Interests / Focus Areas ---
  focusAreas: [
    "Foundation Engineering",
    "Slope Stability Analysis",
    "Geotechnical Forensics",
    "Soil Laboratories",
  ],

  researchInterests: [
    { area: "Foundation Engineering", keywords: ["Pile foundations", "Axial capacity", "Soil–structure interaction"] },
    { area: "Slope Stability Analysis", keywords: ["Limit equilibrium", "Numerical slope modeling", "Seismic slopes"] },
    { area: "Geotechnical Forensics", keywords: ["Failure investigation", "Back-analysis", "Remediation"] },
    { area: "Soil Laboratories", keywords: ["Index properties", "Triaxial", "Consolidation"] },
    { area: "Particle-Based & Meshfree Methods (beginner)", keywords: ["DEM", "SPH", "MPM", "FEM"] },
  ],

  // --- Publications ---
  publications: [
    { title: "Kajian Daya Dukung Aksial Fondasi Tiang Bor pada Tanah Tufa Berdasarkan Uji PDA di Gedung Laboratorium Teknik 3 ITERA", journal: "Media Konstruksi (SINTA 4)", doi: "https://doi.org/10.33772/jmk.v10i1.112" },
    { title: "Analysis of Jetty Structure Using the Fixity Point Method and Soil–Structure Interaction via the Spring Model", journal: "G-Tech: Jurnal Teknologi Terapan (SINTA 4)", doi: "https://doi.org/10.70609/g-tech.v9i3.6863" },
  ],

  // --- Experience ---
  experience: [
    { role: "Assistant Engineer", org: "PT Tribina Wahana Cipta, Lampung", date: "2024 – Present" },
    { role: "Assistant Researcher — Civil Engineering", org: "Institut Teknologi Sumatera (ITERA)", date: "2024 – Present" },
    { role: "Foundation Engineering Assistant", org: "ITERA — Civil Eng. Dept.", date: "2025" },
    { role: "Soil Mechanics Lab Assistant", org: "ITERA Geotechnical Lab", date: "2024 – 2025" },
    { role: "Project Assistant (MWT Engineering)", org: "PT MWT — Pindo Deli", date: "2024" },
    { role: "HMS-ITERA Senate Staff", org: "Civil Eng. Student Association", date: "2023 – 2024" },
  ],

  achievements: [
    "Best and Most Inspiring Writer — Inspro Pustaka 2022",
    "Top Winner — Booktalks Libtera Competition 2023",
    "Interview Finalist — IISMA 2024",
    "Top Participant — LKMM TD-IV ITERA 2024",
    "3rd Place — English Debate Bulan Bahasa ITERA 2024",
  ],

  languages: [
    { lang: "Indonesian", level: "Native" },
    { lang: "English", level: "Fluent (C1) — DET 140 · TOEFL ITP 600" },
    { lang: "Chinese", level: "Elementary" },
  ],

  certifications: [
    { name: "English Proficiency Certificate", issuer: "Duolingo English Test", date: "Jan 2024", expires: "Jan 2026" },
    { name: "TOEFL ITP Prediction Test", issuer: "Global Operation Indonesia", date: "Jun 2023", score: "600" },
  ],

  skills: {
    focusAreas: ["Foundation Engineering", "Slope Stability Analysis", "Geotechnical Forensics", "Soil Laboratories"],
    programming: ["Python", "MATLAB", "Fortran", "Julia", "JavaScript"],
    geotechnical: ["PLAXIS", "GeoStudio", "Slide (Rocscience)", "LPile", "GROUP"],
    structural: ["SAP2000", "ETABS"],
    drafting: ["AutoCAD", "SketchUp", "Revit", "Lumion"],
    methods: ["FEM", "DEM (beginner)", "SPH (beginner)", "MPM (beginner)", "Coupled methods"],
    tools: ["Git", "LaTeX", "Three.js", "ParaView", "Adobe Photoshop", "Adobe Illustrator"],
  },

  affiliations: ["ASCE Student Member — Geo-Institute (G-I) (since 2022)"],

  navLinks: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Research", href: "/research" },
    { label: "Projects", href: "/projects" },
    { label: "Activities", href: "/activities" },
    { label: "Contact", href: "/contact" },
  ],
};
