#!/bin/bash

echo "Deploying AI MultiCloud Platform..."

# Pull latest code
git pull origin main

# Install dependencies
npm install

# Build the application
npm run build

# Deploy to your server
echo "Deployment complete!"
