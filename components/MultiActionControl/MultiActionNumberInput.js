import { NumberInput, NumberInputField, Text, Box } from "@chakra-ui/react";

export default function MultiActionNumberInput(props) {
  const val = props.val;
  const setVal = props.setVal;

  return (
    <Box sx={{ margin: `.5rem 0` }}>
      <Text sx={{ fontSize: `1rem` }}>{props.label}</Text>
      <NumberInput onChange={(valueString) => setVal(valueString)} value={val}>
        <NumberInputField
          placeholder={"token amount"}
          sx={{
            backgroundColor: "#E4E4E4",
            padding: `.5rem`,
          }}
        />
      </NumberInput>
    </Box>
  );
}
