import { useState } from "react";
import { Box, HStack, VStack, Heading } from "@chakra-ui/react";
import MultiActionAddressInput from "../MultiActionControl/MultiActionAddressInput";
import MultiActionButton from "../MultiActionControl/MultiActionButton";
import FreezeTransactionTable from "./FreezeTransactionTable";
import { useInjectedProvider } from "../../contexts/InjectedProviderContext";
import { METLContract } from "../../utils/contract";
import Web3 from "web3";

export default function FreezerControlForm(props) {
  const { address, injectedChain, injectedProvider } = useInjectedProvider();
  const [freezeWalletTarget, setFreezeWalletTarget] = useState("");
  const [unfreezeWalletTarget, setUnfreezeWalletTarget] = useState("");
  const [addMessage, setAddMessage] = useState("");
  const [removeMessage, setRemoveMessage] = useState("");

  async function freezeUser() {
    if (!injectedChain) {
      setAddMessage(
        "Function not ready. Wait or reconnect wallet. Contact Developers if issue persists."
      );
      setTimeout(() => setAddMessage(""), 3000);
      return null;
    }
    if (freezeWalletTarget === "") {
      setAddMessage("No Address selected, transaction aborting");
      setTimeout(() => setAddMessage(""), 3000);
      return null;
    }
    if (!Web3.utils.isAddress(freezeWalletTarget)) {
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
    const frozenRole = await contract.methods.FROZEN_USER().call();
    const transaction = await contract.methods.grantRole(
      frozenRole,
      freezeWalletTarget
    );
    const txResponse = await transaction
      .send("eth_requestAccounts", { from: address })
      .on("transactionHash", (txHash) => {
        console.log(txHash);
        setAddMessage("Transaction Hash received. Adding In Progress...");
        setTimeout(() => setAddMessage(""), 3000);
        return txHash;
      })
      .once("confirmation", () => {
        setAddMessage("Transaction confirmed. Address is now frozen.");
        setTimeout(() => setAddMessage(""), 3000);
      })
      .on("error", (error) => {
        console.error(error);
        setAddMessage(
          "Error received. Adding Aborted. Check console logs for details."
        );
        setTimeout(() => setAddMessage(""), 3000);
        return error;
      });
    console.log(txResponse);
  }

  async function unfreezeUser() {
    if (!injectedChain) {
      setRemoveMessage(
        "Function not ready. Wait or reconnect wallet. Contact Developers if issue persists."
      );
      setTimeout(() => setRemoveMessage(""), 3000);
      return null;
    }
    if (unfreezeWalletTarget === "") {
      setRemoveMessage("No address selected, transaction aborting.");
      setTimeout(() => setRemoveMessage(""), 3000);
      return null;
    }
    if (!Web3.utils.isAddress(unfreezeWalletTarget)) {
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
    const transaction = await contract.methods.unfreezeUser(
      unfreezeWalletTarget
    );
    const txResponse = await transaction
      .send("eth_request")
      .on("transactionHash", (txHash) => {
        setRemoveMessage("Transaction Hash received. Revoking In Progress...");
        setTimeout(() => setRemoveMessage(""), 3000);
        return txHash;
      })
      .once("confirmation", () => {
        setRemoveMessage("Transaction confirmed. Address is now unfrozen.");
        setTimeout(() => setRemoveMessage(""), 3000);
      })
      .on("error", (error) => {
        console.error(error);
        setRemoveMessage(
          "Error received. Revoking aborted. Check console logs for details."
        );
        setTimeout(() => setRemoveMessage(""), 3000);
        return error;
      });
    console.log(txResponse);
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
          Freeze Wallet
        </Heading>
        <Box
          sx={{
            display: `flex`,
            justifyContent: `flex-start`,
            alignItems: `center`,
          }}
        >
          <MultiActionAddressInput
            val={freezeWalletTarget}
            setVal={setFreezeWalletTarget}
          />
          <Box sx={{ width: `1rem` }}></Box>
          <MultiActionButton
            label={"Freeze"}
            onClick={async () => await freezeUser()}
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
          Unfreeze Wallet
        </Heading>
        <Box
          sx={{
            display: `flex`,
            justifyContent: `flex-start`,
            alignItems: `center`,
          }}
        >
          <MultiActionAddressInput
            val={unfreezeWalletTarget}
            setVal={setUnfreezeWalletTarget}
          />
          <Box sx={{ width: `1rem` }}></Box>
          <MultiActionButton
            label={"unfreeze"}
            onClick={async () => await unfreezeUser()}
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
          Frozen Wallets
        </Heading>

        <FreezeTransactionTable data={[]} />
      </Box>
    </>
  );
}
