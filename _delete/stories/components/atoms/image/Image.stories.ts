import { Meta } from '@storybook/html'
import responsiveImage from './image.json'
import { createComponent } from './Image'

export default {
  title: 'Components/Atoms/Images',
  argTypes: {
    hasData: {
      name: 'Has Data',
      description: 'Element has data'
    },
  },
  args: {
    hasData: true,
    responsiveImage
  },
} as Meta

export const BaseImage = (args: any) => createComponent(args, 'base')
export const SimpleImage = (args: any) => createComponent(args, 'simple')
export const ResponsiveImage = (args: any) => createComponent(args, 'responsive')
