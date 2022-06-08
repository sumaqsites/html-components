import { Meta } from '@storybook/html'
import menubar from './menubar.json'
import { createComponent } from './Menubar'

export default {
  title: 'Components/Molecules/Menubar',
  argTypes: {
    hasData: {
      name: 'Has data?',
      description: 'Menubar has data',
    },
    menubar: {
      name: 'Data',
      description: 'Menubar data',
    }
  },
  args: {
    hasData: true,
    menubar
  },
  decorators: [
    (Story: any) => (
      `<nav>
        ${Story()}
      </nav>`
    ),
  ],


} as Meta

export const Menubar = (args: any) => createComponent(args)
