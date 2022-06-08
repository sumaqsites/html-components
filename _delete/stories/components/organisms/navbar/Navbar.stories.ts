
import { Meta } from '@storybook/html'
import navbar from './navbar.json'
import { createComponent } from './Navbar'

export default {
  title: 'Components/Organisms/Navbar',
  argTypes: {
    hasData: {
      name: 'Has data?',
      description: 'Section has data'
    },
    navbar: {
      name: 'Data',
      description: 'Navbar data'
    }
  },
  args: {
    hasData: true,
    navbar
  }
} as Meta

export const Navbar = (args: any) => createComponent(args)
