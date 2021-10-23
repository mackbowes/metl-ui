import { Box } from "@chakra-ui/react";

export default function TabRow(props) {
  return (
    <Box
      sx={{
        display: `flex`,
        justifyContent: `space-between`,
      }}
    >
      {props.children}
    </Box>
  );
}
