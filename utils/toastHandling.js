import toast from "react-hot-toast";

export default async function toastHandler(
  transaction,
  setBlockScannerContent,
  setShowBlockScanner
) {
  toast("Initiating Transaction");
  await transaction
    .send("eth_requestAccounts")
    .once("transactionHash", (txHash) => {
      setBlockScannerContent(txHash);
      setShowBlockScanner(true);
      toast("Transaction Hash received. Adding In Progress...");
    })
    .once("confirmation", () => {
      toast.success("Transaction Succeeded.");
      setTimeout(() => setShowBlockScanner(false), 10000);
    })
    .once("error", (error) => {
      console.error(error);
      toast.error("Error received: ", error?.message);
      setTimeout(() => setShowBlockScanner(false), 10000);
    });
}
