import WalletConnectProvider from "@walletconnect/web3-provider";
import { chainByID, chainByNetworkId } from "./chain";

const isInjected = () => {
  if (window.ethereum?.chainId) {
    return true;
  }
};

export const attemptInjectedChainData = () => {
  return isInjected()
    ? chainByID(`${window.ethereum?.chainId}`)
    : chainByID("0x1");
};

const addNetworkProviders = (chainData) => {
  const allProviders = {};
  if (!chainData) {
    // this will fire if window.ethereum exists, but the user is on the wrong chain
    return false;
  }

  const providersToAdd = chainData.providers;

  if (providersToAdd.includes("walletconnect")) {
    allProviders.walletconnect = {
      network: chainData.network,
      package: WalletConnectProvider,
      options: {
        rpc: {
          1: `https://mainnet.infura.io/v3/9044d022c0f14ecc956da8c71ccdd523`,
          4: `https://rinkeby.infura.io/v3/9044d022c0f14ecc956da8c71ccdd523`,
          100: `https://dai.poa.network`,
          137: `https://rpc-mainnet.maticvigil.com`,
        },
      },
    };
  }

  return allProviders;
};

export const getProviderOptions = () =>
  addNetworkProviders(attemptInjectedChainData());

export const deriveChainId = (provider) => {
  if (provider.isMetaMask) {
    return provider.chainId;
  }
  if (provider.wc) {
    return chainByNetworkId(provider.chainId).chain_id;
  }
  return null;
};

export const deriveSelectedAddress = (provider) => {
  if (provider.isMetaMask) {
    return provider.selectedAddress;
  }
  if (provider.wc) {
    return provider.accounts[0];
  }
  return null;
};
