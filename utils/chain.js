export const supportedChains = {
  "0x1": {
    name: "Ethereum Mainnet",
    short_name: "eth",
    chain: "ETH",
    network: "mainnet",
    network_id: 1,
    chain_id: "0x1",
    providers: ["walletconnect"],
    // , 'portis', 'fortmatic'
    rpc_url: `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_RPC_KEY}`,
    block_explorer: "https://etherscan.io",
  },
  "0x4": {
    name: "Ethereum Rinkeby",
    short_name: "rin",
    chain: "ETH",
    network: "rinkeby",
    network_id: 4,
    chain_id: "0x4",
    providers: ["walletconnect"],
    // , 'portis', 'fortmatic'
    rpc_url: `https://rinkeby.infura.io/v3/${process.env.NEXT_PUBLIC_RPC_KEY}`,
    block_explorer: "https://rinkeby.etherscan.io",
  },
  "0x64": {
    name: "xDAI Chain",
    short_name: "xdai",
    chain: "xDAI",
    network: "xdai",
    network_id: 100,
    chain_id: "0x64",
    providers: ["walletconnect"],
    // , 'portis',
    rpc_url: "https://dai.poa.network",
    block_explorer: "https://blockscout.com/poa/xdai",
  },
  "0x89": {
    name: "Matic",
    short_name: "matic",
    chain: "MATIC",
    network: "matic",
    network_id: 137,
    chain_id: "0x89",
    providers: ["walletconnect"],
    rpc_url: "https://rpc-mainnet.maticvigil.com",
    block_explorer: "https://explorer-mainnet.maticvigil.com",
  },
  "0x13881": {
    name: "Mumbai Testnet",
    short_name: "Mumbai",
    chain: "MATIC",
    network: "mumbai",
    network_id: 80001,
    chain_id: "0x13881",
    providers: ["walletconnect"],
    rpc_url: "https://rpc-mumbai.maticvigil.com",
    block_explorer: "https://mumbai-explorer.matic.today",
  },
  "0xa86a": {
    name: "Avalanche Mainnet C-Chain",
    short_name: "AVAX C-Chain",
    chain: "AVAX",
    network: "c-chain",
    network_id: 43114,
    chain_id: "0xa86a",
    providers: ["walletconnect"],
    rpc_url: "https://api.avax.network/ext/bc/C/rpc",
    block_explorer: "https://snowtrace.io/",
  },
  "0xa869": {
    name: "Avalanche FUJI C-Chain",
    short_name: "FUJI C-Chain",
    chain: "AVAX",
    network: "fuji c-chain",
    network_id: 43113,
    chain_id: "0xa869",
    providers: ["walletconnect"],
    rpc_url: "https://api.avax-test.network/ext/bc/C/rpc",
    block_explorer: "https://testnet.snowtrace.io/",
  },
};

export const chainByID = (chainID) => {
  return supportedChains[chainID];
};

export const chainByNetworkId = (networkId) => {
  const idMapping = {
    1: supportedChains["0x1"],
    4: supportedChains["0x4"],
    100: supportedChains["0x64"],
    137: supportedChains["0x89"],
    80001: supportedChains["0x13881"],
    43114: supportedChains["0x43114"],
  };

  return idMapping[networkId];
};
