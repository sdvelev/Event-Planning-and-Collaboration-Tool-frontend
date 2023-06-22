import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {PlannedEvent} from "../../../../models/planned-event";
import {EventService} from "../../../../services/event.service";
import {ActivatedRoute} from "@angular/router";
import {VendorService} from "../../../../services/vendor.service";
import {Vendor} from "../../../../models/vendor";
import {Contract} from "../../../../models/contract";
import {ContractService} from "../../../../services/contract.service";

@Component({
  selector: 'app-section-vendors',
  templateUrl: './section-vendors.component.html',
  styleUrls: ['./section-vendors.component.css']
})
export class SectionVendorsComponent implements OnInit {

  id!: number;

  private queryId: any;

  contract$!: Observable<Contract>;

  vendor$!: Observable<Vendor>;

  constructor(private contractService: ContractService, private vendorService: VendorService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.queryId = this.activatedRoute.params.subscribe(params => {
      this.id = params['id']
    });
    this.contract$ = this.contractService.getContractById(this.id);
    this.vendor$ = this.vendorService.getVendorsById(this.id);
  }

  ngOnDestroy() {
    this.queryId.unsubscribe();
  }
}
