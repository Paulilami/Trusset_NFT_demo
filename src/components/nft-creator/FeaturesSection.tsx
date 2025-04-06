import React from 'react'
import { Box, Typography, Divider, FormControlLabel, Switch, Tooltip, IconButton } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import { useAppDispatch, useAppSelector } from '../../store'
import { updateFeatureParams } from '../../slices/nftSlice'

interface FeatureSwitchProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  tooltip: string
}

const FeatureSwitch: React.FC<FeatureSwitchProps> = ({ label, checked, onChange, tooltip }) => (
  <Box sx={{ width: { xs: '100%', sm: '50%', md: '33.33%' }, p: 1 }}>
    <FormControlLabel
      control={
        <Switch
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          color="primary"
        />
      }
      label={
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2">{label}</Typography>
          <Tooltip title={tooltip}>
            <IconButton size="small">
              <InfoIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      }
    />
  </Box>
)

const FeaturesSection: React.FC = () => {
  const dispatch = useAppDispatch()
  const { createParams } = useAppSelector(state => state.nft)
  const { featureParams } = createParams

  const updateFeature = (feature: keyof typeof featureParams, value: boolean) => {
    dispatch(updateFeatureParams({ [feature]: value }))
  }

  return (
    <Box sx={{ mb: 4 }}>
      <Divider sx={{ my: 3 }} />
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
        NFT Features
        <Tooltip title="Enable various features for your NFT">
          <IconButton size="small" sx={{ ml: 1 }}>
            <InfoIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <FeatureSwitch
          label="Document Management"
          checked={featureParams.useDocumentMgmt}
          onChange={(checked) => updateFeature('useDocumentMgmt', checked)}
          tooltip="Allow attaching documents to your NFT"
        />
        <FeatureSwitch
          label="Trait Management"
          checked={featureParams.useTraitMgmt}
          onChange={(checked) => updateFeature('useTraitMgmt', checked)}
          tooltip="Enable custom traits for your NFT"
        />
        <FeatureSwitch
          label="Burn Capability"
          checked={featureParams.useBurn}
          onChange={(checked) => updateFeature('useBurn', checked)}
          tooltip="Allow burning (destroying) the NFT"
        />
        <FeatureSwitch
          label="Royalties"
          checked={featureParams.useRoyalties}
          onChange={(checked) => updateFeature('useRoyalties', checked)}
          tooltip="Receive royalties on secondary sales"
        />
        <FeatureSwitch
          label="Reveal Mechanism"
          checked={featureParams.useReveal}
          onChange={(checked) => updateFeature('useReveal', checked)}
          tooltip="Enable reveal functionality for your NFT"
        />
        <FeatureSwitch
          label="Transfer Lock"
          checked={featureParams.useTransferLock}
          onChange={(checked) => updateFeature('useTransferLock', checked)}
          tooltip="Restrict transfers to only the owner"
        />
        <FeatureSwitch
          label="Whitelist"
          checked={featureParams.useWhitelist}
          onChange={(checked) => updateFeature('useWhitelist', checked)}
          tooltip="Only allow whitelisted addresses to interact"
        />
        <FeatureSwitch
          label="Blacklist"
          checked={featureParams.useBlacklist}
          onChange={(checked) => updateFeature('useBlacklist', checked)}
          tooltip="Block specific addresses from interactions"
        />
        <FeatureSwitch
          label="Pausable"
          checked={featureParams.usePausable}
          onChange={(checked) => updateFeature('usePausable', checked)}
          tooltip="Allow pausing NFT transfers temporarily"
        />
        <FeatureSwitch
          label="Freezable"
          checked={featureParams.useFreezable}
          onChange={(checked) => updateFeature('useFreezable', checked)}
          tooltip="Allow freezing the NFT"
        />
        <FeatureSwitch
          label="Force Transfer"
          checked={featureParams.useForceTransfer}
          onChange={(checked) => updateFeature('useForceTransfer', checked)}
          tooltip="Enable admin to force transfers (for compliance)"
        />
        <FeatureSwitch
          label="Transaction Fee"
          checked={featureParams.useTxFee}
          onChange={(checked) => updateFeature('useTxFee', checked)}
          tooltip="Charge a fee on transfers"
        />
        <FeatureSwitch
          label="Global Documents"
          checked={featureParams.useGlobalDocuments}
          onChange={(checked) => updateFeature('useGlobalDocuments', checked)}
          tooltip="Enable global documents for the NFT"
        />
        <FeatureSwitch
          label="Tags"
          checked={featureParams.useTags}
          onChange={(checked) => updateFeature('useTags', checked)}
          tooltip="Allow adding tags to your NFT"
        />
      </Box>
    </Box>
  )
}

export default FeaturesSection
