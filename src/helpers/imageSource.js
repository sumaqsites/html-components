'use strict'

module.exports = function (name, opts) {
  if (name) {
    return `${opts.data.root.cloudinary.link}/${name}`
  }
  return 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'
}
