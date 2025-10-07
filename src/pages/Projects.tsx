import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Server, Network, Shield, Phone, Database } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "GLPI & OCS Inventory",
      description: "Mise en place d'une solution complète de gestion de parc informatique avec inventaire automatisé et suivi des tickets.",
      icon: Database,
      technologies: ["GLPI", "OCS Inventory", "MySQL", "PHP", "Apache"],
      achievements: [
        "Inventaire automatique de 100+ postes",
        "Gestion centralisée des tickets",
        "Rapports et tableaux de bord personnalisés"
      ]
    },
    {
      title: "VLANs Cisco",
      description: "Configuration et segmentation réseau avec VLANs sur équipements Cisco pour améliorer la sécurité et les performances.",
      icon: Network,
      technologies: ["Cisco IOS", "VLANs", "Trunking", "STP", "Routage inter-VLAN"],
      achievements: [
        "Segmentation réseau en 5 VLANs métier",
        "Configuration de trunking 802.1Q",
        "Optimisation du routage inter-VLAN"
      ]
    },
    {
      title: "Proxmox & Active Directory",
      description: "Déploiement d'une infrastructure virtualisée avec Proxmox et intégration d'un domaine Active Directory DS.",
      icon: Server,
      technologies: ["Proxmox VE", "Windows Server", "Active Directory", "GPO", "DNS"],
      achievements: [
        "Cluster Proxmox haute disponibilité",
        "Domaine AD avec 3 contrôleurs",
        "Stratégies de groupe (GPO) avancées"
      ]
    },
    {
      title: "Serveur 3CX",
      description: "Installation et configuration d'une solution de téléphonie IP 3CX pour les communications d'entreprise.",
      icon: Phone,
      technologies: ["3CX", "SIP", "VoIP", "Asterisk", "QoS"],
      achievements: [
        "Configuration de 50+ extensions",
        "Intégration avec le réseau VoIP",
        "Mise en place de files d'attente et IVR"
      ]
    },
    {
      title: "Infrastructure de Sécurité",
      description: "Déploiement de solutions de sécurité réseau incluant pare-feu, VPN et surveillance.",
      icon: Shield,
      technologies: ["pfSense", "OpenVPN", "IDS/IPS", "Firewall", "Logs"],
      achievements: [
        "Pare-feu pfSense multi-WAN",
        "VPN site-à-site et client",
        "Monitoring avec Nagios"
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Mes <span className="text-gradient">Projets</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Une sélection de projets techniques réalisés dans le cadre de ma formation SISR 
            et de mes expériences professionnelles.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            const Icon = project.icon;
            
            return (
              <Card 
                key={index} 
                className="shadow-soft hover:shadow-hover transition-smooth animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="p-3 bg-accent/10 rounded-lg">
                      <Icon className="text-accent" size={28} />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription className="text-base">{project.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2 text-sm text-muted-foreground">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <Badge key={i} variant="secondary">{tech}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2 text-sm text-muted-foreground">Réalisations</h4>
                    <ul className="space-y-1">
                      {project.achievements.map((achievement, i) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <span className="text-accent mt-1">▸</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Projects;
