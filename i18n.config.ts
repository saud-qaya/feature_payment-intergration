// i18n.config.ts
import { i18n } from './i18n_en_de'
export default defineI18nConfig(() => ({
  escapeParameterHtml: true,
  fallbackLocale: 'en',
  legacy: false,
  locale: 'en',
  messages: i18n.messages

}))
