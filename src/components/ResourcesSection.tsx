
import React from 'react';
import ResourceCard from './ResourceCard';
import { Book, Heart, Activity, Brain, Moon, User, DollarSign } from 'lucide-react';

const ResourcesSection = () => {
  const resources = [
    {
      title: "Reproductive Health",
      description: "Essential information on menstrual health, contraception, fertility, and reproductive system care.",
      icon: <Heart size={20} />,
      link: "#",
    },
    {
      title: "Pregnancy & Postpartum",
      description: "Guidance for pregnancy stages, prenatal care, birth preparation, and postpartum recovery.",
      icon: <User size={20} />,
      link: "#",
    },
    {
      title: "Physical Wellness",
      description: "Tips on nutrition, exercise, preventive care, and managing health conditions common among women.",
      icon: <Activity size={20} />,
      link: "#",
    },
    {
      title: "Mental Health",
      description: "Resources addressing anxiety, depression, stress management, and emotional wellbeing for women.",
      icon: <Brain size={20} />,
      link: "#",
    },
    {
      title: "Sleep & Rest",
      description: "Strategies for better sleep, rest, and recovery to support overall health and wellbeing.",
      icon: <Moon size={20} />,
      link: "#",
    },
    {
      title: "Financial Wellness",
      description: "Tools and information on financial literacy, planning, and economic empowerment for women.",
      icon: <DollarSign size={20} />,
      link: "#",
    },
  ];

  return (
    <section id="resources" className="py-16 bg-lumi-gray-light/30">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold text-lumi-purple-dark mb-4">Wellness Resources</h2>
          <p className="text-lumi-gray-dark max-w-2xl mx-auto">
            Explore our curated collection of articles, guides and tools to support your health journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <ResourceCard 
              key={index}
              title={resource.title}
              description={resource.description}
              icon={resource.icon}
              link={resource.link}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <div className="lumi-card p-6 max-w-2xl mx-auto">
            <Book size={28} className="text-lumi-purple mx-auto mb-4" />
            <h3 className="text-xl font-display font-semibold text-lumi-purple-dark mb-2">
              Request a Topic
            </h3>
            <p className="text-lumi-gray-dark mb-4">
              Don't see what you're looking for? Chat with Lumi or suggest a resource topic you'd find helpful.
            </p>
            <button className="lumi-button-secondary">
              Suggest a topic
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
