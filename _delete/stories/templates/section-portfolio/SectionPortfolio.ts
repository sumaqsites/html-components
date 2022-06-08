import './section-portfolio.scss'
import Handlebars from '@stories/assets/handlebars'
import template from '~templates/section-portfolio/section-portfolio.html?raw'
import sectionPortfolio from './section-portfolio.json'

export const createComponent = (args: any) => {
  const view = args.hasData ? { sectionPortfolio } : {}
  const compileFn = Handlebars.compile(template)
  return compileFn(view)
}
