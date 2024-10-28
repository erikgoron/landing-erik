'use client';

import { useState } from 'react';
import ViewSelector from '@/components/ViewSelector';
import Link from 'next/link';
import Image from 'next/image';

const researchAreas = [
  {
    name: "Computer Vision",
    description: "Research in facial paralysis detection and efficient neural networks for image processing.",
    technicalDetails: "Implemented facial paralysis detection models using deep learning techniques. Developed and benchmarked compressed and accelerated deep neural networks for computer vision tasks.",
    fullDescription: "Our computer vision research focuses on developing advanced algorithms for facial paralysis detection and creating efficient neural networks for image processing. This work has significant implications for medical diagnostics and improving the performance of vision-based AI systems.",
    technicalDescription: "In our facial paralysis detection research, we employ convolutional neural networks (CNNs) trained on a large dataset of facial images. We've developed a novel architecture that combines feature extraction from different facial regions to achieve high accuracy. For efficient neural networks, we've explored techniques such as pruning, quantization, and knowledge distillation to reduce model size and inference time while maintaining accuracy.",
    image: "/images/computer-vision-research.jpg"
  },
  {
    name: "Speech Processing",
    description: "Advanced research in speech emotion recognition and dysarthria classification.",
    technicalDetails: "Designed and trained a novel generalizable speech emotion recognition (SER) model using transformers with multi-lingual datasets. Developed deep learning models for dysarthria classification from raw speech, analyzing multi-lingual datasets and maximizing generalization properties.",
    fullDescription: "Our speech processing research aims to push the boundaries of speech emotion recognition and improve the classification of speech disorders such as dysarthria. This work has applications in mental health monitoring, accessibility technologies, and enhancing human-computer interaction.",
    technicalDescription: "For speech emotion recognition, we've developed a transformer-based model that can process raw audio waveforms directly. Our model incorporates self-attention mechanisms to capture long-range dependencies in speech signals. For dysarthria classification, we use a combination of convolutional and recurrent neural networks to extract both local and temporal features from speech samples. We've also implemented data augmentation techniques to improve model generalization across different languages and accents.",
    image: "/images/speech-processing-research.jpg"
  },
  {
    name: "Neural Networks",
    description: "Research on efficient neural network architectures and quantization techniques.",
    technicalDetails: "Conducted research on Neural Architecture Search for SPD Manifold Networks. Implemented a novel quantized (INT8) neural network for both training and inference, maintaining baseline performance while reducing computational resource demands.",
    fullDescription: "Our neural networks research focuses on developing more efficient architectures and improving the performance of existing models through advanced quantization techniques. This work is crucial for deploying AI models on resource-constrained devices and reducing the environmental impact of large-scale AI systems.",
    technicalDescription: "In our Neural Architecture Search (NAS) work, we've developed a reinforcement learning-based approach to automatically design optimal network architectures for specific tasks. Our research on SPD Manifold Networks involves incorporating geometric constraints into neural networks to improve their representational power. For quantization, we've implemented a novel training scheme that allows for INT8 quantization of both weights and activations, with minimal loss in accuracy compared to full-precision models.",
    image: "/images/neural-networks-research.jpg"
  },
];

export default function AIResearchPage() {
  const [isTechnicalView, setIsTechnicalView] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <ViewSelector onViewChange={setIsTechnicalView} label="View" />
      
      {/* Summary Section */}
      <h1 className="text-4xl font-bold mb-8 text-center">AI Research Areas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {researchAreas.map((area) => (
          <div key={area.name} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">{area.name}</h2>
              <p className="text-gray-600 mb-4">
                {isTechnicalView ? area.technicalDetails : area.description}
              </p>
              <Link href={`#${area.name.toLowerCase().replace(/\s+/g, '-')}`} className="text-blue-500 hover:underline">
                Learn more
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Section */}
      <div className="space-y-16">
        {researchAreas.map((area) => (
          <div key={area.name} id={area.name.toLowerCase().replace(/\s+/g, '-')} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-3xl font-bold mb-4">{area.name}</h2>
              <div className="mb-6">
                <Image src={area.image} alt={area.name} width={800} height={400} className="rounded-lg" />
              </div>
              <p className="text-gray-600 mb-4">
                {isTechnicalView ? area.technicalDescription : area.fullDescription}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
