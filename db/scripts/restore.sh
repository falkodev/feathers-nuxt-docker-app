#!/bin/sh
MONGO_INITDB_USER_USERNAME=$(grep MONGO_INITDB_USER_USERNAME .env | cut -d '=' -f2)
MONGO_INITDB_USER_PASSWORD=$(grep MONGO_INITDB_USER_PASSWORD .env | cut -d '=' -f2)

docker run --rm --link wap-db:mongo --net wap-2_default -v $(pwd)/db/backup/wap:/backup mongo mongorestore /backup --host mongo --db wap -u $MONGO_INITDB_USER_USERNAME -p $MONGO_INITDB_USER_PASSWORD
