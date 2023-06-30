import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Contract} from "../../../../models/contract";
import {ContractService} from "../../../../services/contract.service";
import {VendorService} from "../../../../services/vendor.service";
import {Vendor} from "../../../../models/vendor";

@Component({
  selector: 'app-vendor-edit-form',
  templateUrl: './vendor-edit-form.component.html',
  styleUrls: ['./vendor-edit-form.component.css']
})
export class VendorEditFormComponent {
  vendorForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<VendorEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) private vendorData: Vendor,
    private formBuilder: FormBuilder,
    private vendorService: VendorService,
  ) {

    this.vendorForm = this.formBuilder.group({
      name: [vendorData?.name || '', Validators.required],
      surname: [vendorData?.surname || '', Validators.required],
      address: [vendorData?.address || '', Validators.required],
      phone_number: [vendorData?.phone_number || '', Validators.required],
      email: [vendorData?.email || '', Validators.required],
      vendor_type: [vendorData?.vendor_type || '', Validators.required],
    });
  }

  editContract() {
    if (this.vendorForm.valid) {
      const vendorToSave: Vendor = <Vendor>{
        id: this.vendorData?.id || null,
        name: this.vendorForm.value.name,
        surname: this.vendorForm.value.surname,
        address: this.vendorForm.value.address,
        phone_number: this.vendorForm.value.phone_number,
        email: this.vendorForm.value.email,
        vendor_type: this.vendorForm.value.vendor_type,
      };

      this.vendorService.editVendor(vendorToSave.id, vendorToSave).subscribe(updatedContract => {
        this.dialogRef.close(updatedContract);
      });
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
