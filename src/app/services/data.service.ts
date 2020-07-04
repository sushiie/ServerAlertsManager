import { Injectable } from '@angular/core';
import { AlertModel } from '../models/alert.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  selectedServer = '';

  alertsArr: AlertModel[] = [];

  mailerList = 'vikas@mobileyug.com, rahul@testing.com';

  isSendingAlert = true;

  checkAndUpdateStatus(): string {
    if (this.isSendingAlert) {
      if (this.mailerList.length > 0 && this.alertsArr.length > 0) {
        status = 'default';
      } else if (this.mailerList.length > 0 && this.alertsArr.length === 0) {
        status = 'no-alert-defined';
      } else if (this.mailerList.length === 0 && this.alertsArr.length > 0) {
        status = 'no-email-defined';
      }
    } else {
      status = 'alerts-disabled';
    }

    return status;
  }

  constructor() { }
}
