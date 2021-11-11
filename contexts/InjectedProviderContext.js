import * as React from "react";
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

export const InjectedProvider = ({ children }) => {
  const [injectedProvider, setInjectedProvider] = useState(null);
  const [address, setAddress] = useState(null);
  const [injectedChain, setInjectedChain] = useState(null);
  const [web3Modal, setWeb3Modal] = useState(null);

  const hasListeners = useRef(null);

  const connectProvider = async () => {
    const providerOptions = getProviderOptions();

    const defaultModal = new Web3Modal({
      providerOptions: getProviderOptions(),
      cacheProvider: true,
      theme: "dark",
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
      theme: "dark",
    });

    const provider = await localWeb3Modal.connect();

    provider.selectedAddress = deriveSelectedAddress(provider);

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
  };

  useEffect(() => {
    connectProvider();
  }, []);

  useEffect(() => {
    const handleChainChange = () => {
      connectProvider();
    };

    const accountsChanged = () => {
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

      if (injectedProvider?.currentProvider && !hasListeners.current) {
        injectedProvider.currentProvider
          .on("accountsChanged", accountsChanged)
          .on("chainChanged", handleChainChange);
        hasListeners.current = true;
      }
      // return () => unsub();
    };
  }, [injectedProvider, injectedChain]);

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
  } = useContext(InjectedProviderContext);
  return {
    injectedProvider,
    requestWallet,
    disconnectDapp,
    injectedChain,
    address,
    web3Modal,
  };
};
