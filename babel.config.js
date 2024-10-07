module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
      },
    ],
    [
      'module-resolver',
      {
        alias: {
          '@config': './src/config',
          '@core': './src/core',
          '@hooks': './src/hooks',
          '@infrasctructure': './src/infrastructure',
          '@screens': './src/presentation/screens',
          '@navigation': './src/presentation/navigation',
          '@components': './src/presentation/components',
        },
      },
    ],
  ],
};
