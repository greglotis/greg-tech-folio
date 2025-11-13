import {
  createContext,
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

// Extended data types for full admin editing
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

export interface TechTopic {
  id: string;
  title: string;
  description: string;
  actions: string[];
}

export type TechTopicInput = Omit<TechTopic, "id">;

export interface TechSource {
  id: string;
  label: string;
  items: string[];
}

export type TechSourceInput = Omit<TechSource, "id">;

export interface TechRoadmapStep {
  id: string;
  period: string;
  goals: string[];
}

export type TechRoadmapStepInput = Omit<TechRoadmapStep, "id">;

export interface ContactInfo {
  email: string;
  linkedinUrl: string;
  locationLine1: string;
  locationLine2?: string;
}

interface PortfolioDataContextValue {
  projects: Project[];
  skills: Skill[];
  certifications: Certification[];
  techTopics: TechTopic[];
  techSources: TechSource[];
  techRoadmap: TechRoadmapStep[];
  contact: ContactInfo;
  addProject: (project: ProjectInput) => void;
  updateProject: (projectId: string, project: ProjectInput) => void;
  deleteProject: (projectId: string) => void;
  addSkill: (skill: SkillInput) => void;
  updateSkill: (skillId: string, skill: SkillInput) => void;
  deleteSkill: (skillId: string) => void;
  addCertification: (cert: CertificationInput) => void;
  updateCertification: (certId: string, cert: CertificationInput) => void;
  deleteCertification: (certId: string) => void;
  addTechTopic: (topic: TechTopicInput) => void;
  updateTechTopic: (topicId: string, topic: TechTopicInput) => void;
  deleteTechTopic: (topicId: string) => void;
  addTechSource: (source: TechSourceInput) => void;
  updateTechSource: (sourceId: string, source: TechSourceInput) => void;
  deleteTechSource: (sourceId: string) => void;
  addTechRoadmapStep: (step: TechRoadmapStepInput) => void;
  updateTechRoadmapStep: (stepId: string, step: TechRoadmapStepInput) => void;
  deleteTechRoadmapStep: (stepId: string) => void;
  updateContact: (contact: ContactInfo) => void;
  resetData: () => void;
  exportData: () => StoredData;
  importData: (data: unknown) => void;
}

const STORAGE_KEY = "portfolio-data";

type StoredData = {
  projects: Project[];
  skills: Skill[];
  certifications: Certification[];
  techTopics: TechTopic[];
  techSources: TechSource[];
  techRoadmap: TechRoadmapStep[];
  contact: ContactInfo;
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
      "Inventaires automatique de 100+ postes",
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

// Nouvelles données par défaut (issues des pages statiques)
const DEFAULT_CERTIFICATIONS: Certification[] = [
  {
    id: "ccna",
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
    id: "az900",
    title: "Notions de Base en Réseaux",
    organization: "Cisco",
    date: "2024",
    summary:
      "Appréhension des concepts de base des réseaux, de l'Internet et de la communication entre les équipements informatiques.",
    highlights: [
      "- Mise en place d'une infrastructure réseau",
          "- Configuration et gestion des routeurs et switches",
          "- Sécurisation des accès réseau",
          "- Dépannage des problèmes de connectivité",
          "- Protocoles de communication utilisés sur Internet (TCP/IP",
          "DNS",
          "DHCP)"
    ],
    skills: ["Routage",
          "Switching",
          "Sécurité et Protocoles"]
  },
  {
    id: "itil4",
    title: "Introduction a la cybersécurité",
    organization: "Cisco",
    date: "2024",
    summary:
      "Cette certification permet d'acquérir une compréhension des fondamentaux de la cybersécurité, des menaces potentielles, ainsi que des bonnes pratiques pour protéger les systèmes informatiques. Elle aborde également les bases des technologies de sécurité utilisées pour se défendre contre les attaques et les vulnérabilités.",
    highlights: [
     "- Comprendre les principes de base de la cybersécurité",
          "- Identifier les menaces et les vulnérabilités",
          "- Protéger les systèmes et réseaux contre les attaques",
          "- Utiliser des outils de cybersécurité pour détecter et prévenir les intrusions"
    ],
    skills: ["Cybersécurité",
          "Protection",
          "Gestion des risques",
          "Cryptographie",
          "Analyse des menaces"]
  }
];

const DEFAULT_TECH_TOPICS: TechTopic[] = [
  { id: "infra-cloud", title: "Infrastructure & Cloud", description: "Surveillance continue des évolutions autour de Proxmox, VMware et des solutions de sauvegarde hybrides.", actions: [
    "Tests réguliers des versions beta de Proxmox VE pour anticiper les migrations.",
    "Veille sur la redondance des sauvegardes et sur les solutions de PRA accessibles."
  ]},
  { id: "secops", title: "Sécurité Opérationnelle", description: "Suivi des publications CERT-FR, bulletins Microsoft et best practices ANSSI pour renforcer les postes et serveurs.", actions: [
    "Mise en place d'alertes RSS et newsletters dédiées à la cybersécurité.",
    "Ateliers internes pour sensibiliser les équipes sur les nouvelles campagnes de phishing."
  ]},
  { id: "collab-support", title: "Collaboration & Support", description: "Exploration des outils d'assistance à distance, de ticketing et d'automatisation (GLPI, ITSM, scripts PowerShell).", actions: [
    "Comparaison des solutions d'inventaire réseau pour optimiser la gestion de parc.",
    "Expérimentation d'automatisations PowerShell pour accélérer l'onboarding."
  ]}
];

const DEFAULT_TECH_SOURCES: TechSource[] = [
  { id: "blogs", label: "Blogs & Newsletters", items: [
    "Blog Proxmox, VMware Tech Journal",
    "CERT-FR, Zataz, ANSSI",
    "3CX Updates, Microsoft Learn"
  ]},
  { id: "communautes", label: "Communautés", items: [
    "Réseau Proxmox France, forums Spiceworks",
    "Groupes Discord/Reddit dédiés à la cybersécurité",
    "Meetups locaux autour de l'IT"
  ]},
  { id: "terrain", label: "Sur le terrain", items: [
    "Retours d'expérience des équipes",
    "Partage de bonnes pratiques avec la DSI",
    "Échanges avec les prestataires et partenaires"
  ]}
];

const DEFAULT_TECH_ROADMAP: TechRoadmapStep[] = [
  { id: "t1", period: "Trimestre 1", goals: [
    "Évaluer les nouveautés Proxmox Backup Server 3.x",
    "Mettre à jour les scripts de supervision pour les serveurs critiques"
  ]},
  { id: "t2", period: "Trimestre 2", goals: [
    "Tester l'intégration d'une solution EDR adaptée au secteur public",
    "Documenter une procédure PRA simplifiée pour les sites secondaires"
  ]},
  { id: "t3", period: "Trimestre 3", goals: [
    "Déployer un pilote de gestion de parc automatisée",
    "Organiser un atelier de sensibilisation sécurité"
  ]}
];

const DEFAULT_CONTACT: ContactInfo = {
  email: "contact@greg-portfolio.fr",
  linkedinUrl: "https://www.linkedin.com/in/greg-lamataki-5794b22b7/",
  locationLine1: "France",
  locationLine2: "Disponible pour opportunités"
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

const cloneCertifications = (items: Certification[]): Certification[] =>
  items.map((c) => ({ ...c, highlights: [...c.highlights], skills: [...c.skills] }));
const cloneTechTopics = (items: TechTopic[]): TechTopic[] => items.map((t) => ({ ...t, actions: [...t.actions] }));
const cloneTechSources = (items: TechSource[]): TechSource[] => items.map((s) => ({ ...s, items: [...s.items] }));
const cloneTechRoadmap = (items: TechRoadmapStep[]): TechRoadmapStep[] => items.map((s) => ({ ...s, goals: [...s.goals] }));
const cloneContact = (c: ContactInfo): ContactInfo => ({ ...c });

const isIconKey = (value: unknown): value is IconKey =>
  typeof value === "string" && value in iconLibrary;

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
      ? safeProject.technologies.filter((tech) => typeof tech === "string" && tech.trim().length > 0)
      : [],
    achievements: Array.isArray(safeProject.achievements)
      ? safeProject.achievements.filter((item) => typeof item === "string" && item.trim().length > 0)
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

const sanitizeStoredData = (data: unknown, fallback: StoredData): StoredData => {
  if (!data || typeof data !== "object") {
    throw new Error("Format de données JSON invalide");
  }

  const partial = data as Partial<StoredData>;
  const hasProjects = Object.prototype.hasOwnProperty.call(partial, "projects");
  const hasSkills = Object.prototype.hasOwnProperty.call(partial, "skills");

  if (!hasProjects && !hasSkills) {
    throw new Error("Le fichier JSON ne contient ni projets ni compétences");
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

  return {
    projects,
    skills
  };
};

// V2: étend la structure pour toutes les sections administrables
const sanitizeStoredDataV2 = (data: unknown, fallback: StoredData): StoredData => {
  if (!data || typeof data !== "object") {
    throw new Error("Format de données JSON invalide");
  }

  const partial = data as Partial<StoredData>;
  const has = (k: keyof StoredData) => Object.prototype.hasOwnProperty.call(partial, k);

  const projects = has("projects") && Array.isArray(partial.projects)
    ? partial.projects.map((project) => sanitizeProject(project))
    : fallback.projects;

  const skills = has("skills") && Array.isArray(partial.skills)
    ? partial.skills.map((skill) => sanitizeSkill(skill))
    : fallback.skills;

  const certifications = has("certifications") && Array.isArray((partial as any).certifications)
    ? (partial as any).certifications.map((c: any) => ({
        id: typeof c.id === "string" && c.id ? c.id : createId(),
        title: String(c.title ?? ""),
        organization: String(c.organization ?? c.organisation ?? ""),
        date: String(c.date ?? ""),
        summary: String(c.summary ?? ""),
        highlights: Array.isArray(c.highlights) ? c.highlights.map((v: any) => String(v)) : [],
        skills: Array.isArray(c.skills) ? c.skills.map((v: any) => String(v)) : []
      }))
    : (fallback as any).certifications ?? [];

  const techTopics = has("techTopics") && Array.isArray((partial as any).techTopics)
    ? (partial as any).techTopics.map((t: any) => ({
        id: typeof t.id === "string" && t.id ? t.id : createId(),
        title: String(t.title ?? ""),
        description: String(t.description ?? ""),
        actions: Array.isArray(t.actions) ? t.actions.map((v: any) => String(v)) : []
      }))
    : (fallback as any).techTopics ?? [];

  const techSources = has("techSources") && Array.isArray((partial as any).techSources)
    ? (partial as any).techSources.map((s: any) => ({
        id: typeof s.id === "string" && s.id ? s.id : createId(),
        label: String(s.label ?? ""),
        items: Array.isArray(s.items) ? s.items.map((v: any) => String(v)) : []
      }))
    : (fallback as any).techSources ?? [];

  const techRoadmap = has("techRoadmap") && Array.isArray((partial as any).techRoadmap)
    ? (partial as any).techRoadmap.map((s: any) => ({
        id: typeof s.id === "string" && s.id ? s.id : createId(),
        period: String(s.period ?? ""),
        goals: Array.isArray(s.goals) ? s.goals.map((v: any) => String(v)) : []
      }))
    : (fallback as any).techRoadmap ?? [];

  const contact = has("contact") && (partial as any).contact
    ? {
        email: String((partial as any).contact.email ?? (fallback as any).contact?.email ?? ""),
        linkedinUrl: String((partial as any).contact.linkedinUrl ?? (fallback as any).contact?.linkedinUrl ?? ""),
        locationLine1: String((partial as any).contact.locationLine1 ?? (fallback as any).contact?.locationLine1 ?? ""),
        locationLine2: (partial as any).contact.locationLine2
          ? String((partial as any).contact.locationLine2)
          : (fallback as any).contact?.locationLine2
      }
    : (fallback as any).contact ?? DEFAULT_CONTACT;

  return {
    projects,
    skills,
    certifications: certifications as any,
    techTopics: techTopics as any,
    techSources: techSources as any,
    techRoadmap: techRoadmap as any,
    contact: contact as any
  } as StoredData;
};

export const PortfolioDataProvider = ({ children }: { children: ReactNode }) => {
  const defaultDataRef = useRef<StoredData>({
    projects: cloneProjects(DEFAULT_PROJECTS),
    skills: cloneSkills(DEFAULT_SKILLS),
    certifications: cloneCertifications(DEFAULT_CERTIFICATIONS),
    techTopics: cloneTechTopics(DEFAULT_TECH_TOPICS),
    techSources: cloneTechSources(DEFAULT_TECH_SOURCES),
    techRoadmap: cloneTechRoadmap(DEFAULT_TECH_ROADMAP),
    contact: cloneContact(DEFAULT_CONTACT)
  });
  const [projects, setProjects] = useState<Project[]>(() => cloneProjects(DEFAULT_PROJECTS));
  const [skills, setSkills] = useState<Skill[]>(() => cloneSkills(DEFAULT_SKILLS));
  const [certifications, setCertifications] = useState<Certification[]>(() => cloneCertifications(DEFAULT_CERTIFICATIONS));
  const [techTopics, setTechTopics] = useState<TechTopic[]>(() => cloneTechTopics(DEFAULT_TECH_TOPICS));
  const [techSources, setTechSources] = useState<TechSource[]>(() => cloneTechSources(DEFAULT_TECH_SOURCES));
  const [techRoadmap, setTechRoadmap] = useState<TechRoadmapStep[]>(() => cloneTechRoadmap(DEFAULT_TECH_ROADMAP));
  const [contact, setContact] = useState<ContactInfo>(() => cloneContact(DEFAULT_CONTACT));
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
          const sanitized = sanitizeStoredDataV2(parsed, defaultDataRef.current);
          const snapshot: StoredData = {
            projects: cloneProjects(sanitized.projects),
            skills: cloneSkills(sanitized.skills),
            certifications: cloneCertifications((sanitized as any).certifications),
            techTopics: cloneTechTopics((sanitized as any).techTopics),
            techSources: cloneTechSources((sanitized as any).techSources),
            techRoadmap: cloneTechRoadmap((sanitized as any).techRoadmap),
            contact: cloneContact((sanitized as any).contact)
          };

          if (!isCancelled) {
            setProjects(snapshot.projects);
            setSkills(snapshot.skills);
            setCertifications(snapshot.certifications);
            setTechTopics(snapshot.techTopics);
            setTechSources(snapshot.techSources);
            setTechRoadmap(snapshot.techRoadmap);
            setContact(snapshot.contact);
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
            const sanitized = sanitizeStoredDataV2(parsed, defaultDataRef.current);
            const snapshot: StoredData = {
              projects: cloneProjects(sanitized.projects),
              skills: cloneSkills(sanitized.skills),
              certifications: cloneCertifications((sanitized as any).certifications),
              techTopics: cloneTechTopics((sanitized as any).techTopics),
              techSources: cloneTechSources((sanitized as any).techSources),
              techRoadmap: cloneTechRoadmap((sanitized as any).techRoadmap),
              contact: cloneContact((sanitized as any).contact)
            };

            if (!isCancelled) {
              defaultDataRef.current = snapshot;
              setProjects(snapshot.projects);
              setSkills(snapshot.skills);
              setCertifications(snapshot.certifications);
              setTechTopics(snapshot.techTopics);
              setTechSources(snapshot.techSources);
              setTechRoadmap(snapshot.techRoadmap);
              setContact(snapshot.contact);
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

    const dataToStore: StoredData = {
      projects: projects.map((project) => sanitizeProject(project)),
      skills: skills.map((skill) => sanitizeSkill(skill)),
      certifications: cloneCertifications(certifications),
      techTopics: cloneTechTopics(techTopics),
      techSources: cloneTechSources(techSources),
      techRoadmap: cloneTechRoadmap(techRoadmap),
      contact: cloneContact(contact)
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore));
  }, [projects, skills, isLoaded]);

  const addProject = (project: ProjectInput) => {
    setProjects((prev) => [...prev, sanitizeProject({ ...project, id: createId() })]);
  };

  const updateProject = (projectId: string, project: ProjectInput) => {
    setProjects((prev) =>
      prev.map((item) => (item.id === projectId ? sanitizeProject({ ...project, id: projectId }) : item))
    );
  };

  const deleteProject = (projectId: string) => {
    setProjects((prev) => prev.filter((project) => project.id !== projectId));
  };

  const addSkill = (skill: SkillInput) => {
    setSkills((prev) => [...prev, sanitizeSkill({ ...skill, id: createId() })]);
  };

  const updateSkill = (skillId: string, skill: SkillInput) => {
    setSkills((prev) =>
      prev.map((item) => (item.id === skillId ? sanitizeSkill({ ...skill, id: skillId }) : item))
    );
  };

  const deleteSkill = (skillId: string) => {
    setSkills((prev) => prev.filter((skill) => skill.id !== skillId));
  };

  // Certifications CRUD
  const addCertification = (cert: CertificationInput) => {
    setCertifications((prev) => [
      ...prev,
      { ...cert, id: createId(), highlights: cert.highlights.map(String), skills: cert.skills.map(String) }
    ]);
  };

  const updateCertification = (certId: string, cert: CertificationInput) => {
    setCertifications((prev) =>
      prev.map((c) => (c.id === certId ? { ...cert, id: certId, highlights: cert.highlights.map(String), skills: cert.skills.map(String) } : c))
    );
  };

  const deleteCertification = (certId: string) => {
    setCertifications((prev) => prev.filter((c) => c.id !== certId));
  };

  // Tech watch CRUD
  const addTechTopic = (topic: TechTopicInput) => {
    setTechTopics((prev) => [...prev, { ...topic, id: createId(), actions: topic.actions.map(String) }]);
  };
  const updateTechTopic = (topicId: string, topic: TechTopicInput) => {
    setTechTopics((prev) => prev.map((t) => (t.id === topicId ? { ...topic, id: topicId, actions: topic.actions.map(String) } : t)));
  };
  const deleteTechTopic = (topicId: string) => {
    setTechTopics((prev) => prev.filter((t) => t.id !== topicId));
  };

  const addTechSource = (source: TechSourceInput) => {
    setTechSources((prev) => [...prev, { ...source, id: createId(), items: source.items.map(String) }]);
  };
  const updateTechSource = (sourceId: string, source: TechSourceInput) => {
    setTechSources((prev) => prev.map((s) => (s.id === sourceId ? { ...source, id: sourceId, items: source.items.map(String) } : s)));
  };
  const deleteTechSource = (sourceId: string) => {
    setTechSources((prev) => prev.filter((s) => s.id !== sourceId));
  };

  const addTechRoadmapStep = (step: TechRoadmapStepInput) => {
    setTechRoadmap((prev) => [...prev, { ...step, id: createId(), goals: step.goals.map(String) }]);
  };
  const updateTechRoadmapStep = (stepId: string, step: TechRoadmapStepInput) => {
    setTechRoadmap((prev) => prev.map((s) => (s.id === stepId ? { ...step, id: stepId, goals: step.goals.map(String) } : s)));
  };
  const deleteTechRoadmapStep = (stepId: string) => {
    setTechRoadmap((prev) => prev.filter((s) => s.id !== stepId));
  };

  const updateContact = (value: ContactInfo) => {
    setContact({
      email: String(value.email || ""),
      linkedinUrl: String(value.linkedinUrl || ""),
      locationLine1: String(value.locationLine1 || ""),
      locationLine2: value.locationLine2 ? String(value.locationLine2) : undefined
    });
  };

  const resetData = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }

    const snapshot = defaultDataRef.current;

    setProjects(cloneProjects(snapshot.projects));
    setSkills(cloneSkills(snapshot.skills));
    setCertifications(cloneCertifications(snapshot.certifications));
    setTechTopics(cloneTechTopics(snapshot.techTopics));
    setTechSources(cloneTechSources(snapshot.techSources));
    setTechRoadmap(cloneTechRoadmap(snapshot.techRoadmap));
    setContact(cloneContact(snapshot.contact));
  };

  const exportData = (): StoredData => ({
    projects: projects.map((project) => sanitizeProject(project)),
    skills: skills.map((skill) => sanitizeSkill(skill)),
    certifications: cloneCertifications(certifications),
    techTopics: cloneTechTopics(techTopics),
    techSources: cloneTechSources(techSources),
    techRoadmap: cloneTechRoadmap(techRoadmap),
    contact: cloneContact(contact)
  });

  const importData = (data: unknown) => {
    const sanitized = sanitizeStoredDataV2(data, defaultDataRef.current);

    setProjects(cloneProjects(sanitized.projects));
    setSkills(cloneSkills(sanitized.skills));
    setCertifications(cloneCertifications((sanitized as any).certifications));
    setTechTopics(cloneTechTopics((sanitized as any).techTopics));
    setTechSources(cloneTechSources((sanitized as any).techSources));
    setTechRoadmap(cloneTechRoadmap((sanitized as any).techRoadmap));
    setContact(cloneContact((sanitized as any).contact));
  };

  const value = useMemo<PortfolioDataContextValue>(() => ({
    projects,
    skills,
    certifications,
    techTopics,
    techSources,
    techRoadmap,
    contact,
    addProject,
    updateProject,
    deleteProject,
    addSkill,
    updateSkill,
    deleteSkill,
    addCertification: (cert) => addCertification(cert),
    updateCertification: (id, cert) => updateCertification(id, cert),
    deleteCertification: (id) => deleteCertification(id),
    addTechTopic: (t) => addTechTopic(t),
    updateTechTopic: (id, t) => updateTechTopic(id, t),
    deleteTechTopic: (id) => deleteTechTopic(id),
    addTechSource: (s) => addTechSource(s),
    updateTechSource: (id, s) => updateTechSource(id, s),
    deleteTechSource: (id) => deleteTechSource(id),
    addTechRoadmapStep: (s) => addTechRoadmapStep(s),
    updateTechRoadmapStep: (id, s) => updateTechRoadmapStep(id, s),
    deleteTechRoadmapStep: (id) => deleteTechRoadmapStep(id),
    updateContact: (c) => updateContact(c),
    resetData,
    exportData,
    importData
  }), [projects, skills, certifications, techTopics, techSources, techRoadmap, contact]);

  return <PortfolioDataContext.Provider value={value}>{children}</PortfolioDataContext.Provider>;
};

export const usePortfolioData = () => {
  const context = useContext(PortfolioDataContext);

  if (!context) {
    throw new Error("usePortfolioData doit être utilisé dans un PortfolioDataProvider");
  }

  return context;
};
