const { makeMetroConfig } = require('@rnx-kit/metro-config')
const { TypeScriptPlugin } = require('@rnx-kit/metro-plugin-typescript')
const MetroSymlinksResolver = require('@rnx-kit/metro-resolver-symlinks')

module.exports = makeMetroConfig({
  projectRoot: __dirname,
  serializer: {
    experimentalSerializerHook: TypeScriptPlugin(),
  },
  resolver: {
    sourceExts: ['js', 'jsx', 'ts', 'tsx', 'json', 'mjs', 'cjs', 'glsl', 'vert', 'frag'],
    assetExts: ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'svg', 'ttf', 'woff', 'woff2', 'eot', 'otf', 'dat'],
    resolveRequest: MetroSymlinksResolver(),
  },
  transformer: {
    unstable_allowRequireContext: true,
    babelTransformerPath: require.resolve('./transformer.js'),
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
})
