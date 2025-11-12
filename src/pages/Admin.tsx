import { useId, useMemo, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  usePortfolioData,
  type CertificationInput,
  type TechTopicInput,
  type TechSourceInput,
  type TechRoadmapStepInput,
  type ContactInfo,
  type ProjectInput,
  type SkillInput,
  type PortfolioDataSnapshot
} from "@/lib/portfolio-data";
import {
  DEFAULT_ICON,
  IconKey,
  getIconComponent,
  iconOptions
} from "@/lib/icons";
import { useToast } from "@/hooks/use-toast";
import {
  ActivitySquare,
  FileDown,
  FileUp,
  Pencil,
  Plus,
  RefreshCcw,
  Save,
  Trash2,
  X
} from "lucide-react";

const parseList = (value: string) =>
  value
    .split(/[\n,;]+/)
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

interface ProjectFormProps {
  initialData?: ProjectInput;
  submitLabel: string;
  onSubmit: (data: ProjectInput) => void;
  onCancel?: () => void;
}

const ProjectForm = ({ initialData, submitLabel, onSubmit, onCancel }: ProjectFormProps) => {
  const isEditMode = Boolean(initialData);
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [icon, setIcon] = useState<IconKey>(initialData?.icon ?? DEFAULT_ICON);
  const [technologies, setTechnologies] = useState(
    initialData?.technologies.join(", ") ?? ""
  );
  const [achievements, setAchievements] = useState(
    initialData?.achievements.join("\n") ?? ""
  );
  const formId = useId();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      icon,
      technologies: parseList(technologies),
      achievements: parseList(achievements)
    });

    if (!isEditMode) {
      setTitle("");
      setDescription("");
      setIcon(DEFAULT_ICON);
      setTechnologies("");
      setAchievements("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor={`${formId}-project-title`}>Titre</Label>
          <Input
            id={`${formId}-project-title`}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            placeholder="Ex : Proxmox & Active Directory"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor={`${formId}-project-icon`}>Icône</Label>
          <select
            id={`${formId}-project-icon`}
            className="w-full border border-input rounded-md bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            value={icon}
            onChange={(event) => setIcon(event.target.value as IconKey)}
          >
            {iconOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor={`${formId}-project-description`}>Description</Label>
        <Textarea
          id={`${formId}-project-description`}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Décrivez brièvement le projet et ses objectifs."
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor={`${formId}-project-technologies`}>
            Technologies (séparées par virgule ou retour à la ligne)
          </Label>
          <Textarea
            id={`${formId}-project-technologies`}
            value={technologies}
            onChange={(event) => setTechnologies(event.target.value)}
            placeholder="Proxmox, Active Directory, GPO"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor={`${formId}-project-achievements`}>
            Réalisations (une par ligne)
          </Label>
          <Textarea
            id={`${formId}-project-achievements`}
            value={achievements}
            onChange={(event) => setAchievements(event.target.value)}
            placeholder={"Ex :\n• Mise en place d'un cluster\n• Automatisation des sauvegardes"}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            <X className="mr-2" size={16} /> Annuler
          </Button>
        )}
        <Button type="submit">
          <Save className="mr-2" size={16} /> {submitLabel}
        </Button>
      </div>
    </form>
  );
};

// Certification form
interface CertificationFormProps {
  initialData?: CertificationInput;
  submitLabel: string;
  onSubmit: (data: CertificationInput) => void;
  onCancel?: () => void;
}

