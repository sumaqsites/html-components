import './go-down.scss'
import Handlebars from '@stories/assets/handlebars'
import template from '~atoms/go-down/go-down.html?raw'
import initGoDown from '~atoms/go-down/go-down'
import goDown from './go-down.json'

export const createComponent = (args: any) => {
  const view = args.hasData ? { goDown } : {}
  const templateFn = Handlebars.compile(template)
  // return templateFn(view)
  const container = document.createElement('div')
  container.innerHTML = `
    ${templateFn(view)}
    <section><h1>Top section</h1></section>
    <section><h1>Bottom section</h1></section>
  `
  // goDown.button.addEventListener('click', () => {
  //   window.scrollTo(0, document.body.offsetHeight)
  // })

  const script = document.createElement('script') as HTMLScriptElement
  script.innerHTML = `
    ${initGoDown};
    initGoDown();
  `
  container.appendChild(script)
  return container
}
