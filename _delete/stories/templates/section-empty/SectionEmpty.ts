import './section-empty.scss'
import Handlebars from '@stories/assets/handlebars'
import template from '~templates/section-empty/section-empty.html?raw'
import sectionEmpty from './section-empty.json'

export const createComponent = (args: any) => {
  const view = args.hasData ? { sectionEmpty } : {}
  const compileFn = Handlebars.compile(template)
  return compileFn(view)
}
