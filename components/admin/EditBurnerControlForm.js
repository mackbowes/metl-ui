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

export default function EditBurnerControlForm(props) {
  const { address, injectedChain, injectedProvider, requestWallet } =
    useInjectedProvider();
  const [addBurnerAddress, setAddBurnerAddress] = useState("");
  const [addBurnerName, setAddBurnerName] = useState("");
  const [removeBurnerAddress, setRemoveBurnerAddress] = useState("");
  const [addMessage, setAddMessage] = useState("");
  const [removeMessage, setRemoveMessage] = useState("");
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
    toast("Initiating Transaction");
    const txResponse = await transaction
      .send("eth_requestAccounts", { from: address })
      .on("transactionHash", (txHash) => {
        setBlockScannerContent(txHash);
        setShowBlockScanner(true);
        setAddMessage("Transaction in progress...");
        toast("Transaction hash returned.");
        setTimeout(() => setAddMessage(""), 3000);
        return txHash;
      })
      .once("confirmation", () => {
        toast.success("Transaction Succeeded");
        setTimeout(() => setShowBlockScanner(false), 10000);
        // todo: POST burnerName and Address to METL API
      })
      .on("error", (error) => {
        console.error(error);
        toast.error("Transaction Failed");
        setAddMessage(
          "Error received. Adding Aborted. Check console logs for details."
        );
        setTimeout(() => setAddMessage(""), 3000);
        setTimeout(() => setShowBlockScanner(false), 10000);
        return error;
      });
  }

  async function removeBurner() {
    if (!injectedChain) {
      toast.error("No Chain Available");
      setRemoveMessage(
        "Function not ready. Wait or reconnect wallet. Contact Developers if issue persists."
      );
      setTimeout(() => setRemoveMessage(""), 3000);
      return null;
    }
    if (removeBurnerAddress === "") {
      toast.error("No address");
      setRemoveMessage("No address selected, transaction aborting.");
      setTimeout(() => setRemoveMessage(""), 3000);
      return null;
    }
    if (!Web3.utils.isAddress(removeBurnerAddress)) {
      toast.error("Bad Address");
      setRemoveMessage(
        "Address incorrectly formatted. Check your input before resubmitting."
      );
      setTimeout(() => setRemoveMessage(""), 3000);
      return null;
    }
    const contract = METLContract(
      injectedChain.chainId,
      address,
      injectedProvider
    );
    const burnerRole = await contract.methods.BURNER_ROLE().call();
    const transaction = await contract.methods.removeBurner(
      removeBurnerAddress
    );
    toast("Initiating Transaction");
    const txResponse = await transaction
      .send("eth_request")
      .on("transactionHash", (txHash) => {
        toast.success("Transaction Hash returned");
        setBlockScannerContent(txHash);
        setShowBlockScanner(true);
        setRemoveMessage("Transaction Hash received. Removal In Progress...");
        setTimeout(() => setRemoveMessage(""), 3000);
        return txHash;
      })
      .once("Confirmation", () => {
        toast.success("Transaction confirmed");
        setRemoveMessage("Transaction confirmed. Address has been removed.");
        setTimeout(() => setShowBlockScanner(false), 10000);
        // TODO: DELETE request to METL API with address and name
      })
      .on("error", (error) => {
        console.error(error);
        toast.error("Transaction failed.");
        setRemoveMessage(
          "Error received. Removal aborted, check console logs for details."
        );
        setTimeout(() => setRemoveMessage(""), 3000);
        return error;
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
          <MultiActionTextInput val={addBurnerName} setVal={setAddBurnerName} />
          <Box sx={{ width: `1rem` }}></Box>
          <MultiActionButton
            label={"Add"}
            onClick={async () => await addBurner()}
          />
          <Box sx={{ width: `1rem` }}></Box>
          {addMessage.length > 0 && (
            <Box sx={{ padding: `0 1rem` }}>{addMessage}</Box>
          )}
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
          {removeMessage && (
            <Box sx={{ padding: `0 1rem` }}>{removeMessage}</Box>
          )}
        </Box>
        {showBlockScanner && <BlockScanner txHash={blockScannerContent} />}
        <Heading
          sx={{
            display: `block`,
            borderBottom: `1px solid black`,
            padding: `.5ex 0`,
            margin: `.5ex 0`,
            fontSize: `1.5rem`,
          }}
        >
          Current Burners
        </Heading>

        <BurnerTable data={data} />
      </Box>
    </>
  );
}
