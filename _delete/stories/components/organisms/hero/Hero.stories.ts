
import { Meta } from '@storybook/html'
import hero from './hero.json'
import { createComponent } from './Hero'
// import typewriterScript from '~atoms/typewriter/typewriter'

export default {
  title: 'Components/Organisms/Hero',
  argTypes: {
    hasData: {
      name: 'Has data?',
      description: 'Section has data'
    },
    hero: {
      name: 'Data',
      description: 'Hero data'
    }
  },
  args: {
    hasData: true,
    hero
  }
} as Meta

export const Hero = (args: any) => createComponent(args)
