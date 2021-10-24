import {useState} from 'react'
import {Box, HStack, VStack, Heading} from '@chakra-ui/react'
import MultiActionAddressInput from '../MultiActionControl/MultiActionAddressInput'
import MultiActionButton from '../MultiActionControl/MultiActionButton'
import FreezeTransactionTable from './FreezeTransactionTable'

export default function FreezerControlForm(props) {

    const [freezeWalletTarget, setFreezeWalletTarget] = useState('');
    const [unfreezeWalletTarget, setUnfreezeWalletTarget] = useState('');

return (
  <>
    <Box>
        <Heading sx={{
            display: `block`,
            borderBottom: `1px solid black`,
            fontSize: `1.5rem`,
            paddingBottom: `.5ex`,
            marginBottom: `.5ex`
        }}>Freeze Wallet</Heading>
        <Box sx={{display: `flex`, justifyContent: `flex-start`}}>
          <MultiActionAddressInput val={freezeWalletTarget} setVal={setFreezeWalletTarget}/>
          <Box sx={{width: `1rem`}}></Box>
          <MultiActionButton label={'Freeze'}/>
        </Box>
        <Heading sx={{
            display: `block`,
            borderBottom: `1px solid black`,
            padding: `.5ex 0`,
            margin: `.5ex 0`,
            fontSize: `1.5rem`
        }}>Unfreeze Wallet</Heading>
        <Box sx={{display: `flex`, justifyContent: `flex-start`}}>
          <MultiActionAddressInput val={unfreezeWalletTarget} setVal={setUnfreezeWalletTarget}/>
          <Box sx={{width: `1rem`}}></Box>
          <MultiActionButton label={'unfreeze'}/>
        </Box>
        <Heading sx={{
            display: `block`,
            borderBottom: `1px solid black`,
            padding: `.5ex 0`,
            margin: `.5ex 0`,
            fontSize: `1.5rem`
        }}>Frozen Wallets</Heading>
        
        <FreezeTransactionTable data={[]}/>
       

    </Box>
  </>
)

}