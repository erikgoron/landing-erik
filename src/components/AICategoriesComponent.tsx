import ClientAICategories from "./ClientAICategories";

const categories = [
  {
    name: "AI Builder",
    icon: "Code",
    description: "Creating production-ready AI solutions from concept to deployment",
    gradient: "from-blue-400 to-blue-600",
  },
  {
    name: "AI Research",
    icon: "Brain",
    description: "Advancing the boundaries of AI through academic research and innovation",
    gradient: "from-purple-400 to-purple-600",
  },
  {
    name: "AI Consulting",
    icon: "Building",
    description: "Helping businesses leverage AI to solve real-world challenges",
    gradient: "from-emerald-400 to-emerald-600",
  },
];

export default function AICategoriesComponent() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">AI Expertise</h2>
        <ClientAICategories categories={categories} />
      </div>
    </section>
  );
}
