import { Box } from "@chakra-ui/react";
import TopBar from "../../components/TopBar";
import Page from "../../components/Page";
import Tab from "../../components/Tab";
import TabRow from "../../components/TabRow";
import ControlPanel from "../../components/ControlPanel";
import SingleActionControlLayout from "../../components/SingleActionControl/SingleActionControlLayout";
import BurnTokenForm from "../../components/burner/BurnTokenForm";
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
      </Page>
    </>
  );
}
