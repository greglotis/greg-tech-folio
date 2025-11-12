import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode
} from "react";
import { DEFAULT_ICON, IconKey, iconLibrary } from "./icons";

export interface Project {
  id: string;
  title: string;
  description: string;
  icon: IconKey;
  technologies: string[];
  achievements: string[];
}

export type ProjectInput = Omit<Project, "id">;

export interface Skill {
  id: string;
  name: string;
  category: string;
  icon: IconKey;
}

export type SkillInput = Omit<Skill, "id">;

export interface HeroContent {
  badge: string;
  greeting: string;
  highlight: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  secondaryCtaDownload: boolean;
  tertiaryCtaLabel: string;
  tertiaryCtaHref: string;
  tertiaryCtaExternal: boolean;
}

export interface Highlight {
  id: string;
  label: string;
  valueType: "projects" | "skills" | "custom";
  customValue: string;
}

export type HighlightInput = Omit<Highlight, "id">;

export interface Experience {
  id: string;
  title: string;
  organization: string;
  period: string;
  description: string;
}

export type ExperienceInput = Omit<Experience, "id">;

export interface SoftSkill {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export type SoftSkillInput = Omit<SoftSkill, "id">;

export interface Certification {
  id: string;
  title: string;
  organization: string;
  date: string;
  summary: string;
  highlights: string[];
  skills: string[];
}

export type CertificationInput = Omit<Certification, "id">;

export interface TechWatchTopic {
  id: string;
  title: string;
  description: string;
  actions: string[];
}

export type TechWatchTopicInput = Omit<TechWatchTopic, "id">;

export interface TechWatchSource {
  id: string;
  label: string;
  items: string[];
}

export type TechWatchSourceInput = Omit<TechWatchSource, "id">;

export interface TechWatchRoadmapStep {
  id: string;
  period: string;
  goals: string[];
}

export type TechWatchRoadmapStepInput = Omit<TechWatchRoadmapStep, "id">;

export interface TechWatchContent {
  badge: string;
  title: string;
  description: string;
  focusTopics: TechWatchTopic[];
  sources: TechWatchSource[];
  roadmap: TechWatchRoadmapStep[];
}

export type TechWatchIntroInput = Pick<TechWatchContent, "badge" | "title" | "description">;

export interface PortfolioContent {
  hero: HeroContent;
  highlights: Highlight[];
  about: string[];
  experiences: Experience[];
  softSkills: SoftSkill[];
  certifications: Certification[];
  techWatch: TechWatchContent;
}

export type PortfolioContentSnapshot = PortfolioContent;

interface PortfolioDataContextValue {
  projects: Project[];
  skills: Skill[];
  hero: HeroContent;
  highlights: Highlight[];
  about: string[];
  experiences: Experience[];
  softSkills: SoftSkill[];
  certifications: Certification[];
  techWatch: TechWatchContent;
  addProject: (project: ProjectInput) => void;
  updateProject: (projectId: string, project: ProjectInput) => void;
  deleteProject: (projectId: string) => void;
  addSkill: (skill: SkillInput) => void;
  updateSkill: (skillId: string, skill: SkillInput) => void;
  deleteSkill: (skillId: string) => void;
  updateHero: (hero: HeroContent) => void;
  addHighlight: (highlight: HighlightInput) => void;
  updateHighlight: (highlightId: string, highlight: HighlightInput) => void;
  deleteHighlight: (highlightId: string) => void;
  updateAbout: (paragraphs: string[]) => void;
  addExperience: (experience: ExperienceInput) => void;
  updateExperience: (experienceId: string, experience: ExperienceInput) => void;
  deleteExperience: (experienceId: string) => void;
  addSoftSkill: (softSkill: SoftSkillInput) => void;
  updateSoftSkill: (softSkillId: string, softSkill: SoftSkillInput) => void;
  deleteSoftSkill: (softSkillId: string) => void;
  addCertification: (certification: CertificationInput) => void;
  updateCertification: (certificationId: string, certification: CertificationInput) => void;
  deleteCertification: (certificationId: string) => void;
  updateTechWatchIntro: (intro: TechWatchIntroInput) => void;
  addTechWatchTopic: (topic: TechWatchTopicInput) => void;
  updateTechWatchTopic: (topicId: string, topic: TechWatchTopicInput) => void;
  deleteTechWatchTopic: (topicId: string) => void;
  addTechWatchSource: (source: TechWatchSourceInput) => void;
  updateTechWatchSource: (sourceId: string, source: TechWatchSourceInput) => void;
  deleteTechWatchSource: (sourceId: string) => void;
  addTechWatchRoadmapStep: (step: TechWatchRoadmapStepInput) => void;
  updateTechWatchRoadmapStep: (stepId: string, step: TechWatchRoadmapStepInput) => void;
  deleteTechWatchRoadmapStep: (stepId: string) => void;
  resetData: () => void;
  exportData: () => StoredData;
  importData: (data: unknown) => void;
}

const STORAGE_KEY = "portfolio-data";

type StoredData = {
  projects: Project[];
  skills: Skill[];
  content: PortfolioContent;
};

export type PortfolioDataSnapshot = StoredData;

const DEFAULT_PROJECTS: Project[] = [
  {
    id: "glpi-ocs",
    title: "GLPI & OCS Inventory",
    description:
      "Mise en place d'une solution complète de gestion de parc informatique avec inventaire automatisé et suivi des tickets.",
    icon: "database",
    technologies: ["GLPI", "OCS Inventory", "MySQL", "PHP", "Apache"],
    achievements: [
      "Inventaire automatique de 100+ postes",
      "Gestion centralisée des tickets",
      "Rapports et tableaux de bord personnalisés"
    ]
  },
  {
    id: "vlans-cisco",
    title: "VLANs Cisco",
    description:
      "Configuration et segmentation réseau avec VLANs sur équipements Cisco pour améliorer la sécurité et les performances.",
    icon: "network",
    technologies: ["Cisco IOS", "VLANs", "Trunking", "STP", "Routage inter-VLAN"],
    achievements: [
      "Segmentation réseau en 5 VLANs métier",
      "Configuration de trunking 802.1Q",
      "Optimisation du routage inter-VLAN"
    ]
  },
  {
    id: "proxmox-ad",
    title: "Proxmox & Active Directory",
    description:
      "Déploiement d'une infrastructure virtualisée avec Proxmox et intégration d'un domaine Active Directory DS.",
    icon: "server",
    technologies: ["Proxmox VE", "Windows Server", "Active Directory", "GPO", "DNS"],
    achievements: [
      "Cluster Proxmox haute disponibilité",
      "Domaine AD avec 3 contrôleurs",
      "Stratégies de groupe (GPO) avancées"
    ]
  },
  {
    id: "serveur-3cx",
    title: "Serveur 3CX",
    description:
      "Installation et configuration d'une solution de téléphonie IP 3CX pour les communications d'entreprise.",
    icon: "phone",
    technologies: ["3CX", "SIP", "VoIP", "Asterisk", "QoS"],
    achievements: [
      "Configuration de 50+ extensions",
      "Intégration avec le réseau VoIP",
      "Mise en place de files d'attente et IVR"
    ]
  },
  {
    id: "infrastructure-securite",
    title: "Infrastructure de Sécurité",
    description:
      "Déploiement de solutions de sécurité réseau incluant pare-feu, VPN et surveillance.",
    icon: "shield",
    technologies: ["pfSense", "OpenVPN", "IDS/IPS", "Firewall", "Logs"],
    achievements: [
      "Pare-feu pfSense multi-WAN",
      "VPN site-à-site et client",
      "Monitoring avec Nagios"
    ]
  }
];

const DEFAULT_SKILLS: Skill[] = [
  { id: "windows-server", name: "Windows Server", category: "Systèmes", icon: "monitor" },
  { id: "linux", name: "Linux (Debian/Ubuntu)", category: "Systèmes", icon: "server" },
  { id: "active-directory", name: "Active Directory", category: "Systèmes", icon: "database" },
  { id: "virtualisation-proxmox", name: "Virtualisation (Proxmox)", category: "Systèmes", icon: "boxes" },
  { id: "cisco-ios", name: "Cisco IOS", category: "Réseau", icon: "network" },
  { id: "vlans-routage", name: "VLANs & Routage", category: "Réseau", icon: "wifi" },
  { id: "vpn-securite", name: "VPN & Sécurité réseau", category: "Réseau", icon: "lock" },
  { id: "tcp-ip", name: "TCP/IP", category: "Réseau", icon: "globe" },
  { id: "glpi", name: "GLPI", category: "Services", icon: "fileText" },
  { id: "dns-dhcp", name: "DNS & DHCP", category: "Services", icon: "server" },
  { id: "voip-3cx", name: "3CX / VoIP", category: "Services", icon: "phone" },
  { id: "apache-nginx", name: "Apache / Nginx", category: "Services", icon: "cloud" },
  { id: "pfsense", name: "pfSense", category: "Sécurité", icon: "shield" },
  { id: "backup-pra", name: "Backup & PRA", category: "Sécurité", icon: "hardDrive" },
  { id: "monitoring-nagios", name: "Monitoring (Nagios)", category: "Sécurité", icon: "activity" }
];

const DEFAULT_CONTENT: PortfolioContent = {
  hero: {
    badge: "Technicien SISR",
    greeting: "Bonjour, je suis",
    highlight: "Greg",
    description:
      "Passionné par l'infrastructure réseau, la virtualisation et l'administration système. Je conçois et maintiens des solutions techniques robustes pour optimiser les systèmes d'information.",
    primaryCtaLabel: "Voir mes projets",
    primaryCtaHref: "/projets",
    secondaryCtaLabel: "Télécharger CV",
    secondaryCtaHref: "/cv-greg.pdf",
    secondaryCtaDownload: true,
    tertiaryCtaLabel: "LinkedIn",
    tertiaryCtaHref: "https://linkedin.com",
    tertiaryCtaExternal: true
  },
  highlights: [
    { id: "projects-count", label: "Projets réalisés", valueType: "projects", customValue: "" },
    { id: "skills-count", label: "Technologies maîtrisées", valueType: "skills", customValue: "" },
    { id: "commitment", label: "Engagement professionnel", valueType: "custom", customValue: "100%" }
  ],
  about: [
    "Fort d'une formation BTS SISR, je me spécialise dans la conception, le déploiement et la maintenance d'infrastructures IT complexes. Mon expertise couvre la virtualisation (Proxmox), l'administration réseau (VLANs, Cisco), et les services d'entreprise (Active Directory, 3CX).",
    "Rigoureux et méthodique, j'applique les meilleures pratiques pour garantir la sécurité, la performance et la disponibilité des systèmes dont j'ai la charge. Mon approche orientée solution me permet de répondre efficacement aux besoins techniques des organisations."
  ],
  experiences: [
    {
      id: "experience-sf2i",
      title: "Stage - SF2i",
      organization: "SF2i",
      period: "2023",
      description:
        "Immersion au sein de l'équipe d'infogérance pour assurer la disponibilité des infrastructures clients. Participation au maintien en conditions opérationnelles des serveurs, à la mise en place de solutions de sauvegarde et à la supervision de réseaux multi-sites. Contribution aux interventions sur site pour le déploiement de matériels et la résolution d'incidents utilisateurs."
    },
    {
      id: "experience-noumea",
      title: "Alternance - Mairie de Nouméa",
      organization: "Mairie de Nouméa",
      period: "2023 - Aujourd'hui",
      description:
        "Membre de l'équipe numérique de la collectivité avec un rôle polyvalent : support utilisateur de niveau 2, gestion du parc et des comptes Active Directory, suivi des projets de modernisation du SI et automatisation de tâches récurrentes. Mise en œuvre de bonnes pratiques de sécurité, rédaction de procédures et coordination avec les prestataires externes pour garantir la continuité des services municipaux."
    }
  ],
  softSkills: [
    {
      id: "softskill-rigueur",
      icon: "🎯",
      title: "Rigueur",
      description: "Méthodologie structurée et documentation précise"
    },
    {
      id: "softskill-analyse",
      icon: "🔍",
      title: "Analyse",
      description: "Diagnostic rapide et résolution efficace des problèmes"
    },
    {
      id: "softskill-collaboration",
      icon: "🤝",
      title: "Collaboration",
      description: "Esprit d'équipe et communication claire"
    }
  ],
  certifications: [
    {
      id: "cert-ccna",
      title: "CCNA: Switching, Routing & Wireless Essentials",
      organization: "Cisco Networking Academy",
      date: "2023",
      summary:
        "Validation des bases avancées en administration de réseaux, configuration d'équipements Cisco et dépannage d'infrastructures d'entreprise.",
      highlights: [
        "Mise en place complète d'une infrastructure LAN/WAN avec VLANs et routage inter-VLAN.",
        "Configuration des protocoles OSPF et RSTP pour garantir la résilience du réseau.",
        "Dépannage des déploiements sans-fil et sécurisation des accès."
      ],
      skills: ["Routage", "Switching", "Sécurité réseau", "Cisco IOS"]
    },
    {
      id: "cert-azure",
      title: "Azure Fundamentals (AZ-900)",
      organization: "Microsoft",
      date: "2022",
      summary:
        "Compréhension des principes du cloud Microsoft Azure, de la sécurité et de la tarification afin d'accompagner les migrations vers les services managés.",
      highlights: [
        "Cartographie des services IaaS/PaaS/SaaS adaptés aux besoins d'une collectivité.",
        "Évaluation des modèles de gouvernance et de gestion des identités Azure AD.",
        "Analyse budgétaire et mise en place d'alertes de consommation."
      ],
      skills: ["Cloud", "Azure", "Sécurité", "FinOps"]
    },
    {
      id: "cert-itil",
      title: "ITIL® 4 Foundation",
      organization: "AXELOS",
      date: "2021",
      summary:
        "Acquisition des bonnes pratiques de gestion des services IT pour améliorer le support aux utilisateurs et la continuité d'activité.",
      highlights: [
        "Formalisation d'un catalogue de services et d'indicateurs de suivi.",
        "Optimisation du processus de gestion des incidents et des demandes.",
        "Animation d'ateliers d'amélioration continue avec les équipes support."
      ],
      skills: ["ITSM", "Gestion des services", "Support utilisateur", "Amélioration continue"]
    }
  ],
  techWatch: {
    badge: "Veille technologique",
    title: "Anticiper les évolutions IT",
    description:
      "Une démarche continue pour rester à jour sur les technologies essentielles à mes missions : infrastructure, sécurité et support. Cette veille guide mes choix d'outillage et mes propositions d'améliorations au sein des organisations que j'accompagne.",
    focusTopics: [
      {
        id: "focus-infra",
        title: "Infrastructure & Cloud",
        description:
          "Surveillance continue des évolutions autour de Proxmox, VMware et des solutions de sauvegarde hybrides. Analyse des nouvelles offres IaaS locales et des impacts budgétaires pour des structures publiques.",
        actions: [
          "Tests réguliers des versions beta de Proxmox VE pour anticiper les migrations.",
          "Veille sur la redondance des sauvegardes et sur les solutions de PRA accessibles."
        ]
      },
      {
        id: "focus-securite",
        title: "Sécurité Opérationnelle",
        description:
          "Suivi des publications CERT-FR, bulletins Microsoft et best practices ANSSI pour renforcer les postes et serveurs. Mise à jour des procédures de durcissement et de gestion des incidents.",
        actions: [
          "Mise en place d'alertes RSS et newsletters dédiées à la cybersécurité.",
          "Ateliers internes pour sensibiliser les équipes sur les nouvelles campagnes de phishing."
        ]
      },
      {
        id: "focus-support",
        title: "Collaboration & Support",
        description:
          "Exploration des outils d'assistance à distance, de ticketing et d'automatisation (GLPI, ITSM, scripts PowerShell) pour améliorer la qualité de service auprès des utilisateurs.",
        actions: [
          "Comparaison des solutions d'inventaire réseau pour optimiser la gestion de parc.",
          "Expérimentation d'automatisations PowerShell pour accélérer l'onboarding."
        ]
      }
    ],
    sources: [
      {
        id: "sources-blogs",
        label: "Blogs & Newsletters",
        items: ["Blog Proxmox, VMware Tech Journal", "CERT-FR, Zataz, ANSSI", "3CX Updates, Microsoft Learn"]
      },
      {
        id: "sources-communautes",
        label: "Communautés",
        items: [
          "Réseau Proxmox France, forums Spiceworks",
          "Groupes Discord/Reddit dédiés à la cybersécurité",
          "Meetups locaux autour de l'IT en Nouvelle-Calédonie"
        ]
      },
      {
        id: "sources-terrain",
        label: "Sur le terrain",
        items: [
          "Retours d'expérience des équipes SF2i",
          "Partage de bonnes pratiques avec la DSI de la Mairie de Nouméa",
          "Échanges avec les prestataires et partenaires techniques"
        ]
      }
    ],
    roadmap: [
      {
        id: "roadmap-q1",
        period: "Trimestre 1",
        goals: [
          "Évaluer les nouveautés Proxmox Backup Server 3.x",
          "Mettre à jour les scripts de supervision pour les serveurs critiques"
        ]
      },
      {
        id: "roadmap-q2",
        period: "Trimestre 2",
        goals: [
          "Tester l'intégration d'une solution EDR adaptée au secteur public",
          "Documenter une procédure PRA simplifiée pour les sites secondaires"
        ]
      },
      {
        id: "roadmap-q3",
        period: "Trimestre 3",
        goals: [
          "Déployer un pilote de gestion de parc automatisée",
          "Organiser un atelier de sensibilisation sécurité pour les agents"
        ]
      }
    ]
  }
};

const PortfolioDataContext = createContext<PortfolioDataContextValue | undefined>(undefined);

const createId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return Math.random().toString(36).slice(2, 11);
};

