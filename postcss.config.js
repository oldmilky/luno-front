module.exports = {
  plugins: [
    require('postcss-import'),
    ...(process.env.NODE_ENV === 'production'
      ? [
          require('@fullhuman/postcss-purgecss')({
            content: [
              './src/pages/**/*.{js,jsx,ts,tsx}',
              './src/components/**/*.{js,jsx,ts,tsx}',
              './src/providers/**/*.{js,jsx,ts,tsx}',
              './src/assets/styles/**/*.{scss,css}'
            ],
            // Keep dynamically added / global classes
            safelist: {
              greedy: [
                /^page/, // main wrapper
                /^curve/,
                /^route/,
                /^stairs/,
                /^shiny-text/,
                /^toast/, // react-hot-toast
              ],
            },
            defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/.%]+/g) || [],
          }),
        ]
      : []),
  ],
}; 