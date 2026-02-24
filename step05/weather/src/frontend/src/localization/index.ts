import da from './resources/da'
import en from './resources/en'
import fi from './resources/fi'
import type { LanguageCode, UiStrings } from './types'

export const resources: Record<LanguageCode, UiStrings> = {
  en,
  da,
  fi,
}

export const defaultLanguage: LanguageCode = 'en'

export const getSupportedLanguage = (value: string | null | undefined): LanguageCode => {
  if (!value) {
    return defaultLanguage
  }

  const normalized = value.toLowerCase()

  if (normalized.startsWith('da')) {
    return 'da'
  }

  if (normalized.startsWith('fi')) {
    return 'fi'
  }

  if (normalized.startsWith('en')) {
    return 'en'
  }

  return defaultLanguage
}

export type { LanguageCode, TemperatureUnit, UiStrings } from './types'
