import { Box } from "@chakra-ui/react";

export default function SingleActionButton(props) {
  return (
    <Box
      bg="brand.orange"
      sx={{
        backgroudColor: "brand.orange",
        color: `white`,
        textTransform: `uppercase`,
        display: `inline-block`,
        fontSize: `14px`,
        fontWeight: `700`,
        boxShadow: `0px 4px 0px rgba(0, 0, 0, 0.5)`,
        transition: `all 0.25s`,
        userSelect: `none`,
        borderRadius: `4px`,
        margin: `.5rem 0`,
        padding: `.3ex 11px`,
      }}
      _hover={{
        cursor: `pointer`,
        boxShadow: `0px 6px 2px rgba(0, 0, 0, 0.5)`,
        transform: `translateY(-2px)`,
      }}
      onClick={props.onClick}
    >
      {props.label}
    </Box>
  );
}
