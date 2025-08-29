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

            <motion.div 
              className="grid md:grid-cols-2 gap-10 items-center mb-20"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              variants={fadeIn}
            >
              <div className="order-2 md:order-1">
                <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-4">
                  Our Mission
                </h2>
                <div className="space-y-3 mb-6">
                  <p className="text-muted-foreground">• Provide women with a safe, judgment-free space for health conversations</p>
                  <p className="text-muted-foreground">• Deliver reliable, evidence-based health information and guidance</p>
                  <p className="text-muted-foreground">• Empower women to make informed decisions about their wellbeing</p>
                </div>
                <Button 
                  variant="premium" 
                  className="rounded-full flex gap-2 items-center" 
                  onClick={() => document.getElementById('chat')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <MessageCircle size={16} />
                  <span>Chat with Saya</span>
                </Button>
              </div>
              <div className="order-1 md:order-2 flex justify-center">
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center shadow-elegant">
                  <Heart size={80} className="text-primary" />
                </div>
              </div>
            </motion.div>

            <motion.div className="mb-20" initial="hidden" whileInView="visible" viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: 0.3
          }} variants={fadeIn}>
              <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-8 text-center">What Makes Saya Special</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[{
                icon: <Activity size={36} className="text-primary" />,
                title: "Trusted Guidance",
                description: "All information provided by Saya is grounded in medical research and expert knowledge."
              }, {
                icon: <Users size={36} className="text-primary" />,
                title: "Tailored to You", 
                description: "Every conversation is personalized to your unique needs, questions, and concerns."
              }, {
                icon: <Award size={36} className="text-primary" />,
                title: "Your Privacy is Our Priority",
                description: "All conversations are completely confidential and securely protected."
              }].map((feature, index) => <motion.div key={index} className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-6 flex flex-col items-center text-center hover:shadow-elegant transition-all" initial="hidden" whileInView="visible" viewport={{
                once: true
              }} transition={{
                duration: 0.3,
                delay: 0.2 + index * 0.1
              }} variants={fadeIn}>
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-display font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </motion.div>)}
              </div>
            </motion.div>

            <motion.div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-8 md:p-12" initial="hidden" whileInView="visible" viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: 0.4
          }} variants={fadeIn}>
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-4">Meet the Team</h2>
                <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Saya is developed by a diverse team of healthcare professionals, engineers, and designers committed to creating technology that makes a positive difference in women's lives.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { title: "Healthcare Professionals", description: "Medical experts who ensure Saya provides accurate, evidence-based information" },
                  { title: "AI Researchers", description: "Technology specialists focused on empathetic and intelligent conversation" },
                  { title: "UX Designers", description: "Design experts creating intuitive and supportive user experiences" }
                ].map((team, index) => <div key={index} className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Heart size={32} className="text-primary" />
                    </div>
                    <h3 className="text-lg font-display font-semibold text-foreground mb-1">{team.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{team.description}</p>
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