#!/bin/bash
# push.sh

VERSION=$1
if [ -z "$VERSION" ]; then
    echo "Error: No version specified."
    exit 1
fi

# docker build -t account-app-frontend:$VERSION .
# docker tag account-app-frontend:$VERSION gsemir/account-app-frontend:$VERSION
# docker push gsemir/account-app-frontend:$VERSION
docker buildx create --name mybuilder --use
docker buildx build --platform linux/amd64,linux/arm64 -t gsemir/account-app-frontend:$VERSION . --push