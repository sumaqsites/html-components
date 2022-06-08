import { Meta } from '@storybook/html'
import { createComponent } from './Accordion'
import accordion from './accordion.json'

export default {
  title: 'Components/Atoms/Accordion',
  argTypes: {
    hasData: {
      name: 'Has Data',
      description: 'Element has data'
    },
    data: {
      name: 'Data',
      description: 'Accordion data'
    }
  },
  args: {
    hasData: true,
    data: { accordion }
  },
} as Meta

export const Accordion = (args: any) => createComponent(args)


