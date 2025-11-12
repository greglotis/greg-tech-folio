import { Badge } from "@/components/ui/badge";
import { usePortfolioData } from "@/lib/portfolio-data";

const Certifications = () => {
  const { certifications } = usePortfolioData();

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

        {certifications.length === 0 ? (
          <div className="p-10 text-center rounded-2xl border border-dashed border-border text-muted-foreground">
            Aucune certification n&apos;est configurée. Utilisez l&apos;interface administrateur pour ajouter vos distinctions.
          </div>
        ) : (
          <section className="space-y-10">
            {certifications.map((certification, index) => (
              <article
                key={certification.id}
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

                {certification.summary && (
                  <p className="text-muted-foreground leading-relaxed">{certification.summary}</p>
                )}

                {certification.highlights.length > 0 && (
                  <ul className="space-y-3">
                    {certification.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-3 text-sm md:text-base text-foreground/90">
                        <span className="mt-1 h-2 w-2 rounded-full bg-accent"></span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {certification.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {certification.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="uppercase tracking-wide">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default Certifications;
