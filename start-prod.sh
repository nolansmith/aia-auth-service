#!/bin/sh

echo "----------------------------------------"
echo "-- STARTING AUTH SERVICE PROD SCRIPT  --"
echo "----------------------------------------"


npm i
npm run build
npm run migrate
npm run start