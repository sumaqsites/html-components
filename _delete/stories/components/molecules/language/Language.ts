import './language.scss'
import Handlebars from '@stories/assets/handlebars'
import template from '~molecules/language/language.html?raw'
import language from './language.json'

export const createComponent = (args: any) => {
  const view = args.hasData ? { language } : {}
  const compileFn = Handlebars.compile(template)
  return compileFn(view)
}
