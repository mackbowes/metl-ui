import { useState } from "react";
import SingleActionButton from "../SingleActionControl/SingleActionButton";
import SingleActionNumberInput from "../SingleActionControl/SingleActionNumberInput";
import { Box, Heading } from "@chakra-ui/react";

export default function BurnTokenForm(props) {
  const [burnAmount, setBurnAmount] = useState();

  return (
    <Box sx={{ width: `clamp(288px, 20vw, 576px)` }}>
      <Heading
        sx={{
          borderBottom: `1px solid black`,
          fontSize: `24px`,
          fontWeight: `500`,
          padding: `.75rem 0`,
          margin: `.75rem 0`,
        }}
      >
        Burn Tokens
      </Heading>
      <Box
        sx={{
          backgroundColor: `white`,
          display: `flex`,
          flexDirection: `column`,
          padding: `1ex 1em`,
        }}
      >
        <SingleActionNumberInput
          label="Amount"
          val={burnAmount}
          setVal={setBurnAmount}
        />
        <SingleActionButton label={"Burn"} />
      </Box>
    </Box>
  );
}
