import { useRouter } from "next/router";
import { Box, Text } from "@chakra-ui/react";
import TopBar from "../../components/TopBar";
import { Loader } from "../../components/Loader";
import Page from "../../components/Page";
import TabRow from "../../components/TabRow";
import TabRowGroup from "../../components/TabRowGroup";
import Tab from "../../components/Tab";
import ControlPanel from "../../components/ControlPanel";
import SingleActionControlLayout from "../../components/SingleActionControl/SingleActionControlLayout";
import SendTokenForm from "../../components/admin/SendTokenForm";
import { useEffect } from "react";
import { useInjectedProvider } from "../../contexts/InjectedProviderContext";

export default function Home() {
  const { address, injectedChain, injectedProvider, requestWallet } =
    useInjectedProvider();
  const router = useRouter();

  const updateRoute = (route) => {
    router.push(route);
  };

  useEffect(() => {
    async function handleData() {
      if (!injectedProvider) {
        await requestWallet();
      }
      if (injectedChain) {
        console.log("chainID: ", injectedChain);
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
                <Tab isActive={true} clickFunction={() => null}>
                  Send Tokens
                </Tab>
                <Tab
                  isActive={false}
                  clickFunction={() => updateRoute("/admin/update-pool")}
                >
                  Update Pool
                </Tab>
              </TabRowGroup>
            </TabRow>
            <ControlPanel>
              <SingleActionControlLayout>
                <Text>
                  Log In To The Multisig You Want To Transfer Tokens From
                </Text>
                <Box
                  sx={{
                    padding: `1rem`,
                    margin: `1rem auto`,
                    border: `1px solid black`,
                    textAlign: `center`,
                    transition: `all 0.25s`,
                  }}
                  _hover={{
                    cursor: `pointer`,
                    backgroundColor: `black`,
                    color: `white`,
                  }}
                >
                  {/* This app is Avalanche native by default */}
                  {injectedChain.chain === "AVAX" ? (
                    <a
                      href="https://multisig.pangolin.exchange/"
                      target="_blank"
                    >
                      Open Pangolin
                    </a>
                  ) : (
                    <a href="https://gnosis-safe.io/" target="_blank">
                      Open Gnosis
                    </a>
                  )}
                </Box>
              </SingleActionControlLayout>
            </ControlPanel>
          </Box>
        </Box>
      </Page>
    </>
  );
}
