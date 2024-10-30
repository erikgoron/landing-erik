import { TypewriterText } from './TypewriterText';

export default function HeroSection() {
  const roles = ['builder.', 'engineer.', 'researcher.', 'consultant.', '.']
  
  return (
    <section className="py-24 font-mono">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-foreground">
          Hi, I&apos;m Erik.
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-foreground/80 max-w-3xl">
          <TypewriterText 
            baseText="I'm "
            words={roles}
            prefixText="an AI"
          />
        </p>
        <p className="text-lg sm:text-xl md:text-2xl text-foreground/80 max-w-3xl mt-4">
          My work in AI spans across domains, with a passion for human-centric applications.<br />
          I help bridge the gap between cutting-edge AI research and real-world solutions.
        </p>
      </div>
    </section>
  );
}
