import { Box } from "@chakra-ui/react";

export default function Page(props) {
  return (
    <Box
      sx={{
        display: `flex`,
        flexFlow: `column nowrap`,
        height: `100vh`,
        width: `100vw`,
        margin: `0`,
        padding: `0`,
      }}
    >
      {props.children}
    </Box>
  );
}
