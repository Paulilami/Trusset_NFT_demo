import React from 'react'
import { AppBar, Toolbar, Box, IconButton, useMediaQuery } from '@mui/material'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { useThemeContext } from '../theme/ThemeContext'
import ConnectWalletButton from './ConnectWalletButton'
import logoLight from '../assets/logo.png'
import logoDark from '../assets/logoDark.png'

const Header: React.FC = () => {
  const { isDarkMode, toggleTheme } = useThemeContext()
  const isMobile = useMediaQuery('(max-width:600px)')

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
      }}
    >
      <Toolbar>
        <Box
          component="img"
          src={isDarkMode ? logoLight : logoDark}
          alt="Trusset Logo"
          sx={{
            height: isMobile ? 30 : 40,
            mr: 'auto'
          }}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            onClick={toggleTheme}
            color="inherit"
            aria-label="toggle theme"
            sx={{ mr: 1 }}
          >
            {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
          <ConnectWalletButton />
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header