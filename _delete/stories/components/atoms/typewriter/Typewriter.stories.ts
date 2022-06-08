import { Meta } from '@storybook/html'
import typewriter from './typewriter.json'
import { createComponent } from './Typewriter'

export default {
  title: 'Components/Atoms/Typewriter',
  argTypes: {
    hasData: {
      name: 'Has Data',
      description: 'Element has data'
    },
    typewriter: {
      name: 'Data',
      description: 'Typewriter data'
    }
  },
  args: {
    hasData: true,
    typewriter
  },
  // decorators: [
  //   (Story: any) =>
  //     `<header>
  //       ${Story()}
  //     </header>
  //     <script>
  //     // {typewriterScript}
  //     ;typewriter();
  //     </script>
  //     `
  // ]
} as Meta

export const Typewriter = (args: any) => createComponent(args)
