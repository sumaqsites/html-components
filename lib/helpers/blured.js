'use strict'

module.exports = function (source, opts) {
  if (source) {
    return `${opts.data.root.cloudinary.link}/c_fill,w_480/e_blur:2000/${source}`
  }
  return 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'
}
