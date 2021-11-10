import { Box } from "@chakra-ui/react";
import TopBar from "../../components/TopBar";
import Page from "../../components/Page";
import { Loader } from "../../components/Loader";
import Tab from "../../components/Tab";
import TabRow from "../../components/TabRow";
import ControlPanel from "../../components/ControlPanel";
import MultiActionControlLayout from "../../components/MultiActionControl/MultiActionControlLayout";
import BurnTransactionTable from "../../components/burner/BurnTransactionTable";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useInjectedProvider } from "../../contexts/InjectedProviderContext";

export default function Home() {
  const { address, injectedChain, injectedProvider, requestWallet } =
    useInjectedProvider();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   setIsLoading(true);
  //   async function handleData() {
  //     if (!injectedProvider) {
  //       await requestWallet();
  //     }
  //     if (router && address && injectedChain && injectedProvider) {
  //       const burnerStatus = await isBurner({
  //         address,
  //         injectedChain,
  //         injectedProvider,
  //       });
  //       if (!burnerStatus) {
  //         router.push("/");
  //       }
  //       setIsLoading(burnerStatus);
  //     }
  //     if (!address || !injectedChain || !injectedProvider) {
  //       router.push("/");
  //     }
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
                  <Tab
                    isActive={false}
                    clickFunction={() => {
                      router.push("/burner/burn-tokens");
                    }}
                  >
                    Burn Tokens
                  </Tab>
                  <Tab isActive={true} clickFunction={() => null}>
                    Review Transactions
                  </Tab>
                </TabRow>
                <ControlPanel>
                  <MultiActionControlLayout>
                    <BurnTransactionTable data={[]} />
                  </MultiActionControlLayout>
                </ControlPanel>
              </Box>
            </Box>
          </>
        )}
      </Page>
    </>
  );
}