const cloneProjects = (projects: Project[]): Project[] =>
  projects.map((project) => ({
    ...project,
    technologies: [...project.technologies],
    achievements: [...project.achievements]
  }));

const cloneSkills = (skills: Skill[]): Skill[] => skills.map((skill) => ({ ...skill }));

const cloneHero = (hero: HeroContent): HeroContent => ({ ...hero });

const cloneHighlight = (highlight: Highlight): Highlight => ({ ...highlight });

const cloneExperience = (experience: Experience): Experience => ({ ...experience });

const cloneSoftSkill = (softSkill: SoftSkill): SoftSkill => ({ ...softSkill });

const cloneCertification = (certification: Certification): Certification => ({
  ...certification,
  highlights: [...certification.highlights],
  skills: [...certification.skills]
});

const cloneTechWatch = (techWatch: TechWatchContent): TechWatchContent => ({
  badge: techWatch.badge,
  title: techWatch.title,
  description: techWatch.description,
  focusTopics: techWatch.focusTopics.map((topic) => ({
    ...topic,
    actions: [...topic.actions]
  })),
  sources: techWatch.sources.map((source) => ({
    ...source,
    items: [...source.items]
  })),
  roadmap: techWatch.roadmap.map((step) => ({
    ...step,
    goals: [...step.goals]
  }))
});

