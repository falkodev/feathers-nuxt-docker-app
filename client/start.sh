#!/bin/sh

if [ "$NODE_ENV" = "production" ]
then
  node_modules/.bin/nuxt build && node_modules/.bin/nuxt start
else
  node_modules/.bin/nuxt
fi
