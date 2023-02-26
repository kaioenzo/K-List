import { Entypo, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
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
  useToast,
  View,
  VStack,
} from "native-base";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Dimensions, Platform } from "react-native";
import { useNoteStore } from "../repository/Store";
import { addNote } from "../services/NotesService";
import { NoteProps, StackNativeScreenProps } from "../types";

type CreateTaskType = StackNativeScreenProps<"CreateTask">;

export function CreateTask({ route, navigation }: CreateTaskType) {
  const [isSaving, setIsSaving] = useState(false);
  const [date, setDate] = useState(new Date());
  const [hour, setHour] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // For DatePicker and TimePicker
  const onChangeDatePickerDate = (event: unknown, selectedDate?: Date) => {
    const currentDate = new Date(selectedDate ?? date);
    setValue("date", dayjs(currentDate).format("DD/MM/YYYY"));
    trigger("date");
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };
  const onChangeTimePickerTime = (event: unknown, selectedTime?: Date) => {
    const currentHour = new Date(selectedTime ?? date);
    setValue("hour", dayjs(currentHour).format("HH:mm"));
    trigger("hour");
    setShowTimePicker(Platform.OS === "ios");
    setDate(currentHour);
  };
  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const showTimepicker = () => {
    setShowTimePicker(true);
  };

  const windowHeight = Dimensions.get("window").height;
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm<NoteProps>({
    defaultValues: {
      title: "",
      description: "",
      date: dayjs().format("DD/MM/YYYY"),
      hour: new Date().toLocaleTimeString(),
      notify: true,
      done: false,
      category: route.params.category,
    },
  });
  const addTask = useNoteStore();
  const toast = useToast();

  const onSubmit = async (data: NoteProps) => {
    setIsSaving(true);
    const nota = data;
    nota.category = route.params.category;
    console.log(nota);
    const notFromDB = await addNote(nota);
    addTask.add(notFromDB);
    setIsSaving(false);
    toast.show({
      duration: 2500,
      description: "Nota adicionada com sucesso!",
    });
    navigation.popToTop();
  };

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
              <FormControl isRequired isInvalid={"title" in errors}>
                <Controller
                  name="title"
                  control={control}
                  rules={{ required: "Title is required", minLength: 1 }}
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
                  {errors.title?.message}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl isRequired isInvalid={"description" in errors}>
                <Controller
                  name="description"
                  control={control}
                  rules={{ required: "Description is required", minLength: 1 }}
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
                      autoCompleteType={undefined}
                    />
                  )}
                />
                <FormControl.ErrorMessage>
                  {errors.description?.message}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl isRequired isInvalid={"date" in errors}>
                <Controller
                  name="date"
                  control={control}
                  rules={{
                    required: "Date is required",
                    validate: {
                      validDate: (v) =>
                        dayjs(v, "DD/MM/YYYY").isValid() ||
                        "Incorrect format of date",
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      type="text"
                      variant="underlined"
                      placeholder="Time"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      onTouchStart={showDatepicker}
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
              <View>
                {showDatePicker && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    is24Hour
                    onChange={onChangeDatePickerDate}
                  />
                )}
              </View>

              <FormControl isRequired isInvalid={"hour" in errors}>
                <Controller
                  name="hour"
                  control={control}
                  rules={{ required: "Choose a hour to your task!" }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      type="text"
                      variant="underlined"
                      placeholder="Time"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      onTouchStart={showTimepicker}
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
              <View>
                {showTimePicker && (
                  <DateTimePicker
                    testID="hourTimePicker"
                    value={hour}
                    mode="time"
                    is24Hour
                    onTouchCancel={() => setShowTimePicker(false)}
                    onChange={onChangeTimePickerTime}
                  />
                )}
              </View>

              <FormControl>
                <Controller
                  name="notify"
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
                        onValueChange={(state) => setValue("notify", state)}
                        value={value}
                      />
                    </HStack>
                  )}
                />
              </FormControl>
              <Button
                leftIcon={<Icon as={Entypo} name="plus" size="sm" />}
                mx={10}
                my={4}
                borderRadius={"full"}
                isLoadingText="Salvando"
                isLoading={isSaving}
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
