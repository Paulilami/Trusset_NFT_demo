import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import App from './App'
import { store } from './store'
import { darkTheme, lightTheme } from './theme/theme'
import { useThemeContext, ThemeContextProvider } from './theme/ThemeContext'

const ThemedApp: React.FC = () => {
  const { isDarkMode } = useThemeContext()
  const theme = isDarkMode ? darkTheme : lightTheme

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeContextProvider>
        <ThemedApp />
      </ThemeContextProvider>
    </Provider>
  </React.StrictMode>
)