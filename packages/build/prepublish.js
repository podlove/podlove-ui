#!/usr/bin/env node
const { resolve } = require('path')
const { omit } = require('ramda')
const fs = require('fs-extra')

const options = process.argv.slice(2)

//  npm run clean && npm run build && mkdir -p publish && cp -R dist/ publish/ && cp package.json publish/
const path = file => resolve('.', file)

const stripProperties = pkg => {
  if (options.includes('library')) {
    return omit(['scripts', 'devDependencies'], pkg)
  }

  return omit(['scripts', 'devDependencies', 'dependencies', 'peerDependencies'], pkg)
}

const copyPackage = () =>
  fs
    .readJson(path('package.json'))
    .then(stripProperties)
    .then(pkg => fs.writeJson(path('publish/package.json'), pkg))

fs.emptyDir(path('publish'))
  .then(fs.copy(path('dist'), path('publish')))
  .then(copyPackage)
  .then(fs.copy(path('README.md'), path('publish/README.md')))
