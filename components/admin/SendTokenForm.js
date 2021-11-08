import { useState } from "react";
import SingleActionButton from "../SingleActionControl/SingleActionButton";
import SingleActionNumberInput from "../SingleActionControl/SingleActionNumberInput";
import SingleActionAddressInput from "../SingleActionControl/SingleActionAddressInput";
import { Box, Heading, Text } from "@chakra-ui/react";
import { useInjectedProvider } from "../../contexts/InjectedProviderContext";
import { METLContract } from "../../utils/contract";

export default function SendTokenForm(props) {
  const [sendAmount, setSendAmount] = useState("");
  const [sendAddress, setSendAddress] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const { address, injectedProvider, injectedChain, requestWallet } =
    useInjectedProvider();

  async function sendTokens() {
    if (!injectedChain) {
      setStatusMessage(
        "Function not ready. Wait or reconnect wallet. Contact Developers if issue persists."
      );
      setTimeout(() => setStatusMessage(""), 3000);
      return null;
    }
    if (sendAmount === "") {
      setStatusMessage("No amount selected, transaction aborting");
      setTimeout(() => setStatusMessage(""), 3000);
      return null;
    }
    if (sendAddress === "") {
      setStatusMessage("No target address selected, transaction aborting");
      setTimeout(() => setStatusMessage(""), 3000);
      return null;
    }
    const contract = METLContract(
      injectedChain.chainId,
      address,
      injectedProvider
    );
    const transaction = await contract.methods.poolTransfer(
      sendAddress,
      sendAmount
    );
    const txResponse = await transaction
      .send("eth_requestAccounts", { from: address })
      .on("transactionHash", (txHash) => {
        console.log(txHash);
        setStatusMessage("Transaction Hash received. Adding In Progress...");
        setTimeout(() => setStatusMessage(""), 3000);
        return txHash;
      })
      .on("error", (error) => {
        console.error(error);
        setStatusMessage(
          "Error received. Adding Aborted. Check console logs for details."
        );
        setTimeout(() => setStatusMessage(""), 3000);
        return error;
      });
  }

  return (
    <Box sx={{ width: `clamp(288px, 55ch, 576px)` }}>
      <Heading
        sx={{
          borderBottom: `1px solid black`,
          fontSize: `24px`,
          fontWeight: `500`,
          padding: `.75rem 0`,
          margin: `.75rem 0`,
        }}
      >
        Send Tokens
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
          val={sendAddress}
          setVal={setSendAddress}
        />
        <SingleActionNumberInput
          label="Amount"
          val={sendAmount}
          setVal={setSendAmount}
        />

        <SingleActionButton
          label={"Send"}
          onClick={async () => {
            await sendTokens();
          }}
        />
        {statusMessage.length > 0 && (
          <Box>
            <Text>{statusMessage}</Text>
          </Box>
        )}
      </Box>
    </Box>
  );
}
