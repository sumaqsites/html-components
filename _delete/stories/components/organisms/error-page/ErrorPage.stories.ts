import { Meta } from '@storybook/html'
import errorPage from './error-page.json'
import { createComponent } from './ErrorPage'

export default {
  title: 'Components/Organisms/Error Page',
  argTypes: {
    hasData: {
      name: 'Has data?',
      description: 'Error Page has data'
    },
    errorPage: {
      name: 'Data',
      description: 'Error Page data'
    }
  },
  args: {
    hasData: true,
    errorPage
  }
} as Meta

export const ErrorPage = (args: any) => createComponent(args)
