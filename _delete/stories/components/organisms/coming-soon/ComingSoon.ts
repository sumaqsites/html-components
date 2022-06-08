import './coming-soon.scss'
import Handlebars from '@stories/assets/handlebars'
import template from '~organisms/coming-soon/coming-soon.html?raw'
import comingSoon from './coming-soon.json'

export const createComponent = (args: any) => {
  const view = args.hasData ? { comingSoon } : {}
  const compileFn = Handlebars.compile(template)
  const container = document.createElement('section')
  container.innerHTML = compileFn(view)
  return container
}
