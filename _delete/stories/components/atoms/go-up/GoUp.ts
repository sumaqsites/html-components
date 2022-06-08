import './go-up.scss'
import Handlebars from '@stories/assets/handlebars'
import template from '~atoms/go-up/go-up.html?raw'
import initGoUp from '~atoms/go-up/go-up'
import goUp from './go-up.json'

export const createComponent = (args: any) => {
  const view = args.hasData ? { goUp } : {}
  const templateFn = Handlebars.compile(template)
  // return templateFn(view)
  const container = document.createElement('div')
  container.innerHTML = `
    ${templateFn(view)}
    <section><h2>Top section</h2></section>
    <section><h2>Bottom section</h2></section>
  `
  const script = document.createElement('script')
  script.innerHTML = `
    ${initGoUp};
    initGoUp();
    window.scrollTo(0, document.body.offsetHeight)
  `
  container.appendChild(script)
  // <script>
  // ${initGoUp};
  // initGoUp();
  // window.scrollTo(0, document.body.offsetHeight)
  // // goUp.button.addEventListener('click', () => {
  // //   window.scrollTo(0, 0)
  // // })
  // </script>
  return container
}
