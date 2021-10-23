import { Box } from "@chakra-ui/react";

export default function ConnectWalletButton(props) {
  return (
    <>
      <Box
        bg="brand.orange"
        sx={{
          backgroudColor: "brand.orange",
          color: `white`,
          textTransform: `uppercase`,
          display: `grid`,
          placeItems: `center`,
          width: `206px`,
          height: `43px`,
          fontSize: `16px`,
          fontWeight: `700`,
          boxShadow: `0px 4px 0px rgba(0, 0, 0, 0.5)`,
          transition: `all 0.25s`,
          userSelect: `none`,
        }}
        _hover={{
          cursor: `pointer`,
          boxShadow: `0px 6px 2px rgba(0, 0, 0, 0.5)`,
          transform: `translateY(-2px)`,
        }}
        onClick={() => props.clickFunction()}
      >
        {props.children}
      </Box>
    </>
  );
}
