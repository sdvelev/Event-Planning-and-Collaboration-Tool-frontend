export class Review {
  id: number;
  rating: number;
  comment: string;
  photo_link: string;
  assigned_vendor : number | null;

  constructor(id: number = 0, rating: number = 0, comment: string = "", photo_link: string = "",
              assigned_vendor : number | null = 0) {
    this.id = id;
    this.rating = rating;
    this.comment = comment;
    this.photo_link = photo_link;
    this.assigned_vendor = assigned_vendor;
  }
}
