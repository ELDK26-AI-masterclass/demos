import { useState, useEffect } from 'react'
import aspireLogo from '/Aspire.png'
import './App.css'
import {
  resources,
  getSupportedLanguage,
  type LanguageCode,
  type TemperatureUnit,
} from './localization'

interface WeatherForecast {
  date: string
  temperatureC: number
  temperatureF: number
  summary: string
}

type FetchError =
  | { kind: 'http'; status: number }
  | { kind: 'fetch' }

type ThemeMode = 'light' | 'dark'

const themeStorageKey = 'theme-mode'
const languageStorageKey = 'ui-language'

const getInitialThemeMode = (): ThemeMode => {
  if (typeof window === 'undefined') {
    return 'dark'
  }

  const storedTheme = window.localStorage.getItem(themeStorageKey)
  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const getInitialLanguage = (): LanguageCode => {
  if (typeof window === 'undefined') {
    return 'en'
  }

  const storedLanguage = window.localStorage.getItem(languageStorageKey)
  if (storedLanguage) {
    return getSupportedLanguage(storedLanguage)
  }

  return getSupportedLanguage(window.navigator.language)
}

function App() {
  const [weatherData, setWeatherData] = useState<WeatherForecast[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<FetchError | null>(null)
  const [useCelsius, setUseCelsius] = useState(false)
  const [themeMode, setThemeMode] = useState<ThemeMode>(getInitialThemeMode)
  const [language, setLanguage] = useState<LanguageCode>(getInitialLanguage)

  const t = resources[language]
  const languageOptions: Array<{ code: LanguageCode; label: string }> = [
    { code: 'en', label: t.languageOptionEnglish },
    { code: 'da', label: t.languageOptionDanish },
    { code: 'fi', label: t.languageOptionFinnish },
  ]

  const fetchWeatherForecast = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/weatherforecast')
      
      if (!response.ok) {
        setError({ kind: 'http', status: response.status })
        return
      }
      
      const data: WeatherForecast[] = await response.json()
      setWeatherData(data)
    } catch (err) {
      setError({ kind: 'fetch' })
      console.error('Error fetching weather forecast:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWeatherForecast()
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', themeMode)
    root.style.colorScheme = themeMode
    window.localStorage.setItem(themeStorageKey, themeMode)
  }, [themeMode])

  useEffect(() => {
    const root = document.documentElement
    root.lang = t.locale
    window.localStorage.setItem(languageStorageKey, language)
  }, [language, t.locale])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(t.locale, {
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const getLocalizedSummary = (summary: string) => {
    return t.weatherSummaries[summary.toLowerCase()] ?? summary
  }

  const errorMessage =
    error?.kind === 'http'
      ? t.httpErrorLabel(error.status)
      : error?.kind === 'fetch'
        ? t.fetchErrorLabel
        : null

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-controls">
          <div className="theme-control theme-control-header">
            <span className="theme-label">{t.darkModeLabel}</span>
            <fieldset className="toggle-switch theme-switch" aria-label={t.darkModeSelectionAriaLabel}>
              <legend className="visually-hidden">{t.darkModeLegend}</legend>
              <button
                className={`toggle-option ${themeMode === 'light' ? 'active' : ''}`}
                onClick={() => setThemeMode('light')}
                aria-pressed={themeMode === 'light'}
                type="button"
              >
                {t.offLabel}
              </button>
              <button
                className={`toggle-option ${themeMode === 'dark' ? 'active' : ''}`}
                onClick={() => setThemeMode('dark')}
                aria-pressed={themeMode === 'dark'}
                type="button"
              >
                {t.onLabel}
              </button>
            </fieldset>
          </div>

          <div className="language-control theme-control-header">
            <label className="theme-label" htmlFor="language-select">{t.languageLabel}</label>
            <select
              id="language-select"
              className="language-select"
              value={language}
              onChange={(event) => setLanguage(event.target.value as LanguageCode)}
              aria-label={t.languageSelectAriaLabel}
            >
              {languageOptions.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <a 
          href="https://aspire.dev" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label={t.visitAspireWebsiteAriaLabel}
          className="logo-link"
        >
          <img src={aspireLogo} className="logo" alt={t.aspireLogoAltText} />
        </a>
        <h1 className="app-title">{t.appTitle}</h1>
        <p className="app-subtitle">{t.appSubtitle}</p>
      </header>

      <main className="main-content">
        <section className="weather-section" aria-labelledby="weather-heading">
          <div className="card">
            <div className="section-header">
              <h2 id="weather-heading" className="section-title">{t.weatherHeading}</h2>
              <div className="header-actions">
                <fieldset className="toggle-switch" aria-label={t.temperatureUnitAriaLabel}>
                  <legend className="visually-hidden">{t.temperatureUnitLegend}</legend>
                  <button 
                    className={`toggle-option ${!useCelsius ? 'active' : ''}`}
                    onClick={() => setUseCelsius(false)}
                    aria-pressed={!useCelsius}
                    type="button"
                  >
                    <span aria-hidden="true">°F</span>
                    <span className="visually-hidden">{t.fahrenheitHiddenLabel}</span>
                  </button>
                  <button 
                    className={`toggle-option ${useCelsius ? 'active' : ''}`}
                    onClick={() => setUseCelsius(true)}
                    aria-pressed={useCelsius}
                    type="button"
                  >
                    <span aria-hidden="true">°C</span>
                    <span className="visually-hidden">{t.celsiusHiddenLabel}</span>
                  </button>
                </fieldset>
                <button 
                  className="refresh-button"
                  onClick={fetchWeatherForecast} 
                  disabled={loading}
                  aria-label={loading ? t.loadingWeatherAriaLabel : t.refreshWeatherAriaLabel}
                  type="button"
                >
                  <svg 
                    className={`refresh-icon ${loading ? 'spinning' : ''}`}
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
                  </svg>
                  <span>{loading ? t.loadingLabel : t.refreshLabel}</span>
                </button>
              </div>
            </div>
            
            {errorMessage && (
              <div className="error-message" role="alert" aria-live="polite">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <span>{errorMessage}</span>
              </div>
            )}
            
            {loading && weatherData.length === 0 && (
              <div className="loading-skeleton" role="status" aria-live="polite" aria-label={t.loadingWeatherDataAriaLabel}>
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="skeleton-row" aria-hidden="true" />
                ))}
                <span className="visually-hidden">{t.loadingWeatherDataText}</span>
              </div>
            )}
            
            {weatherData.length > 0 && (
              <div className="weather-grid">
                {weatherData.map((forecast, index) => (
                  <article key={index} className="weather-card" aria-label={t.weatherForDateAriaLabel(formatDate(forecast.date))}>
                    <h3 className="weather-date">
                      <time dateTime={forecast.date}>{formatDate(forecast.date)}</time>
                    </h3>
                    <p className="weather-summary">{getLocalizedSummary(forecast.summary)}</p>
                    <div
                      className="weather-temps"
                      aria-label={t.temperatureAriaLabel(
                        useCelsius ? forecast.temperatureC : forecast.temperatureF,
                        (useCelsius ? 'celsius' : 'fahrenheit') as TemperatureUnit,
                      )}
                    >
                      <div className="temp-group">
                        <span className="temp-value" aria-hidden="true">
                          {useCelsius ? forecast.temperatureC : forecast.temperatureF}°
                        </span>
                        <span className="temp-unit" aria-hidden="true">
                          {useCelsius ? t.celsiusHiddenLabel : t.fahrenheitHiddenLabel}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <nav aria-label={t.footerNavigationAriaLabel}>
          <a href="https://aspire.dev" target="_blank" rel="noopener noreferrer">
            {t.learnMoreAspire}<span className="visually-hidden"> {t.opensInNewTab}</span>
          </a>
          <a 
            href="https://github.com/dotnet/aspire" 
            target="_blank" 
            rel="noopener noreferrer"
            className="github-link"
            aria-label={t.githubAriaLabel}
          >
            <img src="/github.svg" alt="" width="24" height="24" aria-hidden="true" />
            <span className="visually-hidden">{t.githubHiddenLabel}</span>
          </a>
        </nav>
      </footer>
    </div>
  )
}

export default App
