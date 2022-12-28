import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type PropsBottomNavigator = {
  Home: undefined;
  TaskRoutes: undefined;
  Account: undefined;
};

export type RootStackParamList = {
  Category: undefined;
  CreateTask: { category: string };
};

export type StackNativeScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type NoteProps = {
  title: string;
  date: string;
  description: string;
  category: string;
  done: boolean;
  notify: boolean;
};

export type NotePropsFromDB = {
  id: number;
  title: string;
  date: string;
  description: string;
  category: string;
  done: string;
  notify: string;
};
