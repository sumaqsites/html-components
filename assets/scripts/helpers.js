function blured(name) {
  return `https://res.cloudinary.com/sumaqsites/image/upload/c_fill,w_480/e_blur:2000/${name}`
}

function source(name) {
  return `https://res.cloudinary.com/sumaqsites/image/upload/${name}`
}

function sourceSet(name) {
  return `
    https://res.cloudinary.com/sumaqsites/image/upload/c_fill,w_480/${name} 480w,
    https://res.cloudinary.com/sumaqsites/image/upload/c_fill,w_920/${name} 920w,
    https://res.cloudinary.com/sumaqsites/image/upload/c_fill,w_1200/${name} 1200w,
    https://res.cloudinary.com/sumaqsites/image/upload/c_fill,w_1920/${name} 1920w
    `
}

function isResponsive(type) {
  return type === 'responsive'
}

function isSimple(type) {
  return type === 'simple'
}

function isDefault(type) {
  return type === 'default'
}

function isBase(type) {
  return type === 'base'
}

function helperMissing(args) {
  console.error('Missing', args.name)
  return `{{${args.name}}}`
  // return new Handlebars.SafeString(`Missing ${args.name}`)
}

function blockHelperMissing(ctx, opts) {
  console.error(`Helper '${opts.name}' not found. `)
  return `Helper '${opts.name}' not found, context ${opts.fn(ctx)}`
}

module.exports = { blured, source, sourceSet, isResponsive, isSimple, isBase, isDefault, helperMissing, blockHelperMissing }

// export { blured, source, sourceSet, isResponsive, isSimple, isBase, isDefault, helperMissing, blockHelperMissing }
// export default { blured, source, sourceSet, isResponsive, isSimple, isBase, isDefault, helperMissing, blockHelperMissing }
