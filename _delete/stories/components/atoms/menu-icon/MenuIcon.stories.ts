import { Meta } from '@storybook/html'
import menuIcon from './menu-icon.json'
import { createComponent } from './MenuIcon'

export default {
  title: 'Components/Atoms/Menu Icon',
  argTypes: {
    hasData: {
      name: 'Has data?',
      description: 'Brand has data'
    },
    menuIcon: {
      name: 'Data',
      description: 'Brand data'
    }
  },
  args: {
    hasData: true,
    menuIcon
  },
  decorators: [
    (Story: any) =>
      `<nav class="nav-menu-icon">
        ${Story()}
      </nav>`
  ]
} as Meta

export const MenuIcon = (args: any) => createComponent(args)
