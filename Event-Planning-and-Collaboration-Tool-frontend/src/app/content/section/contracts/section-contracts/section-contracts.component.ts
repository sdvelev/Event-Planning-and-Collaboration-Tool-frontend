import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {PlannedEvent} from "../../../../models/planned-event";
import {Contract} from "../../../../models/contract";
import {EventService} from "../../../../services/event.service";
import {ContractService} from "../../../../services/contract.service";
import {ActivatedRoute} from "@angular/router";
import {TaskFormComponent} from "../../tasks/task-form/task-form.component";
import {Task} from "../../../../models/task";
import {TaskEditFormComponent} from "../../tasks/task-edit-form/task-edit-form.component";
import {MatDialog} from "@angular/material/dialog";
import {ContractFormComponent} from "../contract-form/contract-form.component";
import {ContractEditFromComponent} from "../contract-edit-from/contract-edit-from.component";

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

  constructor(private eventService: EventService, private contractService: ContractService,
              private activatedRoute: ActivatedRoute, private dialog: MatDialog) {
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

  openContractForm() {
    const dialogRef = this.dialog.open(ContractFormComponent, {
      width: '600px',
      height: '620px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        window.location.reload();
      }
    });
  }

  editButton(contract: Contract) {
    const dialogRef = this.dialog.open(ContractEditFromComponent, {
      width: '600px',
      height: '620px',
      data: {
        id: contract.id,
        total_price: contract.total_price,
        finished: contract.finished,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        window.location.reload();
      }
    });
  }

  deleteButton(contractId: number) {
    const confirmed = window.confirm('Are you sure you want to delete this contract?');
    if (confirmed) {
      this.contractService.deleteContract(contractId).subscribe(result => {
        if (result) {
          setTimeout(() => {
            window.location.reload();
          }, 50);
        }
      });
    }
  }
}
