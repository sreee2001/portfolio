// Portfolio Data Configuration
// This file contains all portfolio projects and can be easily maintained

const portfolioData = {
    // Main portfolio projects data
    projects: [
        {
            id: 'personal-biography',
            title: 'Personal Biography',
            description: 'Interactive timeline-based portfolio with theme switcher, journey tracker, and responsive design. Features 10 companies across 15+ years with detailed accomplishments.',
            icon: 'fas fa-user-circle',
            tags: ['Interactive', 'Timeline', 'Responsive', 'Theme Switcher'],
            category: ['personal'],
            screenshot: 'assets/screenshots/personal-biography/biography.png',
            folder: 'personal-biography',
            variants: [
                { name: 'Personal Biography', file: 'personal_biography.html' },
                { name: 'Portfolio', file: 'personal_portfolio.html' },
                { name: 'Freelance Services', file: 'freelance_services.html' }
            ],
            links: [
                { text: 'View Bio', url: 'mocks/personal-biography/bio/personal_biography.html' },
                { text: 'Portfolio', url: 'mocks/personal-biography/portfolio/personal_portfolio.html' },
                { text: 'Services', url: 'mocks/personal-biography/freelance/freelance_services.html' }
            ]
        },
        {
            id: 'sentinelbridge-plus',
            title: 'SentinelBridge Plus',
            description: 'Cybersecurity platform for email-to-ServiceNow integration. Three design variants: modern blue, gradient purple, and minimal green themes.',
            icon: 'fas fa-shield-alt',
            tags: ['Cybersecurity', 'B2B', 'ServiceNow', 'Email Security'],
            category: ['cybersecurity', 'enterprise', 'saas'],
            screenshot: 'assets/screenshots/01_SentinelBridge_Plus/variant_1_modern_blue.png',
            folder: '01_SentinelBridge_Plus',
            variants: [
                { name: 'Modern Blue', folder: 'variant_1_modern_blue' },
                { name: 'Gradient Purple', folder: 'variant_2_gradient_purple' },
                { name: 'Minimal Green', folder: 'variant_3_minimal_green' }
            ],
            links: [
                { text: 'Modern Blue', url: 'mocks/01_SentinelBridge_Plus/variant_1_modern_blue/index.html' },
                { text: 'Gradient Purple', url: 'mocks/01_SentinelBridge_Plus/variant_2_gradient_purple/index.html' },
                { text: 'Minimal Green', url: 'mocks/01_SentinelBridge_Plus/variant_3_minimal_green/index.html' }
            ]
        },
        {
            id: 'teams-incident-commander',
            title: 'Teams Incident Commander',
            description: 'IT incident management platform for Microsoft Teams. Designed for different business sizes with role-based access and automated workflows.',
            icon: 'fas fa-exclamation-triangle',
            tags: ['IT Operations', 'Microsoft Teams', 'Incident Management', 'Enterprise'],
            category: ['enterprise', 'small-business', 'vc-growth', 'saas'],
            screenshot: 'assets/screenshots/02_Teams_Incident_Commander/variant_1_small_business.png',
            folder: '02_Teams_Incident_Commander',
            variants: [
                { name: 'Small Business', folder: 'variant_1_small_business' },
                { name: 'Enterprise', folder: 'variant_2_enterprise' },
                { name: 'VC Growth', folder: 'variant_3_vc_growth' }
            ],
            links: [
                { text: 'Small Business', url: 'mocks/02_Teams_Incident_Commander/variant_1_small_business/index.html' },
                { text: 'Enterprise', url: 'mocks/02_Teams_Incident_Commander/variant_2_enterprise/index.html' },
                { text: 'VC Growth', url: 'mocks/02_Teams_Incident_Commander/variant_3_vc_growth/index.html' }
            ]
        },
        {
            id: 'finops-ai-spend',
            title: 'FinOps for AI Spend',
            description: 'Financial operations platform for AI cost management. Track, analyze, and optimize AI/ML infrastructure spending across cloud providers.',
            icon: 'fas fa-chart-line',
            tags: ['FinOps', 'AI/ML', 'Cost Management', 'Cloud', 'Analytics'],
            category: ['fintech', 'enterprise', 'vc-growth', 'saas'],
            screenshot: 'assets/screenshots/03_FinOps_For_AI_Spend/variant_1_startup_friendly.png',
            folder: '03_FinOps_For_AI_Spend',
            variants: [
                { name: 'Startup Friendly', folder: 'variant_1_startup_friendly' },
                { name: 'Enterprise CFO', folder: 'variant_2_enterprise_cfo' },
                { name: 'VC Growth', folder: 'variant_3_vc_growth' }
            ],
            links: [
                { text: 'Startup Friendly', url: 'mocks/03_FinOps_For_AI_Spend/variant_1_startup_friendly/index.html' },
                { text: 'Enterprise CFO', url: 'mocks/03_FinOps_For_AI_Spend/variant_2_enterprise_cfo/index.html' },
                { text: 'VC Growth', url: 'mocks/03_FinOps_For_AI_Spend/variant_3_vc_growth/index.html' }
            ]
        },
        {
            id: 'generative-kb-autoreply',
            title: 'Generative KB AutoReply',
            description: 'AI-powered knowledge automation platform that instantly answers support tickets by learning from internal documentation and Slack threads.',
            icon: 'fas fa-robot',
            tags: ['AI/ML', 'Knowledge Management', 'Support Automation', 'NLP'],
            category: ['enterprise', 'small-business', 'vc-growth', 'saas'],
            screenshot: 'assets/screenshots/04_Generative_KB_AutoReply/variant_1_small_business.png',
            folder: '04_Generative_KB_AutoReply',
            variants: [
                { name: 'Small Business', folder: 'variant_1_small_business' },
                { name: 'Enterprise', folder: 'variant_2_enterprise' },
                { name: 'VC Growth', folder: 'variant_3_vc_growth' }
            ],
            links: [
                { text: 'Small Business', url: 'mocks/04_Generative_KB_AutoReply/variant_1_small_business/index.html' },
                { text: 'Enterprise', url: 'mocks/04_Generative_KB_AutoReply/variant_2_enterprise/index.html' },
                { text: 'VC Growth', url: 'mocks/04_Generative_KB_AutoReply/variant_3_vc_growth/index.html' }
            ]
        },
        {
            id: 'byoc-private-ai-runtime',
            title: 'BYOC Private AI Runtime',
            description: 'Bring Your Own Cloud private AI runtime platform. Deploy and manage AI models securely in your own infrastructure with enterprise compliance.',
            icon: 'fas fa-cloud',
            tags: ['AI/ML', 'Private Cloud', 'BYOC', 'Enterprise Security', 'DevOps'],
            category: ['enterprise', 'small-business', 'vc-growth', 'saas'],
            screenshot: 'assets/screenshots/05_BYOC_Private_AI_Runtime/variant_1_small_business.png',
            folder: '05_BYOC_Private_AI_Runtime',
            variants: [
                { name: 'Small Business', folder: 'variant_1_small_business' },
                { name: 'Enterprise', folder: 'variant_2_enterprise' },
                { name: 'VC Growth', folder: 'variant_3_vc_growth' }
            ],
            links: [
                { text: 'Small Business', url: 'mocks/05_BYOC_Private_AI_Runtime/variant_1_small_business/index.html' },
                { text: 'Enterprise', url: 'mocks/05_BYOC_Private_AI_Runtime/variant_2_enterprise/index.html' },
                { text: 'VC Growth', url: 'mocks/05_BYOC_Private_AI_Runtime/variant_3_vc_growth/index.html' }
            ]
        },
        {
            id: 'microsoft-graph-audit-logger',
            title: 'Microsoft Graph API Audit Logger',
            description: 'Comprehensive Microsoft 365 audit logging and compliance platform. Track all user activities, file access, and security events across your tenant.',
            icon: 'fas fa-clipboard-list',
            tags: ['Microsoft 365', 'Audit Logging', 'Compliance', 'Security', 'Graph API'],
            category: ['enterprise', 'small-business', 'vc-growth', 'cybersecurity'],
            screenshot: 'assets/screenshots/06_Microsoft_Graph_API_Audit_Logger/variant_1_small_business.png',
            folder: '06_Microsoft_Graph_API_Audit_Logger',
            variants: [
                { name: 'Small Business', folder: 'variant_1_small_business' },
                { name: 'Enterprise', folder: 'variant_2_enterprise' },
                { name: 'VC Growth', folder: 'variant_3_vc_growth' }
            ],
            links: [
                { text: 'Small Business', url: 'mocks/06_Microsoft_Graph_API_Audit_Logger/variant_1_small_business/index.html' },
                { text: 'Enterprise', url: 'mocks/06_Microsoft_Graph_API_Audit_Logger/variant_2_enterprise/index.html' },
                { text: 'VC Growth', url: 'mocks/06_Microsoft_Graph_API_Audit_Logger/variant_3_vc_growth/index.html' }
            ]
        },
        {
            id: 'slack-workflow-builder-pro',
            title: 'Slack Workflow Builder Pro',
            description: 'Visual no-code automation platform for Slack. Multiple variants targeting different audiences with comprehensive workflow solutions.',
            icon: 'fas fa-project-diagram',
            tags: ['Slack', 'No-Code', 'Workflow Automation', 'Visual Builder', 'Integration'],
            category: ['enterprise', 'small-business', 'vc-growth', 'saas'],
            screenshot: 'assets/screenshots/07_Slack_Workflow_Builder_Pro/variant_1_a_small_business.png',
            folder: '07_Slack_Workflow_Builder_Pro',
            variants: [
                { name: 'Small Business A', folder: 'variant_1_a_small_business' },
                { name: 'Small Business B', folder: 'variant_1_b_small_business' },
                { name: 'Small Business C', folder: 'variant_1_c_small_business' },
                { name: 'Enterprise', folder: 'variant_2_enterprise' },
                { name: 'VC Growth', folder: 'variant_3_vc_growth' }
            ],
            links: [
                { text: 'Small Business A', url: 'mocks/07_Slack_Workflow_Builder_Pro/variant_1_a_small_business/index.html' },
                { text: 'Small Business B', url: 'mocks/07_Slack_Workflow_Builder_Pro/variant_1_b_small_business/index.html' },
                { text: 'Small Business C', url: 'mocks/07_Slack_Workflow_Builder_Pro/variant_1_c_small_business/index.html' },
                { text: 'Enterprise', url: 'mocks/07_Slack_Workflow_Builder_Pro/variant_2_enterprise/index.html' },
                { text: 'VC Growth', url: 'mocks/07_Slack_Workflow_Builder_Pro/variant_3_vc_growth/index.html' }
            ]
        }
    ],
    
    // Category definitions
    categories: [
        { id: 'all', name: 'All Projects', icon: 'fas fa-th', description: 'Show all portfolio projects' },
        { id: 'saas', name: 'SaaS Products', icon: 'fas fa-cloud', description: 'Software as a Service platforms' },
        { id: 'enterprise', name: 'Enterprise', icon: 'fas fa-building', description: 'Large organization solutions' },
        { id: 'small-business', name: 'Small Business', icon: 'fas fa-store', description: 'SMB-focused designs' },
        { id: 'vc-growth', name: 'VC/Growth', icon: 'fas fa-chart-line', description: 'Investor and growth stage designs' },
        { id: 'cybersecurity', name: 'Cybersecurity', icon: 'fas fa-shield-alt', description: 'Security-focused platforms' },
        { id: 'fintech', name: 'FinTech', icon: 'fas fa-coins', description: 'Financial technology solutions' },
        { id: 'personal', name: 'Personal', icon: 'fas fa-user', description: 'Personal branding and biography' }
    ],

    // Auto-detection settings
    settings: {
        mockFolder: 'mocks',
        screenshotFolder: 'assets/screenshots',
        autoScanEnabled: true,
        screenshotGeneration: true,
        metadataExtraction: true
    }
};

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = portfolioData;
}
