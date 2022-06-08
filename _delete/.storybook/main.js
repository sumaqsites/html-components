const path = require('path')

module.exports = {
  core: {
    builder: 'webpack5'
  },
  stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/preset-scss', '@storybook/addon-links', '@storybook/addon-essentials'],
  features: {
    postcss: false
  },
  webpackFinal: async (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false
    }

    config.resolve.alias = {
      ...config.resolve.alias,
      '@sumaq': path.resolve(__dirname, '../node_modules/@sumaq'),
      '@stories': path.resolve(__dirname, '../stories/'),
      '@src': path.resolve(__dirname, '../src/'),
      '@components': path.resolve(__dirname, '../src/components/'),
      '~atoms': path.resolve(__dirname, '../src/components/atoms/'),
      '~molecules': path.resolve(__dirname, '../src/components/molecules/'),
      '~organisms': path.resolve(__dirname, '../src/components/organisms/'),
      '~templates': path.resolve(__dirname, '../src/components/templates/'),
      '@themes': path.resolve(__dirname, '../src/themes/'),
      '@helpers': path.resolve(__dirname, '../src/helpers/'),
      '@styles': path.resolve(__dirname, '../src/styles/'),
      '@scripts': path.resolve(__dirname, '../src/scripts/')
    }

    config.module.rules = [
      ...config.module.rules,
      // { test: /\.hbs$/, use: { loader: 'handlebars-loader' } },
      // { test: /\.yaml$/, use: 'yaml-loader' }
      // {
      //   test: /\.html$/i,
      //   use: 'raw-loader'
      // },
      // {
      //   test: /\.html$/i,
      //   type: 'asset/inline'
      //   // loader: 'html-loader',
      //   // options: {
      //   //   sources: false,
      //   //   minimize: false,
      //   //   esModule: false
      //   // }
      // }
    ]

    // config.module.rules.push({
    //   test: /\.tsx?$/,
    //   exclude: /node_modules/,
    //   use: [
    //     {
    //       loader: require.resolve('babel-loader'),
    //       options: {
    //         presets: [
    //           require('@babel/preset-typescript').default,
    //           [require('@babel/preset-react').default, { runtime: 'automatic' }],
    //           require('@babel/preset-env').default
    //         ]
    //       }
    //     }
    //   ]
    // })

    // config.resolve.extensions.push('.ts', '.tsx')

    return config
  }
}
