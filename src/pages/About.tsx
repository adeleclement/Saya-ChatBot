import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Activity, Users, Award, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
const About = () => {
  const fadeIn = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0
    }
  };
  return <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 lumi-gradient-bg -z-10"></div>
          <div className="container max-w-6xl mx-auto px-4">
            <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{
            once: true
          }} transition={{
            duration: 0.5
          }} variants={fadeIn}>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-lumi-purple-dark mb-6">About Saya</h1>
              <p className="text-lumi-gray-dark max-w-2xl mx-auto text-lg">
                Your personal health companion dedicated to supporting your wellness journey with empathy and expertise.
              </p>
            </motion.div>

            <motion.div className="grid md:grid-cols-2 gap-10 items-center mb-20" initial="hidden" whileInView="visible" viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: 0.2
          }} variants={fadeIn}>
              <div className="order-2 md:order-1">
                <h2 className="text-2xl md:text-3xl font-display font-semibold text-lumi-purple-dark mb-4">
                  Our Mission
                </h2>
                <p className="text-lumi-gray-dark mb-4">Saya was created with a simple yet powerful mission: to provide women with a safe, judgment-free space to explore health topics, find reliable information, and receive personalized guidance.</p>
                <p className="text-lumi-gray-dark mb-6">
                  We believe that access to compassionate health support should be available to everyone, whenever they need it. Through thoughtful conversations and evidence-based resources, we aim to empower women to make informed decisions about their wellbeing.
                </p>
                <Button className="rounded-full bg-gradient-to-br from-lumi-purple to-lumi-purple-dark text-white hover:opacity-90 transition-all shadow-md hover:shadow-lg flex gap-2 items-center" onClick={() => document.getElementById('chat')?.scrollIntoView({
                behavior: 'smooth'
              })}>
                  <MessageCircle size={16} />
                  <span>Chat with Saya</span>
                </Button>
              </div>
              <div className="order-1 md:order-2 flex justify-center">
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-lumi-purple/30 to-lumi-pink/30 flex items-center justify-center shadow-lg">
                  <Heart size={80} className="text-lumi-purple" />
                </div>
              </div>
            </motion.div>

            <motion.div className="mb-20" initial="hidden" whileInView="visible" viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: 0.3
          }} variants={fadeIn}>
              <h2 className="text-2xl md:text-3xl font-display font-semibold text-lumi-purple-dark mb-8 text-center">What Makes Saya Special</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[{
                icon: <Activity size={36} className="text-lumi-purple" />,
                title: "Evidence-Based",
                description: "All information provided by Lumi is grounded in medical research and expert knowledge."
              }, {
                icon: <Users size={36} className="text-lumi-purple" />,
                title: "Personalized",
                description: "Every conversation is tailored to your unique needs, questions, and concerns."
              }, {
                icon: <Award size={36} className="text-lumi-purple" />,
                title: "Private & Secure",
                description: "Your privacy is our priority. All conversations are confidential and protected."
              }].map((feature, index) => <motion.div key={index} className="neo-card p-6 flex flex-col items-center text-center" initial="hidden" whileInView="visible" viewport={{
                once: true
              }} transition={{
                duration: 0.3,
                delay: 0.2 + index * 0.1
              }} variants={fadeIn}>
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-display font-semibold text-lumi-purple-dark mb-2">{feature.title}</h3>
                    <p className="text-lumi-gray-dark">{feature.description}</p>
                  </motion.div>)}
              </div>
            </motion.div>

            <motion.div className="neo-card p-8 md:p-12" initial="hidden" whileInView="visible" viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: 0.4
          }} variants={fadeIn}>
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-display font-semibold text-lumi-purple-dark mb-4">The Team Behind Saya</h2>
                <p className="text-lumi-gray-dark max-w-3xl mx-auto">
                  Lumi is developed by a diverse team of healthcare professionals, engineers, and designers committed to creating technology that makes a positive difference in women's lives.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((team, index) => <div key={index} className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full bg-lumi-purple/20 flex items-center justify-center mb-4">
                      <Star size={32} className="text-lumi-purple" />
                    </div>
                    <h3 className="text-lg font-display font-semibold text-lumi-purple-dark mb-1">Our Specialists</h3>
                    <p className="text-lumi-gray-dark text-sm">Healthcare experts who ensure saya provides accurate, helpful information.</p>
                  </div>)}
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>;
};
export default About;