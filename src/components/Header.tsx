// import { Brain, Code, Building, BookOpen, Mail } from "lucide-react";
import ClientHeader from "./ClientHeader";

const navItems = [
  { name: "About Me", href: "/" },
  { name: "Builder", href: "/builder" },
  { name: "Research", href: "/research"},
  { name: "AI Consulting", href: "/consulting" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact"},
];

export default function Header() {
  return (
    <ClientHeader navItems={navItems} />
  );
}
