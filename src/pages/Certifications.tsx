import { Badge } from "@/components/ui/badge";
import { usePortfolioData } from "@/lib/portfolio-data";

const Certifications = () => {
  const { certifications } = usePortfolioData();
  const staticCerts = [
    {
      title: "CCNA: Switching, Routing & Wireless Essentials",
      organization: "Cisco Networking Academy",
      date: "2023",
      summary:
        "Validation des bases avancées en administration de réseaux, configuration d'équipements Cisco et dépannage d'infrastructures d'entreprise.",
      highlights: [
        "Mise en place complète d'une infrastructure LAN/WAN avec VLANs et routage inter-VLAN.",
        "Configuration des protocoles OSPF et RSTP pour garantir la résilience du réseau.",
        "Dépannage des déploiements sans-fil et sécurisation des accès.",
      ],
      skills: ["Routage", "Switching", "Sécurité réseau", "Cisco IOS"],
    },
    {
      title: "Azure Fundamentals (AZ-900)",
      organization: "Microsoft",
      date: "2022",
      summary:
        "Compréhension des principes du cloud Microsoft Azure, de la sécurité et de la tarification afin d'accompagner les migrations vers les services managés.",
      highlights: [
        "Cartographie des services IaaS/PaaS/SaaS adaptés aux besoins d'une collectivité.",
        "Évaluation des modèles de gouvernance et de gestion des identités Azure AD.",
        "Analyse budgétaire et mise en place d'alertes de consommation.",
      ],
      skills: ["Cloud", "Azure", "Sécurité", "FinOps"],
    },
    {
      title: "ITIL® 4 Foundation",
      organization: "AXELOS",
      date: "2021",
      summary:
        "Acquisition des bonnes pratiques de gestion des services IT pour améliorer le support aux utilisateurs et la continuité d'activité.",
      highlights: [
        "Formalisation d'un catalogue de services et d'indicateurs de suivi.",
        "Optimisation du processus de gestion des incidents et des demandes.",
        "Animation d'ateliers d'amélioration continue avec les équipes support.",
      ],
      skills: ["ITSM", "Gestion des services", "Support utilisateur", "Amélioration continue"],
    },
  ];

  const list = certifications && certifications.length > 0 ? certifications : staticCerts;

  return (
    <div className="pt-28 pb-20 px-4">
      <div className="container mx-auto max-w-5xl space-y-16">
        <header className="space-y-4 text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold">
            Certifications
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            Construire une expertise reconnue
          </h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Une sélection de certifications professionnelles qui attestent de mon engagement continu
            pour maintenir un haut niveau de compétence technique et méthodologique.
          </p>
        </header>

        <section className="space-y-10">
          {list.map((certification, index) => (
            <article
              key={(certification as any).id ?? certification.title}
              className="rounded-2xl border border-border/60 bg-card/80 shadow-soft hover:shadow-medium transition-smooth p-8 space-y-6 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground">{certification.title}</h2>
                  <p className="text-muted-foreground">{certification.organization}</p>
                </div>
                <span className="inline-flex items-center px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  {certification.date}
                </span>
              </div>

              <p className="text-muted-foreground leading-relaxed">{certification.summary}</p>

              <ul className="space-y-3">
                {certification.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3 text-sm md:text-base text-foreground/90">
                    <span className="mt-1 h-2 w-2 rounded-full bg-accent"></span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {certification.skills.map((skill) => (
                  <Badge key={`${(certification as any).id ?? certification.title}-${skill}`} variant="secondary" className="uppercase tracking-wide">
                    {skill}
                  </Badge>
                ))}
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Certifications;
