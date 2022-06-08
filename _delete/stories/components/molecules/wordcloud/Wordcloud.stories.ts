import { Meta } from '@storybook/html'
import wordcloud from './wordcloud.json'
import { createComponent } from './Wordcloud'

export default {
  title: 'Components/Molecules/Wordscloud',
  argTypes: {
    hasData: {
      name: 'Has data?',
      description: 'Menubar has data'
    },
    wordcloud: {
      name: 'Data',
      description: 'Menubar data'
    }
  },
  args: {
    hasData: true,
    wordcloud
  },
  decorators: [
    (Story: any) =>
      `<section>
        ${Story()}
      </section>`
  ]
} as Meta

export const Wordscloud = (args: any) => createComponent(args)
