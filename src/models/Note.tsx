export class Note {
  id: number;
  title: string;
  date: string;
  hour: string;
  description: string;
  category: string;
  done: boolean;
  notify: boolean;
  constructor(
    id: number,
    title: string,
    date: string,
    hour: string,
    description: string,
    category: string,
    done: string,
    notify: string
  ) {
    this.id = id;
    this.title = title;
    this.date = date;
    this.hour = hour;
    this.description = description;
    this.category = category;
    this.done = done === "TRUE" ? true : false;
    this.notify = notify === "TRUE" ? true : false;
  }
}
