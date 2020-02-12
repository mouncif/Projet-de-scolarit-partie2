import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DialogData} from '../validation.component';

@Component({
  selector: 'app-validation-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

// tslint:disable-next-line:class-name
export class dialogComponent {
  password: string;
  confpassword: string;
  isDisabled: boolean;
  constructor(
    public dialogRef: MatDialogRef<dialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {this.isDisabled = true; }

  onNoClick(): void {
    this.dialogRef.close();
  }
  checkData() {
    // tslint:disable-next-line:triple-equals
    if (this.password == this.confpassword) {
       this.isDisabled = false;
    } else {
      this.isDisabled = true;
    }

  }

}
