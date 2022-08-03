'use strict'

module.exports = function (source, opts) {
  if (source) {
    return `
    https://res.cloudinary.com/sumaqsites/image/upload/c_fill,w_480/${source} 480w,
    https://res.cloudinary.com/sumaqsites/image/upload/c_fill,w_920/${source} 920w,
    https://res.cloudinary.com/sumaqsites/image/upload/c_fill,w_1200/${source} 1200w,
    https://res.cloudinary.com/sumaqsites/image/upload/c_fill,w_1920/${source} 1920w
  `
  }
  return `${opts.data.root.cloudinary.link}/assets/placeholders/image-not-found`
}
