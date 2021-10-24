import {useState} from 'react'
import {Box, HStack, VStack, Heading} from '@chakra-ui/react'
import MultiActionAddressInput from '../MultiActionControl/MultiActionAddressInput'
import MultiActionTextInput from '../MultiActionControl/MultiActionTextInput'
import MultiActionButton from '../MultiActionControl/MultiActionButton'
import FreezerTable from './FreezerTable'

export default function EditFreezerControlForm(props) {

    const [addFreezerAddress, setAddFreezerAddress] = useState('');
    const [addFreezerName, setAddFreezerName] = useState('');
    const [removeFreezerAddress, setRemoveFreezerAddress] = useState('');

  const data = [
    {
    address: '0xBc4A2b0B65e39bAE9bedad1798B824EAf0A60639',
    name: 'Mackenzie Patrick Bowes',
    isFreezer: true,
    },
    {
    address: '0xBc4A2b0B65e39bAE9bedad1798B824EAf0A60639',
    name: 'Vitalik Buterin',
    isFreezer: false,
    }
  ]

return (
  <>
    <Box>
        <Heading sx={{
            display: `block`,
            borderBottom: `1px solid black`,
            fontSize: `1.5rem`,
            paddingBottom: `.5ex`,
            marginBottom: `.5ex`
        }}>Add Freezer</Heading>
        <Box sx={{display: `flex`, justifyContent: `flex-start`}}>
          <MultiActionAddressInput val={addFreezerAddress} setVal={setAddFreezerAddress}/>
          <Box sx={{width: `1rem`}}></Box>
          <MultiActionTextInput val={addFreezerName} setVal={setAddFreezerName} />
          <Box sx={{width: `1rem`}}></Box>
          <MultiActionButton label={'Add'}/>
        </Box>
        <Heading sx={{
            display: `block`,
            borderBottom: `1px solid black`,
            padding: `.5ex 0`,
            margin: `.5ex 0`,
            fontSize: `1.5rem`
        }}>Remove Freezer</Heading>
        <Box sx={{display: `flex`, justifyContent: `flex-start`}}>
          <MultiActionAddressInput val={removeFreezerAddress} setVal={setRemoveFreezerAddress}/>
          <Box sx={{width: `1rem`}}></Box>
          <MultiActionButton label={'remove'}/>
        </Box>
        <Heading sx={{
            display: `block`,
            borderBottom: `1px solid black`,
            padding: `.5ex 0`,
            margin: `.5ex 0`,
            fontSize: `1.5rem`
        }}>Current Freezers</Heading>
        
        <FreezerTable data={data}/>
       

    </Box>
  </>
)

}