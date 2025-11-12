import { Button } from "@/components/ui/button";
import { Linkedin, Download, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import profilePhoto from "@/assets/profile-photo.jpg";
import { usePortfolioData } from "@/lib/portfolio-data";

const isInternalLink = (href: string) => href.startsWith("/");

const Home = () => {
  const { projects, skills, hero, highlights, about } = usePortfolioData();

  const highlightCards = highlights.map((highlight) => {
    if (highlight.valueType === "projects") {
      const value = projects.length > 0 ? `${projects.length}+` : "0";
      return { ...highlight, value };
    }

    if (highlight.valueType === "skills") {
      const value = skills.length > 0 ? `${skills.length}+` : "0";
      return { ...highlight, value };
    }

    return {
      ...highlight,
      value: highlight.customValue.trim().length > 0 ? highlight.customValue : "-"
    };
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Text content */}
            <div className="space-y-6 animate-fade-in">
              <div className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium">
                {hero.badge}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {hero.greeting}{" "}
                <span className="text-gradient">{hero.highlight}</span>
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed">{hero.description}</p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button asChild size="lg" className="group">
                  {isInternalLink(hero.primaryCtaHref) ? (
                    <Link to={hero.primaryCtaHref}>
                      {hero.primaryCtaLabel}
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                    </Link>
                  ) : (
                    <a href={hero.primaryCtaHref}>
                      {hero.primaryCtaLabel}
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                    </a>
                  )}
                </Button>

                <Button asChild variant="outline" size="lg">
                  <a href={hero.secondaryCtaHref} download={hero.secondaryCtaDownload}>
                    <Download className="mr-2" size={18} />
                    {hero.secondaryCtaLabel}
                  </a>
                </Button>

                <Button asChild variant="ghost" size="lg">
                  <a
                    href={hero.tertiaryCtaHref}
                    target={hero.tertiaryCtaExternal ? "_blank" : undefined}
                    rel={hero.tertiaryCtaExternal ? "noopener noreferrer" : undefined}
                  >
                    <Linkedin className="mr-2" size={18} />
                    {hero.tertiaryCtaLabel}
                  </a>
                </Button>
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
            {highlightCards.map((highlight) => (
              <div
                key={highlight.id}
                className="text-center space-y-2 p-6 rounded-lg bg-card shadow-soft hover:shadow-medium transition-smooth"
              >
                <div className="text-3xl font-bold text-accent">{highlight.value}</div>
                <p className="text-muted-foreground">{highlight.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center">À propos</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            {about.length === 0 ? (
              <p>Aucun contenu pour le moment. Ajoutez vos paragraphes dans l&apos;espace administrateur.</p>
            ) : (
              about.map((paragraph, index) => (
                <p key={`about-paragraph-${index}`}>{paragraph}</p>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
