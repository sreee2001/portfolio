// Centralized personal information (single source of truth)
// This file is intentionally a classic script (uses var) so the
// `PERSONAL_INFO` global is available to other inline scripts.
var PERSONAL_INFO = {
    name: 'Srikanth Tangella',
    title: 'Developer & UI Designer — building beautiful, usable interfaces',
    email: 'sreee2001@gmail.com',
    experience: '15+',
    bio: {
        short: 'Developer & UI Designer — building beautiful, usable interfaces across desktop, web and embedded systems.',
        // Split the detailed bio into paragraphs for better readability on the page
        paragraphs: [
            "I love designing and building user interfaces across desktop, web, and embedded platforms.",
            "My work spans WPF (MVVM, control templates, custom controls), WinForms, modern web stacks (React + TypeScript, ASP.NET / Blazor), and native platform UIs (macOS/Swift, Qt/C++). I build administrative dashboards, interactive data viewers, reporting portals, and custom controls for enterprise applications.",
            "I specialize in data-heavy interfaces: performant data grids, charts and visualizations, large-result virtualization, accessible controls, theming, and polished UI interactions. I partner with UX and product teams to prototype, build component-driven libraries, and deliver maintainable, performant UIs."
        ],
        additional: "Focus areas: reusable component libraries, control customization (DevExpress/Telerik/Infragistics), responsive admin dashboards, production reporting (SSRS, Tableau), and interactive 2D/3D visualizations."
    },
    // UI-focused skills (used to render chips and relate to stats)
    skills: [
        { name: 'WPF', level: 90, category: 'desktop', tools: ['MVVM','Control Templates'] },
        { name: 'WinForms', level: 75, category: 'desktop' },
        { name: 'React', level: 85, category: 'web', tools: ['TypeScript','Hooks'] },
        { name: 'TypeScript', level: 85, category: 'web' },
        { name: 'Blazor', level: 72, category: 'web' },
        { name: 'Data Grids', level: 92, category: 'data', tools: ['Virtualization','Custom Cells'] },
        { name: 'Charts & Visuals', level: 80, category: 'data' },
        { name: 'SSRS/Tableau', level: 70, category: 'reporting' }
    ],
    // Map stats to related skills for hybrid cards
    stats: {
        experience: '15+',
        designVariations: '20+',
        companies: '8',
        devicesSecured: '100K+',
        related: {
            experience: ['WPF','React','TypeScript'],
            designVariations: ['WPF','React','Charts & Visuals'],
            companies: ['Blazor','WinForms'],
            devicesSecured: ['Data Grids','SSRS/Tableau']
        }
    }
,
    // Company / experience cards (data-driven; rendered in About/Skills carousel)
    cards: [
        {
            id: 'bny',
            company: 'BNY',
            role: 'Consulting — Architect / UI lead',
            summary: 'Worked on enterprise .NET UI components and prototypes, partnering with product and UX to deliver maintainable front-end solutions.',
            uiTags: ['WPF','ASP.NET','React','Data visualization']
        },
        {
            id: 'apex-systems',
            company: 'Apex Systems',
            role: 'Consulting — Architect / Full‑stack / UI lead',
            summary: 'Architected and delivered .NET full‑stack and interactive UI components; led teams and produced component libraries for reuse.',
            uiTags: ['WPF','ASP.NET','React','MVVM']
        },
        {
            id: 'jpmc',
            company: 'JPMC',
            role: 'Consulting — Office extension & .NET Core',
            summary: 'Designed and implemented Office extension UIs and .NET Core front/back‑end components with focus on workflow automation and usability.',
            uiTags: ['ASP.NET Core','Web API','React','UX']
        },
        {
            id: 'schlumberger',
            company: 'Schlumberger',
            role: 'Lead Software Engineer',
            summary: 'Built C# WPF applications from scratch using DevExpress and MVVM; redesigned suites for reusability and cross‑device delivery.',
            uiTags: ['WPF','DevExpress','MVVM','Control Templates']
        },
        {
            id: 'softhq',
            company: 'SoftHQ',
            role: 'Lead / Consultant',
            summary: 'Contributed to desktop UI architecture and led feature design for enterprise clients, focusing on maintainable control libraries.',
            uiTags: ['WPF','MVVM','Control Templates']
        },
        {
            id: 'genzeon',
            company: 'Genzeon',
            role: 'Principal Software Engineer',
            summary: 'Created WPF applications with Infragistics, improved usability and performance, and collaborated with UX on UI redesigns.',
            uiTags: ['WPF','Infragistics','UX','Performance']
        },
        {
            id: 'ihs',
            company: 'IHS',
            role: 'Senior Software Engineer (R&D)',
            summary: 'Led UI refactors for seismic interpretation tools (WPF/Telerik); optimized UI performance and built complex custom controls.',
            uiTags: ['WPF','Telerik','Custom Controls','Performance']
        },
        {
            id: 'cgg',
            company: 'CGG Veritas (CGG)',
            role: 'Generalist Software Engineer (R&D)',
            summary: 'Ported and modernized GUI modules (C++/Qt → C#/WPF); developed 2D/3D UI and image processing tools for seismic workflows.',
            uiTags: ['WPF','Qt','C++','3D graphics']
        },
        {
            id: 'ea-mobile',
            company: 'Electronic Arts Mobile',
            role: 'Software Engineer / Team Lead',
            summary: 'Led game UI development across consoles and PC; developed cross‑platform UI technology and test harnesses for UX validation.',
            uiTags: ['Game UI','Cross-platform','Haptics','OpenGL']
        },
        {
            id: 'aurona',
            company: 'Aurona Technologies Ltd.',
            role: 'Game Programmer',
            summary: 'Implemented 2D/3D game UIs including haptics integration and in‑game GUI features.',
            uiTags: ['Game UI','Haptics','Torque','C++']
        },
        {
            id: 'infosys',
            company: 'Infosys Technologies Ltd.',
            role: 'Software Engineer / Test Engineer',
            summary: 'Led QA efforts and produced UI-related design artifacts; introduced design patterns and testing practices to UI modules.',
            uiTags: ['WinForms','WPF','Design patterns','Testing']
        },
        {
            id: 'iiit',
            company: 'IIIT Allahabad',
            role: 'Research / Student',
            summary: 'Merit scholarship and award-winning UI/graphics projects; early work in Matlab, VC++, and 3D tools.',
            uiTags: ['Graphics','Matlab','C++','3D']
        }
    ],

    social: {
        linkedin: 'https://linkedin.com/in/srikanthtangella',
        github: 'https://github.com/sreee2001',
        bioPage: 'mocks/personal-biography/bio/personal_biography.html'
    },
    
};
