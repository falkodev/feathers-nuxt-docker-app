#!/bin/sh

if [ "$NODE_ENV" = "production" ]
then
  node src
else
  node_modules/.bin/node-dev src
fi
