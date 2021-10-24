
import { Input } from "@chakra-ui/react"

export default function MultiActionAddressInput(props) {
    const addressRegex = /0x[a-fA-F0-9]{40}/;
    const val = props.val;
    const setVal = props.setVal;

    const handleChange = (d) => {
        // d for data
        let previousValue = val;
        console.log(val);
        console.log(d.target.value);
        if (addressRegex.test(d.target.value)) {
            previousValue = d.target.value;
        }

        setVal(previousValue);
        // returns new data if it passes regex check, otherwise returns previous value;
    }

return (
    <Input sx={{minWidth: `44ch`, width: `auto`}} placeholder="address" value={val} onChange={(d) => handleChange(d)} />
)
}
