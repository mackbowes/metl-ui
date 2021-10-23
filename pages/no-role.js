import { Box, Heading } from "@chakra-ui/react";

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
          <Heading as="h3" fontSize="1.5rem">
            You have not yet been assigned a role.
          </Heading>
        </Box>
      </Box>
    </>
  );
}
