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

// copy components files to lib
async function _copyComponents() {
  const entries = fs.readFileSync(config.dir.components)
  entries.forEach((entry) => {
    // const fileParsed = path.parse(entry)
    console.log(entry)
    // console.log(fileParsed)
    // stylesFolders.forEach((folder) => {
    //   if (fileParsed.dir.includes(folder)) {
    //     const filename = fileParsed.base.startsWith('_') ? fileParsed.base : `_${fileParsed.base}`
    //     fs.copyFileSync(entry, path.join(config.dir.lib, 'styles', folder, filename))
    //   }
    // })
  }
  )
}



async function buildAll(args, done) {
  const app = this.fractal
  try {
    await _clean()
    await _copyComponents()
    // await app.compile()
    done()
  } catch (error) {
    console.error(error)
    done(error)
  }
}

module.exports = buildAll
