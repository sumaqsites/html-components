import './section-skills.scss'
import Handlebars from '@stories/assets/handlebars'
import template from '~templates/section-skills/section-skills.html?raw'
import sectionSkills from './section-skills.json'
//import wordcloudTemplate from '../../lists/wordcloud/wordcloud.html?raw'

export const createComponent = (args: any) => {
  // const partials = {
  //   wordcloud: wordcloudTemplate
  // }
  const view = args.hasData ? { sectionSkills } : {}
  const compileFn = Handlebars.compile(template)
  return compileFn(view)
}
