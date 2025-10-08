import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePortfolioData } from "@/lib/portfolio-data";
import { getIconComponent } from "@/lib/icons";

const Projects = () => {
  const { projects } = usePortfolioData();

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 space-y-24">
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

        {projects.length === 0 ? (
          <div className="text-center py-16 bg-muted/30 rounded-lg animate-fade-in">
            <p className="text-muted-foreground">
              Aucun projet enregistré pour le moment. Rendez-vous dans l'espace Admin pour en ajouter.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => {
              const Icon = getIconComponent(project.icon);

              return (
                <Card
                  key={project.id}
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
                    {project.technologies.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2 text-sm text-muted-foreground">Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {project.achievements.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2 text-sm text-muted-foreground">Réalisations</h4>
                        <ul className="space-y-1">
                          {project.achievements.map((achievement, i) => (
                            <li key={`${project.id}-achievement-${i}`} className="text-sm flex items-start gap-2">
                              <span className="text-accent mt-1">▸</span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      <section className="bg-muted/20 py-20 rounded-3xl">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold mb-12 text-center">Expériences Professionnelles</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="p-8 rounded-xl bg-card shadow-soft hover:shadow-medium transition-smooth">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-semibold">Stage - SF2i</h3>
                <span className="text-sm font-medium text-muted-foreground">2023</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Immersion au sein de l'équipe d'infogérance pour assurer la disponibilité des
                infrastructures clients. Participation au maintien en conditions opérationnelles
                des serveurs, à la mise en place de solutions de sauvegarde et à la supervision
                de réseaux multi-sites. Contribution aux interventions sur site pour le
                déploiement de matériels et la résolution d'incidents utilisateurs.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-card shadow-soft hover:shadow-medium transition-smooth">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-semibold">Alternance - Mairie de Nouméa</h3>
                <span className="text-sm font-medium text-muted-foreground">2023 - Aujourd'hui</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Membre de l'équipe numérique de la collectivité avec un rôle polyvalent : support
                utilisateur de niveau 2, gestion du parc et des comptes Active Directory, suivi des
                projets de modernisation du SI et automatisation de tâches récurrentes. Mise en
                œuvre de bonnes pratiques de sécurité, rédaction de procédures et coordination avec
                les prestataires externes pour garantir la continuité des services municipaux.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
