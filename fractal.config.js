'use strict'

const fg = require('fast-glob')
const fs = require('fs')
const path = require('path')
const fractal = require('@frctl/fractal').create()
const packageInfo = require('./package.json')
const fractalWeb = require('./fractal/tasks/web')
const fractalStyles = require('./fractal/tasks/styles')
const fractalScripts = require('./fractal/tasks/scripts')
const fractalCustomCommands = require('./fractal/tasks/customCommands')


const config = {
  dir: {
    base: __dirname,
    public: path.join(__dirname, 'public'),
    lib: path.join(__dirname, 'lib'),
    src: path.join(__dirname, 'src'),
    components: path.join(__dirname, 'src/components'),
    helpers: path.join(__dirname, 'src/helpers')
  }
}

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

/**
 * Project
 */
fractal.set('project.title', 'Sumaq Sites - Html Components Library')
fractal.set('project.version', packageInfo.version)
fractal.set('project.author', packageInfo.author.name)

/**
 * Defaults
 */
fractal.components.set('default.preview', '@preview')
fractal.components.set('default.status', 'wip')
fractal.components.set('default.context', {
  cloudinary: { link: 'https://res.cloudinary.com/sumaqsites/image/upload' }
})

/**
 * Components.
 */
fractal.components.set('path', path.join(__dirname, 'src/components'))
fractal.components.set('ext', '.hbs')
fractal.components.engine(hbsAdapter)
fractal.components.on('changed', function (eventData) {
  console.log(`Change in components directory`, eventData.path)
  // console.dir(eventData)
  if (eventData.path.includes('.scss')) {
    fractalStyles(config)
  }
  if (eventData.path.includes('.js')) {
    fractalScripts.compileScript(config, eventData.path)
  }
})

/**
 * Documentation.
 */
fractal.docs.set('path', path.join(__dirname, 'src/docs'))
fractal.docs.engine(hbsAdapter)
fractal.docs.set('ext', '.md')

/**
 * Build
 */
fractal.web.set('builder.dest', path.join(__dirname, 'dist'))

/**
 * Custom commands
 */
fractalCustomCommands(config, fractal)

/**
 * Copy styles to public
 */
fractalStyles(config)

/**
 * Copy scripts to public
 */
fractalScripts.task(fractal, config)


/**
 * Web UI.
 */
fractalWeb(config, fractal)

module.exports = fractal
