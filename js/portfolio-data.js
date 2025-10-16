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
            // Case-study fields (challenge / approach / outcome)
            challenge: 'Communicate a multi-decade career and varied accomplishments in a single, scannable experience that invites deeper exploration without overwhelming visitors.',
            approach: 'Designed an interactive, mobile-first timeline with progressive disclosure: visual milestones, expandable detail panels, and an adjustable theme switcher to match user preferences and improve scannability.',
            outcome: 'Resulted in clearer storytelling and higher prototype engagement: key accomplishments surfaced quickly, users spent more time in relevant sections, and the structure made it easy to reuse content for portfolio and freelance services pages.',
            tags: ['Interactive', 'Timeline', 'Responsive', 'Theme Switcher'],
            category: ['personal'],
            screenshot: 'assets/screenshots/personal-biography/personal_biography.png',
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
            challenge: 'Help security and SOC teams rapidly triage high-volume alerts while preserving context and avoiding alert fatigue across large enterprise deployments.',
            approach: 'Produced multi-layered screens with prioritized summaries, expandable alert drilldowns, and consistent theming across variants so teams could quickly move from overview to investigation with minimal cognitive load.',
            outcome: 'Usability sessions showed faster time-to-triage for high-priority alerts and improved confidence in prioritization; the design system also simplified theming for client-specific branding needs.',
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
            challenge: 'Enable distributed on-call and incident response teams to collaborate and take action directly from Microsoft Teams without context switching or losing critical information.',
            approach: 'Designed compact incident cards with role-aware actions, embedded runbooks, and streamlined acknowledgement/assignment flows so responders could see status and act within a single pane.',
            outcome: 'Concept testing indicated fewer missed handoffs and a reduction in time-to-first-action; the interface reduced the need to jump between tools during critical incidents.',
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
            challenge: 'Turn raw, noisy AI infrastructure spend into actionable insight so product and finance teams can prioritize cost-saving measures without losing model performance context.',
            approach: 'Created aggregate dashboards with model-, region-, and resource-level drilldowns, forecast overlays, and automated recommendations (e.g., idle resource reclamation, model batching) to guide stakeholder decisions.',
            outcome: 'Stakeholders could quickly identify top cost drivers and prioritize experiments; prototypes surfaced high-impact savings opportunities and established a workflow for ongoing FinOps governance.',
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
            challenge: 'Automate accurate responses to common support requests while preventing the risk of incorrect or misleading generated answers in sensitive support workflows.',
            approach: 'Designed a hybrid retrieval-augmented generation pipeline with confidence scoring, provenance display, and quick verification controls so agents could accept, edit, or reject autogenerated replies inline.',
            outcome: 'Prototype tests showed lower average first-response times and higher throughput for simple tickets while maintaining agent oversight to avoid false positives; teams reported fewer escalations for routine issues.',
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
            challenge: 'Offer enterprises a turnkey way to run AI models inside customer-controlled infrastructure while preserving compliance, security, and operational simplicity.',
            approach: 'Architected a provider-agnostic runtime with secure model packaging, RBAC, encrypted storage, and minimal orchestration surface so operations teams could deploy pilots without heavy platform changes.',
            outcome: 'Enabled faster private-cloud and on-prem pilots, improved compliance posture through built-in governance controls, and reduced integration effort for early adopters.',
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
            challenge: 'Turn high-volume Microsoft 365 audit logs into an actionable compliance tool that non-expert auditors and security teams can use to find evidence quickly.',
            approach: 'Built powerful yet approachable filtering, saved query templates, and exportable report workflows; optimized data tables and visualization performance for large event volumes.',
            outcome: 'Provided auditors and admins with a reproducible workflow for investigations, faster evidence collection, and clearer reporting for compliance audits.',
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
            challenge: 'Make robust Slack automations accessible to non-technical teams while maintaining advanced capabilities for power users and integrations.',
            approach: 'Created a two-tiered product: a guided template-driven builder for direct, low-friction setup and an advanced visual canvas with validation and testing for complex automations.',
            outcome: 'Trials showed increased adoption among non-technical users and fewer failed automations; power users appreciated the validation and debugging tools, accelerating deployment of production workflows.',
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
