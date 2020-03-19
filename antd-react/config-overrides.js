const { override, fixBabelImports, addDecoratorsLegacy } = require('customize-cra')

// override 生成 webpack 配置对象
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css'
  }),
  addDecoratorsLegacy()
)