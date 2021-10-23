import { Box } from "@chakra-ui/react";

export default function Tab(props) {
  return (
    <>
      {props.isActive ? (
        <Box
          bg="brand.250"
          sx={{
            padding: `.53125rem 1rem`,
            fontSize: `1rem`,
            borderRadius: `8px 8px 0 0`,
            border: `1px solid black`,
            borderBottom: `1px solid #D8D8D8`,
            transform: `translateY(1px)`,
            userSelect: `none`,
          }}
          onClick={() => props.clickFunction()}
        >
          {props.children}
        </Box>
      ) : (
        <Box
          bg="white"
          sx={{
            padding: `.5rem 1rem`,
            fontSize: `1rem`,
            borderRadius: `8px 8px 0 0`,
            border: `1px solid black`,
            transform: `translateY(1px)`,
            userSelect: `none`,
          }}
          _hover={{ cursor: `pointer` }}
          onClick={() => props.clickFunction()}
        >
          {props.children}
        </Box>
      )}
    </>
  );
}
