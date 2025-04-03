
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ResourceCard from '@/components/ResourceCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Book, Heart, Activity, Brain, Moon, User, DollarSign, Search, Filter } from 'lucide-react';

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Resources' },
    { id: 'reproductive', label: 'Reproductive Health' },
    { id: 'pregnancy', label: 'Pregnancy & Postpartum' },
    { id: 'physical', label: 'Physical Wellness' },
    { id: 'mental', label: 'Mental Health' },
    { id: 'sleep', label: 'Sleep & Rest' },
    { id: 'financial', label: 'Financial Wellness' },
  ];

  const resources = [
    {
      id: 1,
      title: "Understanding Your Menstrual Cycle",
      description: "A comprehensive guide to the four phases of the menstrual cycle and how they affect your body and mood.",
      icon: <Heart size={20} />,
      link: "/learn-more/menstrual-cycle",
      category: 'reproductive'
    },
    {
      id: 2,
      title: "Pregnancy Nutrition Guide",
      description: "Essential nutrients and meal planning advice for a healthy pregnancy and fetal development.",
      icon: <User size={20} />,
      link: "/learn-more/pregnancy-nutrition",
      category: 'pregnancy'
    },
    {
      id: 3,
      title: "Women's Strength Training Fundamentals",
      description: "Evidence-based approaches to strength training for women at any fitness level.",
      icon: <Activity size={20} />,
      link: "/learn-more/strength-training",
      category: 'physical'
    },
    {
      id: 4,
      title: "Managing Anxiety and Stress",
      description: "Practical techniques and strategies for women to address anxiety and stress in everyday life.",
      icon: <Brain size={20} />,
      link: "/learn-more/anxiety-management",
      category: 'mental'
    },
    {
      id: 5,
      title: "Sleep Optimization for Women",
      description: "How hormonal fluctuations affect sleep and strategies to improve sleep quality throughout the month.",
      icon: <Moon size={20} />,
      link: "/learn-more/sleep-optimization",
      category: 'sleep'
    },
    {
      id: 6,
      title: "Women's Financial Independence",
      description: "A practical guide to financial literacy, investing, and building long-term financial security.",
      icon: <DollarSign size={20} />,
      link: "/learn-more/financial-independence",
      category: 'financial'
    },
    {
      id: 7,
      title: "Birth Control Options",
      description: "An overview of different contraceptive methods, their effectiveness, benefits, and considerations.",
      icon: <Heart size={20} />,
      link: "/learn-more/birth-control",
      category: 'reproductive'
    },
    {
      id: 8,
      title: "Postpartum Recovery",
      description: "Physical and emotional aspects of recovery after childbirth and how to navigate this important transition.",
      icon: <User size={20} />,
      link: "/learn-more/postpartum-recovery",
      category: 'pregnancy'
    },
    {
      id: 9,
      title: "Women's Preventive Health Screenings",
      description: "Recommended health screenings by age and risk factors to maintain optimal health.",
      icon: <Activity size={20} />,
      link: "/learn-more/preventive-screenings",
      category: 'physical'
    },
  ];

  const filteredResources = resources
    .filter(resource => 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(resource => selectedCategory === 'all' || resource.category === selectedCategory);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-16 bg-lumi-gray-light/30">
          <div className="container max-w-6xl mx-auto px-4">
            <motion.div 
              className="text-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              variants={fadeIn}
            >
              <h1 className="text-3xl md:text-4xl font-display font-bold text-lumi-purple-dark mb-4">Wellness Resources</h1>
              <p className="text-lumi-gray-dark max-w-2xl mx-auto">
                Explore our comprehensive collection of articles, guides, and tools to support your health journey.
              </p>
            </motion.div>
            
            <motion.div 
              className="mb-10 max-w-3xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              variants={fadeIn}
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lumi-gray" size={18} />
                <Input
                  type="text"
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="lumi-input pl-10 w-full"
                />
              </div>
            </motion.div>
            
            <motion.div 
              className="flex flex-wrap gap-2 justify-center mb-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              variants={fadeIn}
            >
              {categories.map((category, index) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`rounded-full ${
                    selectedCategory === category.id 
                      ? 'bg-gradient-to-br from-lumi-purple to-lumi-purple-dark text-white' 
                      : 'border-lumi-purple/20 text-lumi-purple-dark'
                  }`}
                >
                  {category.label}
                </Button>
              ))}
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.length > 0 ? (
                filteredResources.map((resource, index) => (
                  <motion.div
                    key={resource.id}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    variants={fadeIn}
                  >
                    <ResourceCard 
                      title={resource.title}
                      description={resource.description}
                      icon={resource.icon}
                      link={resource.link}
                    />
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  className="col-span-full text-center py-12"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  variants={fadeIn}
                >
                  <Book size={40} className="text-lumi-purple/50 mx-auto mb-4" />
                  <h3 className="text-xl font-display font-semibold text-lumi-purple-dark mb-2">
                    No resources found
                  </h3>
                  <p className="text-lumi-gray-dark mb-4">
                    Try adjusting your search or filter criteria.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                    }}
                    className="rounded-full border-lumi-purple/20 text-lumi-purple-dark"
                  >
                    <Filter size={16} />
                    <span>Clear filters</span>
                  </Button>
                </motion.div>
              )}
            </div>
            
            <motion.div 
              className="mt-16 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              variants={fadeIn}
            >
              <div className="lumi-card p-6 md:p-8 max-w-2xl mx-auto">
                <Book size={28} className="text-lumi-purple mx-auto mb-4" />
                <h3 className="text-xl font-display font-semibold text-lumi-purple-dark mb-2">
                  Request a Topic
                </h3>
                <p className="text-lumi-gray-dark mb-4">
                  Don't see what you're looking for? Chat with Lumi or suggest a resource topic you'd find helpful.
                </p>
                <Button 
                  className="rounded-full bg-gradient-to-br from-lumi-purple to-lumi-purple-dark text-white hover:opacity-90 transition-all"
                >
                  Suggest a topic
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Resources;
