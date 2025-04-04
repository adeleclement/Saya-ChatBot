
import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        className="flex flex-col items-center"
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-lumi-purple to-lumi-pink flex items-center justify-center">
          <Heart size={32} className="text-white" />
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-4 text-lumi-purple-dark font-display font-medium"
        >
          Loading Lumi...
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
