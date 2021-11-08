import { Input, Box, Text } from "@chakra-ui/react";

export default function SingleActionAddressInput(props) {
  const addressRegex = /0x[a-fA-F0-9]{40}/;
  const val = props.val;
  const setVal = props.setVal;

  const handleChange = (d) => {
    // d for data
    let previousValue = val;
    console.log(addressRegex.test(d.target.value));
    if (addressRegex.test(d.target.value) || d.target.value === "") {
      previousValue = d.target.value;
    }

    setVal(previousValue);
    // returns new data if it passes regex check, otherwise returns previous value;
  };

  return (
    <Box sx={{ margin: `.5rem 0` }}>
      <Text sx={{ fontSize: `1rem` }}>{props.label}</Text>

      <Input
        sx={{ backgroundColor: "#E4E4E4", padding: `.5rem` }}
        placeholder="address"
        value={val}
        onChange={(d) => handleChange(d)}
      />
    </Box>
  );
}
