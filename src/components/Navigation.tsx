import { Link, useLocation } from "react-router-dom";
import { Home, Briefcase, Award, Radar, Mail, Settings } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", label: "Accueil", icon: Home },
    { path: "/projets", label: "Projets", icon: Briefcase },
    { path: "/competences", label: "Compétences", icon: Award },
    { path: "/veille-technologique", label: "Veille technologique", icon: Radar },
    { path: "/contact", label: "Contact", icon: Mail },
    { path: "/admin", label: "Admin", icon: Settings },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-primary">
            Greg<span className="text-accent">.</span>
          </Link>
          
          <ul className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-2 transition-smooth hover:text-accent ${
                      isActive ? "text-accent font-medium" : "text-foreground"
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`transition-smooth ${
                    isActive ? "text-accent" : "text-foreground hover:text-accent"
                  }`}
                >
                  <Icon size={20} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
