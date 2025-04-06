import { ethers } from 'ethers'
import axios from 'axios'

const NFT_FACTORY_ABI = [
  "function deployNFT(tuple(string name, string symbol, string baseURI, string notRevealedURI) nftParams, tuple(uint96 royaltyBasisPoints, address royaltyReceiver) royaltyParams, tuple(bool useDocumentMgmt, bool useTraitMgmt, bool useBurn, bool useRoyalties, bool useReveal, bool useTransferLock, bool useWhitelist, bool useBlacklist, bool usePausable, bool useFreezable, bool useForceTransfer, bool useTxFee, bool useGlobalDocuments, bool useTags) featureParams, address manager, tuple(uint256 txFeeBasisPoints, address feeReceiver) feeParams) external returns (address)",
  "function getDeployedNFTs() public view returns (address[] memory)",
  "event NFTDeployed(address indexed contractAddress, address indexed deployer, string name, string symbol)"
]

export interface NFTParams {
  name: string
  symbol: string
  baseURI: string
  notRevealedURI: string
}

export interface RoyaltyParams {
  royaltyBasisPoints: number
  royaltyReceiver: string
}

export interface FeatureParams {
  useDocumentMgmt: boolean
  useTraitMgmt: boolean
  useBurn: boolean
  useRoyalties: boolean
  useReveal: boolean
  useTransferLock: boolean
  useWhitelist: boolean
  useBlacklist: boolean
  usePausable: boolean
  useFreezable: boolean
  useForceTransfer: boolean
  useTxFee: boolean
  useGlobalDocuments: boolean
  useTags: boolean
}

export interface FeeParams {
  txFeeBasisPoints: number
  feeReceiver: string
}

export const uploadToIPFS = async (file: File): Promise<string> => {
  try {
    const formData = new FormData()
    formData.append('file', file)
    
    const pinataApiKey = import.meta.env.VITE_PINATA_API_KEY
    const pinataSecretApiKey = import.meta.env.VITE_PINATA_SECRET_API_KEY
    
    if (!pinataApiKey || !pinataSecretApiKey) {
      throw new Error('Pinata API keys not configured')
    }
    
    const response = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      formData,
      {
        headers: {
          'Content-Type': `multipart/form-data`,
          'pinata_api_key': pinataApiKey,
          'pinata_secret_api_key': pinataSecretApiKey
        }
      }
    )
    
    return `ipfs://${response.data.IpfsHash}`
  } catch (error: any) {
    console.error('Error uploading to IPFS:', error)
    throw new Error(error.message || 'Failed to upload to IPFS')
  }
}

export const uploadMetadataToIPFS = async (metadata: any): Promise<string> => {
  try {
    const pinataApiKey = import.meta.env.VITE_PINATA_API_KEY
    const pinataSecretApiKey = import.meta.env.VITE_PINATA_SECRET_API_KEY
    
    if (!pinataApiKey || !pinataSecretApiKey) {
      throw new Error('Pinata API keys not configured')
    }
    
    const response = await axios.post(
      'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      metadata,
      {
        headers: {
          'Content-Type': 'application/json',
          'pinata_api_key': pinataApiKey,
          'pinata_secret_api_key': pinataSecretApiKey
        }
      }
    )
    
    if (response.status !== 200) {
      throw new Error('Failed to upload metadata to Pinata')
    }
    
    return `ipfs://${response.data.IpfsHash}`
  } catch (error: any) {
    console.error('Error uploading metadata to IPFS:', error)
    throw new Error(error.message || 'Failed to upload metadata to IPFS')
  }
}

export const createNFTMetadata = (
  name: string, 
  description: string, 
  imageUrl: string,
  attributes: { trait_type: string; value: string }[] = []
): any => {
  return {
    name,
    description,
    image: imageUrl,
    attributes
  }
}

export const getIPFSGatewayURL = (ipfsUrl: string): string => {
  if (!ipfsUrl || !ipfsUrl.startsWith('ipfs://')) return ipfsUrl
  
  const gateway = 'https://gateway.pinata.cloud/ipfs/'
  const ipfsHash = ipfsUrl.replace('ipfs://', '')
  
  return `${gateway}${ipfsHash}`
}

export const deploySingleNFT = async (
  factoryAddress: string,
  params: {
    nftParams: NFTParams
    royaltyParams: RoyaltyParams
    featureParams: FeatureParams
    manager: string
    feeParams: FeeParams
  },
  signer: ethers.Signer
) => {
  try {
    const factory = new ethers.Contract(
      factoryAddress,
      NFT_FACTORY_ABI,
      signer
    )
    
    const tx = await factory.deployNFT(
      params.nftParams,
      params.royaltyParams,
      params.featureParams,
      params.manager || ethers.constants.AddressZero,
      params.feeParams
    )
    
    const receipt = await tx.wait()
    let deployedAddress = ''
    
    if (receipt && receipt.events) {
      const deployEvent = receipt.events.find(
        (e: any) => e.event === 'NFTDeployed'
      )
      if (deployEvent && deployEvent.args) {
        deployedAddress = deployEvent.args.contractAddress
      }
    }
    
    return {
      success: true,
      deployedAddress,
      txHash: receipt.transactionHash
    }
  } catch (error: any) {
    console.error('Failed to deploy Single NFT:', error)
    throw new Error(error.message || 'Failed to deploy Single NFT')
  }
}

export const getDeployedSingleNFTs = async (
  factoryAddress: string,
  provider: ethers.providers.Provider
) => {
  try {
    const factory = new ethers.Contract(
      factoryAddress,
      NFT_FACTORY_ABI,
      provider
    )
    const deployedNFTs = await factory.getDeployedNFTs()
    return deployedNFTs
  } catch (error: any) {
    console.error('Failed to get deployed NFTs:', error)
    throw new Error(error.message || 'Failed to get deployed NFTs')
  }
}