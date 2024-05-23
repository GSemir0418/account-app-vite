import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'no-alert': 'off',
    'no-console': 'off',
  },
  stylistic: {
    semi: false
  }
})
