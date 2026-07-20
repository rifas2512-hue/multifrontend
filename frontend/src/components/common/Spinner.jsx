import React from 'react';
import { clsx } from 'clsx';

const Spinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
    xl: 'w-16 h-16 border-4',
  };

  return (
    <div
      className={clsx(
        'animate-spin rounded-full border-solid border-blue-600 border-t-transparent',
        sizes[size],
        className
      )}
    />
  );
};

export default Spinner;
