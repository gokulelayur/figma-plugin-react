#!/bin/bash

echo "🚀 Starting Figma Plugin Development Mode..."

# Build the plugin first
echo "📦 Building plugin..."
npm run build

# Start watch mode in background
echo "👀 Starting watch mode (will rebuild on file changes)..."
npm run watch &
WATCH_PID=$!

# Wait a moment for the build to complete
sleep 2

# Open Figma
echo "🎨 Opening Figma..."
figma-linux &
FIGMA_PID=$!

echo ""
echo "✅ Development mode started!"
echo "📝 Make changes to your code and save - the plugin will rebuild automatically"
echo "🎨 In Figma: Menu > Plugins > Development > Import plugin from manifest..."
echo "📁 Select the manifest.json file from this directory"
echo ""
echo "🛑 Press Ctrl+C to stop development mode"

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping development mode..."
    kill $WATCH_PID 2>/dev/null
    kill $FIGMA_PID 2>/dev/null
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Keep the script running
wait 