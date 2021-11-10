import { useState, useEffect } from "react";
import SingleActionButton from "../SingleActionControl/SingleActionButton";
import { Box, Heading, Spinner } from "@chakra-ui/react";
import { useInjectedProvider } from "../../contexts/InjectedProviderContext";
import { METLContract } from "../../utils/contract";

export default function PauseTokenForm(props) {
  const { address, injectedChain, injectedProvider } = useInjectedProvider();
  const [statusMessage, setStatusMessage] = useState("");
  const [contract, setContract] = useState({});
  const [isPaused, setIsPaused] = useState(false);
  const [isTransacting, setIsTransacting] = useState(false);

  async function getPauseState() {
    if (Object.keys(contract).length > 0) {
      const pauseState = await contract.methods.paused().call();
      setIsPaused(pauseState);
    }
  }

  useEffect(() => {
    if (injectedChain && address && injectedProvider) {
      const localContract = METLContract(
        injectedChain.chainId,
        address,
        injectedProvider
      );
      setContract(localContract);
    }
    getPauseState();
  }, [address, injectedProvider]);

  async function pause() {
    if (!injectedChain) {
      setStatusMessage(
        "Function not ready. Wait or reconnect wallet. Contact Developers if issue persists."
      );
      setTimeout(() => setStatusMessage(""), 3000);
      return null;
    }
    if (Object.keys(contract).length <= 0) {
      setStatusMessage(
        "Function not ready. Wait or reconnect wallet. Contact Developers if issue persists."
      );
      setTimeout(() => setStatusMessage(""), 3000);
      return null;
    }
    const transaction = await contract.methods.pause();
    const txResponse = await transaction
      .send("eth_requestAccounts")
      .on("transactionHash", (txHash) => {
        console.log(txHash);
        setStatusMessage("Transaction Hash received. Adding In Progress...");
        setTimeout(() => setStatusMessage(""), 3000);
        return txHash;
      })
      .once("confirmation", (confNumber, receipt, latestBlockHash) => {
        console.log(receipt);
        setStatusMessage("Transaction confirmed. Network is Paused.");
        setTimeout(() => setStatusMessage(""), 3000);
        getPauseState();
      })
      .on("error", (error) => {
        console.error(error);
        setStatusMessage(
          "Error received. Adding Aborted. Check console logs for details."
        );
        setTimeout(() => setStatusMessage(""), 3000);
        return error;
      });
    console.log(txResponse);
  }

  async function unpause() {
    if (!injectedChain) {
      setStatusMessage(
        "Function not ready. Wait or reconnect wallet. Contact Developers if issue persists."
      );
      setTimeout(() => setStatusMessage(""), 3000);
      return null;
    }
    if (Object.keys(contract).length <= 0) {
      setStatusMessage(
        "Function not ready. Wait or reconnect wallet. Contact Developers if issue persists."
      );
      setTimeout(() => setStatusMessage(""), 3000);
      return null;
    }
    setIsTransacting(true);
    const transaction = await contract.methods.unpause();
    const txResponse = await transaction
      .send("eth_requestAccounts")
      .on("transactionHash", (txHash) => {
        console.log(txHash);
        setStatusMessage("Transaction Hash received. Adding In Progress...");
        setTimeout(() => setStatusMessage(""), 3000);
        return txHash;
      })
      .once("confirmation", (confNumber, receipt, latestBlockHash) => {
        console.log(receipt);
        setStatusMessage("Transaction confirmed. Network is Paused.");
        getPauseState();
        setIsTransacting(false);
        setTimeout(() => setStatusMessage(""), 3000);
      })
      .on("error", (error) => {
        console.error(error);
        setIsTransacting(false);
        setStatusMessage(
          "Error received. Adding Aborted. Check console logs for details."
        );
        setTimeout(() => setStatusMessage(""), 3000);
        return error;
      });
    console.log(txResponse);
  }

  return (
    <Box sx={{ width: `clamp(288px, 20vw, 576px)` }}>
      <Heading
        sx={{
          borderBottom: `1px solid black`,
          fontSize: `24px`,
          fontWeight: `500`,
          padding: `.75rem 0`,
          margin: `.75rem 0`,
        }}
      >
        Pause Transactions
      </Heading>
      <Box
        sx={{
          backgroundColor: `white`,
          display: `flex`,
          flexDirection: `column`,
          padding: `1ex 1em`,
        }}
      >
        {!isPaused && (
          <SingleActionButton
            label={"Pause"}
            onClick={async () => await pause()}
          />
        )}
        {isPaused && (
          <SingleActionButton
            label={"Unpause"}
            onClick={async () => await unpause()}
          />
        )}
        {isTransacting && <Spinner size="xl" />}
      </Box>
    </Box>
  );
}
