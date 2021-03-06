import { Box, Spinner } from "@chakra-ui/react";
import TopBar from "../../components/TopBar";
import Page from "../../components/Page";
import { Loader } from "../../components/Loader";
import Tab from "../../components/Tab";
import TabRow from "../../components/TabRow";
import ControlPanel from "../../components/ControlPanel";
import SingleActionControlLayout from "../../components/SingleActionControl/SingleActionControlLayout";
import BurnTokenForm from "../../components/burner/BurnTokenForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useInjectedProvider } from "../../contexts/InjectedProviderContext";

export default function Home() {
  const { address, injectedProvider, requestWallet } = useInjectedProvider();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   setIsLoading(true);
  //   async function handleData() {
  //     if (!injectedProvider) {
  //       await requestWallet();
  //     }
  //     setIsLoading(false);
  //   }
  //   handleData();
  // }, [address, injectedProvider]);

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
        {isLoading === true && <Loader />}
        {isLoading === false && (
          <>
            <TopBar label={"burner"} />
            <Box sx={{ height: `100%`, display: `grid`, placeItems: `center` }}>
              <Box>
                <TabRow>
                  <Tab isActive={true} clickFunction={() => null}>
                    Burn Tokens
                  </Tab>
                  <Tab
                    isActive={false}
                    clickFunction={() => {
                      router.push("/burner/review-transactions");
                    }}
                  >
                    Review Transactions
                  </Tab>
                </TabRow>
                <ControlPanel>
                  <SingleActionControlLayout>
                    <BurnTokenForm />
                  </SingleActionControlLayout>
                </ControlPanel>
              </Box>
            </Box>
          </>
        )}
      </Page>
    </>
  );
}
