import { Box, Heading } from "@chakra-ui/react";

export default function TopBar(props) {
  return (
    <Box
      sx={{
        width: `100vw`,
        display: `flex`,
        justifyContent: `space-between`,
        alignItems: `center`,
        borderBottom: `1px solid black`,
        padding: `1rem`,
      }}
    >
      <img
        src="/metl2.png"
        alt="metl"
        draggable="false"
        style={{ maxHeight: `1.5rem` }}
      />
      <Heading as="h4" sx={{ textTransform: `uppercase`, fontSize: `1.5rem` }}>
        {props.label}
      </Heading>
    </Box>
  );
}
