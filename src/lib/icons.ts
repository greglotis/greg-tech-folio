import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Boxes,
  Briefcase,
  Cloud,
  Database,
  FileText,
  Folder,
  Globe,
  HardDrive,
  Lock,
  Monitor,
  Network,
  Phone,
  Server,
  Shield,
  Wifi
} from "lucide-react";

export const iconLibrary = {
  activity: Activity,
  boxes: Boxes,
  briefcase: Briefcase,
  cloud: Cloud,
  database: Database,
  fileText: FileText,
  globe: Globe,
  hardDrive: HardDrive,
  lock: Lock,
  monitor: Monitor,
  network: Network,
  phone: Phone,
  server: Server,
  shield: Shield,
  wifi: Wifi
} as const;

export type IconKey = keyof typeof iconLibrary;

export const DEFAULT_ICON: IconKey = "server";

export const iconOptions: { value: IconKey; label: string }[] = [
  { value: "server", label: "Serveur" },
  { value: "database", label: "Base de données" },
  { value: "network", label: "Réseau" },
  { value: "phone", label: "Téléphonie" },
  { value: "shield", label: "Sécurité" },
  { value: "monitor", label: "Systèmes" },
  { value: "boxes", label: "Virtualisation" },
  { value: "wifi", label: "Wi-Fi" },
  { value: "lock", label: "Sécurité (Lock)" },
  { value: "globe", label: "Réseau global" },
  { value: "fileText", label: "Fichiers & ITSM" },
  { value: "cloud", label: "Cloud" },
  { value: "hardDrive", label: "Sauvegarde" },
  { value: "activity", label: "Monitoring" },
  { value: "briefcase", label: "Portefeuille" }
] as const;

export const fallbackIcon = Folder;

export const getIconComponent = (key?: string): LucideIcon => {
  if (key && key in iconLibrary) {
    return iconLibrary[key as IconKey];
  }
  return fallbackIcon;
};
