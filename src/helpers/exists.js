'use strict'

module.exports = function (ctx, opts) {
  const data = opts.hash.data
  const message = `Data '${data}' not found.`
  if (ctx) {
    return opts.fn(ctx)
  }
  console.error(message)
  return `<em class="data-not-found">${message}</em>`
}
