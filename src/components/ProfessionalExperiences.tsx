const ProfessionalExperiences = () => {
  return (
    <section className="bg-muted/20 py-20 rounded-3xl">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold mb-12 text-center">Expériences Professionnelles</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="p-8 rounded-xl bg-card shadow-soft hover:shadow-medium transition-smooth">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-semibold">Stage - SF2i</h3>
              <span className="text-sm font-medium text-muted-foreground">2024</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Immersion au sein de l'équipe d'infogérance pour assurer la disponibilité des infrastructures
              clients. Participation au maintien en conditions opérationnelles des serveurs, à la mise en
              place de solutions de sauvegarde et à la supervision de réseaux multi-sites. Contribution aux
              interventions sur site pour le déploiement de matériels et la résolution d'incidents
              utilisateurs.
            </p>
          </div>

          <div className="p-8 rounded-xl bg-card shadow-soft hover:shadow-medium transition-smooth">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-semibold">Alternance - Mairie de Nouméa</h3>
              <span className="text-sm font-medium text-muted-foreground">2025 - Aujourd'hui</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Membre de l'équipe numérique de la collectivité avec un rôle polyvalent : support utilisateur de
              niveau 2, gestion du parc et des comptes Active Directory, suivi des projets de modernisation du
              SI et automatisation de tâches récurrentes. Mise en œuvre de bonnes pratiques de sécurité,
              rédaction de procédures et coordination avec les prestataires externes pour garantir la
              continuité des services municipaux.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalExperiences;
