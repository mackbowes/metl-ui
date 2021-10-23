import { Box } from "@chakra-ui/react";
import TopBar from "../../components/TopBar";
import Page from "../../components/Page";

export default function Home() {
  return (
    <>
      <Page>
        <TopBar label={"admin"} />
      </Page>
    </>
  );
}
