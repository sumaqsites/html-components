import './menubar.scss'
import Handlebars from '@stories/assets/handlebars'
import template from '~molecules/menubar/menubar.html?raw'
import menubar from './menubar.json'

export const createComponent = (args: any) => {
  const view = args.hasData ? { menubar } : {}
  const compileFn = Handlebars.compile(template)
  return compileFn(view)
}
