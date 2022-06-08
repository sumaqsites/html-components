
import { Meta } from '@storybook/html'
import gallery from './gallery.json'
import { createComponent } from './Gallery'

console.log(gallery)

export default {
  title: 'Components/Molecules/Gallery',
  argTypes: {
    hasData: {
      name: 'Has data?',
      description: 'Gallery has data'
    },
    gallery: {
      name: 'Data',
      description: 'Gallery data'
    }
  },
  args: {
    hasData: true,
    gallery
  },
  decorators: [
    (Story: any) =>
      `<section>
        ${Story()}
      </section>`
  ]
} as Meta

export const Gallery = (args: any) => createComponent(args)
