import { Meta } from '@storybook/html'
import comingSoon from './coming-soon.json'
import { createComponent } from './ComingSoon'

export default {
  title: 'Components/Organisms/Coming Soon',
  argTypes: {
    hasData: {
      name: 'Has data?',
      description: 'Section has data',
    },
    comingSoon: {
      name: 'Data',
      description: 'Coming Soon data',
    }
  },
  args: {
    hasData: true,
    comingSoon
  }

} as Meta

export const ComingSoon = (args: any) => createComponent(args)
