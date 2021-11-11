import { useState } from "react";
import { Box, HStack, VStack, Heading } from "@chakra-ui/react";
import MultiActionAddressInput from "../MultiActionControl/MultiActionAddressInput";
import MultiActionTextInput from "../MultiActionControl/MultiActionTextInput";
import MultiActionButton from "../MultiActionControl/MultiActionButton";
import MinterTable from "./MinterTable";
import { useInjectedProvider } from "../../contexts/InjectedProviderContext";
import { METLContract } from "../../utils/contract";
import Web3 from "web3";
import toast from "react-hot-toast";
import BlockScanner from "../BlockScanner";

export default function EditMinterControlForm(props) {
  const { address, injectedChain, injectedProvider } = useInjectedProvider();
  const [addMinterAddress, setAddMinterAddress] = useState("");
  const [removeMinterAddress, setRemoveMinterAddress] = useState("");

  const [showBlockScanner, setShowBlockScanner] = useState(false);
  const [blockScannerContent, setBlockScannerContent] = useState("");

  async function addMinter() {
    if (!injectedChain) {
      toast.error(
        "Function not ready. Wait or reconnect wallet. Contact Developers if issue persists."
      );
      return null;
    }
    if (addMinterAddress === "") {
      toast.error("No address selected. Transaction aborting");
      return null;
    }

    if (!Web3.utils.isAddress(addMinterAddress)) {
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
    const transaction = await contract.methods.addMinter(addMinterAddress);
    toast("Initiating Transaction.");
  }

  async function removeMinter() {
    if (!injectedChain) {
      toast.error(
        "Function not ready. Wait or reconnect wallet. Contact Developers if issue persists."
      );
      return null;
    }
    if (removeMinterAddress === "") {
      toast.error("No address selected, transaction aborting.");
      return null;
    }
    if (!Web3.utils.isAddress(removeMinterAddress)) {
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
    await contract.methods.removeMinter(removeMinterAddress);
    await transaction
      .send("eth_request")
      .on("transactionHash", (txHash) => {
        setBlockScannerContent(txHash);
        setShowBlockScanner(true);
        toast("Transaction Hash received. Revoking In Progress...");
      })
      .once("confirmation", () => {
        toast.success("Transaction confirmed. Minter Revoked.");
        setTimeout(() => setShowBlockScanner(false), 10000);
      })
      .on("error", (error) => {
        console.error(error);
        toast.error("Transaction failed: ", error?.message);
        setTimeout(() => setShowBlockScanner(false), 10000);
      });
  }

  return (
    <>
      <Box>
        <Heading
          sx={{
            display: `block`,
            borderBottom: `1px solid black`,
            fontSize: `1.5rem`,
            paddingBottom: `.5ex`,
            marginBottom: `.5ex`,
            alignItems: `center`,
          }}
        >
          Add Minter
        </Heading>
        <Box
          sx={{
            display: `flex`,
            justifyContent: `flex-start`,
            alignItems: `center`,
          }}
        >
          <MultiActionAddressInput
            val={addMinterAddress}
            setVal={setAddMinterAddress}
          />
          <Box sx={{ width: `1rem` }}></Box>
          <Box sx={{ width: `1rem` }}></Box>
          <MultiActionButton
            label={"Add"}
            onClick={async () => {
              await addMinter();
            }}
          />
          <Box sx={{ width: `1rem` }}></Box>
        </Box>
        <Heading
          sx={{
            display: `block`,
            borderBottom: `1px solid black`,
            padding: `.5ex 0`,
            margin: `.5ex 0`,
            fontSize: `1.5rem`,
          }}
        >
          Remove Minter
        </Heading>
        <Box
          sx={{
            display: `flex`,
            justifyContent: `flex-start`,
            alignItems: `center`,
          }}
        >
          <MultiActionAddressInput
            val={removeMinterAddress}
            setVal={setRemoveMinterAddress}
          />
          <Box sx={{ width: `1rem` }}></Box>
          <MultiActionButton
            label={"remove"}
            onClick={async () => await removeMinter()}
          />
          <Box sx={{ width: `1rem` }}></Box>
        </Box>
        {showBlockScanner && <BlockScanner txHash={blockScannerContent} />}
      </Box>
    </>
  );
}
