import {useState} from 'react';
import { Input } from "@chakra-ui/react"

export default function MultiActionAddressInput(props) {
    const addressRegex = /0x[a-fA-F0-9]{40}/;
    const val = props.val;
    const setVal = props.setVal;

    const handleChange = (d) => {
        // d for data
        setVal((v) => {
        // v for previous Value
        if (addressRegex(d)) {
         return d;   
        }
        return v;
        // returns new data if it passes regex check, otherwise returns previous value;
        });
    }

return (
    <Input placeholder="address" value={val} onChange={(d) => handleChange(d)} />
)
}
