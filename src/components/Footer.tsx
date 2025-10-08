import { Download, Github, Linkedin, Mail } from "lucide-react";

import { Button } from "./ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground py-8 mt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm opacity-80">
            © {currentYear} Greg - Technicien Infrastructure & Réseaux
          </p>
          
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Button
              asChild
              variant="secondary"
              className="bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <a href="/referentiel.pdf" download>
                <Download className="size-4" />
                Télécharger le référentiel
              </a>
            </Button>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-smooth hover:text-accent hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-smooth hover:text-accent hover:scale-110"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="mailto:contact@greg-portfolio.fr"
              className="transition-smooth hover:text-accent hover:scale-110"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
