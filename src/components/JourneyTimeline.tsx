import ClientJourneyTimeline from "./ClientJourneyTimeline";

const timelineData = [
  {
    year: "2024-Present",
    role: "Builder",
    company: "FluentAI",
    description: "Building an innovative Chrome extension for real-time speech analysis and public speaking improvement using AI algorithms.",
    tags: ["founder", "fullstack"],
    logo: "fluentai.svg",
    country: "netherlands.svg"
  },
  {
    year: "2024-Present",
    role: "Builder",
    company: "BoostsBNB",
    description: "Developing an AI-powered platform for enhancing property photos with automatic quality improvements and intelligent editing features.",
    tags: ["founder", "fullstack"],
    logo: "boostsbnb.svg",
    country: "netherlands.svg"
  },
  {
    year: "2023-Present",
    role: "Machine Learning Engineer",
    company: "Maaind Ltd",
    description: "Leading AI research and development in emotion recognition and physiological signal processing.",
    tags: ["employee", "research", "fullstack"],
    logo: "maaind.svg",
    country: "netherlands.svg"
  },
  {
    year: "2022",
    role: "Machine Learning Engineer",
    company: "Homni Health Inc.",
    description: "Developed AI solutions for early stroke detection using computer vision and speech analysis.",
    tags: ["employee", "research", "fullstack"],
    logo: "homni.svg",
    country: "usa.svg"
  },
  {
    year: "2021-2022",
    role: "Graduate Visiting Researcher",
    company: "UCSD",
    description: "Conducted research in speech processing and facial paralysis detection.",
    tags: ["research", "student"],
    logo: "ucsd.svg",
    country: "usa.svg"
  },
  {
    year: "2020-2021",
    role: "Deep Learning Intern",
    company: "Huawei Technologies",
    description: "Research and development of efficient and quantized neural networks. Focus on compression and acceleration techniques.",
    tags: ["employee", "research"],
    logo: "huawei.svg",
    country: "switzerland.svg"
  },
  {
    year: "2020",
    role: "Computer Vision Researcher",
    company: "ETH Zürich",
    description: "Research on geometric deep learning and Neural Architecture Search (NAS). Main applications in computer vision such as action recognition and facial emotion recognition.",
    tags: ["research", "student"],
    logo: "eth.svg",
    country: "switzerland.svg"
  },
  {
    year: "2019-2021",
    role: "MSc Mechanical Engineer",
    company: "ETH Zürich",
    description: "Mechanical Engineering with a focus on robotics and machine learning. My passion for building things through code started here.",
    tags: ["student"],
    logo: "eth.svg",
    country: "switzerland.svg"
  },
  {
    year: "2016-2019",
    role: "BSc Mechanical Engineer",
    company: "EPF Lausanne",
    description: "Bachelor in Mechanical Engineering. This is where things in my life started getting real. Learned a lot about discipline, hard work and the importance of a healthy lifestyle.",
    tags: ["student"],
    logo: "epf.svg",
    country: "switzerland.svg"
  }
];

export default function JourneyTimeline() {
  return (
    <section className="py-16 font-mono min-h-screen">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">My Journey</h2>
        <ClientJourneyTimeline timelineData={timelineData} />
      </div>
    </section>
  );
}
