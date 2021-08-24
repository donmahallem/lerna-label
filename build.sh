#!/bin/bash
npm ci
npm run build
npm prune --production
npm ci --production
npm cache clean --force
