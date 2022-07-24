'use strict'

module.exports = function (name, opts) {
  if (name) {
    return `https://res.cloudinary.com/sumaqsites/image/upload/c_fill,w_480/e_blur:2000/${name}`
  }
  return 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'
}
