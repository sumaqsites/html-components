'use strict'

const sass = require('sass')
const path = require('path')
const fs = require('fs')
// const fg = require('fast-glob')

module.exports = async function (config) {
  // list all sass files from src folder
  // const componentsFiles = await fg(path.join(config.dir.components, '**/*.scss'))
  // console.log(componentsFiles)

  // compile a sass file
  const themeStyles = await sass.compileAsync(path.join(config.dir.base, 'fractal/theme/styles/theme.scss'), {
    //outputStyle: 'compressed'
  })
  fs.writeFileSync(path.join(config.dir.base, 'public/styles/theme.css'), themeStyles.css)
  console.log('Theme compiled!')

  const previewStyles = await sass.compileAsync(path.join(config.dir.base, 'fractal/theme/styles/preview.scss'), {
    // importers: componentsFiles
    //outputStyle: 'compressed'
  })
  fs.writeFileSync(path.join(config.dir.base, 'public/styles/preview.css'), previewStyles.css)
  console.log('Preview compiled!')
}
