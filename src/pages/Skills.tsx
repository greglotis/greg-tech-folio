import { useEffect, useRef, useState } from "react";

interface Skill {
  name: string;
  level: number;
  category: string;
}

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const skills: Skill[] = [
    // Systèmes
    { name: "Windows Server", level: 90, category: "Systèmes" },
    { name: "Linux (Debian/Ubuntu)", level: 85, category: "Systèmes" },
    { name: "Active Directory", level: 88, category: "Systèmes" },
    { name: "Virtualisation (Proxmox)", level: 85, category: "Systèmes" },
    
    // Réseau
    { name: "Cisco IOS", level: 82, category: "Réseau" },
    { name: "VLANs & Routage", level: 88, category: "Réseau" },
    { name: "VPN & Sécurité réseau", level: 80, category: "Réseau" },
    { name: "TCP/IP", level: 90, category: "Réseau" },
    
    // Services
    { name: "GLPI", level: 85, category: "Services" },
    { name: "DNS & DHCP", level: 88, category: "Services" },
    { name: "3CX / VoIP", level: 75, category: "Services" },
    { name: "Apache / Nginx", level: 80, category: "Services" },
    
    // Sécurité & Monitoring
    { name: "pfSense", level: 82, category: "Sécurité" },
    { name: "Backup & PRA", level: 85, category: "Sécurité" },
    { name: "Monitoring (Nagios)", level: 75, category: "Sécurité" },
  ];

  const categories = Array.from(new Set(skills.map(s => s.category)));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4" ref={sectionRef}>
      <div className="container mx-auto max-w-5xl">
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
              
              <div className="grid gap-6">
                {skills
                  .filter(skill => skill.category === category)
                  .map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-accent to-secondary rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: isVisible ? `${skill.level}%` : '0%',
                            transitionDelay: `${index * 0.1}s`
                          }}
                        />
                      </div>
                    </div>
                  ))}
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
