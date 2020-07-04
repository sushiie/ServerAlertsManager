import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../../services/data.service';
import { AlertModel } from 'src/app/models/alert.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor(
      public dialogRef: MatDialogRef<ModalComponent>, public dataService: DataService,
      @Inject(MAT_DIALOG_DATA) public data: any ) {}

  alertTypes = [
    'Web Server', 'Load Average', 'Memory Usage', 'Hard Disk Space'
  ];

  selectedAlertType = '';
  resposeCondition = '';
  serverUrl = '';
  serverUrlCondition = 'contains';
  nonServerCondition = 'more than';
  searchString = '';
  nonServerConditionValue = '';

  ngOnInit(): void {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onAddClick(): void {
    const newAlert = new AlertModel();
    newAlert.server = this.dataService.selectedServer;
    newAlert.type = this.selectedAlertType;
    newAlert.condition = this.getCondition(this.selectedAlertType);
    this.dataService.alertsArr.push(newAlert);
    this.dialogRef.close();
  }

  getCondition(type): string {
    let str = 'Alert when ';
    if (type === 'Web Server') {
      str += `server url ${this.serverUrlCondition} '${this.searchString}'.`;
    } else {
      str += `${this.selectedAlertType} is ${this.nonServerCondition} ${this.nonServerConditionValue} %.`;
    }
    return str;
  }

  onSaveClick(): void {
    this.dialogRef.close();
  }

}
