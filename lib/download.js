#!/usr/bin/env node

import download from 'download-git-repo';
import fs from 'fs';
import handlebars from 'handlebars';

export default (config, resolve, reject) => {
  download(
    'direct:https://github.com/PieDi/react-template.git#master',
    config.name,
    { clone: true },
    (err) => {
      if (!err) {
        const { name, answer } = config
        const meta = {
          name,
          description: answer?.description || '',
          author: answer?.author || ''
        }
        resolve(meta)
        const fileName = `${name}/package.json`;
        if (fs.existsSync(fileName)) {
          const content = fs.readFileSync(fileName).toString();
          const result = handlebars.compile(content)(meta);
          fs.writeFileSync(fileName, result);
        }

      } else {
        reject(err)
      }
    }
  )
}
