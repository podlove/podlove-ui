#!/usr/bin/env node
const { resolve } = require('path')
const { omit } = require('ramda')
const fs = require('fs-extra')

//  npm run clean && npm run build && mkdir -p publish && cp -R dist/ publish/ && cp package.json publish/
const path = file => resolve('.', file)

const copyPackage = () =>
  fs
    .readJson(path('package.json'))
    .then(omit(['scripts', 'dependencies', 'devDependencies']))
    .then(pkg => fs.writeJson(path('publish/package.json'), pkg))

fs.emptyDir(path('publish'))
  .then(fs.copy(path('dist'), path('publish')))
  .then(copyPackage)
  .then(fs.copy(path('README.md'), path('publish/README.md')))
