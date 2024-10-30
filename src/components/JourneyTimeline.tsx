import ClientJourneyTimeline from "./ClientJourneyTimeline";

const timelineData = [
  {
    year: "2023-Present",
    role: "Machine Learning Engineer",
    company: "Maaind Ltd",
    description: "Leading AI research and development in emotion recognition and physiological signal processing.",
  },
  {
    year: "2022",
    role: "Machine Learning Engineer",
    company: "Homni Health Inc.",
    description: "Developed AI solutions for early stroke detection using computer vision and speech analysis.",
  },
  {
    year: "2021-2022",
    role: "Graduate Visiting Researcher",
    company: "UCSD",
    description: "Conducted research in speech processing and facial paralysis detection.",
  },
];

export default function JourneyTimeline() {
  return (
    <section className="py-16 font-mono">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">My Journey</h2>
        <ClientJourneyTimeline timelineData={timelineData} />
      </div>
    </section>
  );
}
