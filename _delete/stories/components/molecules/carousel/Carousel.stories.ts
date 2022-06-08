import { Meta } from '@storybook/html'
import { createComponent } from './Carousel'
import carousel from './carousel.json'

export default {
  title: 'Components/Molecules/Carousel',
  argTypes: {
    hasData: {
      name: 'Has Data',
      description: 'Element has data'
    },
    data: {
      name: 'Data',
      description: 'Carousel data'
    }
  },
  args: {
    hasData: true,
    data: { carousel }
  },
  // decorators: [
  //   (Story: any) =>
  //     `<header>
  //       ${Story()}
  //     </header>`
  // ]
} as Meta

export const Carousel = (args: any) => createComponent(args)


