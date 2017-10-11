#!/bin/bash
set -e

cd /mnt/storage/urbica/gulag/gulag
git pull
docker-compose -f compose-staging.yml pull
docker-compose -f compose-staging.yml up -d
