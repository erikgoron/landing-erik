'use client';

import ViewSelector from '@/components/ViewSelector';
import { useState } from 'react';

const consultingAreas = [
  {
    name: "Machine Learning",
    description: "Expertise in developing and deploying machine learning models for various applications.",
    technicalDetails: "Proficient in designing and training models using PyTorch, TensorFlow, and scikit-learn. Experience with deep learning, natural language processing, computer vision, and speech recognition.",
  },
  {
    name: "MLOps",
    description: "Establishing robust MLOps frameworks for efficient model development and deployment.",
    technicalDetails: "Developed training and evaluation pipelines, integrated experiment tracking with WandB, automated model deployments, and implemented monitoring for models in production. Experience with Azure and GCP for model deployment and scaling.",
  },
  {
    name: "AI Strategy",
    description: "Helping businesses leverage AI to solve real-world challenges and drive innovation.",
    technicalDetails: "Experience in defining business and product development strategies, writing grants, and assisting with fundraising for AI-driven startups. Expertise in identifying opportunities for AI integration and optimizing existing processes.",
  },
];

export default function AIConsultingPage() {
  const [isDetailedView, setIsDetailedView] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8 font-mono">
      <h1 className="text-4xl font-bold mb-8 text-center">AI Consulting Services</h1>
      <ViewSelector onViewChange={setIsDetailedView} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {consultingAreas.map((area) => (
          <div key={area.name} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">{area.name}</h2>
              <p className="text-gray-600 mb-4">
                {isDetailedView ? area.technicalDetails : area.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
