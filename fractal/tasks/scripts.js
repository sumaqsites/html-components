'use strict'

const esbuild = require('esbuild')
const path = require('path')
const fs = require('fs')
const fg = require('fast-glob')

module.exports = async function (config) {
  const scriptsFiles = await fg(path.join(config.dir.src, 'scripts', '**/*.js'))
  // compile each scripts files into public/scripts folder
  for (let file of scriptsFiles) {
    const scriptName = path.parse(file).base
    esbuild.buildSync({
      entryPoints: [file],
      bundle: true,
      // minify: true,
      // bundleOptions: {
        //   format: 'cjs'
        // }
        outfile: path.join(config.dir.public, 'scripts', scriptName),
    })
    console.log(`${scriptName} script compiled!`)
  }
}

// fs.writeFileSync(path.join(config.dir.public, 'styles/preview.css'), previewStyles.css)
// console.log('Scripts compiled!')
