// ============================================================
// SITE CONFIG — Edit this file to update your portfolio
// ============================================================

export const siteConfig = {
  name: "Ahmad Auliadi Y",
  shortName: "Auliadi",
  title: "Civil Engineering · Geotechnical Researcher · ASCE S.M",
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
    github: "", // add when ready
  },

  // --- Education ---
  education: [
    { degree: "B.Eng. in Civil Engineering", institution: "Institut Teknologi Sumatera (ITERA)", location: "Lampung, Indonesia", year: "2022 – Present", gpa: "3.70" },
    { degree: "Senior High School", institution: "SMAN 7 Bandar Lampung", location: "Bandar Lampung", year: "2019 – 2022", gpa: "" },
  ],

  thesis: "Numerical Study on the Effects of Geometry and Groundwater Table Position on Lateral Displacement of Liquefied Slopes",

  // --- Research Interests ---
  researchInterests: [
    { area: "Computational Geotechnical Earthquake Engineering", keywords: ["Large-deformation modeling", "Seismic slope stability", "Flowslide mechanics", "Liquefaction"] },
    { area: "Particle-Based & Meshfree Methods", keywords: ["DEM", "SPH", "MPM", "FEM", "Coupled methods"] },
    { area: "Clay Micromechanics", keywords: ["DLVO forces", "Fabric evolution", "Capillary bridges"] },
    { area: "Offshore & Seabed Geotechnics", keywords: ["Suction caisson", "Seabed stability", "Marine foundations"] },
  ],

  // --- Publications ---
  publications: [
    { title: "Kajian Daya Dukung Aksial Fondasi Tiang Bor pada Tanah Tufa Berdasarkan Uji PDA di Gedung Laboratorium Teknik 3 ITERA", journal: "Media Konstruksi (SINTA 4)", doi: "https://doi.org/10.33772/jmk.v10i1.112" },
    { title: "Analysis of Jetty Structure Using the Fixity Point Method and Soil–Structure Interaction via the Spring Model", journal: "G-Tech: Jurnal Teknologi Terapan (SINTA 4)", doi: "https://doi.org/10.70609/g-tech.v9i3.6863" },
  ],

  achievements: [
    "Best and Most Inspiring Writer — Inspro Pustaka 2022",
    "Top Winner — Booktalks Libtera Competition 2023",
    "Interview Finalist — IISMA 2024",
    "Top Participant — LKMM TD-IV ITERA 2024",
    "4th Runner-Up — ITERA English Debate Competition 2024",
  ],

  languages: [
    { lang: "Indonesian", level: "Native" },
    { lang: "English", level: "Fluent (C1) — DET 140 · TOEFL ITP 600" },
  ],

  skills: {
    programming: ["Python", "MATLAB", "Julia", "JavaScript"],
    geotechnical: ["PLAXIS", "GeoStudio"],
    structural: ["SAP2000", "ETABS"],
    drafting: ["AutoCAD", "SketchUp", "Revit", "Lumion"],
    methods: ["FEM", "DEM", "SPH", "MPM"],
    tools: ["Git", "LaTeX", "Three.js", "ParaView"],
  },

  affiliations: ["ASCE Student Member (since 2022)"],

  navLinks: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Research", href: "/research" },
    { label: "Projects", href: "/projects" },
    { label: "Activities", href: "/activities" },
    { label: "Contact", href: "/contact" },
  ],
};
