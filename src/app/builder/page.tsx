'use client';

import { useState } from 'react';
import ViewSelector from '@/components/ViewSelector';
import Link from 'next/link';
import Image from 'next/image';

const projects = [
  {
    name: "FluentAI",
    description: "Chrome extension for AI-powered speech analysis and feedback.",
    technicalDetails: "Developed full-stack with React and Firebase. Implements speech recognition, natural language processing, and real-time feedback algorithms.",
    fullDescription: "FluentAI is an innovative Chrome extension designed to enhance public speaking skills. It utilizes advanced AI algorithms to analyze speech in real-time, providing instant feedback on various aspects such as pace, clarity, and engagement. The extension is particularly useful for professionals and students looking to improve their presentation skills.",
    technicalDescription: "FluentAI leverages the Web Speech API for real-time speech recognition. The frontend is built with React, utilizing hooks for state management and effect handling. Firebase is used for backend services, including user authentication and data storage. The natural language processing is powered by a custom-trained model using TensorFlow.js, allowing for on-device inference to ensure user privacy.",
    image: "/images/fluentai.jpg"
  },
  {
    name: "BoostsBNB",
    description: "AI photo enhancement platform for property owners and managers.",
    technicalDetails: "Utilized color/brightness enhancement models, AI upscalers, and detection + segmentation + inpainting models for sky replacement. Deployed on serverless GPUs with Next.js and Supabase backend.",
    fullDescription: "BoostsBNB is a cutting-edge AI-powered platform designed to enhance property photos for Airbnb hosts and real estate professionals. It automatically improves image quality, adjusts lighting, and can even replace dull skies with more attractive ones, significantly boosting the appeal of property listings.",
    technicalDescription: "The core of BoostsBNB is built on a series of deep learning models. We use a custom-trained U-Net architecture for image segmentation to identify areas for enhancement. The sky replacement feature uses a combination of DeepLabV3 for sky detection and a generative adversarial network (GAN) for realistic sky synthesis. The backend is built with Next.js API routes, with heavy computations offloaded to serverless GPUs on Google Cloud Platform. Supabase is used for user authentication and metadata storage.",
    image: "/images/boostsbnb.jpg"
  },
  {
    name: "Maaind",
    description: "Developed ML models for stress and heart rate variability prediction using wearable device data.",
    technicalDetails: "Designed and trained a novel generalizable speech emotion recognition (SER) model using transformers with multi-lingual datasets. Optimized models for inference and deployed to Azure and GCP online endpoints.",
    fullDescription: "Maaind is a pioneering project that leverages machine learning to predict stress and heart rate variability from wearable device data. The project showcases the potential of AI in improving mental health and wellness.",
    technicalDescription: "The core of Maaind is built on a series of deep learning models. We use a custom-trained transformer architecture for speech emotion recognition, leveraging multi-lingual datasets for generalizability. The models are optimized for inference and deployed to Azure and GCP online endpoints for seamless integration with wearable devices.",
    image: "/images/maaind.jpg"
  },
  {
    name: "UCSD",
    description: "Developed deep learning models for dysarthria classification from raw speech.",
    technicalDetails: "Analyzed multi-lingual datasets and maximized model generalization properties. Implemented a facial paralysis detection model.",
    fullDescription: "UCSD is a groundbreaking project that develops deep learning models for dysarthria classification from raw speech. The project showcases the potential of AI in improving speech recognition and diagnosis.",
    technicalDescription: "The core of UCSD is built on a series of deep learning models. We analyzed multi-lingual datasets and maximized model generalization properties. The project also implemented a facial paralysis detection model.",
    image: "/images/ucsd.jpg"
  },
  {
    name: "Huawei",
    description: "Research and development of efficient neural networks.",
    technicalDetails: "Benchmarked techniques for compressing and accelerating deep neural networks. Implemented a novel quantized (INT8) neural network for training and inference, maintaining baseline performance while reducing computational demands.",
    fullDescription: "Huawei is a research-focused project that explores the development of efficient neural networks. The project benchmarks various techniques for compressing and accelerating deep neural networks.",
    technicalDescription: "The core of Huawei is built on a series of research-focused models. We benchmarked techniques for compressing and accelerating deep neural networks. The project also implemented a novel quantized (INT8) neural network for training and inference.",
    image: "/images/huawei.jpg"
  },
];

export default function AIBuilderPage() {
  const [isTechnicalView, setIsTechnicalView] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <ViewSelector onViewChange={setIsTechnicalView} label="View" />
      
      {/* Summary Section */}
      <h1 className="text-4xl font-bold mb-8 text-center">AI Builder Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {projects.map((project) => (
          <div key={project.name} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">{project.name}</h2>
              <p className="text-gray-600 mb-4">
                {isTechnicalView ? project.technicalDetails : project.description}
              </p>
              <Link href={`#${project.name.toLowerCase()}`} className="text-blue-500 hover:underline">
                Learn more
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Section */}
      <div className="space-y-16">
        {projects.map((project) => (
          <div key={project.name} id={project.name.toLowerCase()} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-3xl font-bold mb-4">{project.name}</h2>
              <div className="mb-6">
                <Image src={project.image} alt={project.name} width={800} height={400} className="rounded-lg" />
              </div>
              <p className="text-gray-600 mb-4">
                {isTechnicalView ? project.technicalDescription : project.fullDescription}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