const CertificationForm = ({ initialData, submitLabel, onSubmit, onCancel }: CertificationFormProps) => {
  const isEditMode = Boolean(initialData);
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [organization, setOrganization] = useState(initialData?.organization ?? "");
  const [date, setDate] = useState(initialData?.date ?? "");
  const [summary, setSummary] = useState(initialData?.summary ?? "");
  const [highlights, setHighlights] = useState((initialData?.highlights ?? []).join("\n"));
  const [skills, setSkills] = useState((initialData?.skills ?? []).join(", "));

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      title: title.trim(),
      organization: organization.trim(),
      date: date.trim(),
      summary: summary.trim(),
      highlights: parseList(highlights),
      skills: parseList(skills)
    });

    if (!isEditMode) {
      setTitle("");
      setOrganization("");
      setDate("");
      setSummary("");
      setHighlights("");
      setSkills("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label>Titre</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Intitulé" />
        </div>
        <div className="grid gap-2">
          <Label>Organisme</Label>
          <Input value={organization} onChange={(e) => setOrganization(e.target.value)} required placeholder="Ex: Cisco" />
        </div>
        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold">Gestion des certifications</h2>
            <p className="text-muted-foreground">Ajoutez, modifiez ou supprimez vos certifications.</p>
          </div>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus size={18} /> Ajouter une certification
              </CardTitle>
              <CardDescription>Renseignez les informations ci-dessous.</CardDescription>
            </CardHeader>
            <CardContent>
              <CertificationForm submitLabel="Ajouter" onSubmit={(data)=>{ addCertification(data); toast({ title: "Certification ajoutée" }); }} />
            </CardContent>
          </Card>

          <div className="space-y-4">
            {certifications.length === 0 ? (
              <Card className="shadow-soft"><CardContent className="py-8 text-center text-muted-foreground">Aucune certification enregistrée.</CardContent></Card>
            ) : (
              certifications.map((cert)=> (
                <Card key={cert.id} className="shadow-soft">
                  <CardHeader>
                    <div className="space-y-1">
                      <CardTitle className="text-xl">{cert.title}</CardTitle>
                      <CardDescription>{cert.organization} • {cert.date}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {editingCertId === cert.id ? (
                      <CertificationForm
                        initialData={cert}
                        submitLabel="Enregistrer"
                        onSubmit={(data)=>{ updateCertification(cert.id, data); setEditingCertId(null); toast({ title: "Certification mise à jour" }); }}
                        onCancel={()=>setEditingCertId(null)}
                      />
                    ) : (
                      <div className="space-y-3 text-sm text-muted-foreground">
                        <p>{cert.summary}</p>
                        {cert.highlights.length > 0 && (
                          <ul className="list-disc list-inside space-y-1">
                            {cert.highlights.map((h, i)=>(<li key={`${cert.id}-h-${i}`}>{h}</li>))}
                          </ul>
                        )}
                      </div>
                    )}
                  </CardContent>
                  {editingCertId !== cert.id && (
                    <CardFooter className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={()=>setEditingCertId(cert.id)}><Pencil className="mr-2" size={16}/>Modifier</Button>
                      <Button variant="destructive" size="sm" onClick={()=>{ if (confirmAction("Supprimer cette certification ?")) { deleteCertification(cert.id); toast({ title: "Certification supprimée" }); } }}><Trash2 className="mr-2" size={16}/>Supprimer</Button>
                    </CardFooter>
                  )}
                </Card>
              ))
            )}
          </div>
        </section>

        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold">Veille technologique</h2>
            <p className="text-muted-foreground">Gérez les axes, sources et la feuille de route.</p>
          </div>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Plus size={18}/> Ajouter un axe de veille</CardTitle>
            </CardHeader>
            <CardContent>
              <TopicForm submitLabel="Ajouter" onSubmit={(d)=>{ addTechTopic(d); toast({ title: "Axe ajouté" }); }} />
            </CardContent>
          </Card>

          <div className="space-y-4">
            {techTopics.map((t)=> (
              <Card key={t.id} className="shadow-soft">
                <CardHeader>
                  <CardTitle className="text-xl">{t.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {editingTopicId === t.id ? (
                    <TopicForm initial={t} submitLabel="Enregistrer" onSubmit={(d)=>{ updateTechTopic(t.id, d); setEditingTopicId(null); toast({ title: "Axe mis à jour" }); }} onCancel={()=>setEditingTopicId(null)} />
                  ) : (
                    <p className="text-sm text-muted-foreground">{t.description}</p>
                  )}
                </CardContent>
                {editingTopicId !== t.id && (
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={()=>setEditingTopicId(t.id)}><Pencil className="mr-2" size={16}/>Modifier</Button>
                    <Button variant="destructive" size="sm" onClick={()=>{ if (confirmAction("Supprimer cet axe ?")) { deleteTechTopic(t.id); toast({ title: "Axe supprimé" }); } }}><Trash2 className="mr-2" size={16}/>Supprimer</Button>
                  </CardFooter>
                )}
              </Card>
            ))}
          </div>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Plus size={18}/> Ajouter une source</CardTitle>
            </CardHeader>
            <CardContent>
              <SourceForm submitLabel="Ajouter" onSubmit={(d)=>{ addTechSource(d); toast({ title: "Source ajoutée" }); }} />
            </CardContent>
          </Card>

          <div className="space-y-4">
            {techSources.map((s)=> (
              <Card key={s.id} className="shadow-soft">
                <CardHeader>
                  <CardTitle className="text-xl">{s.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  {editingSourceId === s.id ? (
                    <SourceForm initial={s} submitLabel="Enregistrer" onSubmit={(d)=>{ updateTechSource(s.id, d); setEditingSourceId(null); toast({ title: "Source mise à jour" }); }} onCancel={()=>setEditingSourceId(null)} />
                  ) : (
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      {s.items.map((it, i)=>(<li key={`${s.id}-it-${i}`}>{it}</li>))}
                    </ul>
                  )}
                </CardContent>
                {editingSourceId !== s.id && (
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={()=>setEditingSourceId(s.id)}><Pencil className="mr-2" size={16}/>Modifier</Button>
                    <Button variant="destructive" size="sm" onClick={()=>{ if (confirmAction("Supprimer cette source ?")) { deleteTechSource(s.id); toast({ title: "Source supprimée" }); } }}><Trash2 className="mr-2" size={16}/>Supprimer</Button>
                  </CardFooter>
                )}
              </Card>
            ))}
          </div>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Plus size={18}/> Ajouter une étape de roadmap</CardTitle>
            </CardHeader>
            <CardContent>
              <RoadmapForm submitLabel="Ajouter" onSubmit={(d)=>{ addTechRoadmapStep(d); toast({ title: "Étape ajoutée" }); }} />
            </CardContent>
          </Card>

          <div className="space-y-4">
            {techRoadmap.map((s)=> (
              <Card key={s.id} className="shadow-soft">
                <CardHeader>
                  <CardTitle className="text-xl">{s.period}</CardTitle>
                </CardHeader>
                <CardContent>
                  {editingRoadmapId === s.id ? (
                    <RoadmapForm initial={s} submitLabel="Enregistrer" onSubmit={(d)=>{ updateTechRoadmapStep(s.id, d); setEditingRoadmapId(null); toast({ title: "Étape mise à jour" }); }} onCancel={()=>setEditingRoadmapId(null)} />
                  ) : (
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      {s.goals.map((g, i)=>(<li key={`${s.id}-goal-${i}`}>{g}</li>))}
                    </ul>
                  )}
                </CardContent>
                {editingRoadmapId !== s.id && (
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={()=>setEditingRoadmapId(s.id)}><Pencil className="mr-2" size={16}/>Modifier</Button>
                    <Button variant="destructive" size="sm" onClick={()=>{ if (confirmAction("Supprimer cette étape ?")) { deleteTechRoadmapStep(s.id); toast({ title: "Étape supprimée" }); } }}><Trash2 className="mr-2" size={16}/>Supprimer</Button>
                  </CardFooter>
                )}
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold">Informations de contact</h2>
            <p className="text-muted-foreground">Modifiez l'email, le LinkedIn et la localisation affichés dans la page Contact.</p>
          </div>
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <ContactForm initial={contact} onSubmit={(c)=>{ updateContact(c); toast({ title: "Contact mis à jour" }); }} />
            </CardContent>
          </Card>
        </section>

      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label>Date</Label>
          <Input value={date} onChange={(e) => setDate(e.target.value)} placeholder="2023" />
        </div>
        <div className="grid gap-2">
          <Label>Compétences (séparées par virgule)</Label>
          <Input value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="Routage, Switching" />
        </div>
      </div>
      <div className="grid gap-2">
        <Label>Résumé</Label>
        <Textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={3} />
      </div>
      <div className="grid gap-2">
        <Label>Points forts (un par ligne)</Label>
        <Textarea value={highlights} onChange={(e) => setHighlights(e.target.value)} rows={4} />
      </div>
      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            <X className="mr-2" size={16} /> Annuler
          </Button>
        )}
        <Button type="submit">
          <Save className="mr-2" size={16} /> {submitLabel}
        </Button>
      </div>
    </form>
  );
};

// Simple forms for Tech Watch
const TopicForm = ({ initial, onSubmit, onCancel, submitLabel = "Enregistrer" }: {
  initial?: TechTopicInput; submitLabel?: string; onSubmit: (d: TechTopicInput) => void; onCancel?: () => void;
}) => {
  const isEdit = Boolean(initial);
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [actions, setActions] = useState((initial?.actions ?? []).join("\n"));
  const handle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ title: title.trim(), description: description.trim(), actions: parseList(actions) });
    if (!isEdit) { setTitle(""); setDescription(""); setActions(""); }
  };
  return (
    <form onSubmit={handle} className="space-y-3">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="grid gap-2"><Label>Titre</Label><Input value={title} onChange={(e)=>setTitle(e.target.value)} required /></div>
        <div className="grid gap-2"><Label>Actions (1/ligne)</Label><Textarea rows={3} value={actions} onChange={(e)=>setActions(e.target.value)} /></div>
      </div>
      <div className="grid gap-2"><Label>Description</Label><Textarea rows={3} value={description} onChange={(e)=>setDescription(e.target.value)} /></div>
      <div className="flex justify-end gap-2">
        {onCancel && <Button type="button" variant="outline" onClick={onCancel}><X className="mr-2" size={16}/>Annuler</Button>}
        <Button type="submit"><Save className="mr-2" size={16}/> {submitLabel}</Button>
      </div>
    </form>
  );
};

