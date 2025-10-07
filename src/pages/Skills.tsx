import { Card, CardContent } from "@/components/ui/card";
import { usePortfolioData } from "@/lib/portfolio-data";
import { getIconComponent } from "@/lib/icons";

const Skills = () => {
  const { skills } = usePortfolioData();

  const categories = Array.from(new Set(skills.map((skill) => skill.category))).sort((a, b) =>
    a.localeCompare(b, "fr", { sensitivity: "base" })
  );

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

        {skills.length === 0 ? (
          <div className="text-center py-16 bg-muted/30 rounded-lg animate-fade-in">
            <p className="text-muted-foreground">
              Aucune compétence enregistrée pour le moment. Utilisez l'espace Admin pour alimenter cette section.
            </p>
          </div>
        ) : (
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
                    .filter((skill) => skill.category === category)
                    .map((skill) => {
                      const Icon = getIconComponent(skill.icon);

                      return (
                        <Card
                          key={skill.id}
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
        )}

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
