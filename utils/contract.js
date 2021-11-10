import Web3 from "web3";
import ERC_20 from "../contracts/METL.json";
import { chainByID } from "./chain";

export const createContract = ({ address, abi, chainID, web3 }) => {
  if (!web3) {
    const rpcUrl = chainByID(chainID).rpc_url;
    web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));
  }

  return new web3.eth.Contract(abi, address);
};

export const METLContract = (chainID, address, web3) => {
  let contractAddress;
  if (!web3) {
    const rpcUrl = chainByID(chainID).rpc_url;
    const web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));
  }

  // Rinkeby
  contractAddress = "0x8d38163515DA8D997E63230Fb7c3375dF5274294";

  if (chainID === "0x43114") {
    // AVAX C-Chain
    contractAddress = "0x10bd0B8034B80B78513725ED83B38AB193Cf06b5";
  }

  if (chainID === "0x43113") {
    // FUJI Avax Testnet
    contractAddress = "0x8d38163515DA8D997E63230Fb7c3375dF5274294";
  }

  return new web3.eth.Contract(ERC_20, contractAddress, {
    from: address,
  });
};
