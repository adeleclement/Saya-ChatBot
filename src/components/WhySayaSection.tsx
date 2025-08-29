import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Heart, Lightbulb, Users } from 'lucide-react';

const WhySayaSection = () => {
  const features = [
    {
      icon: <Shield size={24} className="text-primary" />,
      title: "Trusted Guidance",
      description: "Evidence-based information from healthcare professionals"
    },
    {
      icon: <Heart size={24} className="text-primary" />,
      title: "Tailored to You", 
      description: "Personalized conversations that adapt to your unique needs"
    },
    {
      icon: <Lightbulb size={24} className="text-primary" />,
      title: "Always Available",
      description: "24/7 support whenever you have questions or concerns"
    },
    {
      icon: <Users size={24} className="text-primary" />,
      title: "Your Privacy is Our Priority",
      description: "Completely confidential and secure conversations"
    }
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-background to-muted/30">
      <div className="container max-w-6xl mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          variants={fadeIn}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Why Saya?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your wellbeing journey deserves compassionate, reliable support that's available when you need it most.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-6 text-center hover:shadow-elegant transition-all duration-300 hover:-translate-y-1"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              variants={fadeIn}
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                {feature.icon}
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySayaSection;