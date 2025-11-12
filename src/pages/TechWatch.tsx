import { usePortfolioData } from "@/lib/portfolio-data";

const TechWatch = () => {
  const { techWatch } = usePortfolioData();
  const { badge, title, description, focusTopics, sources, roadmap } = techWatch;

  return (
    <div className="pt-28 pb-20 px-4">
      <div className="container mx-auto max-w-5xl space-y-16">
        <header className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold">
            {badge}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">{description}</p>
        </header>

        {focusTopics.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-center">Axes de veille prioritaires</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {focusTopics.map((topic) => (
                <article
                  key={topic.id}
                  className="p-6 rounded-xl bg-card shadow-soft hover:shadow-medium transition-smooth space-y-4"
                >
                  <div>
                    <h3 className="text-xl font-semibold">{topic.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{topic.description}</p>
                  </div>
                  {topic.actions.length > 0 && (
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {topic.actions.map((action) => (
                        <li key={action} className="flex items-start gap-2">
                          <span className="mt-1 h-2 w-2 rounded-full bg-accent"></span>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}

        {sources.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-center">Sources suivies</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {sources.map((source) => (
                <article
                  key={source.id}
                  className="p-6 rounded-xl bg-muted/40 border border-border/60 h-full"
                >
                  <h3 className="text-lg font-semibold mb-4">{source.label}</h3>
                  {source.items.length > 0 ? (
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {source.items.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-1 h-2 w-2 rounded-full bg-primary"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">Aucune source renseignée.</p>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}

        {roadmap.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-center">Feuille de route</h2>
            <div className="space-y-6">
              {roadmap.map((step) => (
                <article
                  key={step.id}
                  className="p-6 rounded-xl border border-border/60 bg-background/60"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <h3 className="text-xl font-semibold">{step.period}</h3>
                    {step.goals.length > 0 ? (
                      <div className="space-y-2 text-muted-foreground">
                        {step.goals.map((goal) => (
                          <p key={goal} className="flex items-start gap-2 text-sm md:text-base">
                            <span className="mt-1 h-2 w-2 rounded-full bg-secondary"></span>
                            <span>{goal}</span>
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">Objectifs à définir.</p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default TechWatch;
