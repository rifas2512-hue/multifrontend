import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, GitBranch, MoreVertical, Edit, Trash2 } from 'lucide-react';

const ProjectCard = ({ project, onEdit, onDelete }) => {
  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      archived: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    };
    return colors[status] || colors.pending;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <Link to={`/projects/${project.id}`}>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
              {project.name}
            </h3>
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
            {project.description || 'No description'}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
            {project.status}
          </span>
          <div className="relative group">
            <button className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <MoreVertical className="w-4 h-4 text-gray-500" />
            </button>
            <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 hidden group-hover:block">
              <button
                onClick={() => onEdit(project)}
                className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
              >
                <Edit className="w-4 h-4 mr-2" /> Edit
              </button>
              <button
                onClick={() => onDelete(project.id)}
                className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
              >
                <Trash2 className="w-4 h-4 mr-2" /> Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
        <span className="flex items-center">
          <Calendar className="w-4 h-4 mr-1" />
          {new Date(project.createdAt).toLocaleDateString()}
        </span>
        <span className="flex items-center">
          <Users className="w-4 h-4 mr-1" />
          {project.teamSize || 0} members
        </span>
        <span className="flex items-center">
          <GitBranch className="w-4 h-4 mr-1" />
          {project.deployments || 0} deployments
        </span>
      </div>
    </div>
  );
};

export default ProjectCard;
