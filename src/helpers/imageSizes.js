'use strict'

module.exports = function (source, opts) {
  if (source) {
    return `${opts.data.root.cloudinary.link}/${source}`
  }
  return `${opts.data.root.cloudinary.link}/assets/placeholders/image-not-found`
}
