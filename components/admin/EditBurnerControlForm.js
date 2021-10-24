import {useState} from 'react'
import {Box, HStack, VStack, Heading} from '@chakra-ui/react'
import MultiActionAddressInput from '../MultiActionControl/MultiActionAddressInput'
import MultiActionTextInput from '../MultiActionControl/MultiActionTextInput'
import MultiActionButton from '../MultiActionControl/MultiActionButton'
import BurnerTable from './BurnerTable'

export default function EditBurnerControlForm(props) {

    const [addMinterAddress, setAddMinterAddress] = useState('');
    const [addMinterName, setAddMinterName] = useState('');
    const [removeMinterAddress, setRemoveMinterAddress] = useState('');

  const data = [
    {
    address: '0xBc4A2b0B65e39bAE9bedad1798B824EAf0A60639',
    name: 'Mackenzie Patrick Bowes',
    isBurner: true,
    },
    {
    address: '0xBc4A2b0B65e39bAE9bedad1798B824EAf0A60639',
    name: 'Vitalik Buterin',
    isBurner: false,
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
        }}>Add Burner</Heading>
        <Box sx={{display: `flex`, justifyContent: `flex-start`}}>
          <MultiActionAddressInput val={addMinterAddress} setVal={setAddMinterAddress}/>
          <Box sx={{width: `1rem`}}></Box>
          <MultiActionTextInput val={addMinterName} setVal={setAddMinterName} />
          <Box sx={{width: `1rem`}}></Box>
          <MultiActionButton label={'Add'}/>
        </Box>
        <Heading sx={{
            display: `block`,
            borderBottom: `1px solid black`,
            padding: `.5ex 0`,
            margin: `.5ex 0`,
            fontSize: `1.5rem`
        }}>Remove Burner</Heading>
        <Box sx={{display: `flex`, justifyContent: `flex-start`}}>
          <MultiActionAddressInput val={removeMinterAddress} setVal={setRemoveMinterAddress}/>
          <Box sx={{width: `1rem`}}></Box>
          <MultiActionButton label={'remove'}/>
        </Box>
        <Heading sx={{
            display: `block`,
            borderBottom: `1px solid black`,
            padding: `.5ex 0`,
            margin: `.5ex 0`,
            fontSize: `1.5rem`
        }}>Current Burners</Heading>
        
        <BurnerTable data={data}/>
       

    </Box>
  </>
)

}