const SourceForm = ({ initial, onSubmit, onCancel, submitLabel = "Enregistrer" }: {
  initial?: TechSourceInput; submitLabel?: string; onSubmit: (d: TechSourceInput) => void; onCancel?: () => void;
}) => {
  const isEdit = Boolean(initial);
  const [label, setLabel] = useState(initial?.label ?? "");
  const [items, setItems] = useState((initial?.items ?? []).join("\n"));
  const handle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ label: label.trim(), items: parseList(items) });
    if (!isEdit) { setLabel(""); setItems(""); }
  };
  return (
    <form onSubmit={handle} className="space-y-3">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="grid gap-2"><Label>Libellé</Label><Input value={label} onChange={(e)=>setLabel(e.target.value)} required /></div>
        <div className="grid gap-2"><Label>Éléments (1/ligne)</Label><Textarea rows={4} value={items} onChange={(e)=>setItems(e.target.value)} /></div>
      </div>
      <div className="flex justify-end gap-2">
        {onCancel && <Button type="button" variant="outline" onClick={onCancel}><X className="mr-2" size={16}/>Annuler</Button>}
        <Button type="submit"><Save className="mr-2" size={16}/> {submitLabel}</Button>
      </div>
    </form>
  );
};

const RoadmapForm = ({ initial, onSubmit, onCancel, submitLabel = "Enregistrer" }: {
  initial?: TechRoadmapStepInput; submitLabel?: string; onSubmit: (d: TechRoadmapStepInput) => void; onCancel?: () => void;
}) => {
  const isEdit = Boolean(initial);
  const [period, setPeriod] = useState(initial?.period ?? "");
  const [goals, setGoals] = useState((initial?.goals ?? []).join("\n"));
  const handle = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); onSubmit({ period: period.trim(), goals: parseList(goals) }); if (!isEdit) { setPeriod(""); setGoals(""); } };
  return (
    <form onSubmit={handle} className="space-y-3">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="grid gap-2"><Label>Période</Label><Input value={period} onChange={(e)=>setPeriod(e.target.value)} required /></div>
        <div className="grid gap-2"><Label>Objectifs (1/ligne)</Label><Textarea rows={4} value={goals} onChange={(e)=>setGoals(e.target.value)} /></div>
      </div>
      <div className="flex justify-end gap-2">
        {onCancel && <Button type="button" variant="outline" onClick={onCancel}><X className="mr-2" size={16}/>Annuler</Button>}
        <Button type="submit"><Save className="mr-2" size={16}/> {submitLabel}</Button>
      </div>
    </form>
  );
};

