import { Box } from "@chakra-ui/react";
export default function DataTableButton(props) {
  const thisFunction = props.isDisabled
    ? () => null
    : () => props.clickFunction();
  const thisBackground = props.isDisabled ? "#8a8a8a" : "#FE6C17";
  const thisHover = props.isDisabled
    ? {
        cursor: `not-allowed`,
      }
    : {
        cursor: `pointer`,
        boxShadow: `0px 4px 1px rgba(0, 0, 0, 0.5)`,
        transform: `translateY(-2px)`,
      };

  return (
    <Box
      sx={{
        backgroundColor: thisBackground,
        color: `white`,
        textTransform: `uppercase`,
        display: `grid`,
        placeItems: `center`,
        width: `60px`,
        height: `18px`,
        fontSize: `14px`,
        lineHeight: `0`,
        fontWeight: `700`,
        boxShadow: `0px 2px 0px rgba(0, 0, 0, 0.5)`,
        transition: `all 0.25s`,
        userSelect: `none`,
        margin: `0 auto`,
        borderRadius: `4px`,
      }}
      _hover={thisHover}
      onClick={() => thisFunction()}
    >
      {props.children}
    </Box>
  );
}
