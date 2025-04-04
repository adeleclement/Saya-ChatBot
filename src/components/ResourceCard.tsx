
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResourceCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  icon?: React.ReactNode;
  link?: string;
  className?: string;
}

const ResourceCard = ({ 
  title, 
  description, 
  imageUrl, 
  icon, 
  link, 
  className 
}: ResourceCardProps) => {
  return (
    <div className={cn("lumi-card overflow-hidden group/card flex flex-col h-full transition-all duration-300", className)}>
      {imageUrl && (
        <div className="h-40 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-transform group-hover/card:scale-105 duration-500"
          />
        </div>
      )}
      
      <div className="p-5 flex-1 flex flex-col relative">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-lumi-purple/0 group-hover/card:bg-lumi-purple/100 transition-all duration-300"></div>
        
        <div className="flex items-start justify-between mb-3 group-hover/card:translate-x-2 transition-transform duration-300">
          <div className="flex items-center gap-2">
            {icon && <div className="text-lumi-purple">{icon}</div>}
            <h3 className="font-display font-semibold text-lumi-purple-dark">{title}</h3>
          </div>
        </div>
        
        <p className="text-lumi-gray-dark text-sm flex-1 group-hover/card:translate-x-2 transition-transform duration-300">{description}</p>
        
        {link && (
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="mt-4 inline-flex items-center gap-1 text-sm text-lumi-purple font-medium hover:text-lumi-purple-dark transition-colors group-hover/card:translate-x-2 transition-all duration-300"
          >
            Learn more <ExternalLink size={14} className="transition-transform group-hover/card:translate-x-1 duration-300" />
          </a>
        )}
      </div>
    </div>
  );
};

export default ResourceCard;
