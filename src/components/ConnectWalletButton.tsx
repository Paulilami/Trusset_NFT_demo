import React from 'react'
import { Button, Typography, Box, useMediaQuery } from '@mui/material'
import { useAppKitAccount, useAppKit } from '@reown/appkit/react'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'

const ConnectWalletButton: React.FC = () => {
  const { address, isConnected } = useAppKitAccount()
  const { open } = useAppKit()
  const isMobile = useMediaQuery('(max-width:600px)')

  const formatAddress = (address: string) => {
    if (isMobile) {
      return `${address.substring(0, 4)}...${address.substring(address.length - 4)}`
    }
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  const handleConnect = () => {
    open()
  }

  const handleAccountDetails = () => {
    open({ view: 'Account' })
  }

  return (
    <>
      {isConnected ? (
        <Button
          variant="outlined"
          onClick={handleAccountDetails}
          sx={{
            borderRadius: '32px',
            py: 1,
            px: 2,
            textTransform: 'none',
            borderColor: 'primary.main',
            '&:hover': {
              borderColor: 'primary.dark'
            }
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: 'success.main'
              }}
            />
            <Typography variant="body2">
              {address ? formatAddress(address) : 'Connected'}
            </Typography>
          </Box>
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={handleConnect}
          startIcon={<AccountBalanceWalletIcon />}
          sx={{
            borderRadius: '32px',
            py: 1,
            px: 2,
            fontWeight: 500
          }}
        >
          Connect Wallet
        </Button>
      )}
    </>
  )
}

export default ConnectWalletButton