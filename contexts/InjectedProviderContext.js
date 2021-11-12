import { useState, useEffect, useContext, createContext, useRef } from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import { supportedChains } from "../utils/chain.js";
import {
  deriveChainId,
  deriveSelectedAddress,
  getProviderOptions,
} from "../utils/web3modal.js";

export const InjectedProviderContext = createContext(null);

export const InjectedProviderFC = ({ children }) => {
  const [injectedProvider, setInjectedProvider] = useState(null);
  const [address, setAddress] = useState(null);
  const [injectedChain, setInjectedChain] = useState(null);
  const [web3Modal, setWeb3Modal] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const hasListeners = useRef(null);

  const connectProvider = async () => {
    setIsUpdating(true);
    const providerOptions = getProviderOptions();

    const defaultModal = new Web3Modal({
      providerOptions: providerOptions,
    });

    if (!providerOptions) {
      setInjectedProvider(null);
      setAddress(null);
      setWeb3Modal(defaultModal);
      window.localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER");
      return;
    }

    const localWeb3Modal = new Web3Modal({
      providerOptions,
      cacheProvider: true,
      theme: "light",
    });

    const provider = await localWeb3Modal.connect();

    // console.log(provider);

    provider.selectedAddress = deriveSelectedAddress(provider);

    provider.on("chainChanged", (chainId) => {
      const newChain = { ...supportedChains[chainId], chainId };
      setInjectedChain(newChain);
    });

    provider.on("accountChanged", () => {
      const newWeb3 = new Web3(provider);
      setInjectedProvider(newWeb3);
    });

    const chainId = deriveChainId(provider);

    const chain = {
      ...supportedChains[chainId],
      chainId,
    };

    const web3 = new Web3(provider);

    if (web3?.currentProvider?.selectedAddress) {
      setInjectedProvider(web3);
      setAddress(web3.currentProvider.selectedAddress);
      setInjectedChain(chain);
      setWeb3Modal(localWeb3Modal);
    }
    setIsUpdating(false);
  };

  useEffect(() => {
    connectProvider();
  }, []);

  useEffect(() => {
    setIsUpdating(true);
    const handleChainChange = () => {
      console.log("handling chain");
      connectProvider();
    };

    const accountsChanged = () => {
      console.log("handling account");
      connectProvider();
    };

    const unsub = () => {
      if (injectedProvider?.currentProvider) {
        injectedProvider?.currentProvider.removeListener(
          "accountsChanged",
          accountsChanged
        );
        injectedProvider.currentProvider.removeListener(
          "chainChanged",
          handleChainChange
        );
      }
    };

    if (injectedProvider?.currentProvider && !hasListeners.current) {
      console.log("adding listeners");
      injectedProvider.currentProvider
        .on("accountsChanged", accountsChanged)
        .on("chainChanged", handleChainChange);
      hasListeners.current = true;
      console.log("listeners added");
    }
    setIsUpdating(false);
    return () => unsub();
  }, [injectedProvider]);

  const requestWallet = async () => {
    await connectProvider();
  };

  const disconnectDapp = async () => {
    const defaultModal = new Web3Modal({
      providerOptions: getProviderOptions(),
      cacheProvider: true,
      theme: "dark",
    });

    setInjectedProvider(null);
    setAddress(null);
    setWeb3Modal(defaultModal);
    web3Modal.clearCachedProvider();
  };

  return (
    <InjectedProviderContext.Provider
      value={{
        injectedProvider,
        requestWallet,
        disconnectDapp,
        injectedChain,
        address,
        web3Modal,
        isUpdating,
      }}
    >
      {children}
    </InjectedProviderContext.Provider>
  );
};

export const useInjectedProvider = () => {
  const {
    injectedProvider,
    requestWallet,
    disconnectDapp,
    injectedChain,
    address,
    web3Modal,
    isUpdating,
  } = useContext(InjectedProviderContext);
  return {
    injectedProvider,
    requestWallet,
    disconnectDapp,
    injectedChain,
    address,
    web3Modal,
    isUpdating,
  };
};
