
import { Input } from "@chakra-ui/react"

export default function MultiActionTextInput(props) {
    const val = props.val;
    const setVal = props.setVal;

    const handleChange = (d) => {
        // d for data
        setVal(d.target.value);
        // returns new data if it passes regex check, otherwise returns previous value;
    }

return (
    <Input sx={{ width: `auto`}} placeholder="name" value={val} onChange={(d) => handleChange(d)} />
)
}
