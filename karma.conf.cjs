module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],

    files: [
      { pattern: 'src/**/*.spec.jsx', watched: false },
      { pattern: 'src/**/*.spec.js', watched: false }
    ],

    preprocessors: {
      'src/**/*.spec.jsx': ['webpack', 'sourcemap'],
      'src/**/*.spec.js': ['webpack', 'sourcemap']
    },

    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
              }
            }
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          }
        ]
      },
      resolve: {
        extensions: ['.js', '.jsx']
      }
    },

    reporters: ['progress', 'coverage'],

    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['ChromeHeadless'],
    singleRun: true
  });
};