const ContactForm = ({ initial, onSubmit }: { initial: ContactInfo; onSubmit: (c: ContactInfo) => void }) => {
  const [email, setEmail] = useState(initial.email);
  const [linkedinUrl, setLinkedinUrl] = useState(initial.linkedinUrl);
  const [locationLine1, setLocationLine1] = useState(initial.locationLine1);
  const [locationLine2, setLocationLine2] = useState(initial.locationLine2 ?? "");

  const handle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ email, linkedinUrl, locationLine1, locationLine2 });
  };

  return (
    <form onSubmit={handle} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="grid gap-2"><Label>Email</Label><Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required /></div>
        <div className="grid gap-2"><Label>LinkedIn</Label><Input value={linkedinUrl} onChange={(e)=>setLinkedinUrl(e.target.value)} required /></div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="grid gap-2"><Label>Localisation ligne 1</Label><Input value={locationLine1} onChange={(e)=>setLocationLine1(e.target.value)} required /></div>
        <div className="grid gap-2"><Label>Localisation ligne 2</Label><Input value={locationLine2} onChange={(e)=>setLocationLine2(e.target.value)} /></div>
      </div>
      <div className="flex justify-end">
        <Button type="submit"><Save className="mr-2" size={16}/> Enregistrer</Button>
      </div>
    </form>
  );
};

