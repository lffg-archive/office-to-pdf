#! /usr/bin/env node

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const { run } = require('.');

try {
  run();
} catch (error) {
  process.stderr.write(error + '\n');
  process.exit(1);
}