const cloneContent = (content: PortfolioContent): PortfolioContent => ({
  hero: cloneHero(content.hero),
  highlights: content.highlights.map(cloneHighlight),
  about: [...content.about],
  experiences: content.experiences.map(cloneExperience),
  softSkills: content.softSkills.map(cloneSoftSkill),
  certifications: content.certifications.map(cloneCertification),
  techWatch: cloneTechWatch(content.techWatch)
});

const isIconKey = (value: unknown): value is IconKey =>
  typeof value === "string" && value in iconLibrary;

const sanitizeString = (value: unknown, fallback: string): string =>
  typeof value === "string" && value.trim().length > 0 ? value : fallback;

const sanitizeStringArray = (value: unknown[]): string[] =>
  value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter((item) => item.length > 0);

const sanitizeProject = (project: unknown): Project => {
  const safeProject = project && typeof project === "object" ? (project as Partial<Project>) : {};

  return {
    id: typeof safeProject.id === "string" ? safeProject.id : createId(),
    title:
      typeof safeProject.title === "string" && safeProject.title.trim().length > 0
        ? safeProject.title
        : "Projet sans titre",
    description: typeof safeProject.description === "string" ? safeProject.description : "",
    icon: isIconKey(safeProject.icon) ? safeProject.icon : DEFAULT_ICON,
    technologies: Array.isArray(safeProject.technologies)
      ? sanitizeStringArray(safeProject.technologies)
      : [],
    achievements: Array.isArray(safeProject.achievements)
      ? sanitizeStringArray(safeProject.achievements)
      : []
  };
};

