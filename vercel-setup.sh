#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Function to check if a command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Check if npm is installed
if ! command_exists npm; then
  echo "npm is not installed. Please install it first."
  exit 1
fi

# Check if vercel CLI is installed; if not, install it
if ! command_exists vercel; then
  echo "Vercel CLI not found. Installing it..."
  npm install -g vercel
fi

# Login to Vercel (this opens the browser for authentication)
echo "Logging into Vercel..."
vercel login

# Get the current project name (optional: you can modify this to provide a project name)
PROJECT_NAME=$(basename `git rev-parse --show-toplevel 2>/dev/null || pwd`)

echo "Current project: $PROJECT_NAME"

# Pull and update environment variables from Vercel
echo "Pulling environment variables for $PROJECT_NAME..."

# Pull environment variables to .env file (vercel env pull will create/overwrite .env)
vercel env pull

echo "Environment variables pulled successfully for $PROJECT_NAME."

# Success message
echo "Vercel setup complete."
