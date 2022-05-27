#!/bin/bash

echo "Deploying latest build"
git pull && docker build -t vickygonsalves/tanksystem-api . && docker push vickygonsalves/tanksystem-api && kubectl scale deployment/api-controller --replicas=0 && kubectl scale deployment/api-controller --replicas=1
