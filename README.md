# Trusset NFT Demo

A simple one-page application for creating customizable ERC721 tokens on the Sepolia testnet. This project demonstrates the functionality of our smart contracts for creating highly customizable NFTs.

## Features

- Create ERC721 NFT tokens with custom properties
- Configurable features including document management, trait management, burn capability, royalties, and more
- Support for transaction fees
- Light and dark theme
- Mobile responsive design
- Web3 wallet integration through ReOwn AppKit
- IPFS integration for NFT metadata and images

## Tech Stack

- React with TypeScript
- Vite
- Material-UI
- Redux Toolkit
- Ethers.js v5
- ReOwn AppKit for wallet connection
- Pinata for IPFS storage

## Prerequisites

- Node.js (v16+)
- npm or yarn
- A web3 wallet (MetaMask, etc.)
- A Pinata account for IPFS integration
- ReOwn AppKit project ID

## Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/trusset-nft-demo.git
   cd trusset-nft-demo
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file based on the example
   ```bash
   cp .env.example .env
   ```

4. Add your API keys to the `.env` file
   ```
   VITE_REOWN_PROJECT_ID=your-reown-project-id
   VITE_NFT_FACTORY_ADDRESS=0x5AD766354614A526CA0456815CBFb52eD4c66C2d
   VITE_PINATA_API_KEY=your-pinata-api-key
   VITE_PINATA_SECRET_API_KEY=your-pinata-secret-api-key
   ```

5. Start the development server
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000`

## Smart Contracts

The application interacts with our deployed smart contracts on the Sepolia testnet:

- NFT Factory: `0x5AD766354614A526CA0456815CBFb52eD4c66C2d`

## Deployment

For deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Legal Information

© 2023 Trusset UG. All rights reserved.

Represented by Paul Ilami.

This platform operates fully on-chain. Trusset does not charge any fees for this service.