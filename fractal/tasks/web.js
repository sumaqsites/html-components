module.exports = function (config, fractal) {
  const path = require('path')
  const mandelbrot = require('@frctl/mandelbrot')
  const packageInfo = require('../../package.json')

  /*
   * Web UI.
   */
  fractal.web.set('server.watch', true) // default is false
  fractal.web.set('server.sync', true)
  fractal.web.set('static.path', path.join(config.dir.base, 'public'))

  // sumaqsitesTheme.addLoadPath(path.join(config.dir.base, 'fractal/theme/overrides'))

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
    styles: ['default', '/styles/theme.css'],
    // highlightStyles: '/cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/default.min.css',
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

  fractal.web.theme(sumaqsitesTheme)
}
