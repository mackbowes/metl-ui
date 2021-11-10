import { useState } from "react";
import SingleActionButton from "../SingleActionControl/SingleActionButton";
import SingleActionNumberInput from "../SingleActionControl/SingleActionNumberInput";
import { Box, Heading, Text } from "@chakra-ui/react";
import { useInjectedProvider } from "../../contexts/InjectedProviderContext";
import { METLContract } from "../../utils/contract";

export default function BurnTokenForm(props) {
  const [burnAmount, setBurnAmount] = useState();
  const [statusMessage, setStatusMessage] = useState("");

  const { address, injectedChain, injectedProvider } = useInjectedProvider();

  async function poolBurn() {
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
    console.log(contract.methods);
    const amount = BigInt(burnAmount * 10 ** 18);
    const transaction = await contract.methods.poolBurn(amount);
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
        Burn Tokens
      </Heading>
      <Box
        sx={{
          backgroundColor: `white`,
          display: `flex`,
          flexDirection: `column`,
          padding: `1ex 1em`,
        }}
      >
        <SingleActionNumberInput
          label="Amount"
          val={burnAmount}
          setVal={setBurnAmount}
        />
        <SingleActionButton
          label={"Burn"}
          onClick={async () => await poolBurn()}
        />
        <Box sx={{ minHeight: `1rem` }}></Box>
        {statusMessage.length > 0 && <Text>{statusMessage}</Text>}
      </Box>
    </Box>
  );
}
