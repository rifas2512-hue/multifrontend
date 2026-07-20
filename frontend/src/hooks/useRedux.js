import { useDispatch, useSelector } from 'react-redux';

export const useRedux = () => {
  const dispatch = useDispatch();
  
  // Auth
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const authLoading = useSelector((state) => state.auth.loading);
  const authError = useSelector((state) => state.auth.error);

  // Projects
  const projects = useSelector((state) => state.projects.projects);
  const currentProject = useSelector((state) => state.projects.currentProject);
  const projectsLoading = useSelector((state) => state.projects.loading);
  const projectsError = useSelector((state) => state.projects.error);

  // Deployments
  const deployments = useSelector((state) => state.deployments.deployments);
  const currentDeployment = useSelector((state) => state.deployments.currentDeployment);
  const deploymentsLoading = useSelector((state) => state.deployments.loading);
  const deploymentsError = useSelector((state) => state.deployments.error);

  // UI
  const sidebarOpen = useSelector((state) => state.ui.sidebarOpen);
  const theme = useSelector((state) => state.ui.theme);
  const notifications = useSelector((state) => state.ui.notifications);
  const isLoading = useSelector((state) => state.ui.isLoading);

  return {
    dispatch,
    // Auth
    auth,
    user,
    isAuthenticated,
    authLoading,
    authError,
    // Projects
    projects,
    currentProject,
    projectsLoading,
    projectsError,
    // Deployments
    deployments,
    currentDeployment,
    deploymentsLoading,
    deploymentsError,
    // UI
    sidebarOpen,
    theme,
    notifications,
    isLoading,
  };
};