interface SkillFormProps {
  initialData?: SkillInput;
  submitLabel: string;
  onSubmit: (data: SkillInput) => void;
  onCancel?: () => void;
  categorySuggestions: string[];
}

const SkillForm = ({ initialData, submitLabel, onSubmit, onCancel, categorySuggestions }: SkillFormProps) => {
  const isEditMode = Boolean(initialData);
  const [name, setName] = useState(initialData?.name ?? "");
  const [category, setCategory] = useState(initialData?.category ?? "");
  const [icon, setIcon] = useState<IconKey>(initialData?.icon ?? DEFAULT_ICON);
  const datalistId = useId();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit({
      name: name.trim(),
      category: category.trim(),
      icon
    });

    if (!isEditMode) {
      setName("");
      setCategory("");
      setIcon(DEFAULT_ICON);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor={`${datalistId}-skill-name`}>Nom</Label>
          <Input
            id={`${datalistId}-skill-name`}
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            placeholder="Ex : pfSense"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor={`${datalistId}-skill-category`}>Catégorie</Label>
          <Input
            id={`${datalistId}-skill-category`}
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            list={categorySuggestions.length > 0 ? `${datalistId}-categories` : undefined}
            placeholder="Ex : Sécurité"
            required
          />
          {categorySuggestions.length > 0 && (
            <datalist id={`${datalistId}-categories`}>
              {categorySuggestions.map((suggestion) => (
                <option key={suggestion} value={suggestion} />
              ))}
            </datalist>
          )}
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor={`${datalistId}-skill-icon`}>Icône</Label>
        <select
          id={`${datalistId}-skill-icon`}
          className="w-full border border-input rounded-md bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          value={icon}
          onChange={(event) => setIcon(event.target.value as IconKey)}
        >
          {iconOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            <X className="mr-2" size={16} /> Annuler
          </Button>
        )}
        <Button type="submit">
          <Save className="mr-2" size={16} /> {submitLabel}
        </Button>
      </div>
    </form>
  );
};

