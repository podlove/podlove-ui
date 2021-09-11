const path = require('path')
const { tailwind, rules } = require('@podlove/build')
const base = path.resolve(__dirname, '..', 'src')

module.exports = {
  "stories": [
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  "core": {
    "builder": "webpack5"
  },
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push(rules.style.config(rules.style.test.scss, [
      rules.style.loader.vue(),
      rules.style.loader.css(),
      rules.style.loader.sass({ includePaths: [path.resolve(base, 'theme')] }),
      rules.style.loader.postcss({
        plugins: [
          rules.style.postcss.plugins.tailwind(tailwind),
          rules.style.postcss.plugins.autoprefixer
        ]
      }),
    ])),
    // config.module.rules.push({
    //   test: /\.scss$/,
    //   use: [
    //     {
    //       loader: 'vue-style-loader'
    //     },
    //     {
    //       loader: 'css-loader'
    //     },
    //     {
    //       loader: 'postcss-loader',
    //       options: {
    //         postcssOptions: {
    //           plugins: () => [
    //             cssClean({
    //               inline: ['none']
    //             }),
    //             rules.style.postcss.plugins.tailwind(tailwind),
    //             rules.style.postcss.plugins.autoprefixer
    //           ]
    //         }
    //       }
    //     },
    //     {
    //       loader: 'sass-loader',
    //       options: { sassOptions: { includePaths: [path.resolve(base, 'theme')] } }
    //     }
    //   ]
    // });

    config.module.rules.push({
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      loader: 'file-loader',
      options: {
        name: 'fonts/[name].[ext]?[hash]'
      }
    });


    config.resolve.alias = {
      ...config.resolve.alias,
      '@': base,
      'components': path.resolve(base, 'components'),
      'icons': path.resolve(base, 'icons'),
      'defaults': path.resolve(base, 'defaults'),
      'theme': path.resolve(base, 'theme')
    }

    // Return the altered config
    return config;
  },
}

