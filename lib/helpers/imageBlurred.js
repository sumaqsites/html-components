'use strict'

module.exports = function (source, opts) {
  if (source) {
    return `${opts.data.root.cloudinary.link}/c_fill,w_200/e_blur:2000/${source}`
  }
  return `${opts.data.root.cloudinary.link}/assets/placeholders/image-not-found`
}
