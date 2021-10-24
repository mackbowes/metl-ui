import { Box } from "@chakra-ui/react";
import TopBar from "../../components/TopBar";
import Page from "../../components/Page";
import TabRow from "../../components/TabRow";
import TabRowGroup from '../../components/TabRowGroup'
import Tab from "../../components/Tab";
import ControlPanel from "../../components/ControlPanel";
import MultiActionControlLayout from "../../components/MultiActionControl/MultiActionControlLayout";
import EditMinterControlForm from "../../components/admin/EditMinterControlForm";


export default function Home() {

  return (
    <>
      <Page>
        <TopBar label={"admin"} />
        <Box sx={{ height: `100%`, display: `grid`, placeItems: `center` }}>
          <Box>
            <TabRow>
              <TabRowGroup>
              <Tab isActive={true} clickFunction={() => null}>
                Edit Minters
              </Tab>
              <Tab isActive={false} clickFunction={() => null}>
                Edit Burners
              </Tab>
              <Tab isActive={false} clickFunction={() => null}>
                Edit Freezers
              </Tab>
              <Tab isActive={false} clickFunction={() => null}>
                Edit Pausers
              </Tab>
              </TabRowGroup>
              <TabRowGroup>
              <Tab isActive={false} clickFunction={() => null}>
                Review Transactions
              </Tab>
              <Tab isActive={false} clickFunction={() => null}>
                Send Tokens
              </Tab>
              </TabRowGroup>
            </TabRow>
            <ControlPanel>
              <MultiActionControlLayout>
                <EditMinterControlForm />
              </MultiActionControlLayout>
            </ControlPanel>
          </Box>
        </Box>
      </Page>
    </>
  );
}
