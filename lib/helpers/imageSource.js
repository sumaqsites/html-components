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
    return `${opts.data.root.cloudinary.link}/${source}`
  }
  return `${opts.data.root.cloudinary.link}/assets/placeholders/image-not-found`
}