const Admin = () => {
  const {
    projects,
    skills,
    addProject,
    updateProject,
    deleteProject,
    addSkill,
    updateSkill,
    deleteSkill,
    certifications,
    addCertification,
    updateCertification,
    deleteCertification,
    techTopics,
    techSources,
    techRoadmap,
    addTechTopic,
    updateTechTopic,
    deleteTechTopic,
    addTechSource,
    updateTechSource,
    deleteTechSource,
    addTechRoadmapStep,
    updateTechRoadmapStep,
    deleteTechRoadmapStep,
    contact,
    updateContact,
    resetData,
    exportData,
    importData
  } = usePortfolioData();
  const { toast } = useToast();
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
  const [editingCertId, setEditingCertId] = useState<string | null>(null);
  const [editingTopicId, setEditingTopicId] = useState<string | null>(null);
  const [editingSourceId, setEditingSourceId] = useState<string | null>(null);
  const [editingRoadmapId, setEditingRoadmapId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const categorySuggestions = useMemo(
    () => Array.from(new Set(skills.map((skill) => skill.category))).sort((a, b) =>
      a.localeCompare(b, "fr", { sensitivity: "base" })
    ),
    [skills]
  );

  const confirmAction = (message: string) =>
    typeof window === "undefined" || window.confirm(message);

  const handleAddProject = (data: ProjectInput) => {
    addProject(data);
    toast({
      title: "Projet ajouté",
      description: `${data.title} a été ajouté à votre portfolio.`
    });
  };

  const handleUpdateProject = (projectId: string, data: ProjectInput) => {
    updateProject(projectId, data);
    setEditingProjectId(null);
    toast({
      title: "Projet mis à jour",
      description: `${data.title} a été mis à jour avec succès.`
    });
  };

  const handleDeleteProject = (projectId: string) => {
    const project = projects.find((item) => item.id === projectId);

    if (!confirmAction("Supprimer ce projet ? Cette action est définitive.")) {
      return;
    }

    deleteProject(projectId);
    toast({
      title: "Projet supprimé",
      description: project ? `${project.title} a été retiré.` : "Le projet a été supprimé."
    });
  };

  const handleAddSkill = (data: SkillInput) => {
    addSkill(data);
    toast({
      title: "Compétence ajoutée",
      description: `${data.name} est maintenant visible dans la section compétences.`
    });
  };

  const handleUpdateSkill = (skillId: string, data: SkillInput) => {
    updateSkill(skillId, data);
    setEditingSkillId(null);
    toast({
      title: "Compétence mise à jour",
      description: `${data.name} a été actualisée.`
    });
  };

  const handleDeleteSkill = (skillId: string) => {
    const skill = skills.find((item) => item.id === skillId);

    if (!confirmAction("Supprimer cette compétence ?")) {
      return;
    }

    deleteSkill(skillId);
    toast({
      title: "Compétence supprimée",
      description: skill ? `${skill.name} a été retirée.` : "La compétence a été supprimée."
    });
  };

  const handleReset = () => {
    if (!confirmAction("Réinitialiser toutes les données aux valeurs par défaut ?")) {
      return;
    }

    resetData();
    toast({
      title: "Données réinitialisées",
      description: "Le portfolio a été restauré aux données d'origine."
    });
  };

  const handleExport = () => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const snapshot = exportData();
      const fileContent = JSON.stringify(snapshot, null, 2);
      const blob = new Blob([fileContent], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      const timestamp = new Date().toISOString().split("T")[0];

      link.href = url;
      link.download = `portfolio-data-${timestamp}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "Export réalisé",
        description: "Vos données ont été téléchargées au format JSON."
      });
    } catch (error) {
      console.error("Impossible d'exporter les données", error);
      toast({
        variant: "destructive",
        title: "Export impossible",
        description: "Une erreur est survenue lors de la génération du fichier JSON."
      });
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      const content = await file.text();
      const parsed = JSON.parse(content) as PortfolioDataSnapshot;

      importData(parsed);
      toast({
        title: "Import réussi",
        description: `${file.name} a été importé et appliqué au portfolio.`
      });
    } catch (error) {
      console.error("Impossible d'importer le fichier JSON", error);
      toast({
        variant: "destructive",
        title: "Import impossible",
        description: "Vérifiez que le fichier est un JSON exporté depuis ce tableau de bord."
      });
    } finally {
      event.target.value = "";
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="container mx-auto max-w-6xl space-y-12">
        <div className="text-center space-y-4 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium">
            <ActivitySquare size={16} />
            Tableau de bord administrateur
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            Gérez vos <span className="text-gradient">Projets</span> & <span className="text-gradient">Compétences</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ajoutez, modifiez ou supprimez le contenu affiché sur le portfolio en toute simplicité. Les modifications sont sauvegardées localement dans votre navigateur.
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-4">
          <Button variant="outline" onClick={handleReset} className="self-start md:self-auto">
            <RefreshCcw className="mr-2" size={16} />
            Réinitialiser les données
          </Button>
        </div>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileDown size={18} /> Import / export JSON
            </CardTitle>
            <CardDescription>
              Sauvegardez vos contenus ou restaurez-les à partir d'un fichier JSON partagé.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              Les modifications sont enregistrées dans votre navigateur. Exportez un fichier JSON pour conserver une copie ou
              pour transférer vos données vers un autre poste.
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Le fichier exporté contient vos projets et compétences.</li>
              <li>Importez-le pour restaurer une sauvegarde ou partager votre configuration.</li>
            </ul>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row sm:justify-end gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json"
              className="hidden"
              onChange={handleImportChange}
            />
            <Button variant="outline" onClick={handleImportClick} className="w-full sm:w-auto">
              <FileUp className="mr-2" size={16} /> Importer un JSON
            </Button>
            <Button onClick={handleExport} className="w-full sm:w-auto">
              <FileDown className="mr-2" size={16} /> Exporter les données
            </Button>
          </CardFooter>
        </Card>

        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold">Gestion des projets</h2>
            <p className="text-muted-foreground">
              Mettez à jour les projets présentés sur votre site. Chaque projet peut contenir des technologies et des réalisations détaillées.
            </p>
          </div>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus size={18} /> Ajouter un projet
              </CardTitle>
              <CardDescription>
                Renseignez les informations ci-dessous pour créer un nouveau projet.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProjectForm submitLabel="Ajouter le projet" onSubmit={handleAddProject} />
            </CardContent>
          </Card>

          <div className="space-y-4">
            {projects.length === 0 ? (
              <Card className="shadow-soft">
                <CardContent className="py-8 text-center text-muted-foreground">
                  Aucun projet enregistré. Ajoutez votre premier projet ci-dessus.
                </CardContent>
              </Card>
            ) : (
              projects.map((project) => {
                const Icon = getIconComponent(project.icon);

                return (
                  <Card key={project.id} className="shadow-soft">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-accent/10 rounded-lg">
                          <Icon className="text-accent" size={24} />
                        </div>
                        <div className="space-y-1">
                          <CardTitle className="text-xl">{project.title}</CardTitle>
                          {project.description && (
                            <CardDescription>{project.description}</CardDescription>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {editingProjectId === project.id ? (
                        <ProjectForm
                          key={project.id}
                          initialData={project}
                          submitLabel="Enregistrer les modifications"
                          onSubmit={(data) => handleUpdateProject(project.id, data)}
                          onCancel={() => setEditingProjectId(null)}
                        />
                      ) : (
                        <div className="space-y-4">
                          {project.technologies.length > 0 && (
                            <div className="space-y-2">
                              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                                Technologies
                              </h3>
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
                            <div className="space-y-2">
                              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                                Réalisations
                              </h3>
                              <ul className="space-y-1 text-sm text-muted-foreground">
                                {project.achievements.map((achievement, index) => (
                                  <li key={`${project.id}-achievement-${index}`}>• {achievement}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                    {editingProjectId !== project.id && (
                      <CardFooter className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingProjectId(project.id)}
                        >
                          <Pencil className="mr-2" size={16} /> Modifier
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteProject(project.id)}
                        >
                          <Trash2 className="mr-2" size={16} /> Supprimer
                        </Button>
                      </CardFooter>
                    )}
                  </Card>
                );
              })
            )}
          </div>
        </section>

        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold">Gestion des compétences</h2>
            <p className="text-muted-foreground">
              Organisez vos compétences par catégorie et choisissez les icônes correspondantes.
            </p>
          </div>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus size={18} /> Ajouter une compétence
              </CardTitle>
              <CardDescription>
                Saisissez une compétence pour l'afficher dans la page dédiée.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SkillForm
                submitLabel="Ajouter la compétence"
                onSubmit={handleAddSkill}
                categorySuggestions={categorySuggestions}
              />
            </CardContent>
          </Card>

          <div className="space-y-4">
            {skills.length === 0 ? (
              <Card className="shadow-soft">
                <CardContent className="py-8 text-center text-muted-foreground">
                  Aucune compétence enregistrée. Ajoutez votre première compétence ci-dessus.
                </CardContent>
              </Card>
            ) : (
              skills.map((skill) => {
                const Icon = getIconComponent(skill.icon);

                return (
                  <Card key={skill.id} className="shadow-soft">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-accent/10 rounded-lg">
                          <Icon className="text-accent" size={24} />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{skill.name}</CardTitle>
                          <CardDescription>{skill.category}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {editingSkillId === skill.id ? (
                        <SkillForm
                          key={skill.id}
                          initialData={skill}
                          submitLabel="Enregistrer la compétence"
                          onSubmit={(data) => handleUpdateSkill(skill.id, data)}
                          onCancel={() => setEditingSkillId(null)}
                          categorySuggestions={categorySuggestions}
                        />
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          Icône sélectionnée : {iconOptions.find((option) => option.value === skill.icon)?.label ?? "Personnalisée"}
                        </p>
                      )}
                    </CardContent>
                    {editingSkillId !== skill.id && (
                      <CardFooter className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingSkillId(skill.id)}
                        >
                          <Pencil className="mr-2" size={16} /> Modifier
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteSkill(skill.id)}
                        >
                          <Trash2 className="mr-2" size={16} /> Supprimer
                        </Button>
                      </CardFooter>
                    )}
                  </Card>
                );
              })
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Admin;
