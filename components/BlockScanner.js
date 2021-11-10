import { Box, Text } from "@chakra-ui/react";
import toast from "react-hot-toast";

export default function BlockScanner(props) {
  async function copyHash() {
    await navigator.clipboard.writeText(props.txHash);
    toast.success("Hash copied to clipboard");
  }

  return (
    <Box sx={{ margin: `0 auto`, padding: `1rem` }}>
      <Text>
        Search this on your blockscanner to watch the transaction:{" "}
        <span
          style={{ color: `orange`, cursor: `pointer` }}
          onClick={async () => await copyHash()}
        >
          {props.txHash}
        </span>
      </Text>
    </Box>
  );
}
