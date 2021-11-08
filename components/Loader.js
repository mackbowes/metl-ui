import { Box, Spinner } from "@chakra-ui/react";

export const Loader = () => {
  return (
    <Box
      sx={{
        display: `grid`,
        width: `100%`,
        height: `100%`,
        placeItems: `center`,
      }}
    >
      <Spinner
        size="xl"
        color="brand.orange"
        thickness="4px"
        emptyColor="gray.200"
      />
    </Box>
  );
};
