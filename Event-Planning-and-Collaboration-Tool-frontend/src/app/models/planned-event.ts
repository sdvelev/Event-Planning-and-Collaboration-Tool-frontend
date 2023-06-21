export class PlannedEvent {
  id: number;
  name: string;
  date: string;
  location: string;
  description: string;
  picture_link: string;

  constructor(id: number = 0, name: string = "", date: string = "", location: string = "", description:string = "",
              picture_link: string = "") {
    this.id = id;
    this.name = name;
    this.date = date;
    this.location = location;
    this.description = description;
    this.picture_link = picture_link;
  }
}