const sanitizeSkill = (skill: unknown): Skill => {
  const safeSkill = skill && typeof skill === "object" ? (skill as Partial<Skill>) : {};

  return {
    id: typeof safeSkill.id === "string" ? safeSkill.id : createId(),
    name:
      typeof safeSkill.name === "string" && safeSkill.name.trim().length > 0 ? safeSkill.name : "Compétence",
    category:
      typeof safeSkill.category === "string" && safeSkill.category.trim().length > 0
        ? safeSkill.category
        : "Autre",
    icon: isIconKey(safeSkill.icon) ? safeSkill.icon : DEFAULT_ICON
  };
};

const sanitizeHero = (hero: unknown, fallback: HeroContent): HeroContent => {
  if (!hero || typeof hero !== "object") {
    return cloneHero(fallback);
  }

  const safeHero = hero as Partial<HeroContent>;

  return {
    badge: sanitizeString(safeHero.badge, fallback.badge),
    greeting: sanitizeString(safeHero.greeting, fallback.greeting),
    highlight: sanitizeString(safeHero.highlight, fallback.highlight),
    description: typeof safeHero.description === "string" ? safeHero.description : fallback.description,
    primaryCtaLabel: sanitizeString(safeHero.primaryCtaLabel, fallback.primaryCtaLabel),
    primaryCtaHref: sanitizeString(safeHero.primaryCtaHref, fallback.primaryCtaHref),
    secondaryCtaLabel: sanitizeString(safeHero.secondaryCtaLabel, fallback.secondaryCtaLabel),
    secondaryCtaHref: sanitizeString(safeHero.secondaryCtaHref, fallback.secondaryCtaHref),
    secondaryCtaDownload:
      typeof safeHero.secondaryCtaDownload === "boolean"
        ? safeHero.secondaryCtaDownload
        : fallback.secondaryCtaDownload,
    tertiaryCtaLabel: sanitizeString(safeHero.tertiaryCtaLabel, fallback.tertiaryCtaLabel),
    tertiaryCtaHref: sanitizeString(safeHero.tertiaryCtaHref, fallback.tertiaryCtaHref),
    tertiaryCtaExternal:
      typeof safeHero.tertiaryCtaExternal === "boolean"
        ? safeHero.tertiaryCtaExternal
        : fallback.tertiaryCtaExternal
  };
};

