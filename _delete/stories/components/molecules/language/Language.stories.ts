import { Meta } from '@storybook/html'
import language from './language.json'
import { createComponent } from './Language'

export default {
  title: 'Components/Molecules/Language',
  argTypes: {
    hasData: {
      name: 'Has data?',
      description: 'Languagebar has data'
    },
    language: {
      name: 'Data',
      description: 'Languagebar data'
    }
  },
  args: {
    hasData: true,
    language
  },
  decorators: [
    (Story: any) =>
      `<nav>
        ${Story()}
      </nav>`
  ]
} as Meta

export const Language = (args: any) => createComponent(args)
