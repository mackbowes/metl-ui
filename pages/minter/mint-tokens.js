import { Box } from "@chakra-ui/react";
import TopBar from "../../components/TopBar";
import Page from "../../components/Page";
import Tab from "../../components/Tab";
import TabRow from "../../components/TabRow";
import ControlPanel from "../../components/ControlPanel";
import SingleActionControlLayout from "../../components/SingleActionControl/SingleActionControlLayout";
import MintTokenForm from "../../components/minter/MintTokenForm";
import { useRouter } from "next/router";
import { useInjectedProvider } from "../../contexts/InjectedProviderContext";
import { useEffect } from "react";
import { Loader } from "../../components/Loader";

export default function Home() {
  const router = useRouter();

  const { address, injectedProvider, requestWallet } = useInjectedProvider();

  useEffect(() => {
    async function getWallet() {
      if (!injectedProvider) {
        await requestWallet();
      }
    }
    getWallet();
  }, [address, injectedProvider]);

  return (
    <>
      <Page>
        <TopBar label={"minter"} />
        <Box sx={{ height: `100%`, display: `grid`, placeItems: `center` }}>
          <Box>
            <TabRow>
              <Tab isActive={true} clickFunction={() => null}>
                Mint Tokens
              </Tab>
              <Tab
                isActive={false}
                clickFunction={() => {
                  router.push("/minter/review-transactions");
                }}
              >
                Review Transactions
              </Tab>
            </TabRow>
            <ControlPanel>
              <SingleActionControlLayout>
                <MintTokenForm />
              </SingleActionControlLayout>
            </ControlPanel>
          </Box>
        </Box>
      </Page>
    </>
  );
}
