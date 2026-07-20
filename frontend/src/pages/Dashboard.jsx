import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  Rocket, Server, Users, DollarSign, 
  TrendingUp, AlertCircle, ChevronRight,
  X, Clock, Settings, Package, Code,
  Zap, Shield, Cloud, GitBranch,
  CheckCircle, Sparkles
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addNotification } from '../redux/slices/uiSlice';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [isDeploying, setIsDeploying] = useState(false);

  const painPoints = [
    { icon: Clock, text: 'Manual Server Setup', color: 'text-red-500' },
    { icon: Package, text: 'Dependency Management', color: 'text-orange-500' },
    { icon: Settings, text: 'Docker and Kubernetes Config', color: 'text-yellow-500' },
    { icon: Rocket, text: 'Manual Deployments', color: 'text-red-500' },
    { icon: AlertCircle, text: 'Hand-Built Monitoring', color: 'text-orange-500' },
    { icon: X, text: 'Constant Troubleshooting', color: 'text-red-500' },
  ];

  const solutions = [
    { icon: GitBranch, text: 'Connect GitHub', color: 'text-blue-500' },
    { icon: Sparkles, text: 'AI Detects Stack', color: 'text-purple-500' },
    { icon: Package, text: 'Builds Container', color: 'text-indigo-500' },
    { icon: Rocket, text: 'Deploys Automatically', color: 'text-green-500' },
    { icon: Shield, text: 'Auto-Heals', color: 'text-emerald-500' },
    { icon: DollarSign, text: 'Cost Optimized', color: 'text-blue-500' },
  ];

  const stats = [
    { label: 'Total Deployments', value: '42', icon: Rocket, change: '+12%', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { label: 'Active Projects', value: '8', icon: Server, change: '+3', color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
    { label: 'Team Members', value: '12', icon: Users, change: '+2', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
    { label: 'Cost Saved', value: '$1,250', icon: DollarSign, change: '-15%', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
  ];

  const recentDeployments = [
    { name: 'Frontend App v2.3.1', project: 'E-Commerce', status: 'success', time: '5 min ago', autoDeployed: true },
    { name: 'API Gateway v1.2.0', project: 'Microservices', status: 'running', time: '30 min ago', autoDeployed: true },
    { name: 'Database Migration', project: 'Analytics', status: 'failed', time: '2 hours ago', autoDeployed: false },
  ];

  const getStatusColor = (status) => {
    const colors = {
      success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      running: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      failed: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    };
    return colors[status] || colors.running;
  };

  const handleAIDeploy = () => {
    setIsDeploying(true);
    dispatch(addNotification({
      title: 'AI Deployment Started',
      message: 'AI is detecting your stack and building containers...',
      type: 'info',
    }));
    
    setTimeout(() => {
      setIsDeploying(false);
      toast.success('AI detected stack and deployed successfully!');
      dispatch(addNotification({
        title: 'Deployment Successful',
        message: 'Your app is now live with auto-scaling enabled!',
        type: 'success',
      }));
    }, 3000);
  };

  return (
    <>
      <Helmet><title>Dashboard - Zero DevOps</title></Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between flex-wrap">
            <div>
              <h1 className="text-3xl font-bold">
                Transform Your Application Hosting
              </h1>
              <p className="text-blue-100 mt-2 flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                From Frustration to Flow with AI-Powered Automation
              </p>
            </div>
            <button
              onClick={handleAIDeploy}
              disabled={isDeploying}
              className="mt-4 md:mt-0 px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all flex items-center disabled:opacity-50"
            >
              {isDeploying ? (
                <>
                  <span className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent mr-2"></span>
                  AI Deploying...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  AI Deploy Now
                </>
              )}
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                  <span className="text-xs text-green-600 dark:text-green-400">{stat.change}</span>
                </div>
                <div className={`p-3 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pain Points vs Our Solution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-red-50 dark:bg-red-950/20 rounded-xl p-6 border border-red-200 dark:border-red-800">
            <h3 className="text-lg font-bold text-red-700 dark:text-red-400 mb-4 flex items-center">
              <X className="w-5 h-5 mr-2" />
              The Frustrating Reality (Before)
            </h3>
            <div className="space-y-3">
              {painPoints.map((point, i) => (
                <div key={i} className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                  <point.icon className={`w-5 h-5 ${point.color}`} />
                  <span className="text-sm">{point.text}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <p className="text-sm text-red-700 dark:text-red-400 font-medium">
                Result: Wasted Time, High Cost, Unpredictable Errors
              </p>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-950/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
            <h3 className="text-lg font-bold text-green-700 dark:text-green-400 mb-4 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              Our AI-Powered Solution (After)
            </h3>
            <div className="space-y-3">
              {solutions.map((solution, i) => (
                <div key={i} className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                  <solution.icon className={`w-5 h-5 ${solution.color}`} />
                  <span className="text-sm">{solution.text}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <p className="text-sm text-green-700 dark:text-green-400 font-medium">
                Result: Instant Deployment, Zero Complexity, Optimized Costs
              </p>
            </div>
          </div>
        </div>

        {/* What You Get */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 text-center">
            <Code className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900 dark:text-white">Focus on Code</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Not Infra</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 text-center">
            <Shield className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900 dark:text-white">High Availability</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">By Default</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 text-center">
            <TrendingUp className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900 dark:text-white">Scale on Demand</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Autoscaling</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 text-center">
            <DollarSign className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900 dark:text-white">Cloud Cost Savings</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Optimized</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 text-center">
            <Rocket className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900 dark:text-white">Faster Delivery</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Products</p>
          </div>
        </div>

        {/* Recent Deployments */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent AI-Powered Deployments</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Auto-deployed with AI stack detection</p>
            </div>
            <Link to="/deployments" className="text-blue-600 hover:text-blue-700 text-sm flex items-center">
              View all <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentDeployments.map((deployment, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center space-x-3">
                  {deployment.autoDeployed && (
                    <Sparkles className="w-4 h-4 text-purple-500" />
                  )}
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{deployment.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{deployment.project} • {deployment.time}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {deployment.autoDeployed && (
                    <span className="text-xs text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 px-2 py-1 rounded-full">
                      AI Deployed
                    </span>
                  )}
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(deployment.status)}`}>
                    {deployment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
