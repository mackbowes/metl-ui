import { Box } from "@chakra-ui/react";
import TopBar from "../../components/TopBar";
import Page from "../../components/Page";
import { Loader } from "../../components/Loader";
import Tab from "../../components/Tab";
import TabRow from "../../components/TabRow";
import TabRowGroup from "../../components/TabRowGroup";
import ControlPanel from "../../components/ControlPanel";
import SingleActionControlLayout from "../../components/SingleActionControl/SingleActionControlLayout";
import UpdatePoolForm from "../../components/admin/UpdatePoolForm";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useInjectedProvider } from "../../contexts/InjectedProviderContext";

export default function Home() {
  const { address, injectedChain, injectedProvider } = useInjectedProvider();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

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
                <Tab
                  isActive={false}
                  clickFunction={() => updateRoute("/admin/edit-freezers")}
                >
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
                <Tab isActive={true} clickFunction={() => null}>
                  Send Tokens
                </Tab>
              </TabRowGroup>
            </TabRow>
            <ControlPanel>
              <SingleActionControlLayout>
                <UpdatePoolForm />
              </SingleActionControlLayout>
            </ControlPanel>
          </Box>
        </Box>
      </Page>
    </>
  );
}
