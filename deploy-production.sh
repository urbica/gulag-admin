#!/bin/bash
set -e

cd /home/docker/gulag
git pull
docker-compose -f compose-production.yml pull
docker-compose -f compose-production.yml up -d
