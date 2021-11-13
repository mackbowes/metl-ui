import { useEffect } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { useInjectedProvider } from "../contexts/InjectedProviderContext";

export default function TopBar(props) {
  const { address, injectedChain, injectedProvider } = useInjectedProvider();

  useEffect(() => {
    console.log(injectedChain);
  });

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
        {injectedChain && `${injectedChain.short_name} | `}
        {props.label}
      </Heading>
    </Box>
  );
}
