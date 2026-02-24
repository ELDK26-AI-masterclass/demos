export type LanguageCode = 'en' | 'da' | 'fi'

export type TemperatureUnit = 'celsius' | 'fahrenheit'

export interface UiStrings {
  locale: string
  languageLabel: string
  languageSelectAriaLabel: string
  darkModeLabel: string
  darkModeLegend: string
  darkModeSelectionAriaLabel: string
  offLabel: string
  onLabel: string
  appTitle: string
  appSubtitle: string
  aspireLogoAltText: string
  visitAspireWebsiteAriaLabel: string
  languageOptionEnglish: string
  languageOptionDanish: string
  languageOptionFinnish: string
  weatherHeading: string
  temperatureUnitLegend: string
  temperatureUnitAriaLabel: string
  fahrenheitHiddenLabel: string
  celsiusHiddenLabel: string
  loadingLabel: string
  refreshLabel: string
  loadingWeatherAriaLabel: string
  refreshWeatherAriaLabel: string
  loadingWeatherDataAriaLabel: string
  loadingWeatherDataText: string
  footerNavigationAriaLabel: string
  learnMoreAspire: string
  opensInNewTab: string
  githubAriaLabel: string
  githubHiddenLabel: string
  weatherForDateAriaLabel: (dateLabel: string) => string
  temperatureAriaLabel: (temperature: number, unit: TemperatureUnit) => string
  httpErrorLabel: (status: number) => string
  fetchErrorLabel: string
  weatherSummaries: Record<string, string>
}
