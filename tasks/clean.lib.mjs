#! /usr/bin/env node
import del from './del.mjs'
del(['./lib/*.js', './lib/*.d.ts', './lib/enums/*.d.ts', './lib/enums/*.js']);
