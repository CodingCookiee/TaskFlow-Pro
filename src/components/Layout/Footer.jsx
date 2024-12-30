import Link from 'next/link';
import { Github, Linkedin, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-10 w-full border-t border-black-300/10 bg-light-primary/80 dark:bg-dark-primary/80 backdrop-blur-lg">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
          {/* Logo and Powered By Section */}
          <div className="flex flex-col items-center md:items-start space-y-4 md:space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-black-300 dark:text-white-700">
                Powered by
              </span>
              <svg height="20" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black-300 dark:text-white-700">
                <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
                  <circle cx="90" cy="90" r="90" fill="black"/>
                </mask>
                <g mask="url(#mask0)">
                  <circle cx="90" cy="90" r="87" fill="currentColor" stroke="currentColor" strokeWidth="6"/>
                  <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#paint0_linear)"/>
                  <rect x="115" y="54" width="12" height="72" fill="url(#paint1_linear)"/>
                </g>
                <defs>
                  <linearGradient id="paint0_linear" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white"/>
                    <stop offset="1" stopColor="white" stopOpacity="0"/>
                  </linearGradient>
                  <linearGradient id="paint1_linear" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white"/>
                    <stop offset="1" stopColor="white" stopOpacity="0"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-6">
            <Link 
              href="https://github.com/CodingCookiee" 
              target="_blank"
              className="text-black-300 dark:text-white-700 hover:text-violet-300 dark:hover:text-violet-300 transition-colors p-2"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5 sm:h-6 sm:w-6" />
            </Link>
            <Link 
              href="https://www.linkedin.com/in/raza-awan-321063342/" 
              target="_blank"
              className="text-black-300 dark:text-white-700 hover:text-violet-300 dark:hover:text-violet-300 transition-colors p-2"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5 sm:h-6 sm:w-6" />
            </Link>
            <Link 
              href="https://razaawan.up.railway.app/" 
              target="_blank"
              className="text-black-300 dark:text-white-700 hover:text-violet-300 dark:hover:text-violet-300 transition-colors p-2"
              aria-label="Portfolio"
            >
              <Globe className="h-5 w-5 sm:h-6 sm:w-6" />
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-sm text-center md:text-right text-black-500 dark:text-white-500">
            © {new Date().getFullYear()} TaskFlow Pro
            <br className="md:hidden" />
            <span className="hidden md:inline"> · </span>
            All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
