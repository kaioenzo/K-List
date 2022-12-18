import { Box, Button, Checkbox, Text } from "native-base";
import React, { useState } from "react";
import { setDoneState } from "../services/NotesService";
import { NotePropsFromDB } from "../types";

function NoteCard(data: NotePropsFromDB) {
  const [done, setDone] = useState(data.done === `TRUE` ? true : false);
  const [groupValues, setGroupValues] = useState([
    data.done === `TRUE` ? `TRUE` : `FALSE`,
  ]);

  return (
    <Box flex={1} flexDirection="row" justifyContent="flex-start" mx={8} my={4}>
      <Box>
        <Text>{data.date}</Text>
        <Checkbox.Group
          accessibilityLabel="check your activitie to did"
          onChange={(values) => {
            setGroupValues(values);
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
      <Box ml={4} flexDirection="column" flexGrow={1} shadow={2}>
        <Text>{data.title}</Text>
        <Text>{data.description}</Text>
        {done && (
          <Button
            position="absolute"
            alignSelf="flex-end"
            al
            size="xs"
            p={1}
            borderRadius="full"
            bgColor="#01cb48"
            mt={8}
          >
            <Text color={"white"} fontSize="xs" mx={1}>
              Complete
            </Text>
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default NoteCard;
