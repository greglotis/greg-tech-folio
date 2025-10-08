import {
  createContext,
  useContext,
  useEffect,
  useMemo,
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

interface PortfolioDataContextValue {
  projects: Project[];
  skills: Skill[];
  addProject: (project: ProjectInput) => void;
  updateProject: (projectId: string, project: ProjectInput) => void;
  deleteProject: (projectId: string) => void;
  addSkill: (skill: SkillInput) => void;
  updateSkill: (skillId: string, skill: SkillInput) => void;
  deleteSkill: (skillId: string) => void;
  resetData: () => void;
}

const STORAGE_KEY = "portfolio-data";

type StoredData = {
  projects: Project[];
  skills: Skill[];
};

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

const isIconKey = (value: unknown): value is IconKey =>
  typeof value === "string" && value in iconLibrary;

const sanitizeProject = (project: Partial<Project>): Project => ({
  id: typeof project.id === "string" ? project.id : createId(),
  title: typeof project.title === "string" && project.title.trim().length > 0 ? project.title : "Projet sans titre",
  description: typeof project.description === "string" ? project.description : "",
  icon: isIconKey(project.icon) ? project.icon : DEFAULT_ICON,
  technologies: Array.isArray(project.technologies)
    ? project.technologies.filter((tech) => typeof tech === "string" && tech.trim().length > 0)
    : [],
  achievements: Array.isArray(project.achievements)
    ? project.achievements.filter((item) => typeof item === "string" && item.trim().length > 0)
    : []
});

const sanitizeSkill = (skill: Partial<Skill>): Skill => ({
  id: typeof skill.id === "string" ? skill.id : createId(),
  name: typeof skill.name === "string" && skill.name.trim().length > 0 ? skill.name : "Compétence",
  category: typeof skill.category === "string" && skill.category.trim().length > 0 ? skill.category : "Autre",
  icon: isIconKey(skill.icon) ? skill.icon : DEFAULT_ICON
});

export const PortfolioDataProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>(() => cloneProjects(DEFAULT_PROJECTS));
  const [skills, setSkills] = useState<Skill[]>(() => cloneSkills(DEFAULT_SKILLS));
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      setIsLoaded(true);
      return;
    }

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);

      if (stored) {
        const parsed = JSON.parse(stored) as Partial<StoredData>;

        if (Array.isArray(parsed.projects)) {
          setProjects(cloneProjects(parsed.projects.map(sanitizeProject)));
        }

        if (Array.isArray(parsed.skills)) {
          setSkills(cloneSkills(parsed.skills.map(sanitizeSkill)));
        }
      }
    } catch (error) {
      console.error("Impossible de charger les données du portfolio", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded || typeof window === "undefined") {
      return;
    }

    const dataToStore: StoredData = {
      projects: projects.map(sanitizeProject),
      skills: skills.map(sanitizeSkill)
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

  const resetData = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }

    setProjects(cloneProjects(DEFAULT_PROJECTS));
    setSkills(cloneSkills(DEFAULT_SKILLS));
  };

  const value = useMemo<PortfolioDataContextValue>(() => ({
    projects,
    skills,
    addProject,
    updateProject,
    deleteProject,
    addSkill,
    updateSkill,
    deleteSkill,
    resetData
  }), [projects, skills]);

  return <PortfolioDataContext.Provider value={value}>{children}</PortfolioDataContext.Provider>;
};

export const usePortfolioData = () => {
  const context = useContext(PortfolioDataContext);

  if (!context) {
    throw new Error("usePortfolioData doit être utilisé dans un PortfolioDataProvider");
  }

  return context;
};
