import './menu-icon.scss'
import Handlebars from '@stories/assets/handlebars'
import template from '~atoms/menu-icon/menu-icon.html?raw'
// import brand from './brand.json'

export const createComponent = (args: any) => {
  // const view = args.hasData ? { brand: myBrand } : {}
  const compileFn = Handlebars.compile(template)
  return compileFn({})
}
