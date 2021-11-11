import { Input } from "@chakra-ui/react";

export default function MultiActionAddressInput(props) {
  const addressRegex = /0x[a-fA-F0-9]{40}/;
  const val = props.val;
  const setVal = props.setVal;

  const handleChange = (d) => {
    // d for data
    let previousValue = val;
    if (addressRegex.test(d.target.value) || d.target.value === "") {
      previousValue = d.target.value;
    }

    setVal(previousValue);
    // returns new data if it passes regex check, otherwise returns previous value;
  };

  return (
    <Input
      sx={{
        minWidth: `50ch`,
        width: `auto`,
        backgroundColor: `rgba(0,0,0,0.05)`,
        border: `2px solid transparent`,
      }}
      css={{
        "&::placeholder": {
          color: `rgba(0,0,0,0.6)`,
        },
      }}
      _focus={{
        border: "2px solid #FE6C17",
      }}
      placeholder="address"
      value={val}
      onChange={(d) => handleChange(d)}
    />
  );
}
