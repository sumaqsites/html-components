
import { Meta } from '@storybook/html'
// import json from './go-down.json'
import { createComponent } from './GoDown'


export default {
  title: 'Components/Atoms/Go Down',
  argTypes: {
    // hasData: {
    //   name: 'Has Data',
    //   description: 'Element has data'
    // },
    // author: {
    //   name: 'Data',
    //   description: 'Author data'
    // }
  },
  args: {
    // hasData: true,
    // author: { ...json.data }
  },
  // decorators: [
  //   (Story: any) =>
  //     `
  //     ${Story()}
  //     <header><h1>Go Down</h1></header>
  //     <section><p>This is a paragraph</p></section>
  //     <script>
  //     const goDown = initGoDown();
  //     goDown.button.addEventListener('click', () => {
  //       window.scrollTo(0, document.body.offsetHeight)
  //     })
  //     </script>
  //     `
  // ]
} as Meta

export const GoDown = (args: any) => createComponent(args)
