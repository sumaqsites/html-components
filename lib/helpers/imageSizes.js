'use strict'

module.exports = function (source, opts) {

  if (source) {
    if (source.match(/^https?:\/\//)) {
      return source
    }
    if (source.match(/^\{\{.*\}\}$/)) {
      return source
    }    return `${opts.data.root.cloudinary.link}/${source}`
  }
  return `${opts.data.root.cloudinary.link}/assets/placeholders/image-not-found`
}
