import { useEffect, useState } from "react";
import { Box, HStack, VStack, Heading } from "@chakra-ui/react";
import MultiActionAddressInput from "../MultiActionControl/MultiActionAddressInput";
import MultiActionTextInput from "../MultiActionControl/MultiActionTextInput";
import MultiActionButton from "../MultiActionControl/MultiActionButton";
import BurnerTable from "./BurnerTable";
import { useInjectedProvider } from "../../contexts/InjectedProviderContext";
import { METLContract } from "../../utils/contract";
import Web3 from "web3";

export default function EditBurnerControlForm(props) {
  const { address, injectedChain, injectedProvider, requestWallet } =
    useInjectedProvider();
  const [addBurnerAddress, setAddBurnerAddress] = useState("");
  const [addBurnerName, setAddBurnerName] = useState("");
  const [removeBurnerAddress, setRemoveBurnerAddress] = useState("");
  const [addMessage, setAddMessage] = useState("");
  const [removeMessage, setRemoveMessage] = useState("");

  useEffect(() => {
    if (!injectedProvider) {
      requestWallet();
    }
  }, []);

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
      setAddMessage(
        "Function not ready. Wait or reconnect wallet. Contact Developers if issue persists."
      );
      setTimeout(() => setAddMessage(""), 3000);
      return null;
    }
    if (addBurnerAddress === "") {
      setAddMessage("No burner address selected, transaction aborting");
      setTimeout(() => setAddMessage(""), 3000);
      return null;
    }
    const contract = METLContract(
      injectedChain.chainId,
      address,
      injectedProvider
    );
    const burnerRole = await contract.methods.BURNER_ROLE().call();
    if (!Web3.utils.isAddress(addBurnerAddress)) {
      setAddMessage(
        "Address incorrectly formatted. Check your input before resubmitting."
      );
      setTimeout(() => setAddMessage(""), 3000);
      return null;
    }
    const transaction = await contract.methods.addBurner(addBurnerAddress);
    const txResponse = await transaction
      .send("eth_requestAccounts", { from: address })
      .on("transactionHash", (txHash) => {
        setAddMessage("Transaction Hash received. Adding In Progress...");
        setTimeout(() => setAddMessage(""), 3000);
        return txHash;
      })
      .on("error", (error) => {
        console.error(error);
        setAddMessage(
          "Error received. Adding Aborted. Check console logs for details."
        );
        setTimeout(() => setAddMessage(""), 3000);
        return error;
      });
    const burnerAdded = await contract.methods
      .hasRole(burnerRole, addBurnerAddress)
      .call();
    if (burnerAdded === true) {
      setAddMessage("Granting complete. Address may now burn.");
      setTimeout(() => setAddMessage(""), 5000);
    }
    if (burnerAdded !== true) {
      setAddMessage("Granting Failed. Address may not burn.");
      setTimeout(() => setAddMessage(""), 5000);
    }
    // todo: if (burnerAdded === true), POST burnerName & address to METL API
  }

  async function removeBurner() {
    if (!injectedChain) {
      setRemoveMessage(
        "Function not ready. Wait or reconnect wallet. Contact Developers if issue persists."
      );
      setTimeout(() => setRemoveMessage(""), 3000);
      return null;
    }
    if (removeBurnerAddress === "") {
      setRemoveMessage("No address selected, transaction aborting.");
      setTimeout(() => setRemoveMessage(""), 3000);
      return null;
    }
    if (!Web3.utils.isAddress(removeBurnerAddress)) {
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
    const burnerRole = await contract.methods.BURNER_ROLE().call();
    const transaction = await contract.methods.removeBurner(
      removeBurnerAddress
    );
    const txResponse = await transaction
      .send("eth_request")
      .on("transactionHash", (txHash) => {
        setRemoveMessage("Transaction Hash received. Removal In Progress...");
        setTimeout(() => setRemoveMessage(""), 3000);
        return txHash;
      })
      .on("error", (error) => {
        console.error(error);
        setRemoveMessage(
          "Error received. Removal aborted, check console logs for details."
        );
        setTimeout(() => setRemoveMessage(""), 3000);
        return error;
      });
    // hasRole should return 'false'
    const hasBurnerRole = await contract.methods
      .hasRole(burnerRole, removeBurnerAddress)
      .call();
    if (!hasBurnerRole === true) {
      setRemoveMessage("Revoking Complete. Address may no longer burn.");
      setTimeout(() => setRemoveMessage(""), 3000);
    }
    if (hasBurnerRole === true) {
      setAddMessage("Revoking Failed. Address may STILL burn.");
      setTimeout(() => setAddMessage(""), 5000);
    }
    // todo: if (burnerRemoved === true), DELETE burnerName & address to METL API
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
