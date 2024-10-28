import { Brain, Code, Building, BookOpen, Mail } from "lucide-react";
import ClientHeader from "./ClientHeader";

const navItems = [
  { name: "About Me", href: "/" },
  { name: "AI Builder", href: "/builder", icon: <Code className="w-4 h-4" /> },
  { name: "AI Research", href: "/research", icon: <Brain className="w-4 h-4" /> },
  { name: "AI Consulting", href: "/consulting", icon: <Building className="w-4 h-4" /> },
  { name: "Blog", href: "/blog", icon: <BookOpen className="w-4 h-4" /> },
  { name: "Contact", href: "/contact", icon: <Mail className="w-4 h-4" /> },
];

export default function Header() {
  return (
    <ClientHeader navItems={navItems} />
  );
}
