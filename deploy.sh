#!/bin/bash
set -e

cd /mnt/storage/urbica/gulag
git pull
docker-compose pull
docker-compose up -d
