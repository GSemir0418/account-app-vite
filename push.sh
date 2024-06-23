#!/bin/bash
# push.sh

VERSION=$1
if [ -z "$VERSION" ]; then
    echo "Error: No version specified."
    exit 1
fi

TARGET=$2
if [ "$TARGET" = "dh" ]; then
  TAG=gsemir/account-app-frontend:$VERSION
elif [ "$TARGET" = "h" ]; then
  TAG=192.168.31.117:70/account-app/account-app-frontend:$VERSION
else
  echo "未知目标。请指定 'dockerhub' 或 'harbor'。"
  exit 1
fi

# docker build -t account-app-frontend:$VERSION .
# docker tag account-app-frontend:$VERSION gsemir/account-app-frontend:$VERSION
# docker push gsemir/account-app-frontend:$VERSION
# docker buildx create --name mybuilder --use
# docker buildx rm mybuilder

docker buildx create --name mybuilder --config ./buildkitd.toml --use
docker buildx build --platform linux/amd64,linux/arm64 -t $TAG . --push