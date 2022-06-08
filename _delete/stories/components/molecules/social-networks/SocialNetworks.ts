import './social-networks.scss'
import Handlebars from '@stories/assets/handlebars'
import template from '~molecules/social-networks/social-networks.html?raw'
import socialNetworks from './social-networks.json'

export const createComponent = (args: any) => {
  const view = args.hasData ? { socialNetworks } : {}
  const compileFn = Handlebars.compile(template)
  return compileFn(view)
}
