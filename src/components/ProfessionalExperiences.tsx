import { usePortfolioData } from "@/lib/portfolio-data";

const ProfessionalExperiences = () => {
  const { experiences } = usePortfolioData();

  if (experiences.length === 0) {
    return null;
  }

  return (
    <section className="bg-muted/20 py-20 rounded-3xl">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold mb-12 text-center">Expériences Professionnelles</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {experiences.map((experience) => (
            <div key={experience.id} className="p-8 rounded-xl bg-card shadow-soft hover:shadow-medium transition-smooth">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-semibold">{experience.title}</h3>
                  <p className="text-sm text-muted-foreground">{experience.organization}</p>
                </div>
                <span className="text-sm font-medium text-muted-foreground">{experience.period}</span>
              </div>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{experience.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfessionalExperiences;
