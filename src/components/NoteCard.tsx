import { Box, Checkbox, Text } from "native-base";
import React, { useState } from "react";
import { setDoneState } from "../services/NotesService";
import { NotePropsFromDB } from "../types";

function NoteCard(data: NotePropsFromDB) {
  const [done, setDone] = useState(data.done === `TRUE` ? true : false);
  const [groupValues, setGroupValues] = useState([
    data.done === `TRUE` ? `TRUE` : `FALSE`,
  ]);
  console.log(`on render:${groupValues}`);
  return (
    <Box flex={1} flexDirection="row" justifyContent="flex-start" mx={8}>
      <Box>
        <Text>{data.date}</Text>
        <Checkbox.Group
          accessibilityLabel="check your activitie to did"
          onChange={(values) => {
            setGroupValues(values);
            console.log(`on click:${groupValues}`);
            if (groupValues.find((v) => v === `TRUE`)) {
              setDoneState(false, data.id);
              setDone(false);
            } else {
              setDone(true);
              setDoneState(true, data.id);
            }
          }}
          value={groupValues}
        >
          <Checkbox
            value="TRUE"
            my={2}
            accessibilityLabel={data.title}
            isChecked={done}
          />
        </Checkbox.Group>
      </Box>
      <Box ml={4} flexDirection="column" flexGrow={1}>
        <Text>{data.title}</Text>
        <Text>{data.description}</Text>
      </Box>
      <Box>
        {/* <Popover
        trigger={(triggerProps) => {
          return (
            <Icon {...triggerProps} as={<AntDesign name="checkcircle" />} />
          );
        }}
      >
        <Popover.Content accessibilityLabel="Delete Customerd" w="56">
          <Popover.Arrow />
          <Popover.CloseButton />
          <Popover.Header>Delete Customer</Popover.Header>
          <Popover.Body>
            This will remove all data relating to Alex. This action cannot be
            reversed. Deleted data can not be recovered.
          </Popover.Body>
          <Popover.Footer justifyContent="flex-end">
            <Button.Group space={2}>
              <Button colorScheme="coolGray" variant="ghost">
                Cancel
              </Button>
              <Button colorScheme="danger">Delete</Button>
            </Button.Group>
          </Popover.Footer>
        </Popover.Content>
      </Popover> */}
      </Box>
    </Box>
  );
}

export default NoteCard;
