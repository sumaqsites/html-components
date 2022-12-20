'use strict'

const fg = require('fast-glob')
const fs = require('fs')
const path = require('path')

module.exports = async function (config, fractal) {
  const _config = {
    desc: 'List all available components'
  }

  async function _buildLib(args, done) {
    // Limpia la carpeta lib
    if (fs.existsSync(config.dir.lib)) {
      this.log(`***** Cleaning 'lib' directory...`)
      fs.rmSync(config.dir.lib, { recursive: true })
    }
    fs.mkdirSync(config.dir.lib)
    fs.mkdirSync(path.join(config.dir.lib, 'components'))
    fs.mkdirSync(path.join(config.dir.lib, 'helpers'))
    fs.mkdirSync(path.join(config.dir.lib, 'scripts'))
    fs.mkdirSync(path.join(config.dir.lib, 'styles', 'base'), { recursive: true })
    fs.mkdirSync(path.join(config.dir.lib, 'styles', 'components'), { recursive: true })
    fs.mkdirSync(path.join(config.dir.lib, 'styles', 'themes'), { recursive: true })
    fs.mkdirSync(path.join(config.dir.lib, 'styles', 'layouts'), { recursive: true })

    // Copy components
    const collection = fractal.components
    this.log(`***** Building components...`)
    for (let item of collection.flattenDeep()) {
      if (item.relViewPath.includes('.hbs') && !item.relViewPath.includes('_preview')) {
        const componentName = item.view.replace('_', '')
        this.log(item.view, '->', path.join('lib/components', componentName))
        fs.copyFileSync(item.viewPath, path.join(config.dir.lib, 'components', componentName))
      }
    }
    // copy helpers
    this.log(`***** Copying helpers...`)
    for (let file of fs.readdirSync(config.dir.helpers)) {
      this.log(file, '->', path.join('lib/helpers', file))
      fs.copyFileSync(path.join(config.dir.helpers, file), path.join(config.dir.lib, 'helpers', file))
    }

    // copy base
    this.log(`***** Copying base styles...`)
    const sassBaseFiles = await fg([path.join(config.dir.src, 'styles', 'base', '*.scss')])
    sassBaseFiles.forEach((file) => {
      const fileName = path.parse(file).base
      this.log(fileName, '->', path.join('lib/styles/base', fileName))
      fs.copyFileSync(file, path.join(config.dir.lib, 'styles/base', fileName))
    })

    // copy styles components
    this.log(`***** Copying components styles...`)
    const sassComponentsFiles = await fg([path.join(config.dir.components, '**/*.scss')])
    sassComponentsFiles.forEach((file) => {
      const fileName = path.parse(file).base
      this.log(fileName, '->', path.join('lib/styles/components', fileName))
      fs.copyFileSync(file, path.join(config.dir.lib, 'styles/components', fileName))
    })

    // copy themes
    this.log(`***** Copying themes styles...`)
    const sassThemesFiles = await fg([path.join(config.dir.src, 'styles/themes/*.scss')])
    sassThemesFiles.forEach((file) => {
      const fileName = path.parse(file).base
      this.log(fileName, '->', path.join('lib/styles/themes', fileName))
      fs.copyFileSync(file, path.join(config.dir.lib, 'styles/themes', fileName))
    })

    // copy layouts
    this.log(`***** Copying layouts styles...`)
    const sassLayoutsFiles = await fg([path.join(config.dir.src, 'styles/layouts/*.scss')])
    sassLayoutsFiles.forEach((file) => {
      const fileName = path.parse(file).base
      this.log(fileName, '->', path.join('lib/styles/layouts', fileName))
      fs.copyFileSync(file, path.join(config.dir.lib, 'styles/layouts', fileName))
    })

    // copy scripts
    this.log(`***** Copying scripts...`)
    const scriptsFiles = await fg([
      path.join(config.dir.components, '**/*.js'),
      path.join(config.dir.src, 'scripts', '*.js')
    ])
    scriptsFiles.forEach((file) => {
      const fileName = path.parse(file).base
      this.log(fileName, '->', path.join('lib/scripts', fileName))
      fs.copyFileSync(file, path.join(config.dir.lib, 'scripts', fileName))
    })

    done()
  }

  function _listComponents(args, done) {
    const collection = fractal.components
    for (let item of collection.flatten()) {
      // this.log(`${item.handle} - ${item.status.label}`)
      this.log(`${item}`)
    }
    done()
  }

  fractal.cli.command('build-lib', _buildLib, _config)

  fractal.cli.command('list-components', _listComponents, _config)
}
