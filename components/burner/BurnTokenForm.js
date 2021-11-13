import { useState } from "react";
import SingleActionButton from "../SingleActionControl/SingleActionButton";
import SingleActionNumberInput from "../SingleActionControl/SingleActionNumberInput";
import SingleActionAddressInput from "../SingleActionControl/SingleActionAddressInput";
import { Box, Heading, Text } from "@chakra-ui/react";
import { useInjectedProvider } from "../../contexts/InjectedProviderContext";
import { METLContract } from "../../utils/contract";
import toastHandler from "../../utils/toastHandling";
import BlockScanner from "../BlockScanner";
import toast from "react-hot-toast";
import Web3 from "web3";

export default function BurnTokenForm(props) {
  const [burnAmount, setBurnAmount] = useState("");
  const [burnTarget, setBurnTarget] = useState("");
  const [showBlockScanner, setShowBlockScanner] = useState(false);
  const [blockScannerContent, setBlockScannerContent] = useState("");

  const { address, injectedChain, injectedProvider } = useInjectedProvider();

  async function bankBurn() {
    if (!injectedChain) {
      toast.error(
        "Function not ready. Wait or reconnect wallet. Contact Developers if issue persists."
      );
      return null;
    }
    const amount = BigInt(burnAmount * 10 ** 18);
    if (amount <= 0) {
      toast.error("No amount entered.");
      return null;
    }
    if (burnTarget.length <= 0) {
      toast.error("No bank selected");
      return null;
    }
    if (!Web3.utils.isAddress(burnTarget)) {
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
    const transaction = await contract.methods.bankBurn(burnTarget, amount);
    const response = await toastHandler(
      transaction,
      setBlockScannerContent,
      setShowBlockScanner
    );
    if (response === "confirmed") {
      // store burn target, amount, and timestamp
    }
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
        <SingleActionAddressInput
          label="Address"
          val={burnTarget}
          setVal={setBurnTarget}
        />
        <SingleActionNumberInput
          label="Amount"
          val={burnAmount}
          setVal={setBurnAmount}
        />

        <SingleActionButton
          label={"Burn"}
          onClick={async () => await bankBurn()}
        />

        {showBlockScanner && (
          <>
            <Box sx={{ minHeight: `1rem` }}></Box>
            <BlockScanner txHash={blockScannerContent} />
          </>
        )}
      </Box>
    </Box>
  );
}
