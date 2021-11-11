import { useState } from "react";
import { Box, HStack, VStack, Heading } from "@chakra-ui/react";
import MultiActionAddressInput from "../MultiActionControl/MultiActionAddressInput";
import MultiActionTextInput from "../MultiActionControl/MultiActionTextInput";
import MultiActionButton from "../MultiActionControl/MultiActionButton";
import PauserTable from "./PauserTable";
import { useInjectedProvider } from "../../contexts/InjectedProviderContext";
import { METLContract } from "../../utils/contract";
import Web3 from "web3";
import toast from "react-hot-toast";
import toastHandler from "../../utils/toastHandling";
import BlockScanner from "../BlockScanner";

export default function EditPauserControlForm(props) {
  const { address, injectedChain, injectedProvider } = useInjectedProvider();
  const [addPauserAddress, setAddPauserAddress] = useState("");
  // const [addPauserName, setAddPauserName] = useState("");
  const [removePauserAddress, setRemovePauserAddress] = useState("");

  const [showBlockScanner, setShowBlockScanner] = useState(false);
  const [blockScannerContent, setBlockScannerContent] = useState("");

  async function addPauser() {
    if (!injectedChain) {
      toast.error(
        "Function not ready. Wait or reconnect wallet. Contact Developers if issue persists."
      );
      return null;
    }
    if (addPauserAddress === "") {
      toast.error("No Pauser address selected, transaction aborting");
      return null;
    }
    if (!Web3.utils.isAddress(addPauserAddress)) {
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
    const transaction = await contract.methods.addPauser(addPauserAddress);
    toastHandler(transaction, setBlockScannerContent, setShowBlockScanner);
  }

  async function removePauser() {
    if (!injectedChain) {
      toast.error(
        "Function not ready. Wait or reconnect wallet. Contact Developers if issue persists."
      );
      return null;
    }
    if (removePauserAddress === "") {
      toast.error("No address selected, transaction aborting.");
      return null;
    }
    if (!Web3.utils.isAddress(removePauserAddress)) {
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
    const transaction = await contract.methods.removePauser(
      removePauserAddress
    );
    toastHandler(transaction, setBlockScannerContent, setShowBlockScanner);
  }

  // const data = [
  //   {
  //     address: "0xBc4A2b0B65e39bAE9bedad1798B824EAf0A60639",
  //     name: "Mackenzie Patrick Bowes",
  //     isPauser: true,
  //   },
  //   {
  //     address: "0xBc4A2b0B65e39bAE9bedad1798B824EAf0A60639",
  //     name: "Vitalik Buterin",
  //     isPauser: false,
  //   },
  // ];

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
          Add Pauser
        </Heading>
        <Box
          sx={{
            display: `flex`,
            justifyContent: `flex-start`,
            alignItems: `center`,
          }}
        >
          <MultiActionAddressInput
            val={addPauserAddress}
            setVal={setAddPauserAddress}
          />
          <Box sx={{ width: `1rem` }}></Box>
          {/* <MultiActionTextInput val={addPauserName} setVal={setAddPauserName} />
          <Box sx={{ width: `1rem` }}></Box> */}
          <MultiActionButton
            label={"Add"}
            onClick={async () => {
              await addPauser();
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
          Remove Pauser
        </Heading>
        <Box
          sx={{
            display: `flex`,
            justifyContent: `flex-start`,
            alignItems: `center`,
          }}
        >
          <MultiActionAddressInput
            val={removePauserAddress}
            setVal={setRemovePauserAddress}
          />
          <Box sx={{ width: `1rem` }}></Box>
          <MultiActionButton
            label={"remove"}
            onClick={async () => {
              await removePauser();
            }}
          />
          <Box sx={{ width: `1rem` }}></Box>
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
          Current Pausers
        </Heading>

        <PauserTable data={data} /> */}
      </Box>
    </>
  );
}
