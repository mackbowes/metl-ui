import { Box, HStack, StackDivider, Text } from "@chakra-ui/react";
import DataTableButton from "../DataTableButton";

export default function PauserTable(props) {
  let data = props.data;
  if (data.length < 10) {
    for (let i = 0; i < 10; i++) {
      if (typeof data[i] === "undefined") {
        data[i] = {
          address: "⠀", // special unicode character do not delet
          name: "⠀",
          isPauser: "⠀",
        };
      }
    }
  }
  data = data.map((item, index) => {
    if (item.name.length > 18) {
      item.name = item.name.substring(0, 15);
      item.name += `...`;
    }
    if (item.address.length == 42) {
      let first8 = item.address.substring(0, 8);
      let last4 = item.address.substring(
        item.address.length - 4,
        item.address.length
      );
      return {
        address: `${first8}...${last4}`,
        name: item.name,
        isPauser: item.isPauser,
      };
    } else {
      return item;
    }
  });

  return (
    <>
      <Box>
        <HStack
          sx={{
            borderBottom: `1px solid black`,
            padding: `.5rem 0`,
            margin: `.5rem 0`,
            fontSize: `1rem`,
          }}
        >
          <Box w="156px">
            <Text>Address</Text>
          </Box>
          <Box w="161px">
            <Text>Name</Text>
          </Box>
          <Box>
            <Text>Edit Pauser Status</Text>
          </Box>
        </HStack>
        <Box
          style={{ maxHeight: `24vh`, overflowY: `scroll` }}
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
                  <Box w="140px" p="4px">
                    <Text>{entry.isPauser === true && entry.address}</Text>
                  </Box>
                  <Box w="145px" p="4px">
                    <Text>{entry.isPauser === true && entry.name}</Text>
                  </Box>
                  <Box w="145px" p="4px">
                    <Text>
                      {entry.isPauser !== "" &&
                      typeof entry.isPauser === "boolean" ? (
                        entry.isPauser === true ? (
                          <DataTableButton isDisabled={false}>
                            remove
                          </DataTableButton>
                        ) : (
                          "⠀"
                        )
                      ) : (
                        "⠀"
                      )}
                    </Text>
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
