import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const colors = {
  brand: {
    100: "black",
    250: "#D8D8D8",
    orange: "#FE6C17",
  },
};

export const metlTheme = extendTheme({ colors, config });
