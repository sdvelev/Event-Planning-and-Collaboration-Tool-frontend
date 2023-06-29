export class User {
  id: number;
  username: string;
  password: string;
  name: string;
  surname: string;
  email: string;
  profile_photo_link: string;
  address: string;
  created_by: string;
  creation_time: string;
  updated_by: string;
  last_updated_time: string;


  constructor(id: number = 0, username: string = "", password: string = "", name: string = "", surname: string = "", email: string = "", profile_photo_link: string = "", address: string = "", createdBy: string = "", creationTime: string = "", updatedBy: string = "", last_updated_time: string = "") {
    this.id = id;
    this.username = username;
    this.password = password;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.profile_photo_link = profile_photo_link;
    this.address = address;
    this.created_by = createdBy;
    this.creation_time = creationTime;
    this.updated_by = updatedBy;
    this.last_updated_time = last_updated_time;
  }
}
