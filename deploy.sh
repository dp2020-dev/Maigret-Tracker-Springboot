#!/bin/bash
set -e

echo "🔨 Building..."
./mvnw package -DskipTests

echo "📦 Deploying to Pi..."
scp target/maigret-tracker-0.0.1-SNAPSHOT.jar danielphillips@mafonpi:~/maigret-tracker.jar

echo "🔄 Restarting service..."
ssh -t danielphillips@mafonpi "sudo systemctl restart maigret-tracker"

echo "✅ Done!"