const sanitizeHighlight = (highlight: unknown): Highlight => {
  const safeHighlight = highlight && typeof highlight === "object" ? (highlight as Partial<Highlight>) : {};
  const allowedTypes: Highlight["valueType"][] = ["projects", "skills", "custom"];
  const type = typeof safeHighlight.valueType === "string" ? safeHighlight.valueType : "custom";

  return {
    id: typeof safeHighlight.id === "string" ? safeHighlight.id : createId(),
    label:
      typeof safeHighlight.label === "string" && safeHighlight.label.trim().length > 0
        ? safeHighlight.label
        : "Statistique",
    valueType: allowedTypes.includes(type as Highlight["valueType"]) ? (type as Highlight["valueType"]) : "custom",
    customValue:
      typeof safeHighlight.customValue === "string" && safeHighlight.customValue.trim().length > 0
        ? safeHighlight.customValue
        : ""
  };
};

const sanitizeExperience = (experience: unknown): Experience => {
  const safeExperience =
    experience && typeof experience === "object" ? (experience as Partial<Experience>) : {};

  return {
    id: typeof safeExperience.id === "string" ? safeExperience.id : createId(),
    title:
      typeof safeExperience.title === "string" && safeExperience.title.trim().length > 0
        ? safeExperience.title
        : "Expérience",
    organization:
      typeof safeExperience.organization === "string" && safeExperience.organization.trim().length > 0
        ? safeExperience.organization
        : "Organisation",
    period:
      typeof safeExperience.period === "string" && safeExperience.period.trim().length > 0
        ? safeExperience.period
        : "Période",
    description: typeof safeExperience.description === "string" ? safeExperience.description : ""
  };
};

const sanitizeSoftSkill = (softSkill: unknown): SoftSkill => {
  const safeSoftSkill = softSkill && typeof softSkill === "object" ? (softSkill as Partial<SoftSkill>) : {};

  return {
    id: typeof safeSoftSkill.id === "string" ? safeSoftSkill.id : createId(),
    icon: typeof safeSoftSkill.icon === "string" && safeSoftSkill.icon.trim().length > 0 ? safeSoftSkill.icon : "⭐",
    title:
      typeof safeSoftSkill.title === "string" && safeSoftSkill.title.trim().length > 0
        ? safeSoftSkill.title
        : "Qualité",
    description:
      typeof safeSoftSkill.description === "string" ? safeSoftSkill.description : "Description à compléter"
  };
};

const sanitizeCertification = (certification: unknown): Certification => {
  const safeCertification =
    certification && typeof certification === "object" ? (certification as Partial<Certification>) : {};

  return {
    id: typeof safeCertification.id === "string" ? safeCertification.id : createId(),
    title:
      typeof safeCertification.title === "string" && safeCertification.title.trim().length > 0
        ? safeCertification.title
        : "Certification",
    organization:
      typeof safeCertification.organization === "string" && safeCertification.organization.trim().length > 0
        ? safeCertification.organization
        : "Organisme",
    date: typeof safeCertification.date === "string" ? safeCertification.date : "",
    summary: typeof safeCertification.summary === "string" ? safeCertification.summary : "",
    highlights: Array.isArray(safeCertification.highlights)
      ? sanitizeStringArray(safeCertification.highlights)
      : [],
    skills: Array.isArray(safeCertification.skills)
      ? sanitizeStringArray(safeCertification.skills)
      : []
  };
};

const sanitizeTechWatchTopic = (topic: unknown): TechWatchTopic => {
  const safeTopic = topic && typeof topic === "object" ? (topic as Partial<TechWatchTopic>) : {};

  return {
    id: typeof safeTopic.id === "string" ? safeTopic.id : createId(),
    title:
      typeof safeTopic.title === "string" && safeTopic.title.trim().length > 0 ? safeTopic.title : "Sujet",
    description: typeof safeTopic.description === "string" ? safeTopic.description : "",
    actions: Array.isArray(safeTopic.actions) ? sanitizeStringArray(safeTopic.actions) : []
  };
};

const sanitizeTechWatchSource = (source: unknown): TechWatchSource => {
  const safeSource = source && typeof source === "object" ? (source as Partial<TechWatchSource>) : {};

  return {
    id: typeof safeSource.id === "string" ? safeSource.id : createId(),
    label:
      typeof safeSource.label === "string" && safeSource.label.trim().length > 0
        ? safeSource.label
        : "Source",
    items: Array.isArray(safeSource.items) ? sanitizeStringArray(safeSource.items) : []
  };
};

const sanitizeTechWatchRoadmapStep = (step: unknown): TechWatchRoadmapStep => {
  const safeStep = step && typeof step === "object" ? (step as Partial<TechWatchRoadmapStep>) : {};

  return {
    id: typeof safeStep.id === "string" ? safeStep.id : createId(),
    period:
      typeof safeStep.period === "string" && safeStep.period.trim().length > 0
        ? safeStep.period
        : "Période",
    goals: Array.isArray(safeStep.goals) ? sanitizeStringArray(safeStep.goals) : []
  };
};

