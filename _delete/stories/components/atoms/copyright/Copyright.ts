import './copyright.scss'
import Handlebars from '@stories/assets/handlebars'
import template from '~atoms/copyright/copyright.html?raw'
import copyright from './copyright.json'

export const createComponent = (args: any) => {
  const view = args.hasData ? { copyright } : {}
  const templateFn = Handlebars.compile(template)
  return templateFn(view)
}
