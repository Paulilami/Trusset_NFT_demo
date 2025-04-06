import React from 'react'
import { Box } from '@mui/material'
import Header from './components/Header'
import Footer from './components/Footer'
import NFTCreator from './components/NFTCreator'

const App: React.FC = () => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      bgcolor: 'background.default',
      color: 'text.primary'
    }}>
      <Header />
      <Box component="main" sx={{ 
        flexGrow: 1, 
        py: 4, 
        px: { xs: 2, sm: 4 },
        maxWidth: '1200px',
        mx: 'auto',
        width: '100%'
      }}>
        <NFTCreator />
      </Box>
      <Footer />
    </Box>
  )
}

export default App
