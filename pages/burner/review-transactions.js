import { Box } from "@chakra-ui/react";
import TopBar from "../../components/TopBar";
import Page from "../../components/Page";
import Tab from "../../components/Tab";
import TabRow from "../../components/TabRow";
import ControlPanel from "../../components/ControlPanel";
import MultiActionControlLayout from "../../components/MultiActionControl/MultiActionControlLayout";
import BurnTransactionTable from "../../components/burner/BurnTransactionTable";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Page>
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
      </Page>
    </>
  );
}
