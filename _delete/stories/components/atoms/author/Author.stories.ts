import { Meta } from '@storybook/html'
import { createComponent } from './Author'
import author from './author.json'

export default {
  title: 'Components/Atoms/Author',
  argTypes: {
    hasData: {
      name: 'Has Data',
      description: 'Element has data'
    },
    data: {
      name: 'Data',
      description: 'Author data'
    }
  },
  args: {
    hasData: true,
    data: { author }
  },
  decorators: [
    (Story: any) =>
      `<footer>
        ${Story()}
      </footer>`
  ]
} as Meta

export const Author = (args: any) => createComponent(args)
