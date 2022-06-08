import './author.scss'
import Handlebars from '@stories/assets/handlebars'
import template from '~atoms/author/author.html?raw'
import author from './author.json'

export const createComponent = (args: any) => {
  const view = args.hasData ? { author } : {}
  const templateFn = Handlebars.compile(template)
  return templateFn(view)
}
