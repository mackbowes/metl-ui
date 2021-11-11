import { useState, useEffect } from "react";
import { Box, Spinner, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import ConnectWalletButton from "../components/ConnectWalletButton";

import { useInjectedProvider } from "../contexts/InjectedProviderContext";
import { METLContract } from "../utils/contract";

export default function Home() {
  const router = useRouter();
  const { address, injectedProvider, injectedChain, requestWallet } =
    useInjectedProvider();
  const [isConnecting, setIsConnecting] = useState(false);
  const [chain, setChain] = useState("No Supported");

  useEffect(() => {
    if (window) {
      console.log(window.ethereum);
    }
  });

  useEffect(() => {
    async function getWallet() {
      if (!injectedProvider) {
        await requestWallet();
      }
    }
    getWallet();
  }, [address, injectedProvider]);

  useEffect(() => {
    if (injectedChain?.chainId) {
      console.log(injectedChain.chainId);
      if (injectedChain.chainId === "0xa869") {
        setChain("Fuji");
      }
      if (injectedChain.chainId === "0xa86a") {
        setChain("Avalanche");
      }
    }
  }, [injectedChain]);

  async function getRole(chainID) {
    console.log("Getting Role...");
    const contract = METLContract(chainID, address, injectedProvider);
    const adminRole = await contract.methods.DEFAULT_ADMIN_ROLE().call();
    const hasAdmin = await contract.methods.hasRole(adminRole, address).call();
    if (hasAdmin === true) {
      router.push("/admin");
      return null;
    }
    console.log("Not Admin...");
    const BurnerRole = await contract.methods.BURNER_ROLE().call();
    const HasBurner = await contract.methods
      .hasRole(BurnerRole, address)
      .call();
    if (HasBurner === true) {
      router.push("/burner/burn-tokens");
      return null;
    }
    console.log("Not Burner...");
    const FreezerRole = await contract.methods.FREEZER_ROLE().call();
    const HasFreezer = await contract.methods
      .hasRole(FreezerRole, address)
      .call();
    if (HasFreezer === true) {
      router.push("/freezer/freeze-tokens");
      return null;
    }
    console.log("Not Freezer...");
    const MinterRole = await contract.methods.MINTER_ROLE().call();
    const HasMinter = await contract.methods
      .hasRole(MinterRole, address)
      .call();
    if (HasMinter === true) {
      router.push("/minter/mint-tokens");
      return null;
    }
    console.log("Not Minter...");
    const PauserRole = await contract.methods.PAUSER_ROLE().call();
    const HasPauser = await contract.methods
      .hasRole(PauserRole, address)
      .call();
    if (HasPauser === true) {
      router.push("/pauser/pause-transactions");
      return null;
    }
    console.log("Not Pauser...");
    console.log("User has no role... Rerouting");
    router.push("/no-role");
    return null;
  }

  return (
    <>
      <Box
        sx={{
          display: `grid`,
          placeItems: `center`,
          backgroundColor: `white`,
          width: `100vw`,
          height: `100vh`,
          position: `absolute`,
          left: `0`,
          top: `0`,
          userSelect: `none`,
        }}
      >
        <Box>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            draggable="false"
            src="/metl2.png"
            alt="Metl Logo"
            style={{ margin: `1rem auto`, userSelect: `none` }}
          />
          <ConnectWalletButton
            clickFunction={async () => {
              setIsConnecting(true);
              await requestWallet();
              if (!injectedChain) {
                console.log("No Chain");
              }
              if (injectedChain) {
                await getRole(injectedChain?.chainId);
              }
              setTimeout(() => {
                setIsConnecting(false);
              }, 2000);
            }}
          >
            {isConnecting && <Spinner />}
            {injectedChain && !isConnecting && "Log In"}
            {!injectedChain && !isConnecting && "Connect Wallet"}
          </ConnectWalletButton>
          {chain.length > 0 && (
            <Box
              sx={{
                width: `100%`,
                textAlign: `center`,
                padding: `1rem`,
                margin: `1rem 0`,
                border: `1px solid orange`,
              }}
            >
              {`${chain} network detected`}
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}
