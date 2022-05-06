module.exports = {
  extends: [
      // standard 规则集合
      'stylelint-config-standard',
      // standard 规则集合的 scss 版本
      'stylelint-config-standard-scss',
      // 样式属性顺序规则
      'stylelint-config-recess-order',
      // 接入 Prettier 规则
      'stylelint-config-prettier',
      'stylelint-prettier/recommended'
    //   "stylelint-config-recommended-vue/scss",
  ],
  // 注册 stylelint 的 prettier 插件
  plugins: ['stylelint-prettier'],
  customSyntax: 'postcss-html',
  rules: {
      'indentation': 4,
      'selector-pseudo-element-no-unknown': [
          true,
          {
              ignorePseudoElements: ['v-deep']
          }
      ],
      'number-leading-zero': 'never',
      'no-descending-specificity': null,
      'font-family-no-missing-generic-family-keyword': null,
      'selector-type-no-unknown': null,
      'at-rule-no-unknown': null,
      'no-duplicate-selectors': null,
      'no-empty-source':null,
      'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global'] }],
      // 开启 Prettier 自动格式化功能
      'prettier/prettier': true
  }
}
