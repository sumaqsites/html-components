import './wordcloud.scss'
import Handlebars from '@stories/assets/handlebars'
import template from '~molecules/wordcloud/wordcloud.html?raw'
import wordcloud from './wordcloud.json'

export const createComponent = (args: any) => {
  const view = args.hasData ? { wordcloud } : {}
  const compileFn = Handlebars.compile(template)
  return compileFn(view)
}
