'use strict'

module.exports = function (source, opts) {
  if (source) {
    // validate if source is a url
    if (source.match(/^https?:\/\//)) {
      return source
    }
    // validate if source is between {{ }}
    if (source.match(/^\{\{.*\}\}$/)) {
      return source
    }
    return `
    ${opts.data.root.cloudinary.link}/c_fill,w_480/${source} 480w,
    ${opts.data.root.cloudinary.link}/c_fill,w_920/${source} 920w,
    ${opts.data.root.cloudinary.link}/c_fill,w_1200/${source} 1200w,
    ${opts.data.root.cloudinary.link}/c_fill,w_1920/${source} 1920w
  `
  }
  return `${opts.data.root.cloudinary.link}/assets/placeholders/image-not-found`
}
