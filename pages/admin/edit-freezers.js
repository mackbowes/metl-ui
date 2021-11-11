import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";
import TopBar from "../../components/TopBar";
import { Loader } from "../../components/Loader";
import Page from "../../components/Page";
import TabRow from "../../components/TabRow";
import TabRowGroup from "../../components/TabRowGroup";
import Tab from "../../components/Tab";
import ControlPanel from "../../components/ControlPanel";
import MultiActionControlLayout from "../../components/MultiActionControl/MultiActionControlLayout";
import EditFreezerControlForm from "../../components/admin/EditFreezerControlForm";
import { useEffect } from "react";
import { useInjectedProvider } from "../../contexts/InjectedProviderContext";

export default function Home() {
  const { address, injectedProvider, requestWallet } = useInjectedProvider();
  const router = useRouter();

  const updateRoute = (route) => {
    router.push(route);
  };

  useEffect(() => {
    async function handleData() {
      if (!injectedProvider) {
        await requestWallet();
      }
    }
    handleData();
  }, [address, injectedProvider]);

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
                <Tab isActive={true} clickFunction={() => null}>
                  Edit Freezers
                </Tab>
                <Tab
                  isActive={false}
                  clickFunction={() => updateRoute("/admin/edit-pausers")}
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
                <Tab
                  isActive={false}
                  clickFunction={() => updateRoute("/admin/update-pool")}
                >
                  Update Pools
                </Tab>
              </TabRowGroup>
            </TabRow>
            <ControlPanel>
              <MultiActionControlLayout>
                <EditFreezerControlForm />
              </MultiActionControlLayout>
            </ControlPanel>
          </Box>
        </Box>
      </Page>
    </>
  );
}
