'use strict'

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
function listComponents(args, done) {
  const app = this.fractal
  for (let item of app.components.flatten()) {
    this.log(`${item.handle} - ${item.status.label}`)
  }
  done()
}

fractal.cli.command('build-all', require('./tasks/buildAll'), {
  description: 'List all available components'
})

fractal.cli.command('list', listComponents, {
  desc: 'List all available components'
})

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
