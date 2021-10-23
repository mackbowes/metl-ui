import {
  Box,
  HStack,
  VStack,
  StackDivider,
  Heading,
  Text,
} from "@chakra-ui/react";

export default function MintTransactionTable(props) {
  const data = props.data;
  if (data.length < 40) {
    for (let i = 0; i < 40; i++) {
      if (typeof data[i] === "undefined") {
        data[i] = {
          id: "⠀", // special unicode character do not delet
          from: "⠀",
          amount: "⠀",
          minted: "⠀",
          time: "⠀",
        };
      }
    }
  }

  return (
    <>
      <Box>
        <HStack
          sx={{
            borderBottom: `1px solid black`,
            padding: `1rem 0`,
            margin: `1rem 0`,
            fontSize: `1rem`,
          }}
        >
          <Box w="137px">
            <Text>Transaction ID</Text>
          </Box>
          <Box w="137px">
            <Text>From</Text>
          </Box>
          <Box w="134px">
            <Text>Amount</Text>
          </Box>
          <Box w="115px">
            <Text>Minted</Text>
          </Box>
          <Box w="81px">
            <Text>Mint</Text>
          </Box>
          <Box>
            <Text>Time</Text>
          </Box>
        </HStack>
        <Box
          style={{ maxHeight: `55vh`, overflowY: `scroll` }}
          css={{
            "&::-webkit-scrollbar": {
              width: `16px`,
              backgroundColor: `black`,
              borderRadius: `16px`,
            },
            "&::-webkit-scrollbar-track": {
              padding: `1rem`,
              borderRadius: `16px`,
            },
            "&::-webkit-scrollbar-thumb": {
              background: `#FE6C17`,
              borderRadius: `16px`,
              margin: `1rem`,
              height: `16px`,
            },
          }}
        >
          <Box>
            {data.map((entry, index) => {
              const bgColor = (index + 1) % 2 == 0 ? "transparent" : "#C4C4C4";
              return (
                <HStack
                  bg={bgColor}
                  w="100%"
                  sx={{ margin: `0` }}
                  key={`${entry}--${index}`}
                  divider={<StackDivider borderColor="rgba(0,0,0,0.25)" />}
                >
                  <Box w="129px" p="4px">
                    <Text>{entry.id}</Text>
                  </Box>
                  <Box w="129px" p="4px">
                    <Text>{entry.from}</Text>
                  </Box>
                  <Box w="126px" p="4px">
                    <Text>{entry.amount}</Text>
                  </Box>
                  <Box w="107px" p="4px">
                    <Text>{entry.minted}</Text>
                  </Box>
                  <Box w="73px" p="4px">
                    <Text>
                      {console.log(typeof entry.minted)}
                      {entry.minted !== ""
                        ? typeof entry.minted === "bool" &&
                          entry.minted === true
                          ? "mint btn"
                          : "dm btn"
                        : ""}
                    </Text>
                  </Box>
                  <Box p="4px">
                    <Text>{entry.time}</Text>
                  </Box>
                </HStack>
              );
            })}
          </Box>
        </Box>
      </Box>
    </>
  );
}
