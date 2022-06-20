const path = require('path');

module.exports = {
  entry: './src/index.ts',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.ts/,
        use: 'ts-loader',
        exclude: [/node_modules/, /__tests__/],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  externals: {
    'node:cluster': 'commonjs2 node:cluster',
    'node:os': 'commonjs2 node:os',
    'node:http': 'commonjs2 node:http',
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
};