const sanitizeTechWatch = (techWatch: unknown, fallback: TechWatchContent): TechWatchContent => {
  if (!techWatch || typeof techWatch !== "object") {
    return cloneTechWatch(fallback);
  }

  const safeTechWatch = techWatch as Partial<TechWatchContent>;

  return {
    badge: sanitizeString(safeTechWatch.badge, fallback.badge),
    title: sanitizeString(safeTechWatch.title, fallback.title),
    description: typeof safeTechWatch.description === "string" ? safeTechWatch.description : fallback.description,
    focusTopics: Array.isArray(safeTechWatch.focusTopics)
      ? safeTechWatch.focusTopics.map((topic) => sanitizeTechWatchTopic(topic))
      : fallback.focusTopics.map((topic) => sanitizeTechWatchTopic(topic)),
    sources: Array.isArray(safeTechWatch.sources)
      ? safeTechWatch.sources.map((source) => sanitizeTechWatchSource(source))
      : fallback.sources.map((source) => sanitizeTechWatchSource(source)),
    roadmap: Array.isArray(safeTechWatch.roadmap)
      ? safeTechWatch.roadmap.map((step) => sanitizeTechWatchRoadmapStep(step))
      : fallback.roadmap.map((step) => sanitizeTechWatchRoadmapStep(step))
  };
};

const sanitizeContent = (content: unknown, fallback: PortfolioContent): PortfolioContent => {
  if (!content || typeof content !== "object") {
    return cloneContent(fallback);
  }

  const safeContent = content as Partial<PortfolioContent>;

  return {
    hero: sanitizeHero(safeContent.hero, fallback.hero),
    highlights: Array.isArray(safeContent.highlights)
      ? safeContent.highlights.map((highlight) => sanitizeHighlight(highlight))
      : fallback.highlights.map((highlight) => sanitizeHighlight(highlight)),
    about: Array.isArray(safeContent.about)
      ? sanitizeStringArray(safeContent.about as unknown[])
      : [...fallback.about],
    experiences: Array.isArray(safeContent.experiences)
      ? safeContent.experiences.map((experience) => sanitizeExperience(experience))
      : fallback.experiences.map((experience) => sanitizeExperience(experience)),
    softSkills: Array.isArray(safeContent.softSkills)
      ? safeContent.softSkills.map((softSkill) => sanitizeSoftSkill(softSkill))
      : fallback.softSkills.map((softSkill) => sanitizeSoftSkill(softSkill)),
    certifications: Array.isArray(safeContent.certifications)
      ? safeContent.certifications.map((certification) => sanitizeCertification(certification))
      : fallback.certifications.map((certification) => sanitizeCertification(certification)),
    techWatch: sanitizeTechWatch(safeContent.techWatch, fallback.techWatch)
  };
};

const sanitizeStoredData = (data: unknown, fallback: StoredData): StoredData => {
  if (!data || typeof data !== "object") {
    throw new Error("Format de données JSON invalide");
  }

  const partial = data as Partial<StoredData>;
  const hasProjects = Object.prototype.hasOwnProperty.call(partial, "projects");
  const hasSkills = Object.prototype.hasOwnProperty.call(partial, "skills");
  const hasContent = Object.prototype.hasOwnProperty.call(partial, "content");

  if (!hasProjects && !hasSkills && !hasContent) {
    throw new Error("Le fichier JSON ne contient aucun contenu reconnu");
  }

  const projects = hasProjects
    ? Array.isArray(partial.projects)
      ? partial.projects.map((project) => sanitizeProject(project))
      : fallback.projects
    : fallback.projects;

  const skills = hasSkills
    ? Array.isArray(partial.skills)
      ? partial.skills.map((skill) => sanitizeSkill(skill))
      : fallback.skills
    : fallback.skills;

  const content = hasContent ? sanitizeContent(partial.content, fallback.content) : cloneContent(fallback.content);

  return {
    projects,
    skills,
    content
  };
};

