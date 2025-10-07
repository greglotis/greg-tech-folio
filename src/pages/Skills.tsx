import { Card, CardContent } from "@/components/ui/card";
import { 
  Server, 
  Network, 
  Shield, 
  Database, 
  HardDrive,
  Globe,
  Lock,
  Wifi,
  Monitor,
  Cloud,
  FileText,
  Phone,
  Activity,
  Boxes
} from "lucide-react";
import { LucideIcon } from "lucide-react";

interface Skill {
  name: string;
  icon: LucideIcon;
  category: string;
}

const Skills = () => {
  const skills: Skill[] = [
    // Systèmes
    { name: "Windows Server", icon: Monitor, category: "Systèmes" },
    { name: "Linux (Debian/Ubuntu)", icon: Server, category: "Systèmes" },
    { name: "Active Directory", icon: Database, category: "Systèmes" },
    { name: "Virtualisation (Proxmox)", icon: Boxes, category: "Systèmes" },
    
    // Réseau
    { name: "Cisco IOS", icon: Network, category: "Réseau" },
    { name: "VLANs & Routage", icon: Wifi, category: "Réseau" },
    { name: "VPN & Sécurité réseau", icon: Lock, category: "Réseau" },
    { name: "TCP/IP", icon: Globe, category: "Réseau" },
    
    // Services
    { name: "GLPI", icon: FileText, category: "Services" },
    { name: "DNS & DHCP", icon: Server, category: "Services" },
    { name: "3CX / VoIP", icon: Phone, category: "Services" },
    { name: "Apache / Nginx", icon: Cloud, category: "Services" },
    
    // Sécurité & Monitoring
    { name: "pfSense", icon: Shield, category: "Sécurité" },
    { name: "Backup & PRA", icon: HardDrive, category: "Sécurité" },
    { name: "Monitoring (Nagios)", icon: Activity, category: "Sécurité" },
  ];

  const categories = Array.from(new Set(skills.map(s => s.category)));

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Mes <span className="text-gradient">Compétences</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Compétences techniques acquises à travers ma formation BTS SISR et mes projets pratiques.
          </p>
        </div>

        <div className="space-y-12">
          {categories.map((category, catIndex) => (
            <div 
              key={category} 
              className="space-y-6 animate-fade-in"
              style={{ animationDelay: `${catIndex * 0.1}s` }}
            >
              <h2 className="text-2xl font-semibold flex items-center gap-3">
                <span className="w-12 h-1 bg-accent rounded-full"></span>
                {category}
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {skills
                  .filter(skill => skill.category === category)
                  .map((skill, index) => {
                    const Icon = skill.icon;
                    
                    return (
                      <Card 
                        key={index}
                        className="group hover:shadow-hover hover:border-accent/50 transition-smooth cursor-pointer"
                      >
                        <CardContent className="flex flex-col items-center justify-center p-6 space-y-3">
                          <div className="p-4 bg-accent/10 rounded-xl group-hover:bg-accent/20 group-hover:scale-110 transition-smooth">
                            <Icon className="text-accent" size={32} />
                          </div>
                          <h3 className="text-sm font-medium text-center leading-tight">
                            {skill.name}
                          </h3>
                        </CardContent>
                      </Card>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>

        {/* Soft skills section */}
        <div className="mt-16 p-8 bg-muted/30 rounded-lg">
          <h2 className="text-2xl font-semibold mb-6 text-center">Qualités professionnelles</h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-3xl">🎯</div>
              <h3 className="font-medium">Rigueur</h3>
              <p className="text-sm text-muted-foreground">
                Méthodologie structurée et documentation précise
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="text-3xl">🔍</div>
              <h3 className="font-medium">Analyse</h3>
              <p className="text-sm text-muted-foreground">
                Diagnostic rapide et résolution efficace des problèmes
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="text-3xl">🤝</div>
              <h3 className="font-medium">Collaboration</h3>
              <p className="text-sm text-muted-foreground">
                Esprit d'équipe et communication claire
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
