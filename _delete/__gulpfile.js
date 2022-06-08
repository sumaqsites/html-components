const { series, parallel, src, dest, watch } = require('gulp')
const del = require('del')
const fs = require('fs')
const path = require('path')
const globby = require('globby')
const rename = require('gulp-rename')
const m = require('mustache')
const hb = require('handlebars')
const imageFns = require('./src/helpers/imageFunctions')
const { NodeBuilderFlags } = require('typescript')

const dir = {
  src: path.join(process.cwd(), 'src'),
  dist: path.join(process.cwd(), '_dist')
}

async function clean() {
  const hasDistDir = fs.existsSync(dir.dist)
  if (!hasDistDir) {
    fs.mkdirSync(dir.dist)
  }
  return del.sync([`${dir.dist}/**/*`, `${dir.dist}/**/.*`])
}

/**
 * Partial de mustache
 */
async function _getPartials() {
  return globby.sync([`${dir.src}/components/**/*.html`]).reduce((partials, file) => {
    const parse = path.parse(file)
    const partial = fs.readFileSync(file, 'utf8')
    const partialStr = _removeLineBreaks(partial.toString())
    return { ...partials, [parse.name]: partialStr }
  }, {})
}

function _removeLineBreaks(str) {
  return str.replace(/(\r\n|\n|\r)/gm, '').replace(/\s+/g, ' ')
}

async function partials(cb) {
  const partials = await _getPartials()
  fs.writeFileSync(`${dir.dist}/partials.json`, JSON.stringify(partials, null, 2))
  // return src(`${dir.src}/components/**/*.html`)
  //   .pipe(rename({ dirname: '' }))
  //   .pipe(dest(`${dir.dist}/partials/`))
  cb()
}

function helpers(cb) {
  const helpers = {}
  const imageFns = require('./src/helpers/imageFunctions')
  for (const key in imageFns) {
    console.log(imageFns[key])
    helpers[key] = imageFns[key].toString()
  }
  fs.writeFileSync(`${dir.dist}/helpers.json`, JSON.stringify(helpers, null, 2))

  // return src(`${dir.src}/helpers/**/*.js`)
  //   .pipe(rename({ dirname: '' }))
  //   .pipe(dest(`${dir.dist}/helpers/`))
  cb()
}

// async function partials(cb) {
//   try {
//     const partialsObj = await _getPartials()
//     // console.log(imageFns.default)
//     for (const key in imageFns.default) {
//       partialsObj[key] = imageFns.default[key].toString()
//       // if (Object.hasOwnProperty.call(imageFns.default, key)) {
//       //   console.log(imageFns.default[key].toString())
//       //   const element = imageFns.default[key]
//       //   partialsObj[key] = JSON.stringify(imageFns.default[key], (key, value) => {
//       //     return value.toString()
//       //   })
//       // }
//     }
//     console.log(imageFns.default.imageBlurFn.toString())
//     fs.writeFileSync(`${dir.dist}/partials.json`, JSON.stringify(partialsObj))
//   } catch (error) {
//     cb(error)
//   }
//   cb()
// }

async function demo(cb) {
  const partials = await _getPartials()
  const template = partials['image-section']
  const view = {
    imageSection: {
      title: 'This is a Image Section Title',
      responsiveImage: {
        description: 'Image from cloudinary samples',
        name: 'samples/people/jazz'
      }
    }
  }
  const fns = require('./src/helpers/imageFunctions')
  for (const key in fns) {
    view[key] = fns[key]
  }
  for (const key in partials) {
    //console.log(key, ':', typeof partials[key])
  }
  console.log('---------------------')
  console.log(template)
  const html = m.render(template, view, partials)
  console.log('--------------------- M')
  console.log(html)
  console.log('--------------------- HB')

  const partial = `
  {{# with responsiveImage }}
    <figure class="responsive-image">
      <img
        class="lazyload"
        alt="{{ description }}"
        data-sizes="auto"
        src="{{fnImageBlur name }}"
        data-srcset="{{# imageSourceSetFn }}{{ name }}{{/ imageSourceSetFn }}"
      />
    </figure>
  {{ else }}
    <em class="data-not-found">Not found "responsiveImage" data!</em>
  {{/ with }}
  `
  const hbTemplate = `
    {{# with imageSection }}
      <div class="image-section">
        <h2 class="title">{{ imageSection.title }}</h2>
        {{> responsive-image }}
      </div>
    {{ else }}
      <em class="data-not-found">Not found "imageSection" data!</em>
    {{/ with }}
  `
  hb.registerPartial('responsive-image', partial)
  hb.registerHelper('fnImageBlur', function (name) {
    return `https://res.cloudinary.com/sumaqwebsites/image/upload/c_fill,w_480/e_blur:2000/${name}`
  })
  const tpl = hb.compile(hbTemplate)
  console.log(tpl(view))
  console.log('---------------------')
  cb()
}

const sumaq = series(clean, parallel(partials, helpers))
exports.default = sumaq
exports.sumaq = sumaq
exports.clean = clean
exports.demo = demo
