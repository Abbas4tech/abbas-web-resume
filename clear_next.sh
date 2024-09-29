#!/bin/bash

# Function to execute commands with sudo
execute_with_sudo() {
    echo "Running command: $1"
    sudo $1
}

# Clear the .next folder
echo "Clearing the .next folder..."
execute_with_sudo "rm -rf .next"

# Clear npm cache (if applicable)
echo "Clearing npm cache..."
execute_with_sudo "npm cache clean --force"

# Clear Yarn cache (if applicable)
echo "Clearing Yarn cache..."
execute_with_sudo "yarn cache clean"

# Clear any build cache in node_modules
echo "Clearing build cache in node_modules..."
execute_with_sudo "rm -rf node_modules/.cache"

echo "Clear complete."
    