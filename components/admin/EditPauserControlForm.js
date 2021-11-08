import { useState } from "react";
import { Box, HStack, VStack, Heading } from "@chakra-ui/react";
import MultiActionAddressInput from "../MultiActionControl/MultiActionAddressInput";
import MultiActionTextInput from "../MultiActionControl/MultiActionTextInput";
import MultiActionButton from "../MultiActionControl/MultiActionButton";
import PauserTable from "./PauserTable";
import { useInjectedProvider } from "../../contexts/InjectedProviderContext";
import { METLContract } from "../../utils/contract";
import Web3 from "web3";

export default function EditPauserControlForm(props) {
  const { address, injectedChain, injectedProvider } = useInjectedProvider();
  const [addPauserAddress, setAddPauserAddress] = useState("");
  const [addPauserName, setAddPauserName] = useState("");
  const [removePauserAddress, setRemovePauserAddress] = useState("");
  const [addMessage, setAddMessage] = useState("");
  const [removeMessage, setRemoveMessage] = useState("");

  async function addPauser() {
    if (!injectedChain) {
      setAddMessage(
        "Function not ready. Wait or reconnect wallet. Contact Developers if issue persists."
      );
      setTimeout(() => setAddMessage(""), 3000);
      return null;
    }
    if (addPauserAddress === "") {
      setAddMessage("No Pauser address selected, transaction aborting");
      setTimeout(() => setAddMessage(""), 3000);
      return null;
    }
    const contract = METLContract(
      injectedChain.chainId,
      address,
      injectedProvider
    );
    if (!Web3.utils.isAddress(addPauserAddress)) {
      setAddMessage(
        "Address incorrectly formatted. Check your input before resubmitting."
      );
      setTimeout(() => setAddMessage(""), 3000);
      return null;
    }
    const pauserRole = await contract.methods.PAUSER_ROLE().call();
    const transaction = await contract.methods.addPauser(addPauserAddress);
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
    const pauserAdded = await contract.methods
      .hasRole(pauserRole, addPauserAddress)
      .call();
    if (pauserAdded === true) {
      setAddMessage("Granting complete. Address may now pause.");
      setTimeout(() => setAddMessage(""), 5000);
    }
    if (pauserAdded !== true) {
      setAddMessage("Granting Failed. Address may not pause.");
      setTimeout(() => setAddMessage(""), 5000);
    }
  }

  async function removePauser() {
    if (!injectedChain) {
      setRemoveMessage(
        "Function not ready. Wait or reconnect wallet. Contact Developers if issue persists."
      );
      setTimeout(() => setRemoveMessage(""), 3000);
      return null;
    }
    if (removePauserAddress === "") {
      setRemoveMessage("No address selected, transaction aborting.");
      setTimeout(() => setRemoveMessage(""), 3000);
      return null;
    }
    if (!Web3.utils.isAddress(removePauserAddress)) {
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
    const PauserRole = await contract.methods.PAUSER_ROLE().call();
    const transaction = await contract.methods.removePauser(
      removePauserAddress
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
    const hasPauser = await contract.methods
      .hasRole(PauserRole, removePauserAddress)
      .call();
    if (!hasPauser === true) {
      setRemoveMessage("Revoking Complete. Address may no longer pause.");
      setTimeout(() => setRemoveMessage(""), 3000);
    }
    if (hasPauser === true) {
      setRemoveMessage("Revoking Failed. Address may no still pause.");
      setTimeout(() => setRemoveMessage(""), 3000);
    }
  }

  const data = [
    {
      address: "0xBc4A2b0B65e39bAE9bedad1798B824EAf0A60639",
      name: "Mackenzie Patrick Bowes",
      isPauser: true,
    },
    {
      address: "0xBc4A2b0B65e39bAE9bedad1798B824EAf0A60639",
      name: "Vitalik Buterin",
      isPauser: false,
    },
  ];

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
          <MultiActionTextInput val={addPauserName} setVal={setAddPauserName} />
          <Box sx={{ width: `1rem` }}></Box>
          <MultiActionButton
            label={"Add"}
            onClick={async () => {
              await addPauser();
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
          Current Pausers
        </Heading>

        <PauserTable data={data} />
      </Box>
    </>
  );
}
