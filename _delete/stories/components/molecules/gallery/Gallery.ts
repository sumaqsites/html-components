import './gallery.scss'
import Handlebars from '@stories/assets/handlebars'
import template from '~molecules/gallery/gallery.html?raw'
import gallery from './gallery.json'

export const createComponent = (args: any) => {
  const view = args.hasData ? { gallery } : {}
  const compileFn = Handlebars.compile(template)
  return compileFn(view)
}
