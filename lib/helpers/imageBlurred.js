'use strict'

module.exports = function (source, opts) {
  // validate if source is a url
  // if (source.match(/^https?:\/\//)) {
  //   return source
  // }
  // validate if source is between {{ }}
  if (source.match(/^\{\{.*\}\}$/)) {
    return source
  }

  if (source) {
    return `${opts.data.root.cloudinary.link}/c_fill,w_200/e_blur:2000/${source}`
  }
  return `${opts.data.root.cloudinary.link}/assets/placeholders/image-not-found`
}
