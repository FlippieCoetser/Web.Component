#! /usr/bin/env node
import del from './del.mjs'
del(['./src/*.js', './src/*.map','./src/enums/*.js','./src/enums/*.map']);
del(['./test/*.js', './test/*.map']);
