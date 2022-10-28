import { Entypo, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import {
  Box,
  Button,
  FormControl,
  Heading,
  HStack,
  Icon,
  Input,
  ScrollView,
  Switch,
  Text,
  TextArea,
  VStack,
} from "native-base";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Dimensions } from "react-native";
export default function CreateTask() {
  const windowHeight = Dimensions.get("window").height;
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      taskName: "",
      taskDescription: "",
      date: new Date().toDateString(),
      notifyMe: true,
    },
  });

  type formProps = {
    taskName: string;
    //TODO -SEND INSTANCE OF DAYJS
    date: string;
    taskDescription: string;
    notifyMe: boolean;
  };
  console.log(errors.notifyMe);
  const onSubmit = (data: formProps) => console.log(data);

  return (
    <ScrollView backgroundColor="white">
      <Box flex={1} backgroundColor="indigo.600">
        <VStack
          safeAreaX
          flex={1}
          mt={(windowHeight / 100) * 13}
          backgroundColor="white"
          borderTopRadius={50}
        >
          <Box flex={1}>
            <Box mt={5} mx={6}>
              <Heading my={4}>Create a new task</Heading>
              <FormControl isRequired isInvalid={"taskName" in errors}>
                <Controller
                  name="taskName"
                  control={control}
                  rules={{ required: "Field is required", minLength: 1 }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      type="text"
                      variant="underlined"
                      placeholder="Task Name"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      InputLeftElement={
                        <Icon
                          as={<FontAwesome5 name="list-ul" />}
                          size={5}
                          mr={3}
                        />
                      }
                      my={4}
                    />
                  )}
                />
                <FormControl.ErrorMessage>
                  {errors.taskName?.message}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl isRequired isInvalid={"taskDescription" in errors}>
                <Controller
                  name="taskDescription"
                  control={control}
                  rules={{ required: "Field is required", minLength: 1 }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextArea
                      type="text"
                      variant="underlined"
                      placeholder="Task description"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      p={0}
                      textAlignVertical="center"
                      InputLeftElement={
                        <Icon as={<Entypo name="text" />} size={5} mr={3} />
                      }
                      my={4}
                    />
                  )}
                />
                <FormControl.ErrorMessage>
                  {errors.taskDescription?.message}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl isRequired isInvalid={"date" in errors}>
                <Controller
                  name="date"
                  control={control}
                  rules={{ required: "Field is required" }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      type="text"
                      variant="underlined"
                      placeholder="Time"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      InputLeftElement={
                        <Icon
                          as={<MaterialIcons name="access-alarm" />}
                          size={5}
                          mr={3}
                        />
                      }
                      my={4}
                    />
                  )}
                />
                <FormControl.ErrorMessage>
                  {errors.date?.message}
                </FormControl.ErrorMessage>
              </FormControl>

              <FormControl>
                <Controller
                  name="notifyMe"
                  control={control}
                  render={({ field: { value } }) => (
                    <HStack
                      alignItems="center"
                      justifyContent="space-between"
                      mx={4}
                    >
                      <Text>Notify me</Text>
                      <Switch
                        defaultIsChecked
                        size="md"
                        onValueChange={(state) => setValue("notifyMe", state)}
                        value={value}
                      />
                    </HStack>
                  )}
                />
              </FormControl>

              {/* <HStack alignItems="center" justifyContent="space-between" mx={4}>
                <Text>Notify me</Text>
                <Switch defaultIsChecked size="md" onThumbColor="indigo.500" />
              </HStack> */}
              <Button
                leftIcon={<Icon as={Entypo} name="plus" size="sm" />}
                mx={10}
                my={4}
                borderRadius={"full"}
                size="lg"
                backgroundColor="indigo.800"
                onPress={handleSubmit(onSubmit)}
              >
                Add Task
              </Button>
            </Box>
          </Box>
        </VStack>
      </Box>
    </ScrollView>
  );
}
