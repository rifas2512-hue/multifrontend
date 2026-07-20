import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Plus, Search, Rocket } from 'lucide-react';
import toast from 'react-hot-toast';

const Deployments = () => {
  const [deployments] = useState([
    { id: 1, name: 'Frontend App v2.3.1', project: 'E-Commerce', status: 'success', time: '5 min ago' },
    { id: 2, name: 'API Gateway v1.2.0', project: 'Microservices', status: 'running', time: '30 min ago' },
  ]);

  return (
    <>
      <Helmet><title>Deployments</title></Helmet>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">🚀 Deployments</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">Manage your deployments</p>
        
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <p className="text-gray-500 dark:text-gray-400">Deployments list coming soon...</p>
        </div>
      </div>
    </>
  );
};

export default Deployments;
