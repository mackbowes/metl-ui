import { useState } from "react";
import SingleActionButton from "../SingleActionControl/SingleActionButton";
import SingleActionNumberInput from "../SingleActionControl/SingleActionNumberInput";
import SingleActionAddressInput from "../SingleActionControl/SingleActionAddressInput";
import { Box, Heading, Text, Spinner } from "@chakra-ui/react";
import { useInjectedProvider } from "../../contexts/InjectedProviderContext";
import { METLContract } from "../../utils/contract";

export default function SendTokenForm(props) {
  const [sendAmount, setSendAmount] = useState("");
  const [sendAddress, setSendAddress] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isTransacting, setIsTransacting] = useState(false);
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
    const bigSendAmount = BigInt(sendAmount * 10 ** 18);
    const transaction = await contract.methods.poolTransfer(
      sendAddress,
      bigSendAmount
    );
    setIsTransacting(true);
    try {
      const txResponse = await transaction
        .send("eth_requestAccounts", { from: address })
        .on("transactionHash", (txHash) => {
          console.log(txHash);
          setStatusMessage(
            "Transaction Hash received. Transfer In Progress..."
          );
          setTimeout(() => setStatusMessage(""), 3000);
          return txHash;
        })
        .once("confirmation", () => {
          setStatusMessage(
            "Transaction confirmed. Funds have been transferred."
          );
          setTimeout(() => setStatusMessage(""), 3000);
          setTimeout(() => setIsTransacting(false), 4000);
        })
        .on("error", (error) => {
          console.error(error);
          setStatusMessage(
            "Error received. Adding Aborted. Check console logs for details."
          );
          setTimeout(() => setStatusMessage(""), 3000);
          setTimeout(() => setIsTransacting(false), 4000);
          return error;
        });
      console.log(txResponse);
    } catch (error) {
      console.error(error);
      setStatusMessage(
        "Error received. Adding Aborted. Check console logs for details."
      );
      setTimeout(() => setStatusMessage(""), 3000);
      setTimeout(() => setIsTransacting(false), 4000);
    }
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
        {!isTransacting && (
          <>
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
          </>
        )}
        {isTransacting && <Spinner size="xl" sx={{ margin: `0 auto` }} />}
        {statusMessage.length > 0 && (
          <Box>
            <Text>{statusMessage}</Text>
          </Box>
        )}
      </Box>
    </Box>
  );
}
