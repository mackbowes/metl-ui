import { Box } from "@chakra-ui/react";
import ConnectWalletButton from "../components/ConnectWalletButton";

export default function Home() {
  return (
    <>
      <Box
        sx={{
          display: `grid`,
          placeItems: `center`,
          backgroundColor: `white`,
          width: `100vw`,
          height: `100vh`,
          position: `absolute`,
          left: `0`,
          top: `0`,
          userSelect: `none`,
        }}
      >
        <Box>
          <img
            draggable="false"
            src="/metl2.png"
            alt="Metl Logo"
            style={{ margin: `1rem auto`, userSelect: `none` }}
          />
          <ConnectWalletButton
            clickFunction={() => {
              return null;
            }}
          >
            Connect Wallet
          </ConnectWalletButton>
        </Box>
      </Box>
    </>
  );
}
