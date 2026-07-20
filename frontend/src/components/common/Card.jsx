import React from 'react';
import { clsx } from 'clsx';

const Card = ({ children, className = '', title, subtitle, actions, noPadding = false, hoverable = false }) => {
  return (
    <div className={clsx(
      'bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700',
      hoverable && 'hover:shadow-xl transition-all duration-200 hover:scale-[1.01]',
      !noPadding && 'p-6',
      className
    )}>
      {(title || subtitle || actions) && (
        <div className="flex items-center justify-between mb-4">
          <div>
            {title && <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
          </div>
          {actions && <div className="flex items-center space-x-2">{actions}</div>}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
