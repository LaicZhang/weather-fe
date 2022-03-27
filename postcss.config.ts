const charsetRemoval = () => {
  return {
    postcssPlugin: 'internal:charset-removal',
    AtRule: {
      charset: (atRule: any) => {
        if (atRule.name === 'charset')
          atRule.remove()
      },
    },
  }
}

module.exports = () => {
  return {
    plugins: [
      // 其他postcss插件
      charsetRemoval(),
    ],
  }
}
