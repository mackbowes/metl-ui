import SingleActionButton from "../SingleActionControl/SingleActionButton";
import { Box, Heading } from "@chakra-ui/react";

export default function PauseTokenForm(props) {

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
        Pause Transactions
      </Heading>
      <Box
        sx={{
          backgroundColor: `white`,
          display: `flex`,
          flexDirection: `column`,
          padding: `1ex 1em`,
        }}
      >
        <SingleActionButton label={"Pause"} />
      </Box>
    </Box>
  );
}
