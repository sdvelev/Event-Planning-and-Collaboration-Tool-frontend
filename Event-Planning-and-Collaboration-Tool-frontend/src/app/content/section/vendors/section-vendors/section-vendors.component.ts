import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {VendorService} from "../../../../services/vendor.service";
import {Vendor} from "../../../../models/vendor";
import {Contract} from "../../../../models/contract";
import {ContractService} from "../../../../services/contract.service";
import {MatDialog} from "@angular/material/dialog";
import {VendorEditFormComponent} from "../vendor-edit-form/vendor-edit-form.component";

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

  constructor(private contractService: ContractService, private vendorService: VendorService,
              private activatedRoute: ActivatedRoute, private dialog: MatDialog) {
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

  editButton(vendor: Vendor) {
    const dialogRef = this.dialog.open(VendorEditFormComponent, {
      width: '600px',
      height: '620px',
      data: {
        id: vendor.id,
        name: vendor.name,
        surname: vendor.surname,
        address: vendor.address,
        phone_number: vendor.phone_number,
        email: vendor.email,
        vendor_type: vendor.vendor_type,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        window.location.reload();
      }
    });
  }

  deleteButton(vendorId: number) {
    const confirmed = window.confirm('Are you sure you want to delete this contract?');
    if (confirmed) {
      this.vendorService.deleteVendor(vendorId).subscribe(result => {
        if (result) {
          setTimeout(() => {
            window.location.reload();
          }, 50);
        }
      });
    }
  }
}
