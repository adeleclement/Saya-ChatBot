import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EnhancedResourceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  className?: string;
  category?: string;
}

const EnhancedResourceCard: React.FC<EnhancedResourceCardProps> = ({
  title,
  description,
  icon,
  link,
  className = '',
  category
}) => {
  return (
    <Link to={link} className="block group">
      <motion.div 
        className={`bg-card/80 backdrop-blur-sm border border-border rounded-xl p-6 h-full transition-all duration-300 hover:shadow-elegant hover:-translate-y-1 cursor-pointer ${className}`}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              {icon}
            </div>
            {category && (
              <span className="text-xs px-2 py-1 rounded-full bg-secondary/20 text-secondary-foreground font-medium">
                {category}
              </span>
            )}
          </div>
          
          <h3 className="text-lg font-display font-semibold text-foreground mb-3 leading-tight group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow">
            {description}
          </p>
          
          <div className="flex items-center justify-between pt-2 mt-auto border-t border-border/50">
            <span className="text-sm font-medium text-primary">Learn more</span>
            <ArrowRight size={16} className="text-primary group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default EnhancedResourceCard;