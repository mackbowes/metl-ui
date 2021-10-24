import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";
import TopBar from "../../components/TopBar";
import Page from "../../components/Page";
import TabRow from "../../components/TabRow";
import TabRowGroup from "../../components/TabRowGroup";
import Tab from "../../components/Tab";
import ControlPanel from "../../components/ControlPanel";
import MultiActionControlLayout from "../../components/MultiActionControl/MultiActionControlLayout";
import EditPauserControlForm from "../../components/admin/EditPauserControlForm";

export default function Home() {
  const router = useRouter();

  const updateRoute = (route) => {
    router.push(route);
  };

  return (
    <>
      <Page>
        <TopBar label={"admin"} />
        <Box sx={{ height: `100%`, display: `grid`, placeItems: `center` }}>
          <Box>
            <TabRow>
              <TabRowGroup>
                <Tab
                  isActive={false}
                  clickFunction={() => updateRoute("/admin/edit-minters")}
                >
                  Edit Minters
                </Tab>
                <Tab
                  isActive={false}
                  clickFunction={() => updateRoute("/admin/edit-burners")}
                >
                  Edit Burners
                </Tab>
                <Tab
                  isActive={false}
                  clickFunction={() => updateRoute("/admin/edit-freezers")}
                >
                  Edit Freezers
                </Tab>
                <Tab
                  isActive={true}
                  clickFunction={() => null}
                >
                  Edit Pausers
                </Tab>
              </TabRowGroup>
              <TabRowGroup>
                <Tab
                  isActive={false}
                  clickFunction={() => updateRoute("/admin")}
                >
                  Review Transactions
                </Tab>
                <Tab
                  isActive={false}
                  clickFunction={() => updateRoute("/admin/send-tokens")}
                >
                  Send Tokens
                </Tab>
              </TabRowGroup>
            </TabRow>
            <ControlPanel>
              <MultiActionControlLayout>
                <EditPauserControlForm />
              </MultiActionControlLayout>
            </ControlPanel>
          </Box>
        </Box>
      </Page>
    </>
  );
}
