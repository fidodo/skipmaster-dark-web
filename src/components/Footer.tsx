import React from "react";
import { Mail, Phone, CreditCard } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1A202C] border-t border-gray-700 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* SkipMaster */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              Phido Skip<span className="text-[#4C6EF5]">Master</span>
            </h3>
            <p className="text-gray-300 text-sm">
              Your trusted partner for waste management solutions across the UK
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-[#4C6EF5] hover:text-[#3B5BDB] text-sm transition-colors"
                >
                  Skip Sizes
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#4C6EF5] hover:text-[#3B5BDB] text-sm transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#4C6EF5] hover:text-[#3B5BDB] text-sm transition-colors"
                >
                  Coverage Areas
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#4C6EF5] hover:text-[#3B5BDB] text-sm transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300 text-sm">0800 123 4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300 text-sm">
                  info@skipmaster.co.uk
                </span>
              </div>
            </div>
          </div>

          {/* We Accept */}
          <div>
            <h4 className="font-semibold mb-4">We Accept</h4>
            <div className="flex items-center space-x-4">
              <div className="bg-white rounded px-2 py-1">
                <CreditCard className="w-6 h-6 text-gray-800" />
              </div>
              <div className="bg-white rounded px-2 py-1">
                <span className="text-xs font-bold text-gray-800">VISA</span>
              </div>
              <div className="bg-white rounded px-2 py-1">
                <span className="text-xs font-bold text-gray-800">MC</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 SkipMaster. All rights reserved. | Privacy Policy | Terms &
            Conditions
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
