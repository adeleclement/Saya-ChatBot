
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Book, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const LearnMoreGeneral = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const sections = [
    {
      title: "What is Lumi?",
      content: "Lumi is an AI-powered health companion dedicated to supporting women throughout their health journey. Available 24/7, Lumi provides evidence-based information, personalized guidance, and compassionate support on a wide range of women's health topics.",
      icon: <Heart size={28} className="text-lumi-purple" />
    },
    {
      title: "How Lumi Can Help You",
      content: "Whether you're looking for information about reproductive health, seeking guidance during pregnancy, or exploring ways to optimize your physical and mental wellbeing, Lumi offers personalized, judgment-free support. Unlike generic search engines, Lumi tailors information to your specific needs and questions.",
      icon: <MessageCircle size={28} className="text-lumi-purple" />
    },
    {
      title: "Our Approach",
      content: "Lumi combines medical expertise with empathetic communication to create a supportive space for exploring health topics. All information provided is evidence-based and regularly reviewed by healthcare professionals to ensure accuracy and relevance.",
      icon: <Book size={28} className="text-lumi-purple" />
    }
  ];

  const features = [
    {
      title: "24/7 Availability",
      description: "Access support and information whenever you need it, day or night."
    },
    {
      title: "Personalized Guidance",
      description: "Receive information tailored to your specific questions and needs."
    },
    {
      title: "Privacy-Focused",
      description: "Your conversations with Lumi are private and confidential."
    },
    {
      title: "Evidence-Based Information",
      description: "All guidance is grounded in current medical knowledge and research."
    },
    {
      title: "Judgment-Free Support",
      description: "Ask any questions in a supportive, non-judgmental environment."
    },
    {
      title: "Comprehensive Resources",
      description: "Access a growing library of detailed articles and guides."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 lumi-gradient-bg -z-10"></div>
          <div className="container max-w-6xl mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              variants={fadeIn}
            >
              <h1 className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-lumi-purple to-lumi-purple-dark bg-clip-text text-transparent mb-6">
                Learn More About Lumi
              </h1>
              <p className="text-lumi-gray-dark max-w-2xl mx-auto text-lg">
                Your personal health companion, providing compassionate support and evidence-based information when you need it most.
              </p>
            </motion.div>

            <div className="space-y-10 mb-16">
              {sections.map((section, index) => (
                <motion.div 
                  key={index}
                  className="neo-card p-6 md:p-8"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  variants={fadeIn}
                >
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="w-14 h-14 rounded-full bg-lumi-purple/10 flex items-center justify-center shrink-0 mx-auto md:mx-0">
                      {section.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-display font-semibold text-lumi-purple-dark mb-3 text-center md:text-left">
                        {section.title}
                      </h2>
                      <p className="text-lumi-gray-dark">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              variants={fadeIn}
            >
              <h2 className="text-2xl md:text-3xl font-display font-semibold text-lumi-purple-dark mb-8 text-center">
                Key Features
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <motion.div 
                    key={index}
                    className="neo-card p-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    variants={fadeIn}
                  >
                    <h3 className="text-xl font-display font-semibold text-lumi-purple-dark mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-lumi-gray-dark">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="grid md:grid-cols-2 gap-8 mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              variants={fadeIn}
            >
              <div className="neo-card p-6 md:p-8 flex flex-col h-full">
                <h2 className="text-2xl font-display font-semibold text-lumi-purple-dark mb-4">
                  Explore Our Resources
                </h2>
                <p className="text-lumi-gray-dark mb-6 flex-grow">
                  Browse our comprehensive library of articles, guides, and tools covering a wide range of women's health topics, from reproductive health to mental wellbeing.
                </p>
                <Link to="/resources">
                  <Button className="rounded-full bg-gradient-to-br from-lumi-purple to-lumi-purple-dark text-white hover:opacity-90 transition-all w-full justify-center">
                    <span>View Resources</span>
                    <ArrowRight size={16} />
                  </Button>
                </Link>
              </div>
              
              <div className="neo-card p-6 md:p-8 flex flex-col h-full">
                <h2 className="text-2xl font-display font-semibold text-lumi-purple-dark mb-4">
                  Chat with Lumi
                </h2>
                <p className="text-lumi-gray-dark mb-6 flex-grow">
                  Have specific questions? Start a conversation with Lumi to receive personalized guidance and support tailored to your unique situation.
                </p>
                <Button 
                  className="rounded-full bg-gradient-to-br from-lumi-purple to-lumi-purple-dark text-white hover:opacity-90 transition-all w-full justify-center"
                  onClick={() => document.getElementById('chat')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <span>Start Chatting</span>
                  <MessageCircle size={16} />
                </Button>
              </div>
            </motion.div>

            <motion.div 
              className="text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              variants={fadeIn}
            >
              <div className="neo-card p-8 max-w-3xl mx-auto">
                <h2 className="text-2xl font-display font-semibold text-lumi-purple-dark mb-4">
                  Ready to Get Started?
                </h2>
                <p className="text-lumi-gray-dark mb-6">
                  Lumi is here to support you on your health journey. Whether you're seeking information, guidance, or just someone to talk to, we're ready to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    variant="outline" 
                    className="rounded-full border-lumi-purple/20 text-lumi-purple-dark hover:bg-lumi-purple/5"
                    onClick={() => document.getElementById('resources')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <Book size={16} />
                    <span>Browse Resources</span>
                  </Button>
                  <Button 
                    className="rounded-full bg-gradient-to-br from-lumi-purple to-lumi-purple-dark text-white hover:opacity-90 transition-all shadow-md hover:shadow-lg"
                    onClick={() => document.getElementById('chat')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <MessageCircle size={16} />
                    <span>Chat with Lumi</span>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LearnMoreGeneral;
