import './brand.scss'
import Handlebars from '@stories/assets/handlebars'
import template from '~atoms/brand/brand.html?raw'
import brand from './brand.json'

export const createComponent = (args: any, type: string) => {
  const myBrand = { ...brand }
  if (type === 'name') {
    delete myBrand.image
  }
  const view = args.hasData ? { brand: myBrand } : {}
  const compileFn = Handlebars.compile(template)
  return compileFn(view)
}
