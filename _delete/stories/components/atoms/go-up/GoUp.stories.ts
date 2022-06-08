import { Meta } from '@storybook/html'
import { createComponent } from './GoUp'

export default {
  title: 'Components/Atoms/Go Up',
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
  //     <header><h1>This is a Header</h1></header>
  //     <section><h2>This is a Header</h2></section>
  //     <footer>Go up</footer>
  //     ${Story()}
  //     <script>
  //     // {goUpScript};
  //     const goUp = initGoUp();
  //     window.scrollTo(0, document.body.offsetHeight)
  //     goUp.button.addEventListener('click', () => {
  //       window.scrollTo(0, 0)
  //     })
  //     </script>
  //     `
  // ]
} as Meta

export const GoUp = (args: any) => createComponent(args)
