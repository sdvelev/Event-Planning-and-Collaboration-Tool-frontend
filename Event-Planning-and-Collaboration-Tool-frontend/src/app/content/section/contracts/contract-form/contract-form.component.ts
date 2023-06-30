import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Contract} from "../../../../models/contract";
import {ContractService} from "../../../../services/contract.service";
import {Router} from "@angular/router";
import {EventService} from "../../../../services/event.service";
import {VendorService} from "../../../../services/vendor.service";

@Component({
  selector: 'app-contract-form',
  templateUrl: './contract-form.component.html',
  styleUrls: ['./contract-form.component.css']
})
export class ContractFormComponent {
  contractForm: FormGroup;
  eventId: number;

  constructor(
    private dialogRef: MatDialogRef<ContractFormComponent>,
    @Inject(MAT_DIALOG_DATA) private contractData: Contract,
    private formBuilder: FormBuilder,
    private contractService: ContractService,
    private eventService: EventService,
    private vendorService: VendorService,
    private router: Router
  ) {
    this.eventId = parseInt(router.url.split('/').pop()!);

    this.contractForm = this.formBuilder.group({
      total_price: [contractData?.total_price || '', Validators.required],
      // finished: [false || '', Validators.required],
      associated_event: [this.eventId || '', Validators.required],
      associated_vendor: [contractData?.associated_vendor || '', Validators.required],
    });
  }

  saveContract() {
    this.eventService.getEventById(this.eventId).subscribe(event => {
      this.vendorService.getVendorsById(this.contractForm.value.associated_vendor).subscribe(vendor => {
        if (this.contractForm.valid) {
          const contractToSave: Contract = <Contract>{
            id: this.contractData?.id || null,
            total_price: this.contractForm.value.total_price,
            finished: false,
            associated_event: event,
            associated_vendor: vendor,
          };

          this.contractService.addContract(contractToSave).subscribe(updatedContract => {
            this.dialogRef.close(updatedContract);
          });
        }
      })
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
