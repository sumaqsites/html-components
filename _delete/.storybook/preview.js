import '../stories/assets/decorators.scss';
import 'lazysizes'
// import '../node_modules/siema/dist/siema.min.js'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  // controls: {
  //   matchers: {
  //     color: /(background|color)$/i,
  //     date: /Date$/
  //   }
  // },
  layout: 'fullscreen',
  options: {
    storySort: {
      order: ['Introduction', 'Components', ['Overview', 'Head', 'Atoms', 'Molecules', 'Organisms'], 'Templates','Pages','Themes', 'Examples']
    }
  },
  // preview: {
  //   styles: {
  //     body: {
  //       margin: '2rem'
  //     }
  //   }
  // }
}
