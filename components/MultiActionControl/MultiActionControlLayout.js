import { Box } from "@chakra-ui/react";

export default function SingleActionControlLayout(props) {
  return (
    <Box
      sx={{
        display: `flex`,
        flexDirection: `column`,
        width: `100%`,
        height: `100%`,
      }}
    >
      <Box>{props.children}</Box>
    </Box>
  );
}
