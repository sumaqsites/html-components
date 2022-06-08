import './navbar.scss'
import Handlebars from '@stories/assets/handlebars'
import template from '~organisms/navbar/navbar.html?raw'
import navbar from './navbar.json'
import initNabvar from '~organisms/navbar/navbar'

export const createComponent = (args: any) => {
  const view = args.hasData ? { navbar } : {}
  const compileFn = Handlebars.compile(template)
  const container = document.createElement('nav')
  container.classList.add('block-navbar')
  container.innerHTML = `
    ${compileFn(view)}
  `
  const script = document.createElement('script')
  script.innerHTML = `
    ${initNabvar}
    initNavbar()
    console.log('navbar')
  `
  container.appendChild(script)
  return container
}
