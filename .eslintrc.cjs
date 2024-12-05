module.exports = {
  root: true,
  extends: [
    '@nuxtjs/eslint-config',
    '@nuxtjs/eslint-config-typescript',
    'plugin:jsonc/recommended-with-jsonc'
  ],
  ignorePatterns: ['assets/', '**/*.svg', '**/*.png', '**/*.md', 'i', 'cert/'],
  rules: {
    'vue/singleline-html-element-content-newline': 'off',
    'vue/singleline-html-element-content-whitespace': 'off',
    'vue/no-v-html': 'error' // Verhindert unsicheres HTML
  }
}
