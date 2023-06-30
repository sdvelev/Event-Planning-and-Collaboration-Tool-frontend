export class PlannedEvent {
  id: number;
  name: string;
  date: string;
  location: string;
  description: string;
  picture_link: string;
  created_by: string;
  creation_time: string;
  updated_by: string;
  last_updated_time: string;

  constructor(id: number = 0, name: string = "", date: string = "", location: string = "", description:string = "",
              picture_link: string = "", created_by: string = "", creation_time: string = "", updated_by = "",
              last_updated_time: string = "") {
    this.id = id;
    this.name = name;
    this.date = date;
    this.location = location;
    this.description = description;
    this.picture_link = picture_link;
    this.created_by = created_by;
    this.creation_time = creation_time;
    this.updated_by = updated_by;
    this.last_updated_time = last_updated_time;
  }
}
