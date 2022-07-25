'use strict'

const fs = require('fs')
const path = require('path')
const fractal = require('@frctl/fractal').create()
const mandelbrot = require('@frctl/mandelbrot')

const helpers = require('./assets/scripts/helpers')
const partials = require('./assets/scripts/partials')

// Handlebars helpers
helpers.exists = require('./src/helpers/exists')
helpers.imageSource = require('./src/helpers/imageSource')

const packageInfo = require('./package.json')

const hbsAdapter = require('@frctl/handlebars')({
  helpers,
  partials
})

/*
 * Project
 */
fractal.set('project.title', 'Sumaq Sites Html Components Library')
fractal.set('project.version', packageInfo.version)
fractal.set('project.author', packageInfo.author.name)

/*
 * Defaults
 */
fractal.components.set('default.status', 'wip')
fractal.components.set('default.context', {
  cloudinary: { link: 'https://res.cloudinary.com/sumaqsites/image/upload' }
})

/*
 * Components.
 */
fractal.components.set('path', path.join(__dirname, 'src/components'))
// fractal.components.engine(reactAdapter)
fractal.components.set('ext', '.hbs')
fractal.components.engine(hbsAdapter)

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
function _buildLib(args, done) {
  // Limpia la carpeta lib
  const dirLib = path.join(__dirname, 'lib')
  const dirComponentsLib = path.join(__dirname, 'lib/components')
  const dirHelpersLib = path.join(__dirname, 'lib/helpers')
  if (fs.existsSync(dirLib)) {
    fs.rmSync(dirLib, { recursive: true })
  } else {
    fs.mkdirSync(dirLib)
    fs.mkdirSync(dirComponentsLib)
    fs.mkdirSync(dirHelpersLib)

    // Copy components
    const collection = fractal.components
    for (let item of collection.flattenDeep()) {
      // this.log(`${item.handle} - ${item.status.label}`)
      if (item.relViewPath.includes('01-atoms')) {
        this.log(item.viewPath, '->', path.join(dirComponentsLib, item.view))
        fs.copyFileSync(item.viewPath, path.join(dirComponentsLib, item.view))
      }
    }

    // Copy helpers
    // if (fs.existsSync(dirHelpersLib)) {
    //   fs.rmSync(dirHelpersLib, { recursive: true })
    // } else {
    //   fs.mkdirSync(dirHelpersLib)
    // }
    const dirHelpersSrc = path.join(__dirname, 'src/helpers')
    for (let file of fs.readdirSync(dirHelpersSrc)) {
      this.log(file, '->', path.join(dirHelpersLib, file))
      fs.copyFileSync(path.join(dirHelpersSrc, file), path.join(dirHelpersLib, file))
    }
  }

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
 * Web UI.
 */
fractal.web.set('static.path', path.join(__dirname, 'public'))

// Theme https://fractal.build/guide/web/default-theme.html#configuration
const sumaqsitesTheme = mandelbrot({
  // skin: {
  //   name: 'sumaqsites',
  //   accent: '#ff0000',
  //   complement: '#00ff00',
  //   links: '#ff0000'
  // },
  format: 'yaml',
  nav: ['search', 'docs', 'components', 'information'],
  // panels: ['view', 'info', 'html', 'context', 'resources'],
  styles: ['default', '/styles/fractal-theme.css'],
  // scripts: ['default', '/js/version-switch.js'],
  favicon: '/theme/favicon.ico',
  information: [
    { label: 'Version', value: packageInfo.version },
    // { label: 'Website', value: 'https://www.sumaqsites.com' },
    // { label: 'GitHub', value: '' },
    // { label: 'Twitter', value: '' },
    // { label: 'Email', value: 'hello@sumaqsites.com' },
    {
      label: 'Built on',
      value: new Date(),
      type: 'time',
      format: (value) => {
        return value.toLocaleDateString('de')
      }
    },
    { label: 'Author', value: 'SUMAQ websites' }
  ]
})
sumaqsitesTheme.addLoadPath(__dirname + '/fractal/theme-overrides')
fractal.web.theme(sumaqsitesTheme)

module.exports = fractal
