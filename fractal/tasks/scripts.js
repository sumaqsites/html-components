'use strict'

const esbuild = require('esbuild')
const path = require('path')
const fs = require('fs')
const fg = require('fast-glob')


function _compile(config, file) {
  try {
    const scriptName = path.parse(file).base
    esbuild.buildSync({
      entryPoints: [file],
      bundle: true,
      target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
      // minify: true,
      // bundleOptions: {
      //   format: 'cjs'
      // }
      outfile: path.join(config.dir.public, 'scripts', scriptName)
    })
    console.log(`${scriptName} script compiled!`)
  } catch (error) {
    console.error(error)
  }
}

exports.compileScript  = async function (config, file) {
  _compile(config, file)
}

exports.task = async function (fractal, config) {

  async function compileScripts(args, done) {
    const scriptsFiles = await fg([
      path.join(config.dir.components, '**/*.js'),
      path.join(config.dir.src, 'scripts', '*.js')
    ])

    for (let file of scriptsFiles) {
      _compile(config, file)
    }

    done()
  }

  fractal.cli.command('compile-scripts', compileScripts, {})
}



// fs.writeFileSync(path.join(config.dir.public, 'styles/preview.css'), previewStyles.css)
// console.log('Scripts compiled!')
