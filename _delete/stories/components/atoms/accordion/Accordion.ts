import './accordion.scss'
import Handlebars from '@stories/assets/handlebars'
import template from '~atoms/accordion/accordion.html?raw'
import initAccordion from '~atoms/accordion/accordion'
import accordion from './accordion.json'

export const createComponent = (args: any) => {
  const view = args.hasData ? { accordion } : {}
  const compileFn = Handlebars.compile(template)
  const container = document.createElement('section')
  container.innerHTML = compileFn(view)
  const script = document.createElement('script')
  script.innerHTML = `
    ${initAccordion}
    initAccordion()
    `
  container.appendChild(script)
  return container
}
