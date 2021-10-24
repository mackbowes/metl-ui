import { Box } from "@chakra-ui/react";
import TopBar from "../../components/TopBar";
import Page from "../../components/Page";
import Tab from "../../components/Tab";
import TabRow from "../../components/TabRow";
import ControlPanel from "../../components/ControlPanel";
import MultiActionControlLayout from "../../components/MultiActionControl/MultiActionControlLayout";
import FreezerControlForm from "../../components/freezer/FreezerControlForm";


export default function Home() {

  return (
    <>
      <Page>
        <TopBar label={"freezer"} />
        <Box sx={{ height: `100%`, display: `grid`, placeItems: `center` }}>
          <Box>
            <TabRow>
              <Tab isActive={true} clickFunction={() => null}>
                Freeze Transactions
              </Tab>
            </TabRow>
            <ControlPanel>
              <MultiActionControlLayout>
                <FreezerControlForm />
              </MultiActionControlLayout>
            </ControlPanel>
          </Box>
        </Box>
      </Page>
    </>
  );
}
