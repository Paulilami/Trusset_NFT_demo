import React from 'react'
import { Box, Typography, TextField, Slider, Divider, Tooltip, IconButton } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import { useAppDispatch, useAppSelector } from '../../store'
import { updateRoyaltyParams, updateFeeParams } from '../../slices/nftSlice'
import { useAppKitAccount } from '@reown/appkit/react'

const RoyaltiesSection: React.FC = () => {
  const dispatch = useAppDispatch()
  const { createParams } = useAppSelector(state => state.nft)
  const { royaltyParams, feeParams, featureParams } = createParams
  const { address } = useAppKitAccount()

  const handleRoyaltyBpsChange = (_event: Event, newValue: number | number[]) => {
    dispatch(updateRoyaltyParams({ royaltyBasisPoints: newValue as number }))
  }
  const handleTxFeeBpsChange = (_event: Event, newValue: number | number[]) => {
    dispatch(updateFeeParams({ txFeeBasisPoints: newValue as number }))
  }
  const handleRoyaltyReceiverChange = (value: string) => {
    dispatch(updateRoyaltyParams({ royaltyReceiver: value }))
  }
  const handleFeeReceiverChange = (value: string) => {
    dispatch(updateFeeParams({ feeReceiver: value }))
  }
  const handleUseMyAddress = (field: 'royalty' | 'fee') => {
    if (!address) return
    field === 'royalty'
      ? dispatch(updateRoyaltyParams({ royaltyReceiver: address }))
      : dispatch(updateFeeParams({ feeReceiver: address }))
  }

  return (
    <Box sx={{ mb: 4 }}>
      <Divider sx={{ my: 3 }} />
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
        Fees & Royalties
        <Tooltip title="Configure fees and royalties for your NFT">
          <IconButton size="small" sx={{ ml: 1 }}>
            <InfoIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Typography>
      {featureParams.useRoyalties && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" gutterBottom>
            Royalties
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ width: { xs: '100%', md: '50%' } }}>
              <Box sx={{ px: 2 }}>
                <Typography gutterBottom>
                  Royalty Percentage: {(royaltyParams.royaltyBasisPoints / 100).toFixed(2)}%
                </Typography>
                <Slider
                  value={royaltyParams.royaltyBasisPoints}
                  onChange={handleRoyaltyBpsChange}
                  min={0}
                  max={1000}
                  step={25}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `${(value / 100).toFixed(2)}%`}
                />
                <Typography variant="caption" color="text.secondary">
                  Maximum royalty is 10%
                </Typography>
              </Box>
            </Box>
            <Box sx={{ width: { xs: '100%', md: '50%' } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2 }}>
                <TextField
                  fullWidth
                  label="Royalty Receiver"
                  value={royaltyParams.royaltyReceiver}
                  onChange={(e) => handleRoyaltyReceiverChange(e.target.value)}
                  placeholder="0x..."
                  helperText="Address that will receive royalties"
                />
                {address && (
                  <Box
                    component="button"
                    onClick={() => handleUseMyAddress('royalty')}
                    sx={{
                      backgroundColor: 'primary.main',
                      color: 'white',
                      border: 'none',
                      borderRadius: 1,
                      py: 1.5,
                      px: 2,
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      '&:hover': { backgroundColor: 'primary.dark' }
                    }}
                  >
                    Use My Address
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      {featureParams.useTxFee && (
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Transaction Fees
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ width: { xs: '100%', md: '50%' } }}>
              <Box sx={{ px: 2 }}>
                <Typography gutterBottom>
                  Fee Percentage: {(feeParams.txFeeBasisPoints / 100).toFixed(2)}%
                </Typography>
                <Slider
                  value={feeParams.txFeeBasisPoints}
                  onChange={handleTxFeeBpsChange}
                  min={50}
                  max={5000}
                  step={50}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `${(value / 100).toFixed(2)}%`}
                />
                <Typography variant="caption" color="text.secondary">
                  Fee must be between 0.5% and 50%
                </Typography>
              </Box>
            </Box>
            <Box sx={{ width: { xs: '100%', md: '50%' } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2 }}>
                <TextField
                  fullWidth
                  label="Fee Receiver"
                  value={feeParams.feeReceiver}
                  onChange={(e) => handleFeeReceiverChange(e.target.value)}
                  placeholder="0x..."
                  helperText="Address that will receive transaction fees"
                />
                {address && (
                  <Box
                    component="button"
                    onClick={() => handleUseMyAddress('fee')}
                    sx={{
                      backgroundColor: 'primary.main',
                      color: 'white',
                      border: 'none',
                      borderRadius: 1,
                      py: 1.5,
                      px: 2,
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      '&:hover': { backgroundColor: 'primary.dark' }
                    }}
                  >
                    Use My Address
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      {!featureParams.useRoyalties && !featureParams.useTxFee && (
        <Typography color="text.secondary">
          Enable Royalties or Transaction Fees in the Features section to configure fee settings.
        </Typography>
      )}
    </Box>
  )
}

export default RoyaltiesSection
