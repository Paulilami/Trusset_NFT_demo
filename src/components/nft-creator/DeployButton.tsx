import React from 'react'
import { Button, Box, Typography, useTheme } from '@mui/material'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import { useAppSelector } from '../../store'
import { useAppKit } from '@reown/appkit/react'

interface DeployButtonProps {
  onDeploy: () => void
  loading: boolean
  isConnected: boolean
}

const DeployButton: React.FC<DeployButtonProps> = ({ onDeploy, loading, isConnected }) => {
  const theme = useTheme()
  const { open } = useAppKit()
  const { createParams } = useAppSelector(state => state.nft)
  
  const isFormValid = () => {
    return (
      createParams.name.length > 0 &&
      createParams.symbol.length > 0 &&
      createParams.baseURI.length > 0
    )
  }

  const handleClick = () => {
    if (!isConnected) {
      open()
      return
    }
    
    onDeploy()
  }

  const getButtonLabel = () => {
    if (!isConnected) return 'Connect Wallet to Deploy'
    return 'Deploy NFT'
  }

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      mt: 5 
    }}>
      <Button
        variant="contained"
        size="large"
        startIcon={<RocketLaunchIcon />}
        onClick={handleClick}
        disabled={isConnected && (!isFormValid() || loading)}
        sx={{
          py: 1.5,
          px: 4,
          fontSize: '1rem',
          borderRadius: '32px',
          position: 'relative',
          overflow: 'hidden',
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(45deg, #0090FF 30%, #00B3FF 90%)'
            : 'linear-gradient(45deg, #0071CC 30%, #0090FF 90%)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            transition: 'left 0.7s',
          },
          '&:hover::before': {
            left: '100%',
          }
        }}
      >
        {getButtonLabel()}
      </Button>
      
      {!isFormValid() && isConnected && (
        <Typography variant="caption" color="error" sx={{ mt: 1 }}>
          Please fill in all required fields
        </Typography>
      )}
      
      <Typography variant="body2" color="text.secondary" sx={{ mt: 3, textAlign: 'center' }}>
        By deploying, you agree to our terms of service.
        <br />
        All NFTs are deployed on Sepolia Testnet.
      </Typography>
    </Box>
  )
}

export default DeployButton