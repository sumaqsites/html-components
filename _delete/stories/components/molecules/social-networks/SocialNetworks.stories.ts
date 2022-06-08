import { Meta } from '@storybook/html'
import { createComponent } from './SocialNetworks'
import socialNetworks from './social-networks.json'

export default {
  title: 'Components/Molecules/Social Networks',
  argTypes: {
    hasData: {
      name: 'Has data?',
      description: 'Social Networks has data',
    },
    socialNetworks: {
      name: 'Data',
      description: 'Social Networks data',
    }
  },
  args: {
    hasData: true,
    socialNetworks
  },
  decorators: [
    (Story: any) => (
      `<nav>
        ${Story()}
      </nav>`
    ),
  ],


} as Meta

export const SocialNetworks = (args: any) => createComponent(args)
