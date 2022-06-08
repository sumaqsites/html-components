import './error-page.scss'
import Handlebars from '@stories/assets/handlebars'
import template from '~organisms/error-page/error-page.html?raw'
import errorPage from './error-page.json'

export const createComponent = (args: any) => {
  const view = args.hasData ? { errorPage } : {}
  const compileFn = Handlebars.compile(template)
  const container = document.createElement('section')
  container.classList.add('.section-error-page')
  container.innerHTML = compileFn(view)
  return container
}
