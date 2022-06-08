const fs = require('fs')
const path = require('path')
const fractal = require('../fractal.config')
const config = require('./_config')

const stylesFolders = ['atoms', 'molecules', 'organisms', 'templates', 'base', 'themes', 'layouts']
const scriptsFolders = ['atoms', 'molecules', 'organisms']

async function _clean() {
  if (!fs.existsSync(config.dir.lib)) {
    fs.mkdirSync(config.dir.lib)
  } else {
    fs.rmSync(config.dir.lib, { recursive: true })
  }
  stylesFolders.forEach((folder) => {
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(path.join(config.dir.lib, 'styles', folder), { recursive: true })
    }
  })
  scriptsFolders.forEach((folder) => {
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(path.join(config.dir.lib, 'scripts', folder), { recursive: true })
    }
  })
}

async function buildAll(args, done) {
  const app = this.fractal
  try {
    await _clean()
    // await app.compile()
    done()
  } catch (error) {
    console.error(error)
    done(error)
  }
}

module.exports = buildAll
