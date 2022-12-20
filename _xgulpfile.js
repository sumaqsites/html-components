const path = require('path')
const fs = require('fs')
const fg = require('fast-glob')
const camelcase = require('camelcase')
const { series, parallel, src, dest, watch } = require('gulp')
const rename = require('gulp-rename')
const babel = require('gulp-babel')
const sass = require('gulp-sass')(require('sass'))
const sassGlob = require('gulp-sass-glob')
const fractal = require('./fractal.config')

const logger = fractal.cli.console

const dir = {
  assets: path.join(__dirname, 'assets'),
  components: path.join(__dirname, 'src/components'),
  public: path.join(__dirname, 'public'),
  dist: path.join(__dirname, 'dist'),
  lib: path.join(__dirname, 'lib'),
  // scripts: path.join(__dirname, 'scripts'),
  fractal: path.join(__dirname, 'fractal'),
  modules: path.join(__dirname, 'node_modules')
}

const stylesFolders = ['atoms', 'molecules', 'organisms', 'templates', 'base', 'layouts', 'themes']
const scriptsFolders = ['atoms', 'molecules', 'organisms']

async function clean(cb) {
  try {
    fs.rmSync(dir.lib, { recursive: true })
    stylesFolders.forEach((folder) => {
      if (!fs.existsSync(folder)) {
        fs.mkdirSync(path.join(dir.lib, 'styles', folder), { recursive: true })
      }
    })
    scriptsFolders.forEach((folder) => {
      if (!fs.existsSync(folder)) {
        fs.mkdirSync(path.join(dir.lib, 'scripts', folder), { recursive: true })
      }
    })
    cb()
  } catch (error) {
    logger.error(error)
    cb(error)
  }
}

async function _copyStyles() {
  try {
    const entries = await fg([path.join(dir.components, '**/*.scss'), path.join(dir.assets, 'styles', '**/*.scss')])
    entries.forEach((entry) => {
      const fileParsed = path.parse(entry)
      console.log(fileParsed.name)
      stylesFolders.forEach((folder) => {
        if (fileParsed.dir.includes(folder)) {
          const filename = fileParsed.base.startsWith('_') ? fileParsed.base : `_${fileParsed.base}`
          fs.copyFileSync(entry, path.join(dir.lib, 'styles', folder, filename))
        }
      })
    })
  } catch (error) {
    logger.error(error)
  }
}

async function _copyScripts() {
  try {
    const entries = await fg([path.join(dir.components, '**/*.js')])
    entries.forEach((entry) => {
      const fileParsed = path.parse(entry)
      scriptsFolders.forEach((folder) => {
        if (fileParsed.dir.includes(folder)) {
          fs.copyFileSync(entry, path.join(dir.lib, 'scripts', folder, fileParsed.base))
        }
      })
    })
  } catch (error) {
    console.error(error)
  }
}

async function copy(cb) {
  await _copyStyles()
  await _copyScripts()
}

function copyModules(cb) {
  return src([path.join(dir.modules, 'lazysizes', 'lazysizes.js')]).pipe(dest(path.join(dir.public, 'scripts')))
}

function helpers() {
  return (
    src(path.join(dir.assets, 'scripts', 'helpers.js'))
      // .pipe(
      //   babel({
      //     presets: ['@babel/env']
      //   })
      // )
      .pipe(dest(path.join(dir.lib, 'scripts')))
  )
}

async function partials(cb) {
  try {
    const entries = await fg([path.join(dir.components, '**/*.hbs')])
    const partials = {}
    entries.forEach((entry) => {
      const partialName = path.basename(entry, '.hbs') //camelcase(path.basename(entry, '.hbs'))
      const partialContent = fs.readFileSync(entry, 'utf8')
      partials[`@${partialName}`] = partialContent
    })
    fs.writeFileSync(path.join(dir.assets, 'scripts', 'partials.json'), JSON.stringify(partials))
    fs.writeFileSync(path.join(dir.lib, 'scripts', 'partials.json'), JSON.stringify(partials))
    cb()
  } catch (error) {
    console.error(error)
    cb(error)
  }
}

// async function templates(cb) {
//   try {
//     await _generatePartials()
//     cb()
//   } catch (error) {
//     cb(error)
//   }
// }

function fractalStyles(cb) {
  return src(path.join(dir.fractal, 'styles', '*.scss'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({ prefix: 'fractal-' }))
    .pipe(dest(path.join(dir.public, 'styles')))
}

function fractalScripts() {
  return src([path.join(dir.components, '**/*.js')])
    .pipe(rename({ dirname: '' }))
    .pipe(dest(path.join(dir.public, 'scripts')))
}

function fractalStart() {
  watch(
    [
      path.join(dir.fractal, 'styles', '**/*.scss'),
      path.join(dir.assets, 'styles', '**/*.scss'),
      path.join(dir.components, '**/*.scss')
    ],
    fractalStyles
  )

  // watch([path.join(dir.components, '**/*.hbs')], (cb) => {
  //   partials(cb)
  //   // console.log(hbs.register())
  //   console.log('partials updated')
  // })

  const server = fractal.web.server({
    sync: true,
    watch: true
  })

  server.on('error', (err) => console.error(err))

  return server.start().then((data) => {
    // console.log(data.address())
    const collection = fractal.components
    // console.log(collection.find('@navbar').handle)
    logger.success(`Fractal server is now running at http://localhost:${data.address().port}`)
  })
}

function fractalBuild() {
  const builder = fractal.web.builder()
  builder.on('progress', (completed, total) => {
    logger.success(`${completed} of ${total} items built.`)
  })
  builder.on('error', (err) => {
    logger.error(err)
  })
  return builder.build().then(() => {
    logger.success('Fractal build completed!')
  })
}

const defaults = series(partials, parallel(fractalStyles, fractalScripts, copyModules), fractalStart)
const build = series(parallel(fractalStyles, fractalScripts, copyModules, partials), fractalBuild)
const buildLib = series(clean, parallel(copy, helpers, partials))

module.exports = {
  'fractal:styles': fractalStyles,
  'fractal:scripts': fractalScripts,
  partials,
  copyModules,
  clean,
  copy,
  build,
  serve: defaults,
  default: defaults,
  'build:lib': buildLib
}
