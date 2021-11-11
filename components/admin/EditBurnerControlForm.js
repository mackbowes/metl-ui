import { useEffect, useState } from "react";
import { Box, HStack, VStack, Heading } from "@chakra-ui/react";
import MultiActionAddressInput from "../MultiActionControl/MultiActionAddressInput";
import MultiActionTextInput from "../MultiActionControl/MultiActionTextInput";
import MultiActionButton from "../MultiActionControl/MultiActionButton";
import BurnerTable from "./BurnerTable";
import { useInjectedProvider } from "../../contexts/InjectedProviderContext";
import { METLContract } from "../../utils/contract";
import Web3 from "web3";
import toast from "react-hot-toast";
import BlockScanner from "../BlockScanner";
import toastHandler from "../../utils/toastHandling";

export default function EditBurnerControlForm(props) {
  const { address, injectedChain, injectedProvider, requestWallet } =
    useInjectedProvider();
  const [addBurnerAddress, setAddBurnerAddress] = useState("");
  const [removeBurnerAddress, setRemoveBurnerAddress] = useState("");
  const [showBlockScanner, setShowBlockScanner] = useState(false);
  const [blockScannerContent, setBlockScannerContent] = useState("");

  useEffect(() => {
    if (!injectedProvider) {
      requestWallet();
    }
  }, [injectedProvider]);

  const data = [
    {
      address: "0xBc4A2b0B65e39bAE9bedad1798B824EAf0A60639",
      name: "Mackenzie Patrick Bowes",
      isBurner: true,
    },
    {
      address: "0xBc4A2b0B65e39bAE9bedad1798B824EAf0A60639",
      name: "Vitalik Buterin",
      isBurner: false,
    },
  ];

  async function addBurner() {
    if (!injectedChain) {
      toast.error("No Chain Available");
      setAddMessage(
        "Function not ready. Wait or reconnect wallet. Contact Developers if issue persists."
      );
      setTimeout(() => setAddMessage(""), 3000);
      return null;
    }
    if (addBurnerAddress === "") {
      toast.error("No address");
      setAddMessage("No burner address selected, transaction aborting");
      setTimeout(() => setAddMessage(""), 3000);
      return null;
    }
    if (!Web3.utils.isAddress(addBurnerAddress)) {
      toast.error("Bad Address");
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
    const transaction = await contract.methods.addBurner(addBurnerAddress);
    toastHandler(transaction, setBlockScannerContent, setShowBlockScanner);
  }

  async function removeBurner() {
    if (!injectedChain) {
      toast.error("No Chain Available.");
      return null;
    }
    if (removeBurnerAddress === "") {
      toast.error("No Address.");
      return null;
    }
    if (!Web3.utils.isAddress(removeBurnerAddress)) {
      toast.error("Bad Address");
      return null;
    }
    const contract = METLContract(
      injectedChain.chainId,
      address,
      injectedProvider
    );
    const transaction = await contract.methods.removeBurner(
      removeBurnerAddress
    );
    toastHandler(transaction, setBlockScannerContent, setShowBlockScanner);
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
          Add Burner
        </Heading>
        <Box
          sx={{
            display: `flex`,
            justifyContent: `flex-start`,
            alignItems: `center`,
          }}
        >
          <MultiActionAddressInput
            val={addBurnerAddress}
            setVal={setAddBurnerAddress}
          />
          <Box sx={{ width: `1rem` }}></Box>
          <MultiActionButton
            label={"Add"}
            onClick={async () => await addBurner()}
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
          Remove Burner
        </Heading>
        <Box
          sx={{
            display: `flex`,
            justifyContent: `flex-start`,
            alignItems: `center`,
          }}
        >
          <MultiActionAddressInput
            val={removeBurnerAddress}
            setVal={setRemoveBurnerAddress}
          />
          <Box sx={{ width: `1rem` }}></Box>
          <MultiActionButton
            label={"remove"}
            onClick={async () => await removeBurner()}
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
          Current Burners
        </Heading> */}
        {/* <BurnerTable data={data} /> */}
      </Box>
    </>
  );
}
