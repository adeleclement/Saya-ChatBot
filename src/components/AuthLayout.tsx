
import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-white to-lumi-purple/5">
      <div className="hidden lg:flex flex-col w-1/2 bg-gradient-to-br from-lumi-purple/20 to-lumi-pink/20 justify-center items-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center max-w-md"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-lumi-purple to-lumi-pink flex items-center justify-center mb-6">
            <Heart size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-display font-bold text-lumi-purple-dark mb-4">
            Welcome to Lumi
          </h1>
          <p className="text-lumi-gray-dark mb-6">
            Your personal health companion dedicated to supporting your wellness journey with empathy and expertise.
          </p>
          <Link 
            to="/" 
            className="text-sm text-lumi-purple hover:text-lumi-purple-dark transition-colors"
          >
            ← Back to home
          </Link>
        </motion.div>
      </div>
      <div className="w-full lg:w-1/2 flex justify-center items-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;
