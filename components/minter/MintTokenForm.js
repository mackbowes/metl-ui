import { useState } from "react";
import SingleActionButton from "../SingleActionControl/SingleActionButton";
import SingleActionNumberInput from "../SingleActionControl/SingleActionNumberInput";
import SingleActionAddressInput from "../SingleActionControl/SingleActionAddressInput";
import { Box, Heading, Text, Spinner } from "@chakra-ui/react";
import { useInjectedProvider } from "../../contexts/InjectedProviderContext";
import { METLContract } from "../../utils/contract";

export default function MintTokenForm(props) {
  const [mintAmount, setMintAmount] = useState();
  const [mintTarget, setMintTarget] = useState();
  const [statusMessage, setStatusMessage] = useState("");
  const [isTransacting, setIsTransacting] = useState(false);

  const { address, injectedChain, injectedProvider } = useInjectedProvider();

  async function poolMint() {
    if (!injectedChain) {
      setStatusMessage(
        "Function not ready. Wait or reconnect wallet. Contact Developers if issue persists."
      );
      setTimeout(() => setStatusMessage(""), 3000);
      return null;
    }
    const contract = METLContract(
      injectedChain.chainId,
      address,
      injectedProvider
    );
    const amount = BigInt(mintAmount * 10 ** 18);
    const transaction = await contract.methods.poolMint(amount);
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
        setStatusMessage("Transaction confirmed.");
        setTimeout(() => setStatusMessage(""), 3000);
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
        Mint Tokens
      </Heading>
      <Box
        sx={{
          backgroundColor: `white`,
          display: `flex`,
          flexDirection: `column`,
          padding: `1ex 1em`,
        }}
      >
        <SingleActionAddressInput
          label="Address"
          val={mintTarget}
          setVal={setMintTarget}
        />
        <SingleActionNumberInput
          label="Amount"
          val={mintAmount}
          setVal={setMintAmount}
        />
        <SingleActionButton
          label={"Mint"}
          onClick={async () => await poolMint()}
        />
        <Box sx={{ minHeight: `1rem` }}></Box>
        {statusMessage.length > 0 && <Text>{statusMessage}</Text>}
      </Box>
    </Box>
  );
}
