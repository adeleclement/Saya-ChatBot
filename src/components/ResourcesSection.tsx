
import React from 'react';
import { cn } from '@/lib/utils';
import { Book, Heart, Activity, Brain, Moon, User, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ResourcesSection = () => {
  const resources = [
    {
      title: "Reproductive Health",
      description: "Essential information on menstrual health, contraception, fertility, and reproductive system care.",
      icon: <Heart size={24} />,
      link: "/resources",
    },
    {
      title: "Pregnancy & Postpartum",
      description: "Guidance for pregnancy stages, prenatal care, birth preparation, and postpartum recovery.",
      icon: <User size={24} />,
      link: "/resources",
    },
    {
      title: "Physical Wellness",
      description: "Tips on nutrition, exercise, preventive care, and managing health conditions common among women.",
      icon: <Activity size={24} />,
      link: "/resources",
    },
    {
      title: "Mental Health",
      description: "Resources addressing anxiety, depression, stress management, and emotional wellbeing for women.",
      icon: <Brain size={24} />,
      link: "/resources",
    },
    {
      title: "Sleep & Rest",
      description: "Strategies for better sleep, rest, and recovery to support overall health and wellbeing.",
      icon: <Moon size={24} />,
      link: "/resources",
    },
    {
      title: "Financial Wellness",
      description: "Tools and information on financial literacy, planning, and economic empowerment for women.",
      icon: <DollarSign size={24} />,
      link: "/resources",
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10 max-w-6xl mx-auto">
          {resources.map((resource, index) => (
            <Resource 
              key={index}
              title={resource.title}
              description={resource.description}
              icon={resource.icon}
              link={resource.link}
              index={index}
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
            <Button className="rounded-full bg-gradient-to-br from-lumi-purple to-lumi-purple-dark text-white hover:opacity-90 transition-all">
              Suggest a topic
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Resource = ({
  title,
  description,
  icon,
  link,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col py-10 px-6 relative group/feature transition-all duration-300",
        "border-lumi-purple/10",
        (index === 0 || index === 3) && "lg:border-l",
        index < 3 && "lg:border-b"
      )}
    >
      {index < 3 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-300 absolute inset-0 h-full w-full bg-gradient-to-t from-lumi-purple/5 to-transparent pointer-events-none rounded-xl" />
      )}
      {index >= 3 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-300 absolute inset-0 h-full w-full bg-gradient-to-b from-lumi-purple/5 to-transparent pointer-events-none rounded-xl" />
      )}
      
      <div className="mb-4 relative z-10 text-lumi-purple">
        {icon}
      </div>
      
      <div className="text-lg font-bold mb-2 relative z-10 font-display">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-lumi-purple/20 group-hover/feature:bg-lumi-purple transition-all duration-300 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-300 inline-block text-lumi-purple-dark">
          {title}
        </span>
      </div>
      
      <p className="text-sm text-lumi-gray-dark max-w-xs relative z-10 mb-4">
        {description}
      </p>
      
      <Link 
        to={link}
        className="mt-auto text-sm text-lumi-purple font-medium hover:text-lumi-purple-dark transition-colors relative z-10 inline-flex items-center gap-1 group-hover/feature:translate-x-2 transition-transform duration-300"
      >
        Learn more <span className="text-xs">→</span>
      </Link>
    </div>
  );
};

export default ResourcesSection;
