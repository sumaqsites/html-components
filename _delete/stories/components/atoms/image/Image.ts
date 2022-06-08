import './image.scss'
import Handlebars from '@stories/assets/handlebars'
import template from '~atoms/image/image.html?raw'
import image from './image.json'

export const createComponent = (args: any, mode: string) => {
  const view = args.hasData ? { image } : {}
  const compileFn = Handlebars.compile(template)
  let html
  switch (mode) {
    case 'simple':
      html = compileFn({ ...view, type: 'simple' })
      break
    case 'base':
      html = compileFn({ ...view, type: 'base' })
      break
    default:
      html = compileFn({ ...view, type: 'responsive' }) // responsive por default
  }

  return html
}
