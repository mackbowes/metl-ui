import { useState } from "react";
import SingleActionButton from "../SingleActionControl/SingleActionButton";
import SingleActionNumberInput from "../SingleActionControl/SingleActionNumberInput";
import SingleActionAddressInput from "../SingleActionControl/SingleActionAddressInput";
import { Box, Heading, Text, Spinner } from "@chakra-ui/react";
import { useInjectedProvider } from "../../contexts/InjectedProviderContext";
import { METLContract } from "../../utils/contract";
import toastHandler from "../../utils/toastHandling";
import BlockScanner from "../BlockScanner";
import toast from "react-hot-toast";
import Web3 from "web3";

export default function MintTokenForm(props) {
  const [mintAmount, setMintAmount] = useState("");
  const [mintTarget, setMintTarget] = useState("");
  const [showBlockScanner, setShowBlockScanner] = useState(false);
  const [blockScannerContent, setBlockScannerContent] = useState("");

  const { address, injectedChain, injectedProvider } = useInjectedProvider();

  async function bankMint() {
    if (!injectedChain) {
      toast.error(
        "Function not ready. Wait or reconnect wallet. Contact Developers if issue persists."
      );
      return null;
    }
    if (mintTarget === "") {
      toast.error("No Pauser address selected, transaction aborting");
      return null;
    }
    if (!Web3.utils.isAddress(mintTarget)) {
      toast.error(
        "Address incorrectly formatted. Check your input before resubmitting."
      );
      return null;
    }
    const contract = METLContract(
      injectedChain.chainId,
      address,
      injectedProvider
    );
    const amount = BigInt(mintAmount * 10 ** 18);
    const transaction = await contract.methods.bankMint(mintTarget, amount);
    toastHandler(transaction, setBlockScannerContent, setShowBlockScanner);
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
          onClick={async () => await bankMint()}
        />
        {showBlockScanner && <BlockScanner txHash={blockScannerContent} />}
        {/* <Box sx={{ minHeight: `1rem` }}></Box>
        {statusMessage.length > 0 && <Text>{statusMessage}</Text>} */}
      </Box>
    </Box>
  );
}
