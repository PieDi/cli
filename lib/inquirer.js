#!/usr/bin/env node

import inquirer from 'inquirer';

export default (cb) => {
  inquirer
    .prompt([
      {
        name: 'description',
        message: '请输入项目描述',
      },
      {
        name: 'author',
        message: '请输入作者名称',
      },
    ])
    .then((answers) => {
      cb(answers)
    })
}
