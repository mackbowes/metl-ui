import { Box } from "@chakra-ui/react";

export default function ControlPanel(props) {
  return (
    <Box
      bg="brand.250"
      sx={{
        width: `90vw`,
        height: `70vh`,
        padding: `1rem`,
        border: `1px solid black`,
      }}
    >
      {props.children}
    </Box>
  );
}
