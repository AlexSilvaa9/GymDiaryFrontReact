#!bin/bash
npm run build
rm -r docs
mv build docs
