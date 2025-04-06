import React from 'react'
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography, 
  Box, 
  Link, 
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import CloseIcon from '@mui/icons-material/Close'

interface SuccessDialogProps {
  open: boolean
  onClose: () => void
  deployedAddress: string
  transaction: string
}

const SuccessDialog: React.FC<SuccessDialogProps> = ({ 
  open, 
  onClose,
  deployedAddress,
  transaction
}) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const formatAddress = (address: string) => {
    if (!address) return ''
    return `${address.substring(0, 8)}...${address.substring(address.length - 6)}`
  }

  const getEtherscanUrl = (type: 'address' | 'tx', hash: string) => {
    return `https://sepolia.etherscan.io/${type}/${hash}`
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: 'hidden'
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        bgcolor: 'primary.main',
        color: 'white',
        py: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CheckCircleIcon sx={{ mr: 1 }} />
          <Typography variant="h6">
            NFT Deployed Successfully!
          </Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ py: 3 }}>
        <Typography variant="body1" paragraph>
          Congratulations! Your NFT has been deployed successfully to the Sepolia testnet.
        </Typography>
        
        <Box sx={{ 
          bgcolor: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.03)', 
          p: 2, 
          borderRadius: 2,
          mb: 2
        }}>
          <Typography variant="subtitle2" gutterBottom>
            NFT Contract Address:
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            bgcolor: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.8)',
            p: 1.5,
            borderRadius: 1,
            border: '1px solid',
            borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
          }}>
            <Link 
              href={getEtherscanUrl('address', deployedAddress)} 
              target="_blank"
              underline="hover"
              color="primary"
            >
              {deployedAddress ? deployedAddress : 'Loading...'}
            </Link>
            <IconButton 
              size="small" 
              onClick={() => copyToClipboard(deployedAddress)}
              sx={{ ml: 1 }}
            >
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        
        <Box sx={{ 
          bgcolor: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.03)', 
          p: 2, 
          borderRadius: 2 
        }}>
          <Typography variant="subtitle2" gutterBottom>
            Transaction Hash:
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            bgcolor: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.8)',
            p: 1.5,
            borderRadius: 1,
            border: '1px solid',
            borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
          }}>
            <Link 
              href={getEtherscanUrl('tx', transaction)} 
              target="_blank"
              underline="hover"
              color="primary"
            >
              {transaction ? formatAddress(transaction) : 'Loading...'}
            </Link>
            <IconButton 
              size="small" 
              onClick={() => copyToClipboard(transaction)}
              sx={{ ml: 1 }}
            >
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button 
          onClick={onClose} 
          color="secondary"
          variant="outlined"
          sx={{ borderRadius: 2 }}
        >
          Close
        </Button>
        <Button
          href={getEtherscanUrl('address', deployedAddress)}
          target="_blank"
          variant="contained"
          sx={{ borderRadius: 2 }}
        >
          View on Etherscan
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SuccessDialog