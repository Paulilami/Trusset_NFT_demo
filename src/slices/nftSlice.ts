import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { ethers } from 'ethers'
import { deploySingleNFT, NFTParams, RoyaltyParams, FeatureParams, FeeParams } from '../services/nftService'

export enum AssetType {
  EQUITY = 0,
  ETF,
  BONDS,
  STOCKS,
  REAL_ESTATE,
  CASH_EQUIVALENT,
  DEBT,
  OTHER
}

export interface CreateNFTParams {
  name: string
  symbol: string
  baseURI: string
  notRevealedURI: string
  featureParams: FeatureParams
  royaltyParams: RoyaltyParams
  feeParams: FeeParams
  manager: string
}

interface NFTState {
  loading: boolean
  error: string | null
  success: boolean
  deployedAddress: string | null
  transaction: string | null
  createParams: CreateNFTParams
}

const initialParams: CreateNFTParams = {
  name: '',
  symbol: '',
  baseURI: '',
  notRevealedURI: '',
  featureParams: {
    useDocumentMgmt: false,
    useTraitMgmt: false,
    useBurn: true,
    useRoyalties: false,
    useReveal: false,
    useTransferLock: false,
    useWhitelist: false,
    useBlacklist: false,
    usePausable: false,
    useFreezable: false,
    useForceTransfer: false,
    useTxFee: false,
    useGlobalDocuments: false,
    useTags: false
  },
  royaltyParams: {
    royaltyBasisPoints: 0,
    royaltyReceiver: ''
  },
  feeParams: {
    txFeeBasisPoints: 0,
    feeReceiver: ''
  },
  manager: ''
}

const initialState: NFTState = {
  loading: false,
  error: null,
  success: false,
  deployedAddress: null,
  transaction: null,
  createParams: initialParams
}

export const deployNFT = createAsyncThunk(
  'nft/deploy',
  async (
    { signer }: { signer: ethers.Signer },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as { nft: NFTState }
      const { createParams } = state.nft
      
      const nftParams: NFTParams = {
        name: createParams.name,
        symbol: createParams.symbol,
        baseURI: createParams.baseURI,
        notRevealedURI: createParams.notRevealedURI
      }
      
      const factoryAddress = import.meta.env.VITE_NFT_FACTORY_ADDRESS || '0x5AD766354614A526CA0456815CBFb52eD4c66C2d'
      
      const result = await deploySingleNFT(
        factoryAddress,
        {
          nftParams,
          royaltyParams: createParams.royaltyParams,
          featureParams: createParams.featureParams,
          manager: createParams.manager,
          feeParams: createParams.feeParams
        },
        signer
      )
      
      return result
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to deploy NFT')
    }
  }
)

const nftSlice = createSlice({
  name: 'nft',
  initialState,
  reducers: {
    updateCreateParams: (state, action: PayloadAction<Partial<CreateNFTParams>>) => {
      state.createParams = { ...state.createParams, ...action.payload }
    },
    updateFeatureParams: (state, action: PayloadAction<Partial<FeatureParams>>) => {
      state.createParams.featureParams = {
        ...state.createParams.featureParams,
        ...action.payload
      }
    },
    updateRoyaltyParams: (state, action: PayloadAction<Partial<RoyaltyParams>>) => {
      state.createParams.royaltyParams = {
        ...state.createParams.royaltyParams,
        ...action.payload
      }
    },
    updateFeeParams: (state, action: PayloadAction<Partial<FeeParams>>) => {
      state.createParams.feeParams = {
        ...state.createParams.feeParams,
        ...action.payload
      }
    },
    resetState: (state) => {
      state.loading = false
      state.error = null
      state.success = false
      state.deployedAddress = null
      state.transaction = null
    },
    resetForm: (state) => {
      state.createParams = initialParams
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(deployNFT.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = false
      })
      .addCase(deployNFT.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.deployedAddress = action.payload.deployedAddress
        state.transaction = action.payload.txHash
      })
      .addCase(deployNFT.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string || 'Failed to deploy NFT'
      })
  }
})

export const {
  updateCreateParams,
  updateFeatureParams,
  updateRoyaltyParams,
  updateFeeParams,
  resetState,
  resetForm
} = nftSlice.actions

export default nftSlice.reducer