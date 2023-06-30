import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Contract} from "../../../../models/contract";
import {ContractService} from "../../../../services/contract.service";

@Component({
  selector: 'app-contract-edit-from',
  templateUrl: './contract-edit-from.component.html',
  styleUrls: ['./contract-edit-from.component.css']
})
export class ContractEditFromComponent {
  contractForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ContractEditFromComponent>,
    @Inject(MAT_DIALOG_DATA) private contractData: Contract,
    private formBuilder: FormBuilder,
    private contractService: ContractService,
  ) {

    this.contractForm = this.formBuilder.group({
      total_price: [contractData?.total_price || '', Validators.required],
      finished: [contractData?.finished || '', Validators.required],
    });
  }

  editContract() {
    if (this.contractForm.valid) {
      const contractToSave: Contract = <Contract>{
        id: this.contractData?.id || null,
        total_price: this.contractForm.value.total_price,
        finished: this.contractForm.value.finished,
      };

      this.contractService.editContract(contractToSave.id, contractToSave).subscribe(updatedContract => {
        this.dialogRef.close(updatedContract);
      });
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
