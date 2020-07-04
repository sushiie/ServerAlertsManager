import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './components/modal/modal.component';
import { DataService } from './services/data.service';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  statusMessages = {
    default: 'System is configured to Send Alerts to: ' + this.dataService.mailerList,
    'alerts-disabled': 'Alerts are disabled',
    'no-alert-defined': 'No Alerts are configured, Please Add new Alerts to start.',
    'no-email-defined': 'No Email is configured to send alerts.'
  };

  serverList = ['Server 1', 'Server 2', 'Server 3'];
  currentStatus = '';
  tableData = [];

  displayedColumns = ['type', 'condition', 'action'];
  @ViewChild('dataTable') dataTable: MatTable<any>;

  constructor(public dialog: MatDialog, public dataService: DataService) {
    this.currentStatus = this.statusMessages[dataService.checkAndUpdateStatus()];
  }

  onServerChange(): void {
    this.tableData = this.dataService.alertsArr.filter(x => x.server === this.dataService.selectedServer);
    this.dataTable.renderRows();
  }

  openAddModal(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '600px',
      data: {
        modalType: 'add'
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.tableData = this.dataService.alertsArr.filter(x => x.server === this.dataService.selectedServer);
      this.dataTable.renderRows();
      this.currentStatus = this.statusMessages[this.dataService.checkAndUpdateStatus()];
    });
  }

  openConfigureModal(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '600px',
      data: {
        modalType: 'configure'
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.currentStatus = this.statusMessages[this.dataService.checkAndUpdateStatus()];
    });
  }
}
