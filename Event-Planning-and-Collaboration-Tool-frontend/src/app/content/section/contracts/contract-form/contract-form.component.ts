import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DatePipe} from "@angular/common";
import {Contract} from "../../../../models/contract";
import {ContractService} from "../../../../services/contract.service";

@Component({
  selector: 'app-contract-form',
  templateUrl: './contract-form.component.html',
  styleUrls: ['./contract-form.component.css']
})
export class ContractFormComponent {
  contractForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ContractFormComponent>,
    @Inject(MAT_DIALOG_DATA) private contractData: Contract,
    private formBuilder: FormBuilder,
    private contractService: ContractService,
  ) {

    this.contractForm = this.formBuilder.group({
      total_price: [contractData?.total_price || '', Validators.required],
      finished: [contractData?.finished || '', Validators.required],
      associated_event: [contractData?.associated_event || '', Validators.required],
      associated_vendor: [contractData?.associated_vendor || '', Validators.required],
    });
  }

  saveContract() {
    if (this.contractForm.valid) {
      const contractToSave: Contract = <Contract>{
        id: this.contractData?.id || null,
        total_price: this.contractForm.value.total_price,
        finished: this.contractForm.value.finished,
        associated_event: this.contractForm.value.associated_event,
        associated_vendor: this.contractForm.value.associated_vendor,
      };

      this.contractService.addContract(contractToSave).subscribe(updatedContract => {
        this.dialogRef.close(updatedContract);
      });
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
