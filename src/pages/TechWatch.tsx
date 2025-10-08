const TechWatch = () => {
  const focusTopics = [
    {
      title: "Infrastructure & Cloud",
      description:
        "Surveillance continue des évolutions autour de Proxmox, VMware et des solutions de sauvegarde hybrides. Analyse des nouvelles offres IaaS locales et des impacts budgétaires pour des structures publiques.",
      actions: [
        "Tests réguliers des versions beta de Proxmox VE pour anticiper les migrations.",
        "Veille sur la redondance des sauvegardes et sur les solutions de PRA accessibles.",
      ],
    },
    {
      title: "Sécurité Opérationnelle",
      description:
        "Suivi des publications CERT-FR, bulletins Microsoft et best practices ANSSI pour renforcer les postes et serveurs. Mise à jour des procédures de durcissement et de gestion des incidents.",
      actions: [
        "Mise en place d'alertes RSS et newsletters dédiées à la cybersécurité.",
        "Ateliers internes pour sensibiliser les équipes sur les nouvelles campagnes de phishing.",
      ],
    },
    {
      title: "Collaboration & Support",
      description:
        "Exploration des outils d'assistance à distance, de ticketing et d'automatisation (GLPI, ITSM, scripts PowerShell) pour améliorer la qualité de service auprès des utilisateurs.",
      actions: [
        "Comparaison des solutions d'inventaire réseau pour optimiser la gestion de parc.",
        "Expérimentation d'automatisations PowerShell pour accélérer l'onboarding.",
      ],
    },
  ];

  const sources = [
    {
      label: "Blogs & Newsletters",
      items: [
        "Blog Proxmox, VMware Tech Journal",
        "CERT-FR, Zataz, ANSSI",
        "3CX Updates, Microsoft Learn",
      ],
    },
    {
      label: "Communautés",
      items: [
        "Réseau Proxmox France, forums Spiceworks",
        "Groupes Discord/Reddit dédiés à la cybersécurité",
        "Meetups locaux autour de l'IT en Nouvelle-Calédonie",
      ],
    },
    {
      label: "Sur le terrain",
      items: [
        "Retours d'expérience des équipes SF2i",
        "Partage de bonnes pratiques avec la DSI de la Mairie de Nouméa",
        "Échanges avec les prestataires et partenaires techniques",
      ],
    },
  ];

  const roadmap = [
    {
      period: "Trimestre 1",
      goals: [
        "Évaluer les nouveautés Proxmox Backup Server 3.x",
        "Mettre à jour les scripts de supervision pour les serveurs critiques",
      ],
    },
    {
      period: "Trimestre 2",
      goals: [
        "Tester l'intégration d'une solution EDR adaptée au secteur public",
        "Documenter une procédure PRA simplifiée pour les sites secondaires",
      ],
    },
    {
      period: "Trimestre 3",
      goals: [
        "Déployer un pilote de gestion de parc automatisée",
        "Organiser un atelier de sensibilisation sécurité pour les agents",
      ],
    },
  ];

  return (
    <div className="pt-28 pb-20 px-4">
      <div className="container mx-auto max-w-5xl space-y-16">
        <header className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold">
            Veille technologique
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">Anticiper les évolutions IT</h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Une démarche continue pour rester à jour sur les technologies essentielles à mes missions :
            infrastructure, sécurité et support. Cette veille guide mes choix d'outillage et mes propositions
            d'améliorations au sein des organisations que j'accompagne.
          </p>
        </header>

        <section>
          <h2 className="text-2xl font-semibold mb-6 text-center">Axes de veille prioritaires</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {focusTopics.map((topic) => (
              <article
                key={topic.title}
                className="p-6 rounded-xl bg-card shadow-soft hover:shadow-medium transition-smooth space-y-4"
              >
                <div>
                  <h3 className="text-xl font-semibold">{topic.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{topic.description}</p>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {topic.actions.map((action) => (
                    <li key={action} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-accent"></span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6 text-center">Sources suivies</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {sources.map((source) => (
              <article
                key={source.label}
                className="p-6 rounded-xl bg-muted/40 border border-border/60 h-full"
              >
                <h3 className="text-lg font-semibold mb-4">{source.label}</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {source.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-primary"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6 text-center">Feuille de route 2024</h2>
          <div className="space-y-6">
            {roadmap.map((step) => (
              <article
                key={step.period}
                className="p-6 rounded-xl border border-border/60 bg-background/60"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <h3 className="text-xl font-semibold">{step.period}</h3>
                  <div className="space-y-2 text-muted-foreground">
                    {step.goals.map((goal) => (
                      <p key={goal} className="flex items-start gap-2 text-sm md:text-base">
                        <span className="mt-1 h-2 w-2 rounded-full bg-secondary"></span>
                        <span>{goal}</span>
                      </p>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default TechWatch;
