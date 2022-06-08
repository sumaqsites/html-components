import { Meta } from '@storybook/html'
import { createComponent } from './Copyright'
import copyright from './copyright.json'

export default {
  title: 'Components/Atoms/Copyright',
  argTypes: {
    hasLink: { name: 'Has link', description: 'Has link property' },
    hasData: { name: 'Has data', description: 'Whether to show the data' },
    copyright: { name: 'Data', description: 'The copyright data' }
  },
  args: {
    hasLink: true,
    hasData: true,
    copyright
  },
  decorators: [
    (Story: any) =>
      `<footer>
        ${Story()}
      </footer>`
  ]
} as Meta

export const Copyright = (args: any) => createComponent(args)
