import { createAppKit } from '@reown/appkit/react'
import { Ethers5Adapter } from '@reown/appkit-adapter-ethers5'
import { sepolia } from '@reown/appkit/networks'

const projectId = import.meta.env.VITE_REOWN_PROJECT_ID || 'YOUR_PROJECT_ID'

const arbitrumSepolia = {
  id: 421614,
  name: 'Arbitrum Sepolia',
  network: 'arbitrum-sepolia',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ['https://sepolia-rollup.arbitrum.io/rpc']
    },
    public: {
      http: ['https://sepolia-rollup.arbitrum.io/rpc']
    }
  },
  blockExplorers: {
    default: {
      name: 'Arbiscan',
      url: 'https://sepolia.arbiscan.io'
    }
  },
  testnet: true
}

const metadata = {
  name: 'Trusset NFT Demo',
  description: 'A customizable NFT creation tool by Trusset',
  url: window.location.origin,
  icons: [`${window.location.origin}/logo.png`]
}

export const appKit = createAppKit({
  adapters: [new Ethers5Adapter()],
  metadata: metadata,
  networks: [sepolia, arbitrumSepolia],
  projectId,
  features: {
    analytics: true
  }
})

export const switchToSepolia = async () => {
  await appKit.switchNetwork(sepolia)
}

export const switchToArbitrumSepolia = async () => {
  await appKit.switchNetwork(arbitrumSepolia)
}