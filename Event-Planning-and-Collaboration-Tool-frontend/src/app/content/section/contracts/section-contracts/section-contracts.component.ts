import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {PlannedEvent} from "../../../../models/planned-event";
import {Contract} from "../../../../models/contract";
import {EventService} from "../../../../services/event.service";
import {ContractService} from "../../../../services/contract.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-section-contracts',
  templateUrl: './section-contracts.component.html',
  styleUrls: ['./section-contracts.component.css']
})
export class SectionContractsComponent implements OnInit{
  id!: number;

  private queryId: any;

  event$!: Observable<PlannedEvent>;

  contracts$!: Observable<Contract[] | undefined>;

  constructor(private eventService: EventService, private contractService: ContractService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.queryId = this.activatedRoute.params.subscribe(params => {
      this.id = params['id']
    });
    this.event$ = this.eventService.getEventById(this.id);
    this.contracts$ = this.contractService.getContractByEventId(this.id);
  }

  ngOnDestroy() {
    this.queryId.unsubscribe();
  }
}
