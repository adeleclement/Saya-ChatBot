
import React from 'react';
import { Heart, ExternalLink, Mail, Instagram, Twitter } from 'lucide-react';
const Footer = () => {
  return <footer id="about" className="bg-white border-t border-lumi-purple/10 pt-12 pb-6">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-lumi-purple to-lumi-pink flex items-center justify-center">
                <Heart size={16} className="text-white" />
              </div>
              <h2 className="text-xl font-display font-bold text-lumi-purple">Yara</h2>
            </div>
            <p className="text-lumi-gray-dark mb-4">
              Your compassionate companion for women's health and wellbeing, providing evidence-based information and supportive guidance.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-lumi-gray-light/50 flex items-center justify-center text-lumi-purple hover:bg-lumi-purple/10 transition-colors">
                <Mail size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-lumi-gray-light/50 flex items-center justify-center text-lumi-purple hover:bg-lumi-purple/10 transition-colors">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-lumi-gray-light/50 flex items-center justify-center text-lumi-purple hover:bg-lumi-purple/10 transition-colors">
                <Twitter size={16} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-display font-semibold text-lumi-purple-dark mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-lumi-gray-dark hover:text-lumi-purple transition-colors">Health Articles</a></li>
              <li><a href="#" className="text-lumi-gray-dark hover:text-lumi-purple transition-colors">Wellness Guides</a></li>
              <li><a href="#" className="text-lumi-gray-dark hover:text-lumi-purple transition-colors">Community Support</a></li>
              <li><a href="#" className="text-lumi-gray-dark hover:text-lumi-purple transition-colors">Expert Insights</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display font-semibold text-lumi-purple-dark mb-4">About</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-lumi-gray-dark hover:text-lumi-purple transition-colors">Our Mission</a></li>
              <li><a href="#" className="text-lumi-gray-dark hover:text-lumi-purple transition-colors">How Yara Works</a></li>
              <li><a href="#" className="text-lumi-gray-dark hover:text-lumi-purple transition-colors">Medical Disclaimer</a></li>
              <li><a href="#" className="text-lumi-gray-dark hover:text-lumi-purple transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="text-center pt-6 border-t border-lumi-purple/10">
          <p className="text-sm text-lumi-gray">
            <span className="block md:inline mb-2 md:mb-0">
              © {new Date().getFullYear()} Yara Wellness Assistant. All rights reserved.
            </span>
            <span className="hidden md:inline mx-2">•</span>
            <span className="block md:inline">
              Made with <Heart size={12} className="inline text-lumi-pink mx-1" /> for women's wellbeing
            </span>
          </p>
          <p className="text-xs text-lumi-gray mt-2">
            Yara is an AI assistant and does not replace professional medical advice, diagnosis, or treatment.
            Always consult qualified healthcare providers for medical concerns.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;
