import {
  Box,
  HStack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import DataTableButton from "../DataTableButton";

export default function FreezeTransactionTable(props) {
  let data = props.data;
  if (data.length < 40) {
    for (let i = 0; i < 40; i++) {
      if (typeof data[i] === "undefined") {
        data[i] = {
          address: "⠀", // special unicode character do not delet
          isFrozen: "⠀",
          time: "⠀",
        };
      }
    }
  }
    data = data.map((item, index) => {
        console.log(item.address.length);
        if (item.address.length == 42) {
        let first8 = item.address.substring(0,8);
        let last4 = item.address.substring(item.address.length - 4, item.address.length);
        return {
            address: `${first8}...${last4}`,
            isFrozen: item.isFrozen,
            time: item.time,
        }
        } else {
            return item
        }
    })

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
            <Text>Edit Freeze Status</Text>
          </Box>
          <Box>
            <Text>Time Last Updated</Text>
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
                    <Text>{entry.address}</Text>
                  </Box>
                  <Box w="145px" p="4px">
                    <Text>
                      {entry.isFrozen !== "" &&
                      typeof entry.isFrozen === "boolean" ? (
                        entry.isFrozen === true ? (
                          <DataTableButton isDisabled={false}>
                            unfreeze
                          </DataTableButton>
                        ) : ""
                      ) : (
                        ""
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
