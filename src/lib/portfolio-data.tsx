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
  exportData: () => StoredData;
  importData: (data: unknown) => void;
}

const STORAGE_KEY = "portfolio-data";

type StoredData = {
  projects: Project[];
  skills: Skill[];
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

export const PortfolioDataProvider = ({ children }: { children: ReactNode }) => {
  const defaultDataRef = useRef<StoredData>({
    projects: cloneProjects(DEFAULT_PROJECTS),
    skills: cloneSkills(DEFAULT_SKILLS)
  });
  const [projects, setProjects] = useState<Project[]>(() => cloneProjects(DEFAULT_PROJECTS));
  const [skills, setSkills] = useState<Skill[]>(() => cloneSkills(DEFAULT_SKILLS));
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
            skills: cloneSkills(sanitized.skills)
          };

          if (!isCancelled) {
            setProjects(snapshot.projects);
            setSkills(snapshot.skills);
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
              skills: cloneSkills(sanitized.skills)
            };

            if (!isCancelled) {
              defaultDataRef.current = snapshot;
              setProjects(snapshot.projects);
              setSkills(snapshot.skills);
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
      skills: skills.map((skill) => sanitizeSkill(skill))
    } satisfies StoredData;

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

    const snapshot = defaultDataRef.current;

    setProjects(cloneProjects(snapshot.projects));
    setSkills(cloneSkills(snapshot.skills));
  };

  const exportData = (): StoredData => ({
    projects: projects.map((project) => sanitizeProject(project)),
    skills: skills.map((skill) => sanitizeSkill(skill))
  });

  const importData = (data: unknown) => {
    const sanitized = sanitizeStoredData(data, { projects, skills });

    setProjects(cloneProjects(sanitized.projects));
    setSkills(cloneSkills(sanitized.skills));
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
    resetData,
    exportData,
    importData
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
