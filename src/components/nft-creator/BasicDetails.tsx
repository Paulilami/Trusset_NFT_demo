import React, { useState } from 'react'
import { Box, Typography, TextField, Tooltip, IconButton } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import UploadIcon from '@mui/icons-material/Upload'
import { useAppDispatch, useAppSelector } from '../../store'
import { updateCreateParams } from '../../slices/nftSlice'
import { uploadToIPFS } from '../../services/nftService'

const BasicDetails: React.FC = () => {
  const dispatch = useAppDispatch()
  const { createParams } = useAppSelector(state => state.nft)
  const [uploading, setUploading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string>('')

  const handleInputChange = (field: string, value: string) => {
    dispatch(updateCreateParams({ [field]: value }))
  }
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    const file = files[0]
    if (!file) return
    try {
      setUploading(true)
      const ipfsUrl = await uploadToIPFS(file)
      dispatch(updateCreateParams({ baseURI: ipfsUrl }))
      setImagePreview(URL.createObjectURL(file))
    } catch (error) {
      console.error('Upload error:', error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
        Basic NFT Details
        <Tooltip title="Basic information about your NFT">
          <IconButton size="small" sx={{ ml: 1 }}>
            <InfoIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <Box sx={{ width: { xs: '100%', sm: '50%' } }}>
          <TextField
            fullWidth
            label="NFT Name"
            value={createParams.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="My Awesome NFT"
            helperText="Enter a name for your NFT"
          />
        </Box>
        <Box sx={{ width: { xs: '100%', sm: '50%' } }}>
          <TextField
            fullWidth
            label="Symbol"
            value={createParams.symbol}
            onChange={(e) => handleInputChange('symbol', e.target.value.toUpperCase())}
            placeholder="NFT"
            helperText="Short symbol for your NFT collection"
          />
        </Box>
        <Box sx={{ width: '100%' }}>
          <Box
            sx={{
              border: '1px dashed',
              borderColor: 'divider',
              borderRadius: 2,
              p: 3,
              textAlign: 'center',
              cursor: 'pointer',
              '&:hover': { borderColor: 'primary.main' }
            }}
            onClick={() => document.getElementById('image-upload')?.click()}
          >
            {imagePreview ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img
                  src={imagePreview}
                  alt="NFT Preview"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '200px',
                    borderRadius: '8px',
                    marginBottom: '16px'
                  }}
                />
                <Typography variant="body2" color="primary">
                  Click to change image
                </Typography>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <UploadIcon sx={{ fontSize: 40, mb: 2, color: 'text.secondary' }} />
                <Typography gutterBottom>
                  Upload NFT Image
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Click or drag to upload (PNG, JPG, GIF, max 5MB)
                </Typography>
              </Box>
            )}
            <input id="image-upload" type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
          </Box>
          {uploading && (
            <Typography variant="body2" color="primary" sx={{ mt: 1, textAlign: 'center' }}>
              Uploading to IPFS...
            </Typography>
          )}
        </Box>
        <Box sx={{ width: '100%' }}>
          <TextField
            fullWidth
            label="Not Revealed URI"
            value={createParams.notRevealedURI}
            onChange={(e) => handleInputChange('notRevealedURI', e.target.value)}
            placeholder="ipfs://..."
            helperText="URI to show before your NFT is revealed (optional)"
          />
        </Box>
      </Box>
    </Box>
  )
}

export default BasicDetails
