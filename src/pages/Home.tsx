import { Button } from "@/components/ui/button";
import { Linkedin, Download, ArrowRight, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import profilePhoto from "@/assets/imageGreg.png";
import { usePortfolioData } from "@/lib/portfolio-data";

const Home = () => {
  const { projects, skills } = usePortfolioData();
  const projectCountLabel = projects.length > 0 ? `${projects.length}+` : "0";
  const skillCountLabel = skills.length > 0 ? `${skills.length}+` : "0";

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Text content */}
            <div className="space-y-6 animate-fade-in">
              <div className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium">
                Technicien SISR
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Bonjour, je suis{" "}
                <span className="text-gradient"> LAMATAKI Greg </span>
              </h1>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Etudiant en 2ème année de BTS SIO, option SISR, en alternance au sein de la DSI de la Mairie de NOUMEA.
                Passionné par l'infrastructure réseau, la virtualisation et l'administration système. 
                
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Button asChild size="lg" className="group">
                  <Link to="/projets">
                    Voir mes projets
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                  </Link>
                </Button>

                <Button asChild variant="outline" size="lg">
                  <a href="/Greg-cv.pdf" download>
                    <Download className="mr-2" size={18} />
                    Télécharger CV
                  </a>
                </Button>

                <Button asChild variant="ghost" size="lg">
                  <a href="https://www.linkedin.com/in/greg-lamataki-5794b22b7/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2" size={18} />
                    LinkedIn
                  </a>
                </Button>""

              </div>
            </div>

            {/* Right: Profile photo */}
            <div className="flex justify-center animate-slide-in-right">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-secondary/20 rounded-2xl blur-2xl"></div>
                <img
                  src={profilePhoto}
                  alt="Greg - Technicien Infrastructure"
                  className="relative rounded-2xl shadow-hover w-full max-w-md object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick highlights */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-2 p-6 rounded-lg bg-card shadow-soft hover:shadow-medium transition-smooth">
              <div className="text-3xl font-bold text-accent">{projectCountLabel}</div>
              <p className="text-muted-foreground">Projets réalisés</p>
            </div>

            <div className="text-center space-y-2 p-6 rounded-lg bg-card shadow-soft hover:shadow-medium transition-smooth">
              <div className="text-3xl font-bold text-accent">{skillCountLabel}</div>
              <p className="text-muted-foreground">Technologies maîtrisées</p>
            </div>

            <div className="text-center space-y-2 p-6 rounded-lg bg-card shadow-soft hover:shadow-medium transition-smooth">
              <div className="text-3xl font-bold text-accent">100%</div>
              <p className="text-muted-foreground">Engagement professionnel</p>
            </div>
          </div>
        </div>
      </section>

      {/* About section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center">À propos</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Fort d'une formation BTS SISR, je me spécialise dans la conception, 
              le déploiement et la maintenance d'infrastructures IT complexes. Mon expertise 
              couvre la virtualisation (Proxmox), l'administration réseau (VLANs, Cisco), 
              et les services d'entreprise (Active Directory, 3CX).
            </p>
            <p>
              Rigoureux et méthodique, j'applique les meilleures pratiques pour garantir 
              la sécurité, la performance et la disponibilité des systèmes dont j'ai la charge. 
              Mon approche orientée solution me permet de répondre efficacement aux besoins 
              techniques des organisations.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
