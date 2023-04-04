#!/usr/bin/env node
import { program } from 'commander';
import fs from 'fs';
import chalk from 'chalk';
import symbols from 'log-symbols';
import ora from 'ora';
import inquirer from './lib/inquirer.js';
import download from './lib/download.js';


program
  .version('1.0.0', '-v, --version')
  .command('init name')
  .action((name) => {
    if (!fs.existsSync(name)) {
      inquirer((answer) => {
        const spinner = ora('正在下载模板...');
        spinner.start();
        download({ name, answer }, (success) => {
          spinner.succeed();
          console.log(symbols.success, chalk.green('项目初始化完成'));
        }, (error) => {
          spinner.fail();
          console.log(symbols.error, chalk.red(error));
        })
      })
    } else {
      // 项目存在
      console.log(symbols.error, chalk.red('项目已存在'));
    }
  })

program.parse(process.argv)

