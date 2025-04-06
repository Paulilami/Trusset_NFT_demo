import React from 'react'
import { Box, Typography, Link, Container, Divider, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

const Footer: React.FC = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: theme.palette.mode === 'light' 
          ? 'rgba(248, 249, 250, 0.95)' 
          : 'rgba(10, 10, 10, 0.95)'
      }}
    >
      <Container maxWidth="lg">
        <Divider sx={{ mb: 3 }} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'flex-start' : 'center'
          }}
        >
          <Box sx={{ mb: isMobile ? 2 : 0 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom={isMobile}>
              © {new Date().getFullYear()} Trusset UG. All rights reserved.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Represented by Paul Ilami
            </Typography>
          </Box>
          
          <Box sx={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? 1 : 2 
          }}>
            <Link href="#" color="text.secondary" underline="hover">
              Terms of Service
            </Link>
            <Link href="#" color="text.secondary" underline="hover">
              Privacy Policy
            </Link>
            <Link href="#" color="text.secondary" underline="hover">
              Contact
            </Link>
          </Box>
        </Box>
        
        <Typography 
          variant="caption" 
          color="text.secondary" 
          sx={{ 
            display: 'block',
            mt: 2,
            textAlign: 'center'
          }}
        >
          This platform operates fully on-chain. Trusset does not charge any fees for this service.
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer