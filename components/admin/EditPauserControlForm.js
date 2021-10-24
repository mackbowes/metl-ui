import {useState} from 'react'
import {Box, HStack, VStack, Heading} from '@chakra-ui/react'
import MultiActionAddressInput from '../MultiActionControl/MultiActionAddressInput'
import MultiActionTextInput from '../MultiActionControl/MultiActionTextInput'
import MultiActionButton from '../MultiActionControl/MultiActionButton'
import PauserTable from './PauserTable'

export default function EditPauserControlForm(props) {

    const [addPauserAddress, setAddPauserAddress] = useState('');
    const [addPauserName, setAddPauserName] = useState('');
    const [removePauserAddress, setRemovePauserAddress] = useState('');

  const data = [
    {
    address: '0xBc4A2b0B65e39bAE9bedad1798B824EAf0A60639',
    name: 'Mackenzie Patrick Bowes',
    isPauser: true,
    },
    {
    address: '0xBc4A2b0B65e39bAE9bedad1798B824EAf0A60639',
    name: 'Vitalik Buterin',
    isPauser: false,
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
        }}>Add Pauser</Heading>
        <Box sx={{display: `flex`, justifyContent: `flex-start`}}>
          <MultiActionAddressInput val={addPauserAddress} setVal={setAddPauserAddress}/>
          <Box sx={{width: `1rem`}}></Box>
          <MultiActionTextInput val={addPauserName} setVal={setAddPauserName} />
          <Box sx={{width: `1rem`}}></Box>
          <MultiActionButton label={'Add'}/>
        </Box>
        <Heading sx={{
            display: `block`,
            borderBottom: `1px solid black`,
            padding: `.5ex 0`,
            margin: `.5ex 0`,
            fontSize: `1.5rem`
        }}>Remove Pauser</Heading>
        <Box sx={{display: `flex`, justifyContent: `flex-start`}}>
          <MultiActionAddressInput val={removePauserAddress} setVal={setRemovePauserAddress}/>
          <Box sx={{width: `1rem`}}></Box>
          <MultiActionButton label={'remove'}/>
        </Box>
        <Heading sx={{
            display: `block`,
            borderBottom: `1px solid black`,
            padding: `.5ex 0`,
            margin: `.5ex 0`,
            fontSize: `1.5rem`
        }}>Current Pausers</Heading>
        
        <PauserTable data={data}/>
       

    </Box>
  </>
)

}