export const PortfolioDataProvider = ({ children }: { children: ReactNode }) => {
  const defaultDataRef = useRef<StoredData>({
    projects: cloneProjects(DEFAULT_PROJECTS),
    skills: cloneSkills(DEFAULT_SKILLS),
    content: cloneContent(DEFAULT_CONTENT)
  });
  const [projects, setProjects] = useState<Project[]>(() => cloneProjects(DEFAULT_PROJECTS));
  const [skills, setSkills] = useState<Skill[]>(() => cloneSkills(DEFAULT_SKILLS));
  const [content, setContent] = useState<PortfolioContent>(() => cloneContent(DEFAULT_CONTENT));
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      setIsLoaded(true);
      return;
    }

    let isCancelled = false;

    const loadData = async () => {
      let hasLoaded = false;

      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);

        if (stored) {
          const parsed = JSON.parse(stored);
          const sanitized = sanitizeStoredData(parsed, defaultDataRef.current);
          const snapshot: StoredData = {
            projects: cloneProjects(sanitized.projects),
            skills: cloneSkills(sanitized.skills),
            content: cloneContent(sanitized.content)
          };

          if (!isCancelled) {
            setProjects(snapshot.projects);
            setSkills(snapshot.skills);
            setContent(snapshot.content);
          }

          hasLoaded = true;
        }
      } catch (error) {
        console.error("Impossible de charger les données du portfolio", error);
      }

      if (!hasLoaded) {
        try {
          const response = await fetch("/portfolio-data.json", { cache: "no-store" });

          if (response.ok) {
            const parsed = await response.json();
            const sanitized = sanitizeStoredData(parsed, defaultDataRef.current);
            const snapshot: StoredData = {
              projects: cloneProjects(sanitized.projects),
              skills: cloneSkills(sanitized.skills),
              content: cloneContent(sanitized.content)
            };

            if (!isCancelled) {
              defaultDataRef.current = snapshot;
              setProjects(snapshot.projects);
              setSkills(snapshot.skills);
              setContent(snapshot.content);
            }

            hasLoaded = true;
          }
        } catch (error) {
          console.warn("Aucun fichier portfolio-data.json n'a pu être chargé", error);
        }
      }

      if (!isCancelled) {
        setIsLoaded(true);
      }
    };

    void loadData();

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isLoaded || typeof window === "undefined") {
      return;
    }

    const dataToStore = {
      projects: projects.map((project) => sanitizeProject(project)),
      skills: skills.map((skill) => sanitizeSkill(skill)),
      content: sanitizeContent(content, DEFAULT_CONTENT)
    } satisfies StoredData;

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore));
  }, [projects, skills, content, isLoaded]);

  const addProject = useCallback((project: ProjectInput) => {
    setProjects((prev) => [...prev, sanitizeProject({ ...project, id: createId() })]);
  }, []);

  const updateProject = useCallback((projectId: string, project: ProjectInput) => {
    setProjects((prev) =>
      prev.map((item) => (item.id === projectId ? sanitizeProject({ ...project, id: projectId }) : item))
    );
  }, []);

  const deleteProject = useCallback((projectId: string) => {
    setProjects((prev) => prev.filter((project) => project.id !== projectId));
  }, []);

  const addSkill = useCallback((skill: SkillInput) => {
    setSkills((prev) => [...prev, sanitizeSkill({ ...skill, id: createId() })]);
  }, []);

  const updateSkill = useCallback((skillId: string, skill: SkillInput) => {
    setSkills((prev) =>
      prev.map((item) => (item.id === skillId ? sanitizeSkill({ ...skill, id: skillId }) : item))
    );
  }, []);

  const deleteSkill = useCallback((skillId: string) => {
    setSkills((prev) => prev.filter((skill) => skill.id !== skillId));
  }, []);

  const updateHero = useCallback((hero: HeroContent) => {
    setContent((prev) => ({
      ...prev,
      hero: sanitizeHero(hero, DEFAULT_CONTENT.hero)
    }));
  }, []);

  const addHighlight = useCallback((highlight: HighlightInput) => {
    setContent((prev) => ({
      ...prev,
      highlights: [...prev.highlights, sanitizeHighlight({ ...highlight, id: createId() })]
    }));
  }, []);

  const updateHighlight = useCallback((highlightId: string, highlight: HighlightInput) => {
    setContent((prev) => ({
      ...prev,
      highlights: prev.highlights.map((item) =>
        item.id === highlightId ? sanitizeHighlight({ ...highlight, id: highlightId }) : item
      )
    }));
  }, []);

  const deleteHighlight = useCallback((highlightId: string) => {
    setContent((prev) => ({
      ...prev,
      highlights: prev.highlights.filter((item) => item.id !== highlightId)
    }));
  }, []);

  const updateAbout = useCallback((paragraphs: string[]) => {
    setContent((prev) => ({
      ...prev,
      about: sanitizeStringArray(paragraphs)
    }));
  }, []);

  const addExperience = useCallback((experience: ExperienceInput) => {
    setContent((prev) => ({
      ...prev,
      experiences: [...prev.experiences, sanitizeExperience({ ...experience, id: createId() })]
    }));
  }, []);

  const updateExperience = useCallback((experienceId: string, experience: ExperienceInput) => {
    setContent((prev) => ({
      ...prev,
      experiences: prev.experiences.map((item) =>
        item.id === experienceId ? sanitizeExperience({ ...experience, id: experienceId }) : item
      )
    }));
  }, []);

  const deleteExperience = useCallback((experienceId: string) => {
    setContent((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((item) => item.id !== experienceId)
    }));
  }, []);

  const addSoftSkill = useCallback((softSkill: SoftSkillInput) => {
    setContent((prev) => ({
      ...prev,
      softSkills: [...prev.softSkills, sanitizeSoftSkill({ ...softSkill, id: createId() })]
    }));
  }, []);

  const updateSoftSkill = useCallback((softSkillId: string, softSkill: SoftSkillInput) => {
    setContent((prev) => ({
      ...prev,
      softSkills: prev.softSkills.map((item) =>
        item.id === softSkillId ? sanitizeSoftSkill({ ...softSkill, id: softSkillId }) : item
      )
    }));
  }, []);

  const deleteSoftSkill = useCallback((softSkillId: string) => {
    setContent((prev) => ({
      ...prev,
      softSkills: prev.softSkills.filter((item) => item.id !== softSkillId)
    }));
  }, []);

  const addCertification = useCallback((certification: CertificationInput) => {
    setContent((prev) => ({
      ...prev,
      certifications: [...prev.certifications, sanitizeCertification({ ...certification, id: createId() })]
    }));
  }, []);

  const updateCertification = useCallback((certificationId: string, certification: CertificationInput) => {
    setContent((prev) => ({
      ...prev,
      certifications: prev.certifications.map((item) =>
        item.id === certificationId
          ? sanitizeCertification({ ...certification, id: certificationId })
          : item
      )
    }));
  }, []);

  const deleteCertification = useCallback((certificationId: string) => {
    setContent((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((item) => item.id !== certificationId)
    }));
  }, []);

  const updateTechWatchIntro = useCallback((intro: TechWatchIntroInput) => {
    setContent((prev) => ({
      ...prev,
      techWatch: {
        ...prev.techWatch,
        badge: sanitizeString(intro.badge, prev.techWatch.badge),
        title: sanitizeString(intro.title, prev.techWatch.title),
        description: typeof intro.description === "string" ? intro.description : prev.techWatch.description
      }
    }));
  }, []);

  const addTechWatchTopic = useCallback((topic: TechWatchTopicInput) => {
    setContent((prev) => ({
      ...prev,
      techWatch: {
        ...prev.techWatch,
        focusTopics: [...prev.techWatch.focusTopics, sanitizeTechWatchTopic({ ...topic, id: createId() })]
      }
    }));
  }, []);

  const updateTechWatchTopic = useCallback((topicId: string, topic: TechWatchTopicInput) => {
    setContent((prev) => ({
      ...prev,
      techWatch: {
        ...prev.techWatch,
        focusTopics: prev.techWatch.focusTopics.map((item) =>
          item.id === topicId ? sanitizeTechWatchTopic({ ...topic, id: topicId }) : item
        )
      }
    }));
  }, []);

  const deleteTechWatchTopic = useCallback((topicId: string) => {
    setContent((prev) => ({
      ...prev,
      techWatch: {
        ...prev.techWatch,
        focusTopics: prev.techWatch.focusTopics.filter((item) => item.id !== topicId)
      }
    }));
  }, []);

  const addTechWatchSource = useCallback((source: TechWatchSourceInput) => {
    setContent((prev) => ({
      ...prev,
      techWatch: {
        ...prev.techWatch,
        sources: [...prev.techWatch.sources, sanitizeTechWatchSource({ ...source, id: createId() })]
      }
    }));
  }, []);

  const updateTechWatchSource = useCallback((sourceId: string, source: TechWatchSourceInput) => {
    setContent((prev) => ({
      ...prev,
      techWatch: {
        ...prev.techWatch,
        sources: prev.techWatch.sources.map((item) =>
          item.id === sourceId ? sanitizeTechWatchSource({ ...source, id: sourceId }) : item
        )
      }
    }));
  }, []);

  const deleteTechWatchSource = useCallback((sourceId: string) => {
    setContent((prev) => ({
      ...prev,
      techWatch: {
        ...prev.techWatch,
        sources: prev.techWatch.sources.filter((item) => item.id !== sourceId)
      }
    }));
  }, []);

  const addTechWatchRoadmapStep = useCallback((step: TechWatchRoadmapStepInput) => {
    setContent((prev) => ({
      ...prev,
      techWatch: {
        ...prev.techWatch,
        roadmap: [...prev.techWatch.roadmap, sanitizeTechWatchRoadmapStep({ ...step, id: createId() })]
      }
    }));
  }, []);

  const updateTechWatchRoadmapStep = useCallback((stepId: string, step: TechWatchRoadmapStepInput) => {
    setContent((prev) => ({
      ...prev,
      techWatch: {
        ...prev.techWatch,
        roadmap: prev.techWatch.roadmap.map((item) =>
          item.id === stepId ? sanitizeTechWatchRoadmapStep({ ...step, id: stepId }) : item
        )
      }
    }));
  }, []);

  const deleteTechWatchRoadmapStep = useCallback((stepId: string) => {
    setContent((prev) => ({
      ...prev,
      techWatch: {
        ...prev.techWatch,
        roadmap: prev.techWatch.roadmap.filter((item) => item.id !== stepId)
      }
    }));
  }, []);

  const resetData = useCallback(() => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }

    const snapshot = defaultDataRef.current;

    setProjects(cloneProjects(snapshot.projects));
    setSkills(cloneSkills(snapshot.skills));
    setContent(cloneContent(snapshot.content));
  }, []);

  const exportData = useCallback((): StoredData => ({
    projects: projects.map((project) => sanitizeProject(project)),
    skills: skills.map((skill) => sanitizeSkill(skill)),
    content: sanitizeContent(content, DEFAULT_CONTENT)
  }), [projects, skills, content]);

  const importData = useCallback((data: unknown) => {
    const sanitized = sanitizeStoredData(data, { projects, skills, content });

    setProjects(cloneProjects(sanitized.projects));
    setSkills(cloneSkills(sanitized.skills));
    setContent(cloneContent(sanitized.content));
  }, [projects, skills, content]);

  const value = useMemo<PortfolioDataContextValue>(
    () => ({
      projects,
      skills,
      hero: content.hero,
      highlights: content.highlights,
      about: content.about,
      experiences: content.experiences,
      softSkills: content.softSkills,
      certifications: content.certifications,
      techWatch: content.techWatch,
      addProject,
      updateProject,
      deleteProject,
      addSkill,
      updateSkill,
      deleteSkill,
      updateHero,
      addHighlight,
      updateHighlight,
      deleteHighlight,
      updateAbout,
      addExperience,
      updateExperience,
      deleteExperience,
      addSoftSkill,
      updateSoftSkill,
      deleteSoftSkill,
      addCertification,
      updateCertification,
      deleteCertification,
      updateTechWatchIntro,
      addTechWatchTopic,
      updateTechWatchTopic,
      deleteTechWatchTopic,
      addTechWatchSource,
      updateTechWatchSource,
      deleteTechWatchSource,
      addTechWatchRoadmapStep,
      updateTechWatchRoadmapStep,
      deleteTechWatchRoadmapStep,
      resetData,
      exportData,
      importData
    }), [
      projects,
      skills,
      content,
      addProject,
      updateProject,
      deleteProject,
      addSkill,
      updateSkill,
      deleteSkill,
      updateHero,
      addHighlight,
      updateHighlight,
      deleteHighlight,
      updateAbout,
      addExperience,
      updateExperience,
      deleteExperience,
      addSoftSkill,
      updateSoftSkill,
      deleteSoftSkill,
      addCertification,
      updateCertification,
      deleteCertification,
      updateTechWatchIntro,
      addTechWatchTopic,
      updateTechWatchTopic,
      deleteTechWatchTopic,
      addTechWatchSource,
      updateTechWatchSource,
      deleteTechWatchSource,
      addTechWatchRoadmapStep,
      updateTechWatchRoadmapStep,
      deleteTechWatchRoadmapStep,
      resetData,
      exportData,
      importData
    ]);

  return <PortfolioDataContext.Provider value={value}>{children}</PortfolioDataContext.Provider>;
};

export const usePortfolioData = () => {
  const context = useContext(PortfolioDataContext);

  if (!context) {
    throw new Error("usePortfolioData doit être utilisé dans un PortfolioDataProvider");
  }

  return context;
};
