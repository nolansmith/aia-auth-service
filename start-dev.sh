#!/bin/bash

echo "----------------------------------------"
echo "-- STARTING AUTH SERVICE DEBUG SCRIPT --"
echo "----------------------------------------"

npm i
npm run migrate
npm run unseed
npm run seed
npm run dev