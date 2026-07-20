import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-dark-200 border-t border-gray-200 dark:border-gray-700 py-4 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>© 2024 AI MultiCloud Platform. All rights reserved.</span>
          <div className="flex items-center space-x-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-blue-600">Terms</a>
            <a href="#" className="hover:text-blue-600">Privacy</a>
            <span className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
