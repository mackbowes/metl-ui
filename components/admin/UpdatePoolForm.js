import { useState } from "react";
import MultiActionAddressInput from "../MultiActionControl/MultiActionAddressInput";
import MultiActionButton from "../MultiActionControl/MultiActionButton";
import { Box, Heading, Text } from "@chakra-ui/react";
import { useInjectedProvider } from "../../contexts/InjectedProviderContext";
import { METLContract } from "../../utils/contract";
import Web3 from "web3";
import toast from "react-hot-toast";
import toastHandler from "../../utils/toastHandling";
import BlockScanner from "../BlockScanner";

export default function UpdatePoolForm(props) {
  const [addPoolAddress, setAddPoolAddress] = useState("");
  const [removePoolAddress, setRemovePoolAddress] = useState("");
  const [showBlockScanner, setShowBlockScanner] = useState(false);
  const [blockScannerContent, setBlockScannerContent] = useState("");
  const { address, injectedProvider, injectedChain, requestWallet } =
    useInjectedProvider();

  async function addPool() {
    if (!injectedChain) {
      toast.error(
        "Function not ready. Wait or reconnect wallet. Contact Developers if issue persists."
      );
      setTimeout(() => setAddMessage(""), 3000);
      return null;
    }
    if (addPoolAddress === "") {
      toast.error("No target address selected, transaction aborting.");
      return null;
    }
    if (!Web3.utils.isAddress(addPoolAddress)) {
      toast.error("Bad Address.");
      return null;
    }
    const contract = METLContract(
      injectedChain.chainId,
      address,
      injectedProvider
    );
    const transaction = await contract.methods.addMultisig(addPoolAddress);
    await toastHandler(
      transaction,
      setBlockScannerContent,
      setShowBlockScanner
    );
  }

  async function removePool() {
    if (!injectedChain) {
      toast.error(
        "Function not ready. Wait or reconnect wallet. Contact Developers if issue persists."
      );
      return null;
    }
    if (removePoolAddress === "") {
      toast.error("No target address selected, transaction aborting");
      return null;
    }
    if (!Web3.utils.isAddress(removePoolAddress)) {
      toast.error("No target address selected, transaction aborting");
      return null;
    }
    const contract = METLContract(
      injectedChain.chainId,
      address,
      injectedProvider
    );
    const transaction = await contract.methods.revokeMultisig(
      removePoolAddress
    );
    await toastHandler(
      transaction,
      setBlockScannerContent,
      setBlockScannerContent
    );
  }

  return (
    <Box sx={{ width: `100%` }}>
      <Heading
        sx={{
          display: `block`,
          borderBottom: `1px solid black`,
          fontSize: `1.5rem`,
          paddingBottom: `.5ex`,
          marginBottom: `.5ex`,
        }}
      >
        Add Pool
      </Heading>
      <Box
        sx={{
          display: `flex`,
          justifyContent: `flex-start`,
          alignItems: `center`,
        }}
      >
        <MultiActionAddressInput
          val={addPoolAddress}
          setVal={setAddPoolAddress}
        />
        <Box sx={{ minWidth: `1rem` }}></Box>
        <MultiActionButton
          label={"Add"}
          onClick={async () => {
            await addPool();
          }}
        />
        <Box sx={{ width: `1rem` }}></Box>
      </Box>
      <Box sx={{ minHeight: `1rem` }}></Box>
      <Heading
        sx={{
          display: `block`,
          borderBottom: `1px solid black`,
          fontSize: `1.5rem`,
          paddingBottom: `.5ex`,
          marginBottom: `.5ex`,
        }}
      >
        Remove Pool
      </Heading>
      <Box
        sx={{
          display: `flex`,
          justifyContent: `flex-start`,
          alignItems: `center`,
        }}
      >
        <MultiActionAddressInput
          val={removePoolAddress}
          setVal={setRemovePoolAddress}
        />
        <Box sx={{ minWidth: `1rem` }}></Box>
        <MultiActionButton
          label={"Remove"}
          onClick={async () => {
            await removePool();
          }}
        />
        <Box sx={{ width: `1rem` }}></Box>
      </Box>
      {showBlockScanner && <BlockScanner txHash={blockScannerContent} />}
    </Box>
  );
}
