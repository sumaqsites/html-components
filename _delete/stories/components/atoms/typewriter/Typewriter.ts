import './typewriter.scss'
import Handlebars from '@stories/assets/handlebars'
import template from '~atoms/typewriter/typewriter.html?raw'
import typewriter from './typewriter.json'
import initTypewriter from '~atoms/typewriter/typewriter'

export const createComponent = (args: any) => {
  const view = args.hasData ? { typewriter } : {}
  const templateFn = Handlebars.compile(template)

  const container = document.createElement('div')
  container.innerHTML = `
    <header>
      ${templateFn(view)}
    </header>
  `
  const script = document.createElement('script')
  script.innerHTML = `
    ${initTypewriter};
    initTypewriter();
  `
  container.appendChild(script)
  return container
}
