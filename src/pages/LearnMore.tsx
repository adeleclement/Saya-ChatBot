
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowLeft, Book, Heart, Info } from 'lucide-react';

const LearnMore = () => {
  const { topic } = useParams();
  
  // This would typically come from a CMS or database
  const content = {
    'menstrual-cycle': {
      title: 'Understanding Your Menstrual Cycle',
      icon: <Heart size={24} className="text-lumi-purple" />,
      intro: 'The menstrual cycle is a complex series of hormonal changes that prepares the body for potential pregnancy each month.',
      sections: [
        {
          title: 'The Four Phases',
          content: `Your menstrual cycle consists of four main phases: menstrual, follicular, ovulatory, and luteal. Each phase is characterized by different hormonal patterns that affect your body and emotions in various ways.
          
          During the menstrual phase, the lining of your uterus is shed, resulting in your period. The follicular phase follows as your body prepares to release an egg. The ovulatory phase is when an egg is released from your ovary, and the luteal phase prepares your body for either pregnancy or the start of a new cycle.`
        },
        {
          title: 'Hormonal Changes',
          content: `Throughout your cycle, levels of estrogen, progesterone, follicle-stimulating hormone (FSH), and luteinizing hormone (LH) rise and fall in a predictable pattern. These hormonal fluctuations can affect your energy levels, mood, appetite, and even cognitive functions.`
        },
        {
          title: 'Tracking Your Cycle',
          content: `Keeping track of your cycle can help you understand your body better and anticipate changes in how you feel. Many apps and methods are available for cycle tracking, from simple calendar notes to sophisticated fertility awareness methods.`
        }
      ],
      tips: [
        'Keep a journal of symptoms throughout your cycle to identify patterns',
        'Adjust your exercise routine to match your energy levels during different phases',
        'Consider dietary adjustments to support hormonal balance',
        'Practice self-care and stress management, especially during premenstrual days'
      ],
      relatedTopics: [
        { title: 'Managing PMS Symptoms', link: '/learn-more/pms-management' },
        { title: 'Hormonal Health Basics', link: '/learn-more/hormonal-health' },
        { title: 'Birth Control Options', link: '/learn-more/birth-control' }
      ]
    },
    'default': {
      title: 'Resource Not Found',
      icon: <Info size={24} className="text-lumi-purple" />,
      intro: 'We couldn\'t find the specific resource you\'re looking for.',
      sections: [
        {
          title: 'Explore Our Resources',
          content: 'Please check our resources page for a full list of available topics, or chat with Lumi for personalized guidance.'
        }
      ],
      tips: [
        'Try searching for related topics in the search bar',
        'Chat with Lumi for personalized recommendations',
        'Browse all resources by category on the Resources page'
      ],
      relatedTopics: []
    }
  };

  // Get the content for the requested topic, or use default if not found
  const pageContent = content[topic as keyof typeof content] || content['default'];
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-16 bg-lumi-gray-light/30">
          <div className="container max-w-4xl mx-auto px-4">
            <Link to="/resources">
              <Button 
                variant="ghost" 
                size="sm" 
                className="mb-6 text-lumi-purple hover:text-lumi-purple-dark flex items-center gap-1"
              >
                <ArrowLeft size={16} />
                Back to Resources
              </Button>
            </Link>
            
            <motion.div 
              className="text-center mb-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              variants={fadeIn}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-lumi-purple/10 flex items-center justify-center">
                  {pageContent.icon}
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-lumi-purple-dark mb-4">{pageContent.title}</h1>
              <p className="text-lumi-gray-dark max-w-2xl mx-auto text-lg">
                {pageContent.intro}
              </p>
            </motion.div>
            
            <motion.div 
              className="neo-card p-8 mb-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              variants={fadeIn}
            >
              {pageContent.sections.map((section, index) => (
                <div key={index} className={`${index > 0 ? 'mt-8 pt-8 border-t border-lumi-purple/10' : ''}`}>
                  <h2 className="text-2xl font-display font-semibold text-lumi-purple-dark mb-4">{section.title}</h2>
                  <div className="text-lumi-gray-dark space-y-4">
                    {section.content.split('\n\n').map((paragraph, pIndex) => (
                      <p key={pIndex}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
            
            {pageContent.tips && pageContent.tips.length > 0 && (
              <motion.div 
                className="neo-card p-8 mb-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                variants={fadeIn}
              >
                <h2 className="text-2xl font-display font-semibold text-lumi-purple-dark mb-4">Helpful Tips</h2>
                <ul className="space-y-3">
                  {pageContent.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="min-w-5 mt-1 w-5 h-5 rounded-full bg-lumi-purple/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-lumi-purple"></div>
                      </div>
                      <span className="text-lumi-gray-dark">{tip}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
            
            {pageContent.relatedTopics && pageContent.relatedTopics.length > 0 && (
              <motion.div 
                className="neo-card p-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                variants={fadeIn}
              >
                <h2 className="text-2xl font-display font-semibold text-lumi-purple-dark mb-4">Related Topics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pageContent.relatedTopics.map((topic, index) => (
                    <Link key={index} to={topic.link}>
                      <div className="p-4 border border-lumi-purple/20 rounded-lg hover:bg-lumi-purple/5 transition-colors flex items-center gap-3">
                        <Book size={18} className="text-lumi-purple" />
                        <span className="text-lumi-purple-dark">{topic.title}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
            
            <motion.div 
              className="text-center mt-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              variants={fadeIn}
            >
              <h3 className="text-xl font-display font-semibold text-lumi-purple-dark mb-3">
                Have more questions?
              </h3>
              <p className="text-lumi-gray-dark mb-6">
                Lumi is here to provide personalized guidance on this and related topics.
              </p>
              <Button 
                className="rounded-full bg-gradient-to-br from-lumi-purple to-lumi-purple-dark text-white hover:opacity-90 transition-all shadow-md hover:shadow-lg"
                onClick={() => document.getElementById('chat')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Chat with Lumi
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LearnMore;
