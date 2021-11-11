import { useState } from "react";
import { Box, HStack, VStack, Heading } from "@chakra-ui/react";
import MultiActionAddressInput from "../MultiActionControl/MultiActionAddressInput";
import MultiActionTextInput from "../MultiActionControl/MultiActionTextInput";
import MultiActionButton from "../MultiActionControl/MultiActionButton";
import FreezerTable from "./FreezerTable";
import { useInjectedProvider } from "../../contexts/InjectedProviderContext";
import { METLContract } from "../../utils/contract";
import Web3 from "web3";
import BlockScanner from "../BlockScanner";
import toast from "react-hot-toast";
import toastHandler from "../../utils/toastHandling";

export default function EditFreezerControlForm(props) {
  const { address, injectedChain, injectedProvider } = useInjectedProvider();
  const [addFreezerAddress, setAddFreezerAddress] = useState("");
  const [addFreezerName, setAddFreezerName] = useState("");
  const [removeFreezerAddress, setRemoveFreezerAddress] = useState("");

  const [showBlockScanner, setShowBlockScanner] = useState(false);
  const [blockScannerContent, setBlockScannerContent] = useState("");

  const data = [
    {
      address: "0xBc4A2b0B65e39bAE9bedad1798B824EAf0A60639",
      name: "Mackenzie Patrick Bowes",
      isFreezer: true,
    },
    {
      address: "0xBc4A2b0B65e39bAE9bedad1798B824EAf0A60639",
      name: "Vitalik Buterin",
      isFreezer: false,
    },
  ];

  async function addFreezer() {
    if (!injectedChain) {
      toast.error(
        "Function not ready. Wait or reconnect wallet. Contact Developers if issue persists."
      );
      return null;
    }
    if (addFreezerAddress === "") {
      toast.error("No Freezer address selected, transaction aborting");
      return null;
    }
    if (!Web3.utils.isAddress(addFreezerAddress)) {
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
    const transaction = await contract.methods.addFreezer(addFreezerAddress);
    await toastHandler(
      transaction,
      setBlockScannerContent,
      setShowBlockScanner
    );
  }

  async function removeFreezer() {
    if (!injectedChain) {
      setRemoveMessage(
        "Function not ready. Wait or reconnect wallet. Contact Developers if issue persists."
      );
      setTimeout(() => setRemoveMessage(""), 3000);
      return null;
    }
    if (removeFreezerAddress === "") {
      setRemoveMessage("No address selected, transaction aborting.");
      setTimeout(() => setRemoveMessage(""), 3000);
      return null;
    }
    if (!Web3.utils.isAddress(removeFreezerAddress)) {
      setAddMessage(
        "Address incorrectly formatted. Check your input before resubmitting."
      );
      setTimeout(() => setAddMessage(""), 3000);
      return null;
    }
    const contract = METLContract(
      injectedChain.chainId,
      address,
      injectedProvider
    );
    const transaction = await contract.methods.removeFreezer(
      removeFreezerAddress
    );
    await toastHandler(
      transaction,
      setBlockScannerContent,
      setShowBlockScanner
    );
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
          }}
        >
          Add Freezer
        </Heading>
        <Box
          sx={{
            display: `flex`,
            justifyContent: `flex-start`,
            alignItems: `center`,
          }}
        >
          <MultiActionAddressInput
            val={addFreezerAddress}
            setVal={setAddFreezerAddress}
          />
          <Box sx={{ width: `1rem` }}></Box>
          {/* <MultiActionTextInput
            val={addFreezerName}
            setVal={setAddFreezerName}
          /> */}
          {/* <Box sx={{ width: `1rem` }}></Box> */}
          <MultiActionButton
            label={"Add"}
            onClick={async () => {
              await addFreezer();
            }}
          />
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
          Remove Freezer
        </Heading>
        <Box sx={{ display: `flex`, justifyContent: `flex-start` }}>
          <MultiActionAddressInput
            val={removeFreezerAddress}
            setVal={setRemoveFreezerAddress}
          />
          <Box sx={{ width: `1rem` }}></Box>
          <MultiActionButton
            label={"remove"}
            onClick={async () => {
              await removeFreezer();
            }}
          />
        </Box>
        {showBlockScanner && <BlockScanner txHash={blockScannerContent} />}
        {/* <Heading
          sx={{
            display: `block`,
            borderBottom: `1px solid black`,
            padding: `.5ex 0`,
            margin: `.5ex 0`,
            fontSize: `1.5rem`,
          }}
        >
          Current Freezers
        </Heading>

        <FreezerTable data={data} /> */}
      </Box>
    </>
  );
}
