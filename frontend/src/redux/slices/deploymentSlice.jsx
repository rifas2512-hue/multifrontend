import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  deployments: [],
  currentDeployment: null,
  loading: false,
  error: null,
};

const deploymentSlice = createSlice({
  name: 'deployments',
  initialState,
  reducers: {
    fetchDeploymentsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDeploymentsSuccess: (state, action) => {
      state.loading = false;
      state.deployments = action.payload;
      state.error = null;
    },
    fetchDeploymentsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addDeployment: (state, action) => {
      state.deployments.unshift(action.payload);
    },
    updateDeployment: (state, action) => {
      const index = state.deployments.findIndex(d => d.id === action.payload.id);
      if (index !== -1) {
        state.deployments[index] = action.payload;
      }
    },
    deleteDeployment: (state, action) => {
      state.deployments = state.deployments.filter(d => d.id !== action.payload);
    },
    setCurrentDeployment: (state, action) => {
      state.currentDeployment = action.payload;
    },
    updateDeploymentStatus: (state, action) => {
      const { id, status, duration } = action.payload;
      const deployment = state.deployments.find(d => d.id === id);
      if (deployment) {
        deployment.status = status;
        if (duration) deployment.duration = duration;
        deployment.timestamp = new Date();
      }
    },
  },
});

export const {
  fetchDeploymentsStart,
  fetchDeploymentsSuccess,
  fetchDeploymentsFailure,
  addDeployment,
  updateDeployment,
  deleteDeployment,
  setCurrentDeployment,
  updateDeploymentStatus,
} = deploymentSlice.actions;

export default deploymentSlice.reducer;
