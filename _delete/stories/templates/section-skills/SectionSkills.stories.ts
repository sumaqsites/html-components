
import { Meta } from '@storybook/html'
import sectionSkills from './section-skills.json'
import { createComponent } from './SectionSkills'

export default {
  title: 'Templates/Section Skills',
  argTypes: {
    hasData: {
      name: 'Has data?',
      description: 'Section skills has data'
    },
    sectionSkills: {
      name: 'Data',
      description: 'Section skills data'
    }
  },
  args: {
    hasData: true,
    sectionSkills
  },
  decorators: [
    (Story: any) =>
      `<section>
        ${Story()}
      </section>`
  ]
} as Meta

export const SectionSkills = (args: any) => createComponent(args)
