import './section-image.scss'
import Handlebars from '@stories/assets/handlebars'
import template from '~templates/section-image/section-image.html?raw'
import sectionImage from './section-image.json'

export const createComponent = (args: any) => {
  const view = args.hasData ? { sectionImage } : {}
  const compileFn = Handlebars.compile(template)
  return compileFn(view)
}
