import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent
} from "react";
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
  type ProjectInput,
  type SkillInput,
  type PortfolioDataSnapshot,
  type HeroContent,
  type HighlightInput,
  type ExperienceInput,
  type SoftSkillInput,
  type CertificationInput,
  type TechWatchTopicInput,
  type TechWatchSourceInput,
  type TechWatchRoadmapStepInput
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

const formatList = (items: string[]) => items.join("\n");

interface HeroFormProps {
  hero: HeroContent;
  onSubmit: (data: HeroContent) => void;
}

const HeroForm = ({ hero, onSubmit }: HeroFormProps) => {
  const [formState, setFormState] = useState<HeroContent>(hero);

  useEffect(() => {
    setFormState(hero);
  }, [hero]);

  const handleChange = <Key extends keyof HeroContent>(key: Key, value: HeroContent[Key]) => {
    setFormState((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formState);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="hero-badge">Badge</Label>
          <Input
            id="hero-badge"
            value={formState.badge}
            onChange={(event) => handleChange("badge", event.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="hero-greeting">Accroche</Label>
          <Input
            id="hero-greeting"
            value={formState.greeting}
            onChange={(event) => handleChange("greeting", event.target.value)}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="hero-highlight">Nom mis en avant</Label>
          <Input
            id="hero-highlight"
            value={formState.highlight}
            onChange={(event) => handleChange("highlight", event.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="hero-description">Description</Label>
        <Textarea
          id="hero-description"
          value={formState.description}
          onChange={(event) => handleChange("description", event.target.value)}
          rows={4}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="hero-primary-label">Bouton principal - libellé</Label>
          <Input
            id="hero-primary-label"
            value={formState.primaryCtaLabel}
            onChange={(event) => handleChange("primaryCtaLabel", event.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="hero-primary-href">Bouton principal - lien</Label>
          <Input
            id="hero-primary-href"
            value={formState.primaryCtaHref}
            onChange={(event) => handleChange("primaryCtaHref", event.target.value)}
            placeholder="/projets"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="hero-secondary-label">Bouton secondaire - libellé</Label>
          <Input
            id="hero-secondary-label"
            value={formState.secondaryCtaLabel}
            onChange={(event) => handleChange("secondaryCtaLabel", event.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="hero-secondary-href">Bouton secondaire - lien</Label>
          <Input
            id="hero-secondary-href"
            value={formState.secondaryCtaHref}
            onChange={(event) => handleChange("secondaryCtaHref", event.target.value)}
            placeholder="/cv.pdf"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <input
          id="hero-secondary-download"
          type="checkbox"
          className="h-4 w-4 rounded border-input"
          checked={formState.secondaryCtaDownload}
          onChange={(event) => handleChange("secondaryCtaDownload", event.target.checked)}
        />
        <Label htmlFor="hero-secondary-download">Activer le téléchargement direct</Label>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="hero-tertiary-label">Lien externe - libellé</Label>
          <Input
            id="hero-tertiary-label"
            value={formState.tertiaryCtaLabel}
            onChange={(event) => handleChange("tertiaryCtaLabel", event.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="hero-tertiary-href">Lien externe - URL</Label>
          <Input
            id="hero-tertiary-href"
            value={formState.tertiaryCtaHref}
            onChange={(event) => handleChange("tertiaryCtaHref", event.target.value)}
            placeholder="https://..."
          />
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <input
          id="hero-tertiary-external"
          type="checkbox"
          className="h-4 w-4 rounded border-input"
          checked={formState.tertiaryCtaExternal}
          onChange={(event) => handleChange("tertiaryCtaExternal", event.target.checked)}
        />
        <Label htmlFor="hero-tertiary-external">Ouvrir dans un nouvel onglet</Label>
      </div>

      <div className="flex justify-end">
        <Button type="submit">
          <Save className="mr-2" size={16} />
          Enregistrer la section
        </Button>
      </div>
    </form>
  );
};

interface HighlightFormProps {
  initialData?: HighlightInput;
  submitLabel: string;
  onSubmit: (data: HighlightInput) => void;
  onCancel?: () => void;
}

const HighlightForm = ({ initialData, submitLabel, onSubmit, onCancel }: HighlightFormProps) => {
  const isEditMode = Boolean(initialData);
  const [label, setLabel] = useState(initialData?.label ?? "");
  const [valueType, setValueType] = useState<HighlightInput["valueType"]>(initialData?.valueType ?? "custom");
  const [customValue, setCustomValue] = useState(initialData?.customValue ?? "");

  useEffect(() => {
    if (initialData) {
      setLabel(initialData.label);
      setValueType(initialData.valueType);
      setCustomValue(initialData.customValue);
    }
  }, [initialData]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit({
      label: label.trim(),
      valueType,
      customValue: customValue.trim()
    });

    if (!isEditMode) {
      setLabel("");
      setValueType("custom");
      setCustomValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="highlight-label">Titre</Label>
          <Input
            id="highlight-label"
            value={label}
            onChange={(event) => setLabel(event.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="highlight-type">Type de valeur</Label>
          <select
            id="highlight-type"
            className="w-full border border-input rounded-md bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            value={valueType}
            onChange={(event) => setValueType(event.target.value as HighlightInput["valueType"]) }
          >
            <option value="projects">Nombre de projets</option>
            <option value="skills">Nombre de compétences</option>
            <option value="custom">Valeur personnalisée</option>
          </select>
        </div>
      </div>

      {valueType === "custom" && (
        <div className="grid gap-2">
          <Label htmlFor="highlight-value">Valeur affichée</Label>
          <Input
            id="highlight-value"
            value={customValue}
            onChange={(event) => setCustomValue(event.target.value)}
            placeholder="Ex : 100%"
          />
        </div>
      )}

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

interface AboutEditorProps {
  about: string[];
  onSubmit: (paragraphs: string[]) => void;
}

const AboutEditor = ({ about, onSubmit }: AboutEditorProps) => {
  const [value, setValue] = useState(about.join("\n\n"));

  useEffect(() => {
    setValue(about.join("\n\n"));
  }, [about]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const paragraphs = value
      .split(/\n+/)
      .map((paragraph) => paragraph.trim())
      .filter((paragraph) => paragraph.length > 0);

    onSubmit(paragraphs);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="about-content">Paragraphes</Label>
        <Textarea
          id="about-content"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          rows={6}
          placeholder={"Chaque paragraphe sur une nouvelle ligne.\n\nAjoutez votre présentation détaillée ici."}
        />
        <p className="text-xs text-muted-foreground">
          Les paragraphes sont séparés automatiquement. Laissez une ligne vide pour créer un nouveau bloc.
        </p>
      </div>

      <div className="flex justify-end">
        <Button type="submit">
          <Save className="mr-2" size={16} /> Enregistrer la section
        </Button>
      </div>
    </form>
  );
};

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
  const [technologies, setTechnologies] = useState(initialData?.technologies.join(", ") ?? "");
  const [achievements, setAchievements] = useState(initialData?.achievements.join("\n") ?? "");
  const formId = useId();

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setIcon(initialData.icon);
      setTechnologies(initialData.technologies.join(", "));
      setAchievements(initialData.achievements.join("\n"));
    }
  }, [initialData]);

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

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setCategory(initialData.category);
      setIcon(initialData.icon);
    }
  }, [initialData]);

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

interface ExperienceFormProps {
  initialData?: ExperienceInput;
  submitLabel: string;
  onSubmit: (data: ExperienceInput) => void;
  onCancel?: () => void;
}

const ExperienceForm = ({ initialData, submitLabel, onSubmit, onCancel }: ExperienceFormProps) => {
  const isEditMode = Boolean(initialData);
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [organization, setOrganization] = useState(initialData?.organization ?? "");
  const [period, setPeriod] = useState(initialData?.period ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const formId = useId();

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setOrganization(initialData.organization);
      setPeriod(initialData.period);
      setDescription(initialData.description);
    }
  }, [initialData]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit({
      title: title.trim(),
      organization: organization.trim(),
      period: period.trim(),
      description: description.trim()
    });

    if (!isEditMode) {
      setTitle("");
      setOrganization("");
      setPeriod("");
      setDescription("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor={`${formId}-experience-title`}>Titre</Label>
          <Input
            id={`${formId}-experience-title`}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            placeholder="Ex : Alternance - Mairie de Nouméa"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor={`${formId}-experience-organization`}>Organisation</Label>
          <Input
            id={`${formId}-experience-organization`}
            value={organization}
            onChange={(event) => setOrganization(event.target.value)}
            required
            placeholder="Ex : Mairie de Nouméa"
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor={`${formId}-experience-period`}>Période</Label>
        <Input
          id={`${formId}-experience-period`}
          value={period}
          onChange={(event) => setPeriod(event.target.value)}
          placeholder="Ex : 2023 - Aujourd'hui"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor={`${formId}-experience-description`}>Description</Label>
        <Textarea
          id={`${formId}-experience-description`}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows={5}
          placeholder="Décrivez vos missions et réalisations."
        />
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

interface SoftSkillFormProps {
  initialData?: SoftSkillInput;
  submitLabel: string;
  onSubmit: (data: SoftSkillInput) => void;
  onCancel?: () => void;
}

const SoftSkillForm = ({ initialData, submitLabel, onSubmit, onCancel }: SoftSkillFormProps) => {
  const isEditMode = Boolean(initialData);
  const [icon, setIcon] = useState(initialData?.icon ?? "");
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const formId = useId();

  useEffect(() => {
    if (initialData) {
      setIcon(initialData.icon);
      setTitle(initialData.title);
      setDescription(initialData.description);
    }
  }, [initialData]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit({
      icon: icon.trim(),
      title: title.trim(),
      description: description.trim()
    });

    if (!isEditMode) {
      setIcon("");
      setTitle("");
      setDescription("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="grid gap-2">
          <Label htmlFor={`${formId}-softskill-icon`}>Icône (emoji)</Label>
          <Input
            id={`${formId}-softskill-icon`}
            value={icon}
            onChange={(event) => setIcon(event.target.value)}
            placeholder="Ex : 🎯"
            maxLength={4}
          />
        </div>
        <div className="grid gap-2 md:col-span-2">
          <Label htmlFor={`${formId}-softskill-title`}>Titre</Label>
          <Input
            id={`${formId}-softskill-title`}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            placeholder="Ex : Rigueur"
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor={`${formId}-softskill-description`}>Description</Label>
        <Textarea
          id={`${formId}-softskill-description`}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows={3}
          placeholder="Détaillez la qualité mise en avant."
        />
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
  const [highlights, setHighlights] = useState(formatList(initialData?.highlights ?? []));
  const [skills, setSkills] = useState(formatList(initialData?.skills ?? []));
  const formId = useId();

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setOrganization(initialData.organization);
      setDate(initialData.date);
      setSummary(initialData.summary);
      setHighlights(formatList(initialData.highlights));
      setSkills(formatList(initialData.skills));
    }
  }, [initialData]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
      <div className="grid md:grid-cols-3 gap-4">
        <div className="grid gap-2 md:col-span-2">
          <Label htmlFor={`${formId}-cert-title`}>Titre</Label>
          <Input
            id={`${formId}-cert-title`}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            placeholder="Ex : CCNA"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor={`${formId}-cert-date`}>Année</Label>
          <Input
            id={`${formId}-cert-date`}
            value={date}
            onChange={(event) => setDate(event.target.value)}
            placeholder="2023"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor={`${formId}-cert-organization`}>Organisme</Label>
          <Input
            id={`${formId}-cert-organization`}
            value={organization}
            onChange={(event) => setOrganization(event.target.value)}
            placeholder="Ex : Cisco Networking Academy"
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor={`${formId}-cert-summary`}>Résumé</Label>
        <Textarea
          id={`${formId}-cert-summary`}
          value={summary}
          onChange={(event) => setSummary(event.target.value)}
          rows={4}
          placeholder="Décrivez les compétences validées et l'intérêt de la certification."
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor={`${formId}-cert-highlights`}>Points clés (une ligne par élément)</Label>
          <Textarea
            id={`${formId}-cert-highlights`}
            value={highlights}
            onChange={(event) => setHighlights(event.target.value)}
            rows={4}
            placeholder={"Ex :\n• Mise en place d'une infrastructure\n• Sécurisation des accès"}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor={`${formId}-cert-skills`}>Compétences associées</Label>
          <Textarea
            id={`${formId}-cert-skills`}
            value={skills}
            onChange={(event) => setSkills(event.target.value)}
            rows={4}
            placeholder="Routage\nSwitching\nSécurité"
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

interface TechWatchTopicFormProps {
  initialData?: TechWatchTopicInput;
  submitLabel: string;
  onSubmit: (data: TechWatchTopicInput) => void;
  onCancel?: () => void;
}

const TechWatchTopicForm = ({ initialData, submitLabel, onSubmit, onCancel }: TechWatchTopicFormProps) => {
  const isEditMode = Boolean(initialData);
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [actions, setActions] = useState(formatList(initialData?.actions ?? []));
  const formId = useId();

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setActions(formatList(initialData.actions));
    }
  }, [initialData]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      actions: parseList(actions)
    });

    if (!isEditMode) {
      setTitle("");
      setDescription("");
      setActions("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor={`${formId}-topic-title`}>Titre</Label>
        <Input
          id={`${formId}-topic-title`}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor={`${formId}-topic-description`}>Description</Label>
        <Textarea
          id={`${formId}-topic-description`}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows={4}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor={`${formId}-topic-actions`}>Actions (une par ligne)</Label>
        <Textarea
          id={`${formId}-topic-actions`}
          value={actions}
          onChange={(event) => setActions(event.target.value)}
          rows={4}
        />
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

interface TechWatchSourceFormProps {
  initialData?: TechWatchSourceInput;
  submitLabel: string;
  onSubmit: (data: TechWatchSourceInput) => void;
  onCancel?: () => void;
}

const TechWatchSourceForm = ({ initialData, submitLabel, onSubmit, onCancel }: TechWatchSourceFormProps) => {
  const isEditMode = Boolean(initialData);
  const [label, setLabel] = useState(initialData?.label ?? "");
  const [items, setItems] = useState(formatList(initialData?.items ?? []));
  const formId = useId();

  useEffect(() => {
    if (initialData) {
      setLabel(initialData.label);
      setItems(formatList(initialData.items));
    }
  }, [initialData]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit({
      label: label.trim(),
      items: parseList(items)
    });

    if (!isEditMode) {
      setLabel("");
      setItems("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor={`${formId}-source-label`}>Libellé</Label>
        <Input
          id={`${formId}-source-label`}
          value={label}
          onChange={(event) => setLabel(event.target.value)}
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor={`${formId}-source-items`}>Sources (une par ligne)</Label>
        <Textarea
          id={`${formId}-source-items`}
          value={items}
          onChange={(event) => setItems(event.target.value)}
          rows={4}
        />
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

interface TechWatchRoadmapFormProps {
  initialData?: TechWatchRoadmapStepInput;
  submitLabel: string;
  onSubmit: (data: TechWatchRoadmapStepInput) => void;
  onCancel?: () => void;
}

const TechWatchRoadmapForm = ({ initialData, submitLabel, onSubmit, onCancel }: TechWatchRoadmapFormProps) => {
  const isEditMode = Boolean(initialData);
  const [period, setPeriod] = useState(initialData?.period ?? "");
  const [goals, setGoals] = useState(formatList(initialData?.goals ?? []));
  const formId = useId();

  useEffect(() => {
    if (initialData) {
      setPeriod(initialData.period);
      setGoals(formatList(initialData.goals));
    }
  }, [initialData]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit({
      period: period.trim(),
      goals: parseList(goals)
    });

    if (!isEditMode) {
      setPeriod("");
      setGoals("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor={`${formId}-roadmap-period`}>Période</Label>
        <Input
          id={`${formId}-roadmap-period`}
          value={period}
          onChange={(event) => setPeriod(event.target.value)}
          required
          placeholder="Ex : Trimestre 1"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor={`${formId}-roadmap-goals`}>Objectifs (une par ligne)</Label>
        <Textarea
          id={`${formId}-roadmap-goals`}
          value={goals}
          onChange={(event) => setGoals(event.target.value)}
          rows={4}
        />
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
    hero,
    highlights,
    about,
    experiences,
    softSkills,
    certifications,
    techWatch,
    addProject,
    updateProject,
    deleteProject,
    addSkill,
    updateSkill,
    deleteSkill,
    updateHero,
    addHighlight,
    updateHighlight,
    deleteHighlight,
    updateAbout,
    addExperience,
    updateExperience,
    deleteExperience,
    addSoftSkill,
    updateSoftSkill,
    deleteSoftSkill,
    addCertification,
    updateCertification,
    deleteCertification,
    updateTechWatchIntro,
    addTechWatchTopic,
    updateTechWatchTopic,
    deleteTechWatchTopic,
    addTechWatchSource,
    updateTechWatchSource,
    deleteTechWatchSource,
    addTechWatchRoadmapStep,
    updateTechWatchRoadmapStep,
    deleteTechWatchRoadmapStep,
    resetData,
    exportData,
    importData
  } = usePortfolioData();
  const { toast } = useToast();
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
  const [editingHighlightId, setEditingHighlightId] = useState<string | null>(null);
  const [editingExperienceId, setEditingExperienceId] = useState<string | null>(null);
  const [editingSoftSkillId, setEditingSoftSkillId] = useState<string | null>(null);
  const [editingCertificationId, setEditingCertificationId] = useState<string | null>(null);
  const [editingTopicId, setEditingTopicId] = useState<string | null>(null);
  const [editingSourceId, setEditingSourceId] = useState<string | null>(null);
  const [editingRoadmapId, setEditingRoadmapId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [techWatchIntro, setTechWatchIntro] = useState({
    badge: techWatch.badge,
    title: techWatch.title,
    description: techWatch.description
  });

  useEffect(() => {
    setTechWatchIntro({
      badge: techWatch.badge,
      title: techWatch.title,
      description: techWatch.description
    });
  }, [techWatch.badge, techWatch.title, techWatch.description]);

  const categorySuggestions = useMemo(
    () => Array.from(new Set(skills.map((skill) => skill.category))).sort((a, b) =>
      a.localeCompare(b, "fr", { sensitivity: "base" })
    ),
    [skills]
  );

  const confirmAction = (message: string) =>
    typeof window === "undefined" || window.confirm(message);

  const handleHeroSubmit = (data: HeroContent) => {
    updateHero(data);
    toast({
      title: "Section mise à jour",
      description: "Le contenu du hero a été enregistré."
    });
  };

  const handleAddHighlight = (data: HighlightInput) => {
    addHighlight(data);
    toast({
      title: "Statistique ajoutée",
      description: `${data.label} est maintenant affichée sur la page d'accueil.`
    });
  };

  const handleUpdateHighlight = (highlightId: string, data: HighlightInput) => {
    updateHighlight(highlightId, data);
    setEditingHighlightId(null);
    toast({
      title: "Statistique mise à jour",
      description: `${data.label} a été actualisée.`
    });
  };

  const handleDeleteHighlight = (highlightId: string) => {
    const highlight = highlights.find((item) => item.id === highlightId);

    if (!confirmAction("Supprimer cette statistique ?")) {
      return;
    }

    deleteHighlight(highlightId);
    toast({
      title: "Statistique supprimée",
      description: highlight ? `${highlight.label} a été retirée.` : "La statistique a été supprimée."
    });
  };

  const handleAboutSubmit = (paragraphs: string[]) => {
    updateAbout(paragraphs);
    toast({
      title: "À propos mis à jour",
      description: "Votre présentation a été enregistrée."
    });
  };

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

  const handleAddExperience = (data: ExperienceInput) => {
    addExperience(data);
    toast({
      title: "Expérience ajoutée",
      description: `${data.title} a été ajoutée dans la section dédiée.`
    });
  };

  const handleUpdateExperience = (experienceId: string, data: ExperienceInput) => {
    updateExperience(experienceId, data);
    setEditingExperienceId(null);
    toast({
      title: "Expérience mise à jour",
      description: `${data.title} a été actualisée.`
    });
  };

  const handleDeleteExperience = (experienceId: string) => {
    const experience = experiences.find((item) => item.id === experienceId);

    if (!confirmAction("Supprimer cette expérience ?")) {
      return;
    }

    deleteExperience(experienceId);
    toast({
      title: "Expérience supprimée",
      description: experience ? `${experience.title} a été retirée.` : "L'expérience a été supprimée."
    });
  };

  const handleAddSoftSkill = (data: SoftSkillInput) => {
    addSoftSkill(data);
    toast({
      title: "Qualité ajoutée",
      description: `${data.title} figure désormais dans vos qualités professionnelles.`
    });
  };

  const handleUpdateSoftSkill = (softSkillId: string, data: SoftSkillInput) => {
    updateSoftSkill(softSkillId, data);
    setEditingSoftSkillId(null);
    toast({
      title: "Qualité mise à jour",
      description: `${data.title} a été actualisée.`
    });
  };

  const handleDeleteSoftSkill = (softSkillId: string) => {
    const softSkill = softSkills.find((item) => item.id === softSkillId);

    if (!confirmAction("Supprimer cette qualité ?")) {
      return;
    }

    deleteSoftSkill(softSkillId);
    toast({
      title: "Qualité supprimée",
      description: softSkill ? `${softSkill.title} a été retirée.` : "La qualité a été supprimée."
    });
  };

  const handleAddCertification = (data: CertificationInput) => {
    addCertification(data);
    toast({
      title: "Certification ajoutée",
      description: `${data.title} est maintenant visible dans la page dédiée.`
    });
  };

  const handleUpdateCertification = (certificationId: string, data: CertificationInput) => {
    updateCertification(certificationId, data);
    setEditingCertificationId(null);
    toast({
      title: "Certification mise à jour",
      description: `${data.title} a été actualisée.`
    });
  };

  const handleDeleteCertification = (certificationId: string) => {
    const certification = certifications.find((item) => item.id === certificationId);

    if (!confirmAction("Supprimer cette certification ?")) {
      return;
    }

    deleteCertification(certificationId);
    toast({
      title: "Certification supprimée",
      description: certification ? `${certification.title} a été retirée.` : "La certification a été supprimée."
    });
  };

  const handleTechWatchIntroSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateTechWatchIntro(techWatchIntro);
    toast({
      title: "Veille mise à jour",
      description: "L'introduction de la veille technologique a été enregistrée."
    });
  };

  const handleAddTopic = (data: TechWatchTopicInput) => {
    addTechWatchTopic(data);
    toast({
      title: "Axe de veille ajouté",
      description: `${data.title} a été ajouté à la veille technologique.`
    });
  };

  const handleUpdateTopic = (topicId: string, data: TechWatchTopicInput) => {
    updateTechWatchTopic(topicId, data);
    setEditingTopicId(null);
    toast({
      title: "Axe de veille mis à jour",
      description: `${data.title} a été actualisé.`
    });
  };

  const handleDeleteTopic = (topicId: string) => {
    const topic = techWatch.focusTopics.find((item) => item.id === topicId);

    if (!confirmAction("Supprimer cet axe de veille ?")) {
      return;
    }

    deleteTechWatchTopic(topicId);
    toast({
      title: "Axe supprimé",
      description: topic ? `${topic.title} a été retiré.` : "L'axe de veille a été supprimé."
    });
  };

  const handleAddSource = (data: TechWatchSourceInput) => {
    addTechWatchSource(data);
    toast({
      title: "Source ajoutée",
      description: `${data.label} a été ajoutée aux ressources suivies.`
    });
  };

  const handleUpdateSource = (sourceId: string, data: TechWatchSourceInput) => {
    updateTechWatchSource(sourceId, data);
    setEditingSourceId(null);
    toast({
      title: "Source mise à jour",
      description: `${data.label} a été actualisée.`
    });
  };

  const handleDeleteSource = (sourceId: string) => {
    const source = techWatch.sources.find((item) => item.id === sourceId);

    if (!confirmAction("Supprimer cette source ?")) {
      return;
    }

    deleteTechWatchSource(sourceId);
    toast({
      title: "Source supprimée",
      description: source ? `${source.label} a été retirée.` : "La source a été supprimée."
    });
  };

  const handleAddRoadmap = (data: TechWatchRoadmapStepInput) => {
    addTechWatchRoadmapStep(data);
    toast({
      title: "Étape ajoutée",
      description: `${data.period} a été ajoutée à la feuille de route.`
    });
  };

  const handleUpdateRoadmap = (stepId: string, data: TechWatchRoadmapStepInput) => {
    updateTechWatchRoadmapStep(stepId, data);
    setEditingRoadmapId(null);
    toast({
      title: "Étape mise à jour",
      description: `${data.period} a été actualisée.`
    });
  };

  const handleDeleteRoadmap = (stepId: string) => {
    const step = techWatch.roadmap.find((item) => item.id === stepId);

    if (!confirmAction("Supprimer cette étape ?")) {
      return;
    }

    deleteTechWatchRoadmapStep(stepId);
    toast({
      title: "Étape supprimée",
      description: step ? `${step.period} a été retirée.` : "L'étape a été supprimée."
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
            Gérez l&apos;ensemble de votre <span className="text-gradient">portfolio</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ajoutez, modifiez ou supprimez les contenus affichés sur le site : hero, statistiques, projets,
            compétences, expériences, certifications et veille technologique. Les modifications sont sauvegardées localement
            dans votre navigateur.
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
              Sauvegardez vos contenus ou restaurez-les à partir d&apos;un fichier JSON partagé.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              Les modifications sont enregistrées dans votre navigateur. Exportez un fichier JSON pour conserver une copie ou
              pour transférer vos données vers un autre poste.
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Le fichier exporté contient l&apos;ensemble du contenu : hero, statistiques, textes, projets, compétences, etc.</li>
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
            <h2 className="text-3xl font-semibold">Page d&apos;accueil</h2>
            <p className="text-muted-foreground">
              Personnalisez le hero, les statistiques rapides et la présentation à propos.
            </p>
          </div>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-xl">Contenu du hero</CardTitle>
              <CardDescription>
                Ajustez les textes d&apos;introduction et les boutons visibles en haut de la page d&apos;accueil.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <HeroForm hero={hero} onSubmit={handleHeroSubmit} />
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-xl">Statistiques rapides</CardTitle>
              <CardDescription>
                Ajoutez ou modifiez les indicateurs mis en avant sous le hero.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Card className="border-dashed">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Plus size={16} /> Ajouter une statistique
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <HighlightForm submitLabel="Ajouter la statistique" onSubmit={handleAddHighlight} />
                </CardContent>
              </Card>

              <div className="space-y-4">
                {highlights.length === 0 ? (
                  <Card className="shadow-soft">
                    <CardContent className="py-8 text-center text-muted-foreground">
                      Aucune statistique enregistrée. Ajoutez votre première statistique ci-dessus.
                    </CardContent>
                  </Card>
                ) : (
                  highlights.map((highlight) => (
                    <Card key={highlight.id} className="shadow-soft">
                      <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <CardTitle className="text-lg">{highlight.label}</CardTitle>
                          <CardDescription>
                            {highlight.valueType === "projects" && "Compteur automatique des projets"}
                            {highlight.valueType === "skills" && "Compteur automatique des compétences"}
                            {highlight.valueType === "custom" &&
                              (highlight.customValue.length > 0
                                ? `Valeur personnalisée : ${highlight.customValue}`
                                : "Valeur personnalisée (à définir)")}
                          </CardDescription>
                        </div>
                        {highlight.valueType === "custom" && highlight.customValue.length > 0 && (
                          <Badge variant="secondary">{highlight.customValue}</Badge>
                        )}
                      </CardHeader>
                      <CardContent>
                        {editingHighlightId === highlight.id ? (
                          <HighlightForm
                            initialData={highlight}
                            submitLabel="Enregistrer la statistique"
                            onSubmit={(data) => handleUpdateHighlight(highlight.id, data)}
                            onCancel={() => setEditingHighlightId(null)}
                          />
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            Mode de calcul : {highlight.valueType === "custom" ? "personnalisé" : "automatique"}
                          </p>
                        )}
                      </CardContent>
                      {editingHighlightId !== highlight.id && (
                        <CardFooter className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingHighlightId(highlight.id)}
                          >
                            <Pencil className="mr-2" size={16} /> Modifier
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteHighlight(highlight.id)}
                          >
                            <Trash2 className="mr-2" size={16} /> Supprimer
                          </Button>
                        </CardFooter>
                      )}
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-xl">Section À propos</CardTitle>
              <CardDescription>
                Rédigez votre biographie et les paragraphes de présentation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AboutEditor about={about} onSubmit={handleAboutSubmit} />
            </CardContent>
          </Card>
        </section>

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
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-accent/10 rounded-lg">
                          <Icon className="text-accent" size={28} />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{project.title}</CardTitle>
                          <CardDescription>{project.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {editingProjectId === project.id ? (
                        <ProjectForm
                          initialData={project}
                          submitLabel="Enregistrer le projet"
                          onSubmit={(data) => handleUpdateProject(project.id, data)}
                          onCancel={() => setEditingProjectId(null)}
                        />
                      ) : (
                        <div className="space-y-3 text-sm text-muted-foreground">
                          <div>
                            <span className="font-semibold">Technologies :</span>{" "}
                            {project.technologies.join(", ") || "Aucune"}
                          </div>
                          <div>
                            <span className="font-semibold">Réalisations :</span>{" "}
                            {project.achievements.length > 0 ? project.achievements.join(", ") : "Aucune"}
                          </div>
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
                Saisissez une compétence pour l&apos;afficher dans la page dédiée.
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

        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold">Expériences professionnelles</h2>
            <p className="text-muted-foreground">
              Centralisez vos expériences de stage, d&apos;alternance ou d&apos;emploi affichées dans la page Projets.
            </p>
          </div>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus size={18} /> Ajouter une expérience
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ExperienceForm submitLabel="Ajouter l'expérience" onSubmit={handleAddExperience} />
            </CardContent>
          </Card>

          <div className="space-y-4">
            {experiences.length === 0 ? (
              <Card className="shadow-soft">
                <CardContent className="py-8 text-center text-muted-foreground">
                  Aucune expérience enregistrée. Ajoutez votre première expérience ci-dessus.
                </CardContent>
              </Card>
            ) : (
              experiences.map((experience) => (
                <Card key={experience.id} className="shadow-soft">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <CardTitle className="text-xl">{experience.title}</CardTitle>
                        <CardDescription>{experience.organization}</CardDescription>
                      </div>
                      <Badge variant="secondary">{experience.period}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {editingExperienceId === experience.id ? (
                      <ExperienceForm
                        initialData={experience}
                        submitLabel="Enregistrer l'expérience"
                        onSubmit={(data) => handleUpdateExperience(experience.id, data)}
                        onCancel={() => setEditingExperienceId(null)}
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground whitespace-pre-line">{experience.description}</p>
                    )}
                  </CardContent>
                  {editingExperienceId !== experience.id && (
                    <CardFooter className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingExperienceId(experience.id)}
                      >
                        <Pencil className="mr-2" size={16} /> Modifier
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteExperience(experience.id)}
                      >
                        <Trash2 className="mr-2" size={16} /> Supprimer
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              ))
            )}
          </div>
        </section>

        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold">Qualités professionnelles</h2>
            <p className="text-muted-foreground">
              Gérez les qualités affichées en bas de la page Compétences.
            </p>
          </div>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus size={18} /> Ajouter une qualité
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SoftSkillForm submitLabel="Ajouter la qualité" onSubmit={handleAddSoftSkill} />
            </CardContent>
          </Card>

          <div className="space-y-4">
            {softSkills.length === 0 ? (
              <Card className="shadow-soft">
                <CardContent className="py-8 text-center text-muted-foreground">
                  Aucune qualité enregistrée. Ajoutez votre première qualité ci-dessus.
                </CardContent>
              </Card>
            ) : (
              softSkills.map((softSkill) => (
                <Card key={softSkill.id} className="shadow-soft">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl" aria-hidden>
                        {softSkill.icon}
                      </span>
                      <div>
                        <CardTitle className="text-lg">{softSkill.title}</CardTitle>
                        <CardDescription>{softSkill.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {editingSoftSkillId === softSkill.id ? (
                      <SoftSkillForm
                        initialData={softSkill}
                        submitLabel="Enregistrer la qualité"
                        onSubmit={(data) => handleUpdateSoftSkill(softSkill.id, data)}
                        onCancel={() => setEditingSoftSkillId(null)}
                      />
                    ) : null}
                  </CardContent>
                  {editingSoftSkillId !== softSkill.id && (
                    <CardFooter className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingSoftSkillId(softSkill.id)}
                      >
                        <Pencil className="mr-2" size={16} /> Modifier
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteSoftSkill(softSkill.id)}
                      >
                        <Trash2 className="mr-2" size={16} /> Supprimer
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              ))
            )}
          </div>
        </section>

        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold">Certifications</h2>
            <p className="text-muted-foreground">
              Maintenez la liste des certifications affichées sur la page dédiée.
            </p>
          </div>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus size={18} /> Ajouter une certification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CertificationForm submitLabel="Ajouter la certification" onSubmit={handleAddCertification} />
            </CardContent>
          </Card>

          <div className="space-y-4">
            {certifications.length === 0 ? (
              <Card className="shadow-soft">
                <CardContent className="py-8 text-center text-muted-foreground">
                  Aucune certification enregistrée. Ajoutez votre première certification ci-dessus.
                </CardContent>
              </Card>
            ) : (
              certifications.map((certification) => (
                <Card key={certification.id} className="shadow-soft">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div>
                        <CardTitle className="text-xl">{certification.title}</CardTitle>
                        <CardDescription>{certification.organization}</CardDescription>
                      </div>
                      <Badge variant="secondary">{certification.date}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {editingCertificationId === certification.id ? (
                      <CertificationForm
                        initialData={certification}
                        submitLabel="Enregistrer la certification"
                        onSubmit={(data) => handleUpdateCertification(certification.id, data)}
                        onCancel={() => setEditingCertificationId(null)}
                      />
                    ) : (
                      <div className="space-y-3 text-sm text-muted-foreground">
                        {certification.summary && <p>{certification.summary}</p>}
                        {certification.highlights.length > 0 && (
                          <div>
                            <span className="font-semibold">Points clés :</span>{" "}
                            {certification.highlights.join(", ")}
                          </div>
                        )}
                        {certification.skills.length > 0 && (
                          <div>
                            <span className="font-semibold">Compétences :</span>{" "}
                            {certification.skills.join(", ")}
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                  {editingCertificationId !== certification.id && (
                    <CardFooter className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingCertificationId(certification.id)}
                      >
                        <Pencil className="mr-2" size={16} /> Modifier
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteCertification(certification.id)}
                      >
                        <Trash2 className="mr-2" size={16} /> Supprimer
                      </Button>
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
            <p className="text-muted-foreground">
              Modifiez l&apos;introduction, les axes de veille, les sources suivies et la feuille de route.
            </p>
          </div>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-xl">Introduction</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTechWatchIntroSave} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="techwatch-badge">Badge</Label>
                    <Input
                      id="techwatch-badge"
                      value={techWatchIntro.badge}
                      onChange={(event) => setTechWatchIntro((prev) => ({ ...prev, badge: event.target.value }))}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="techwatch-title">Titre</Label>
                    <Input
                      id="techwatch-title"
                      value={techWatchIntro.title}
                      onChange={(event) => setTechWatchIntro((prev) => ({ ...prev, title: event.target.value }))}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="techwatch-description">Description</Label>
                  <Textarea
                    id="techwatch-description"
                    value={techWatchIntro.description}
                    onChange={(event) => setTechWatchIntro((prev) => ({ ...prev, description: event.target.value }))}
                    rows={4}
                  />
                </div>
                <div className="flex justify-end">
                  <Button type="submit">
                    <Save className="mr-2" size={16} /> Enregistrer l&apos;introduction
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-xl">Axes de veille</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Card className="border-dashed">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Plus size={16} /> Ajouter un axe
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <TechWatchTopicForm submitLabel="Ajouter l'axe" onSubmit={handleAddTopic} />
                </CardContent>
              </Card>

              <div className="space-y-4">
                {techWatch.focusTopics.length === 0 ? (
                  <Card className="shadow-soft">
                    <CardContent className="py-8 text-center text-muted-foreground">
                      Aucun axe configuré. Ajoutez-en un pour structurer votre veille.
                    </CardContent>
                  </Card>
                ) : (
                  techWatch.focusTopics.map((topic) => (
                    <Card key={topic.id} className="shadow-soft">
                      <CardHeader>
                        <CardTitle className="text-lg">{topic.title}</CardTitle>
                        <CardDescription>{topic.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {editingTopicId === topic.id ? (
                          <TechWatchTopicForm
                            initialData={topic}
                            submitLabel="Enregistrer l'axe"
                            onSubmit={(data) => handleUpdateTopic(topic.id, data)}
                            onCancel={() => setEditingTopicId(null)}
                          />
                        ) : (
                          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                            {topic.actions.map((action) => (
                              <li key={action}>{action}</li>
                            ))}
                          </ul>
                        )}
                      </CardContent>
                      {editingTopicId !== topic.id && (
                        <CardFooter className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingTopicId(topic.id)}
                          >
                            <Pencil className="mr-2" size={16} /> Modifier
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteTopic(topic.id)}
                          >
                            <Trash2 className="mr-2" size={16} /> Supprimer
                          </Button>
                        </CardFooter>
                      )}
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-xl">Sources suivies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Card className="border-dashed">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Plus size={16} /> Ajouter une source
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <TechWatchSourceForm submitLabel="Ajouter la source" onSubmit={handleAddSource} />
                </CardContent>
              </Card>

              <div className="space-y-4">
                {techWatch.sources.length === 0 ? (
                  <Card className="shadow-soft">
                    <CardContent className="py-8 text-center text-muted-foreground">
                      Aucune source enregistrée. Ajoutez vos ressources principales.
                    </CardContent>
                  </Card>
                ) : (
                  techWatch.sources.map((source) => (
                    <Card key={source.id} className="shadow-soft">
                      <CardHeader>
                        <CardTitle className="text-lg">{source.label}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {editingSourceId === source.id ? (
                          <TechWatchSourceForm
                            initialData={source}
                            submitLabel="Enregistrer la source"
                            onSubmit={(data) => handleUpdateSource(source.id, data)}
                            onCancel={() => setEditingSourceId(null)}
                          />
                        ) : source.items.length > 0 ? (
                          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                            {source.items.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-muted-foreground">Aucun élément renseigné.</p>
                        )}
                      </CardContent>
                      {editingSourceId !== source.id && (
                        <CardFooter className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingSourceId(source.id)}
                          >
                            <Pencil className="mr-2" size={16} /> Modifier
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteSource(source.id)}
                          >
                            <Trash2 className="mr-2" size={16} /> Supprimer
                          </Button>
                        </CardFooter>
                      )}
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-xl">Feuille de route</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Card className="border-dashed">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Plus size={16} /> Ajouter une étape
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <TechWatchRoadmapForm submitLabel="Ajouter l'étape" onSubmit={handleAddRoadmap} />
                </CardContent>
              </Card>

              <div className="space-y-4">
                {techWatch.roadmap.length === 0 ? (
                  <Card className="shadow-soft">
                    <CardContent className="py-8 text-center text-muted-foreground">
                      Aucune étape définie. Ajoutez une feuille de route pour structurer vos priorités.
                    </CardContent>
                  </Card>
                ) : (
                  techWatch.roadmap.map((step) => (
                    <Card key={step.id} className="shadow-soft">
                      <CardHeader>
                        <CardTitle className="text-lg">{step.period}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {editingRoadmapId === step.id ? (
                          <TechWatchRoadmapForm
                            initialData={step}
                            submitLabel="Enregistrer l'étape"
                            onSubmit={(data) => handleUpdateRoadmap(step.id, data)}
                            onCancel={() => setEditingRoadmapId(null)}
                          />
                        ) : step.goals.length > 0 ? (
                          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                            {step.goals.map((goal) => (
                              <li key={goal}>{goal}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-muted-foreground">Objectifs à définir.</p>
                        )}
                      </CardContent>
                      {editingRoadmapId !== step.id && (
                        <CardFooter className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingRoadmapId(step.id)}
                          >
                            <Pencil className="mr-2" size={16} /> Modifier
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteRoadmap(step.id)}
                          >
                            <Trash2 className="mr-2" size={16} /> Supprimer
                          </Button>
                        </CardFooter>
                      )}
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Admin;
