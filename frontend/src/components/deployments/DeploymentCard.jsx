import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, Loader2, Play, Square, RefreshCw, ExternalLink } from 'lucide-react';

const DeploymentCard = ({ deployment, onRedeploy, onStop, onViewLogs }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusIcon = (status) => {
    const icons = {
      success: <CheckCircle className="w-5 h-5 text-green-500" />,
      failed: <XCircle className="w-5 h-5 text-red-500" />,
      running: <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />,
      pending: <Clock className="w-5 h-5 text-yellow-500" />,
      stopped: <Square className="w-5 h-5 text-gray-500" />,
    };
    return icons[status] || icons.pending;
  };

  const getStatusColor = (status) => {
    const colors = {
      success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      failed: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      running: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      stopped: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    };
    return colors[status] || colors.pending;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-200">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3 flex-1">
            {getStatusIcon(deployment.status)}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {deployment.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {deployment.project} • {deployment.environment}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(deployment.status)}`}>
              {deployment.status}
            </span>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="text-sm text-gray-500">▼</span>
            </button>
          </div>
        </div>

        {/* Deployment Details */}
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <span>🕐 {new Date(deployment.timestamp).toLocaleString()}</span>
          <span>⏱️ {deployment.duration || 'N/A'}</span>
          <span>🔗 {deployment.url || 'No URL'}</span>
        </div>

        {/* Expandable Section */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Version</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{deployment.version || 'v1.0.0'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Branch</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{deployment.branch || 'main'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Deployed By</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{deployment.deployedBy || 'Admin'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Commit</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{deployment.commit || 'abc1234'}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => onRedeploy(deployment.id)}
                className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                Redeploy
              </button>
              {deployment.status !== 'stopped' && (
                <button
                  onClick={() => onStop(deployment.id)}
                  className="inline-flex items-center px-3 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Square className="w-4 h-4 mr-1" />
                  Stop
                </button>
              )}
              <button
                onClick={() => onViewLogs(deployment.id)}
                className="inline-flex items-center px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                View Logs
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeploymentCard;
