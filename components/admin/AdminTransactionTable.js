import { Box, HStack, StackDivider, Text } from "@chakra-ui/react";
import DataTableButton from "../DataTableButton";

export default function AdminTransactionTable(props) {
  const data = props.data;
  if (data.length < 20) {
    for (let i = 0; i < 20; i++) {
      if (typeof data[i] === "undefined") {
        data[i] = {
          id: "⠀", // special unicode character do not delet
          from: "⠀",
          to: "⠀",
          amount: "⠀",
          type: "⠀",
          isSent: "⠀",
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
          <Box w="137px">
            <Text>To</Text>
          </Box>
          <Box w="134px">
            <Text>Amount</Text>
          </Box>
          <Box w="115px">
            <Text>Type</Text>
          </Box>
          <Box w="81px">
            <Text>Send</Text>
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
                  <Box w="129px" p="4px">
                    <Text>{entry.to}</Text>
                  </Box>
                  <Box w="126px" p="4px">
                    <Text>{entry.amount}</Text>
                  </Box>
                  <Box w="107px" p="4px">
                    <Text>{entry.type}</Text>
                  </Box>
                  <Box w="73px" p="4px">
                    <Text>
                      {entry.isSent !== "" &&
                      typeof entry.isSent === "boolean" ? (
                        entry.isSent === true ? (
                          <DataTableButton isDisabled={false}>
                            send
                          </DataTableButton>
                        ) : (
                          "⠀"
                        )
                      ) : (
                        "⠀"
                      )}
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
