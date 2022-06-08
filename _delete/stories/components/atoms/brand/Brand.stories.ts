import { Meta } from '@storybook/html'
import brand from './brand.json'
import { createComponent } from './Brand'

export default {
  title: 'Components/Atoms/Brand',
  argTypes: {
    hasData: {
      name: 'Has data?',
      description: 'Brand has data'
    },
    brand: {
      name: 'Data',
      description: 'Brand data'
    }
  },
  args: {
    hasData: true,
    brand
  },
  decorators: [
    (Story: any) =>
      `<nav class="nav-brand">
        ${Story()}
      </nav>`
  ]
} as Meta

export const BrandImage = (args: any) => createComponent(args, 'image')
export const BrandName = (args: any) => createComponent(args, 'name')
