import { useState } from "react";
import { Box, HStack, VStack, Heading } from "@chakra-ui/react";
import MultiActionAddressInput from "../MultiActionControl/MultiActionAddressInput";
import MultiActionTextInput from "../MultiActionControl/MultiActionTextInput";
import MultiActionButton from "../MultiActionControl/MultiActionButton";
import FreezerTable from "./FreezerTable";
import { useInjectedProvider } from "../../contexts/InjectedProviderContext";
import { METLContract } from "../../utils/contract";
import Web3 from "web3";

export default function EditFreezerControlForm(props) {
  const { address, injectedChain, injectedProvider } = useInjectedProvider();
  const [addFreezerAddress, setAddFreezerAddress] = useState("");
  const [addFreezerName, setAddFreezerName] = useState("");
  const [removeFreezerAddress, setRemoveFreezerAddress] = useState("");
  const [addMessage, setAddMessage] = useState("");
  const [removeMessage, setRemoveMessage] = useState("");

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
      setAddMessage(
        "Function not ready. Wait or reconnect wallet. Contact Developers if issue persists."
      );
      setTimeout(() => setAddMessage(""), 3000);
      return null;
    }
    if (addFreezerAddress === "") {
      setAddMessage("No Freezer address selected, transaction aborting");
      setTimeout(() => setAddMessage(""), 3000);
      return null;
    }
    const contract = METLContract(
      injectedChain.chainId,
      address,
      injectedProvider
    );
    const freezerRole = await contract.methods.FREEZER_ROLE().call();
    if (!Web3.utils.isAddress(addFreezerAddress)) {
      setAddMessage(
        "Address incorrectly formatted. Check your input before resubmitting."
      );
      setTimeout(() => setAddMessage(""), 3000);
      return null;
    }
    const transaction = await contract.methods.addFreezer(addFreezerAddress);
    const txResponse = await transaction
      .send("eth_requestAccounts", { from: address })
      .on("transactionHash", (txHash) => {
        console.log(txHash);
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
    const freezerAdded = await contract.methods
      .hasRole(freezerRole, addFreezerAddress)
      .call();
    if (freezerAdded === true) {
      setAddMessage("Granting complete. Address may now freeze.");
      setTimeout(() => setAddMessage(""), 5000);
    }
    if (freezerAdded !== true) {
      setAddMessage("Granting Failed. Address may not freeze.");
      setTimeout(() => setAddMessage(""), 5000);
    }
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
    const freezerRole = await contract.methods.FREEZER_ROLE().call();
    const transaction = await contract.methods.removeFreezer(
      removeFreezerAddress
    );
    const txResponse = await transaction
      .send("eth_request")
      .on("transactionHash", (txHash) => {
        setRemoveMessage("Transaction Hash received. Revoking In Progress...");
        setTimeout(() => setRemoveMessage(""), 3000);
        return txHash;
      })
      .on("error", (error) => {
        console.error(error);
        setRemoveMessage(
          "Error received. Revoking aborted. Check console logs for details."
        );
        setTimeout(() => setRemoveMessage(""), 3000);
        return error;
      });
    const hasFreezer = await contract.methods
      .hasRole(freezerRole, removeFreezerAddress)
      .call();
    if (!hasFreezer === true) {
      setRemoveMessage("Revoking Complete. Address may no longer freeze.");
      setTimeout(() => setRemoveMessage(""), 3000);
    }
    if (hasFreezer === true) {
      setRemoveMessage("Revoking Failed. Address may still freeze.");
      setTimeout(() => setRemoveMessage(""), 3000);
    }
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
          <MultiActionTextInput
            val={addFreezerName}
            setVal={setAddFreezerName}
          />
          <Box sx={{ width: `1rem` }}></Box>
          <MultiActionButton
            label={"Add"}
            onClick={async () => {
              await addFreezer();
            }}
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
          <Box sx={{ width: `1rem` }}></Box>
          {removeMessage.length > 0 && (
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
          Current Freezers
        </Heading>

        <FreezerTable data={data} />
      </Box>
    </>
  );
}
