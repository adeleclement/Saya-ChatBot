
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, MessageCircle, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(() => ["supportive", "empathetic", "caring", "thoughtful", "compassionate"], []);
  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);
  
  return <section className="py-20 md:py-28 lumi-gradient-bg relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div className="absolute -top-48 -right-48 w-96 h-96 bg-lumi-pink/10 rounded-full blur-3xl opacity-70" animate={{
        scale: [1, 1.1, 1],
        opacity: [0.6, 0.8, 0.6]
      }} transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: "reverse"
      }} />
        <motion.div className="absolute top-20 -left-24 w-64 h-64 bg-lumi-blue/10 rounded-full blur-3xl opacity-70" animate={{
        scale: [1, 1.2, 1],
        opacity: [0.7, 0.5, 0.7]
      }} transition={{
        duration: 7,
        repeat: Infinity,
        repeatType: "reverse",
        delay: 1
      }} />
      </div>
      
      <div className="container max-w-6xl mx-auto px-4 relative">
        <div className="flex gap-8 py-10 items-center justify-center flex-col">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }}>
            <Button variant="outline" size="sm" className="rounded-full border-lumi-purple/20 text-lumi-purple-dark hover:bg-lumi-purple/5 gap-2" onClick={() => document.getElementById('resources')?.scrollIntoView({
            behavior: 'smooth'
          })}>
              Explore our resources <MoveRight className="w-4 h-4" />
            </Button>
          </motion.div>
          
          <motion.div className="flex gap-4 flex-col" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          duration: 0.8,
          delay: 0.3
        }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl max-w-2xl tracking-tighter text-center font-display font-bold text-foreground leading-tight">
              <span>Your</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => <motion.span key={index} className="absolute font-semibold" initial={{
                opacity: 0,
                y: "-100"
              }} transition={{
                type: "spring",
                stiffness: 50
              }} animate={titleNumber === index ? {
                y: 0,
                opacity: 1
              } : {
                y: titleNumber > index ? -150 : 150,
                opacity: 0
              }}>
                    {title}
                  </motion.span>)}
              </span>
              <span> companion for women's wellbeing</span>
            </h1>

            <motion.p className="text-lg text-muted-foreground mb-8 max-w-2xl text-center mx-auto leading-relaxed" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.6
          }}>
              Get personalized guidance on women's health with Saya's thoughtful, evidence-based support.
            </motion.p>
          </motion.div>
          
          <motion.div className="flex flex-col sm:flex-row gap-4" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.9
        }}>
            <Button size="lg" variant="premium" className="rounded-full flex gap-2 items-center" onClick={() => document.getElementById('chat')?.scrollIntoView({
            behavior: 'smooth'
          })}>
              <MessageCircle size={20} />
              <span>Chat with Saya</span>
            </Button>
            
            <Link to="/about">
              <Button variant="outline" size="lg" className="rounded-full border-primary/30 text-foreground hover:bg-primary/5 flex gap-2 items-center transition-all">
                <Heart size={20} />
                <span>Learn about our approach</span>
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>;
}

export { Hero };
