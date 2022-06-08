import './carousel.scss'
import Handlebars from '@stories/assets/handlebars'
import template from '~molecules/carousel/carousel.html?raw'
import carousel from './carousel.json'
import initCarousel from '~molecules/carousel/carousel.js'

export const createComponent = (args: any) => {
  const view = args.hasData ? { carousel } : {}
  const compileFn = Handlebars.compile(template)
  const container = document.createElement('header')
  container.innerHTML = compileFn(view)
  const script = document.createElement('script')
  script.innerHTML = `
    ${initCarousel}
    initCarousel()
    `
  container.appendChild(script)
  return container
}
