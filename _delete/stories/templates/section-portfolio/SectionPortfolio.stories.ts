import { Meta } from '@storybook/html'
import sectionPortfolio from './section-portfolio.json'
import { createComponent } from './SectionPortfolio'

export default {
  title: 'Templates/Portfolio',
  argTypes: {
    hasData: {
      name: 'Has data?',
      description: 'Porfolio has data'
    },
    sectionPortfolio: {
      name: 'Data',
      description: 'Portfolio data'
    }
  },
  args: {
    hasData: true,
    sectionPortfolio
  }
} as Meta

export const Portfolio = (args: any) => createComponent(args)
