#!/bin/sh
MONGO_INITDB_USER_USERNAME=$(grep MONGO_INITDB_USER_USERNAME .env | cut -d '=' -f2)
MONGO_INITDB_USER_PASSWORD=$(grep MONGO_INITDB_USER_PASSWORD .env | cut -d '=' -f2)

docker run --rm --link app-db:mongo --net feathers-nuxt-docker-app-2_default -v $(pwd)/db/backup/app:/backup mongo mongorestore /backup --host mongo --db app -u $MONGO_INITDB_USER_USERNAME -p $MONGO_INITDB_USER_PASSWORD
