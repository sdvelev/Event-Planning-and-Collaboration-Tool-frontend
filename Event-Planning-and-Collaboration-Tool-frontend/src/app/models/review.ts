export class Review {
  id: number;
  rating: number;
  comment: string;
  photo_link: string;

  constructor(id: number = 0, rating: number = 0, comment: string = "", photo_link: string = "") {
    this.id = id;
    this.rating = rating;
    this.comment = comment;
    this.photo_link = photo_link;
  }
}
