import { Meta } from '@storybook/html'
import { createComponent } from './SectionImage'
import sectionImage from './section-image.json'

export default {
  title: 'Templates/Section Image',
  argTypes: {
    hasData: {
      name: 'Has data?',
      description: 'Image section has data'
    },
    sectionImage: {
      name: 'Data',
      description: 'Image section data'
    }
  },
  args: {
    hasData: true,
    sectionImage
  }
} as Meta

export const SectionImage = (args: any) => createComponent(args)
