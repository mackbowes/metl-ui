import { Box, Text } from "@chakra-ui/react";
import toast from "react-hot-toast";
import { useInjectedProvider } from "../contexts/InjectedProviderContext";
import { useState, useEffect } from "react";

export default function BlockScanner(props) {
  const { injectedChain } = useInjectedProvider();
  const [isAvax, setIsAvax] = useState(false);
  const [isFuji, setIsFuji] = useState(false);

  useEffect(() => {
    if (injectedChain.chainId === "0xa869") {
      setIsFuji(true);
    }

    if (injectedChain.chainId === "0xa86a") {
      setIsAvax(true);
    }
  }, [injectedChain]);

  console.log(injectedChain);

  return (
    <>
      {console.log("attempting to show")}
      {isAvax && (
        // link to Avax Block Explorer
        <a
          href={`https://snowtrace.io/tx/${props.txHash}`}
          target="_blank"
          rel="noreferrer"
        >
          <BlockScannerInner />
        </a>
      )}
      {isFuji && (
        // link to Avax Fuji Block Explorer
        <a
          href={`https://testnet.snowtrace.io/tx/${props.txHash}`}
          target="_blank"
          rel="noreferrer"
        >
          <BlockScannerInner />
        </a>
      )}
    </>
  );
}

const BlockScannerInner = () => {
  return (
    <Box
      sx={{
        margin: `1rem auto`,
        padding: `1rem`,
        backgroundColor: `orange`,
        textAlign: `center`,
      }}
    >
      <Text sx={{ fontSize: `1.25rem`, textAlign: `center` }}>
        View on BlockScanner
      </Text>
    </Box>
  );
};
