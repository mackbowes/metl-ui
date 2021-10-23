import { Box } from "@chakra-ui/react";

export default function SingleActionControlLayout(props) {
  return (
    <Box
      sx={{
        display: `grid`,
        width: `100%`,
        height: `100%`,
        placeItems: `center`,
      }}
    >
      <Box>{props.children}</Box>
    </Box>
  );
}
