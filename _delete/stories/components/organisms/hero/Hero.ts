import './hero.scss'
import Handlebars from '@stories/assets/handlebars'
import template from '~organisms/hero/hero.html?raw'
import hero from './hero.json'

export const createComponent = (args: any) => {
  const view = args.hasData ? { hero } : {}
  const compileFn = Handlebars.compile(template)
  const container = document.createElement('section')
  container.innerHTML = `
    ${compileFn(view)}
  `
  const script = document.createElement('script')
  script.innerHTML = `
    console.log('hero')
  `
  container.appendChild(script)
  return container
}
