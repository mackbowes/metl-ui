import ERC_20 from "../contracts/METL.json";

export const LOCAL_ABI = Object.freeze({
  ERC_20,
});

export const getLocalABI = (contract) => LOCAL_ABI[contract.abiName];
