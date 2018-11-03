#!/usr/bin/env node

/**
 * Module dependencies.
 */

import program from 'commander';
import { version } from '../../package.json';
import genDiff from '..';

const rightType = (type) => {
  const types = ['nested', 'plain', 'json'];
  if (types.includes(type)) {
    return type;
  }
  console.log('Wrong type');
  return 'nested';
};

program
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format: nested, plain, json', rightType, 'nested')
  .action((firstConf, secondConf) => console.log(genDiff(firstConf, secondConf, program.format)))
  .parse(process.argv);
