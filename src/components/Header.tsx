// import { Brain, Code, Building, BookOpen, Mail } from "lucide-react";
import ClientHeader from "./ClientHeader";

const navItems = [
  // { name: "About Me", href: "/" },
  { name: "Building", href: "/builder" },
  { name: "Consulting", href: "/consulting" },
  { name: "Research", href: "/research"},
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact"},
];

export default function Header() {
  return (
    <ClientHeader navItems={navItems} />
  );
}
