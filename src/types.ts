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
