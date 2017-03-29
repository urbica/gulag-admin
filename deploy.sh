#!/bin/bash
set -e

cd gulag
git pull
NODE_ENV=development yarn
NODE_ENV=production yarn run build
docker-compose pull
docker-compose down
docker-compose up -d
