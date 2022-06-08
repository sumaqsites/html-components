import { Meta } from '@storybook/html'
import emptySection from './section-empty.json'
import { createComponent } from './SectionEmpty'

export default {
  title: 'Templates/Section Empty',
  argTypes: {
    hasData: {
      name: 'Has data?',
      description: 'Section has data'
    },
    emptySection: {
      name: 'Data',
      description: 'Section data'
    }
  },
  args: {
    hasData: true,
    emptySection
  }
} as Meta

export const SectionEmpty = (args: any) => createComponent(args)
