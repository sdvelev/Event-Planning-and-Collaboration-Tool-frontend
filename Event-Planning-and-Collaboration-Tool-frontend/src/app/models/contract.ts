import {Vendor} from "./vendor";
import {PlannedEvent} from "./planned-event";

export class Contract {
  id: number;
  total_price: string;
  finished: boolean;
  associated_event: PlannedEvent;
  associated_vendor: Vendor;

  constructor(id: number = 0, total_price: string = "", finished: boolean = false,
              associated_event: PlannedEvent = new PlannedEvent(),
              associated_vendor: Vendor = new Vendor()) {
    this.id = id;
    this.total_price = total_price;
    this.finished = finished;
    this.associated_event = associated_event;
    this.associated_vendor = associated_vendor;
  }
}
