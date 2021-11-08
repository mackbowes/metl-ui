import { useState } from "react";
import { Box, HStack, VStack, Heading } from "@chakra-ui/react";
import MultiActionAddressInput from "../MultiActionControl/MultiActionAddressInput";
import MultiActionTextInput from "../MultiActionControl/MultiActionTextInput";
import MultiActionButton from "../MultiActionControl/MultiActionButton";
import MinterTable from "./MinterTable";
import { useInjectedProvider } from "../../contexts/InjectedProviderContext";
import { METLContract } from "../../utils/contract";
import Web3 from "web3";

export default function EditMinterControlForm(props) {
  const { address, injectedChain, injectedProvider } = useInjectedProvider();
  const [addMinterAddress, setAddMinterAddress] = useState("");
  const [addMinterName, setAddMinterName] = useState("");
  const [removeMinterAddress, setRemoveMinterAddress] = useState("");
  const [addMessage, setAddMessage] = useState("");
  const [removeMessage, setRemoveMessage] = useState("");

  const data = [
    {
      address: "0xBc4A2b0B65e39bAE9bedad1798B824EAf0A60639",
      name: "Mackenzie Patrick Bowes",
      isMinter: true,
    },
    {
      address: "0xBc4A2b0B65e39bAE9bedad1798B824EAf0A60639",
      name: "Vitalik Buterin",
      isMinter: false,
    },
  ];

  async function addMinter() {
    if (!injectedChain) {
      setAddMessage(
        "Function not ready. Wait or reconnect wallet. Contact Developers if issue persists."
      );
      setTimeout(() => setAddMessage(""), 3000);
      return null;
    }
    if (addMinterAddress === "") {
      setAddMessage("No Minter address selected, transaction aborting");
      setTimeout(() => setAddMessage(""), 3000);
      return null;
    }
    const contract = METLContract(
      injectedChain.chainId,
      address,
      injectedProvider
    );
    const minterRole = await contract.methods.MINTER_ROLE().call();
    if (!Web3.utils.isAddress(addMinterAddress)) {
      setAddMessage(
        "Address incorrectly formatted. Check your input before resubmitting."
      );
      setTimeout(() => setAddMessage(""), 3000);
      return null;
    }
    const transaction = await contract.methods.addMinter(addMinterAddress);
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
    const minterAdded = await contract.methods
      .hasRole(minterRole, addMinterAddress)
      .call();
    if (minterAdded === true) {
      setAddMessage("Granting complete. Address may now mint.");
      setTimeout(() => setAddMessage(""), 5000);
    }
    if (minterAdded !== true) {
      setAddMessage("Granting Failed. Address may not mint.");
      setTimeout(() => setAddMessage(""), 5000);
    }
  }

  async function removeMinter() {
    if (!injectedChain) {
      setRemoveMessage(
        "Function not ready. Wait or reconnect wallet. Contact Developers if issue persists."
      );
      setTimeout(() => setRemoveMessage(""), 3000);
      return null;
    }
    if (removeMinterAddress === "") {
      setRemoveMessage("No address selected, transaction aborting.");
      setTimeout(() => setRemoveMessage(""), 3000);
      return null;
    }
    if (!Web3.utils.isAddress(removeMinterAddress)) {
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
    const minterRole = await contract.methods.MINTER_ROLE().call();
    const transaction = await contract.methods.removeMinter(
      removeMinterAddress
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
    const hasMinter = await contract.methods
      .hasRole(minterRole, removeMinterAddress)
      .call();
    if (!hasMinter === true) {
      setRemoveMessage("Revoking Complete. Address may no longer mint.");
      setTimeout(() => setRemoveMessage(""), 3000);
    }
    if (hasMinter === true) {
      setRemoveMessage("Revoking Failed. Address may still mint.");
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
          <MultiActionTextInput val={addMinterName} setVal={setAddMinterName} />
          <Box sx={{ width: `1rem` }}></Box>
          <MultiActionButton
            label={"Add"}
            onClick={async () => {
              await addMinter();
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
          Current Minters
        </Heading>

        <MinterTable data={data} />
      </Box>
    </>
  );
}
