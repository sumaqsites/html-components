'use strict'

const fs = require('fs')
const path = require('path')
const fractal = require('@frctl/fractal').create()
const fractalWeb = require('./fractal/web')
const packageInfo = require('./package.json')
const fractalStyles = require('./fractal/styles')
const fg = require('fast-glob')

const config = {
  dir: {
    base: __dirname,
    src: path.join(__dirname, 'src'),
    components: path.join(__dirname, 'src/components'),
    helpers: path.join(__dirname, 'src/helpers')
  }
}

// const helpers = require('./assets/scripts/helpers')
// const partials = require('./assets/scripts/partials')

// Handlebars helpers
const helpers = {}
for (let file of fs.readdirSync(config.dir.helpers)) {
  const helperName = path.parse(file).name
  const fn = require(path.join(config.dir.helpers, file))
  helpers[helperName] = fn
}

const hbsAdapter = require('@frctl/handlebars')({
  helpers
  // partials
})

/*
 * Project
 */
fractal.set('project.title', 'Sumaq Sites - Html Components Library')
fractal.set('project.version', packageInfo.version)
fractal.set('project.author', packageInfo.author.name)

/*
 * Defaults
 */
fractal.components.set('default.preview', '@preview')
fractal.components.set('default.status', 'wip')
fractal.components.set('default.context', {
  cloudinary: { link: 'https://res.cloudinary.com/sumaqsites/image/upload' }
})

/*
 * Components.
 */
fractal.components.set('path', path.join(__dirname, 'src/components'))
fractal.components.set('ext', '.hbs')
fractal.components.engine(hbsAdapter)
fractal.components.on('changed', function (eventData) {
  console.log(`Change in components directory`, path.parse(eventData.path).base)
  if (eventData.path.includes('.scss')) {
    fractalStyles(config)
  }
})

/*
 * Documentation.
 */
fractal.docs.set('path', path.join(__dirname, 'src/docs'))
fractal.docs.engine(hbsAdapter)
fractal.docs.set('ext', '.md')

/*
 * Build
 */
fractal.web.set('builder.dest', path.join(__dirname, 'dist'))

/*
 * Custom commands
 */
const _config = {
  desc: 'List all available components'
}
async function _buildLib(args, done) {
  // Limpia la carpeta lib
  const dirLib = path.join(__dirname, 'lib')
  const dirComponentsLib = path.join(__dirname, 'lib/components')
  const dirHelpersLib = path.join(__dirname, 'lib/helpers')
  if (fs.existsSync(dirLib)) {
    fs.rmSync(dirLib, { recursive: true })
  }
  fs.mkdirSync(dirLib)
  fs.mkdirSync(dirComponentsLib)
  fs.mkdirSync(dirHelpersLib)
  fs.mkdirSync(path.join(config.dir.base, 'lib/styles/base'), { recursive: true })
  fs.mkdirSync(path.join(config.dir.base, 'lib/styles/components'), { recursive: true })
  fs.mkdirSync(path.join(config.dir.base, 'lib/styles/themes'), { recursive: true })

  // Copy components
  const collection = fractal.components
  for (let item of collection.flattenDeep()) {
    // this.log(`${item.handle} - ${item.status.label}`)
    if (item.relViewPath.includes('.hbs')) {
      this.log(item.view, '->', path.join('lib/components', item.view))
      fs.copyFileSync(item.viewPath, path.join(dirComponentsLib, item.view))
    }
  }
  // copy helpers
  const dirHelpersSrc = path.join(__dirname, 'src/helpers')
  for (let file of fs.readdirSync(dirHelpersSrc)) {
    this.log(file, '->', path.join('lib/helpers', file))
    fs.copyFileSync(path.join(dirHelpersSrc, file), path.join(dirHelpersLib, file))
  }

  // copy base
  const sassBaseFiles = await fg([path.join(config.dir.src, 'styles/base/*.scss')])
  sassBaseFiles.forEach((file) => {
    const fileName = path.parse(file).base
    this.log(fileName, '->', path.join('lib/styles/base', fileName))
    fs.copyFileSync(file, path.join(config.dir.base, 'lib/styles/base', fileName))
  })

  // copy styles components
  const sassComponentsFiles = await fg([path.join(config.dir.components, '**/*.scss')])
  sassComponentsFiles.forEach((file) => {
    const fileName = path.parse(file).base
    this.log(fileName, '->', path.join('lib/styles/components', fileName))
    fs.copyFileSync(file, path.join(config.dir.base, 'lib/styles/components', fileName))
  })

    // copy themes
    const sassThemesFiles = await fg([path.join(config.dir.src, 'styles/themes/*.scss')])
    sassThemesFiles.forEach((file) => {
      const fileName = path.parse(file).base
      this.log(fileName, '->', path.join('lib/styles/themes', fileName))
      fs.copyFileSync(file, path.join(config.dir.base, 'lib/styles/themes', fileName))
    })

  done()
}

function _listComponents(args, done) {
  const collection = fractal.components
  for (let item of collection.flattenDeep()) {
    // this.log(`${item.handle} - ${item.status.label}`)
    this.log(`${item.relViewPath}`)
  }
  done()
}

fractal.cli.command('build-lib', _buildLib, _config)

fractal.cli.command('list-components', _listComponents, _config)

/*
 * Export
 */
fractalStyles(config)

/*
 * Web UI.
 */
fractalWeb(config, fractal)

module.exports = fractal
