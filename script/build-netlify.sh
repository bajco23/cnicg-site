#!/bin/bash
set -e

echo "Building static site for Netlify..."

rm -rf dist
mkdir -p dist/images dist/docs

cp client/*.html dist/
cp client/style.css dist/
cp client/lang.js dist/

cp client/public/images/* dist/images/
cp client/public/docs/* dist/docs/
cp client/public/favicon.png dist/

echo "Build complete! Output in dist/"
ls -la dist/
