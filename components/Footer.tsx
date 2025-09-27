import React from 'react';
import { CONTACT_INFO } from '../constants';
import { WhatsAppIcon, PhoneIcon, MailIcon } from './icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-brand-light mt-16">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-serif font-semibold mb-4">Yassin Home Furniture</h3>
            <p className="text-gray-300">
              Crafting timeless pieces for modern living.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <WhatsAppIcon className="w-5 h-5 mr-3" />
                <a href={`https://wa.me/${CONTACT_INFO.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Chat on WhatsApp
                </a>
              </li>
              <li className="flex items-center">
                <PhoneIcon className="w-5 h-5 mr-3" />
                <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-white transition-colors">
                  Call Us
                </a>
              </li>
              <li className="flex items-center">
                <MailIcon className="w-5 h-5 mr-3" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-white transition-colors">
                  {CONTACT_INFO.email}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Visit Us</h3>
            <p className="text-gray-300">{CONTACT_INFO.address.line1}</p>
            <p className="text-gray-300">{CONTACT_INFO.address.line2}</p>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Yassin Home Furniture. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;