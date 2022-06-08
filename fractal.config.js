'use strict'

const path = require('path')
const fractal = require('@frctl/fractal').create()
const mandelbrot = require('@frctl/mandelbrot')
const packageInfo = require('./package.json')
const helpers = require('./assets/scripts/helpers')
const partials = require('./assets/scripts/partials')

const hbs = require('@frctl/handlebars')({
  helpers,
  partials
})

/*
 * Project
 */
fractal.set('project.title', 'SUMAQ HTML Components')
fractal.set('project.version', packageInfo.version)
fractal.set('project.author', 'SUMAQ Websites')

/*
 * Defaults
 */
fractal.components.set('default.status', 'wip')

/*
 * Components.
 */
fractal.components.set('path', path.join(__dirname, 'components'))
fractal.components.engine(hbs)

/*
 * Documentation.
 */
fractal.docs.set('path', path.join(__dirname, 'docs'))
fractal.docs.engine(hbs)

/*
 * Web UI.
 */
fractal.web.set('static.path', path.join(__dirname, 'public'))

// Theme https://fractal.build/guide/web/default-theme.html#configuration
const sumaqTheme = mandelbrot({
  // skin: {
  //   name: 'sumaq',
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
    { label: 'Version', value: require('./package.json').version },
    // { label: 'Website', value: 'https://www.sumaqwebsites.com' },
    // { label: 'GitHub', value: '' },
    // { label: 'Twitter', value: '' },
    // { label: 'Email', value: 'hello@sumaqwebsites.com' },
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
sumaqTheme.addLoadPath(__dirname + '/fractal/theme-overrides')
fractal.web.theme(sumaqTheme)

/**
 * Build
 */
fractal.web.set('builder.dest', path.join(__dirname, 'dist'))

/**
 * Custom commands
 */
function listComponents (args, done) {
  const app = this.fractal
  for (let item of app.components.flatten()) {
    this.log(`${item.handle} - ${item.status.label}`);
  }
  done()
}

fractal.cli.command('build-all', require('./tasks/buildAll'), {
  description: 'List all available components'
})


fractal.cli.command('list', listComponents, {
  desc: 'List all available components'
})

module.exports = fractal
