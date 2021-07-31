import fs from 'fs'
import path from 'path'

import logger from './logger'

const helpers = {
  readdirSyncRecursive: (directory) => {
    let files = []

    fs.readdirSync(directory)
      .forEach((file) => {
        const location = path.join(directory, file)

        if (fs.lstatSync(location).isDirectory())
          files = files.concat(helpers.readdirSyncRecursive(location))
        else
          files.push(location)
      })

    return files
  }
}

export default {
  ...helpers,
  logger
}