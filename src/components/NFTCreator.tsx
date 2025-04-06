import React, { useState } from 'react'
import { 
  Box, 
  Typography, 
  Paper, 
  CircularProgress, 
  Alert, 
  Snackbar
} from '@mui/material'
import { useAppDispatch, useAppSelector } from '../store'
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react'
import { ethers } from 'ethers'
import { deployNFT, resetState } from '../slices/nftSlice'
import BasicDetails from './nft-creator/BasicDetails'
import FeaturesSection from './nft-creator/FeaturesSection'
import RoyaltiesSection from './nft-creator/RoyaltiesSection'
import DeployButton from './nft-creator/DeployButton'
import SuccessDialog from './nft-creator/SuccessDialog'

const NFTCreator: React.FC = () => {
  const [] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const dispatch = useAppDispatch()
  const { isConnected } = useAppKitAccount()
  const { walletProvider } = useAppKitProvider('eip155')
  
  const { loading, error, success, deployedAddress, transaction } = useAppSelector(state => state.nft)

  const handleDeployNFT = async () => {
    try {
      if (!walletProvider || !isConnected) {
        setErrorMessage('Please connect your wallet first')
        setShowError(true)
        return
      }

      const web3Provider = new ethers.providers.Web3Provider(
        walletProvider as ethers.providers.ExternalProvider
      )
      const signer = web3Provider.getSigner()

      await dispatch(deployNFT({ signer })).unwrap()
    } catch (error: any) {
      setErrorMessage(error.message || 'Failed to deploy NFT')
      setShowError(true)
    }
  }

  const handleCloseError = () => {
    setShowError(false)
  }

  const handleCloseSuccess = () => {
    dispatch(resetState())
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 600, textAlign: 'center' }}>
        Trusset Token Demo: ERC721
      </Typography>
      
      <Paper 
        elevation={0} 
        sx={{ 
          p: { xs: 2, sm: 4 }, 
          mb: 4, 
          borderRadius: 3,
          border: '1px solid',
          borderColor: theme => theme.palette.mode === 'dark' 
            ? 'rgba(255, 255, 255, 0.05)' 
            : 'rgba(0, 0, 0, 0.05)'
        }}
      >
        <BasicDetails />

        <FeaturesSection />

        <RoyaltiesSection />

        <DeployButton 
          onDeploy={handleDeployNFT} 
          loading={loading}
          isConnected={isConnected}
        />
      </Paper>

      <Snackbar open={showError} autoHideDuration={6000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error" variant="filled">
          {errorMessage || error || 'An error occurred'}
        </Alert>
      </Snackbar>

      {loading && (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 9999
        }}>
          <Paper sx={{ p: 3, borderRadius: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CircularProgress sx={{ mb: 2 }} />
            <Typography>Deploying your NFT...</Typography>
          </Paper>
        </Box>
      )}

      <SuccessDialog 
        open={success} 
        onClose={handleCloseSuccess}
        deployedAddress={deployedAddress || ''}
        transaction={transaction || ''}
      />
    </Box>
  )
}

export default NFTCreator