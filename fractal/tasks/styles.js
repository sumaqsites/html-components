'use strict'

const sass = require('sass')
const path = require('path')
const fs = require('fs')
// const fg = require('fast-glob')

/**
 * TODO: Compile all sass files from components folder into one file
 */

module.exports = async function (config) {
  // list all sass files from src folder
  // const componentsFiles = await fg(path.join(config.dir.components, '**/*.scss'))
  // console.log(componentsFiles)

  // compile theme sass file
  const themeStyles = await sass.compileAsync(path.join(config.dir.base, 'fractal/theme/styles/theme.scss'), {
    //outputStyle: 'compressed'
  })
  fs.writeFileSync(path.join(config.dir.public, 'styles/theme.css'), themeStyles.css)
  console.log('Theme sass compiled!')

  // compile preview sass file
  const previewStyles = await sass.compileAsync(path.join(config.dir.base, 'fractal/theme/styles/preview.scss'), {
    // importers: componentsFiles
    //outputStyle: 'compressed'
  })
  fs.writeFileSync(path.join(config.dir.public, 'styles/preview.css'), previewStyles.css)
  console.log('Preview sass compiled!')
}
