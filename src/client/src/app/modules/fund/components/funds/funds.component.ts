import { MediaService } from './../../../../shared/utils/media.service';
import { ToolBarComponent } from './../../../../shared/allentities/components/toolbar/toolbar.component';
import { IEntitiesViewModel } from './../../../../shared/interfaces/IEntitiesViewModel';
import { FundsService } from './../../fund-service';
import { Component, ViewChild } from "@angular/core";
import { CoreCacheService } from "src/app/core/cache/core-cache.service";
import { DataGateConstants } from "src/app/shared/utils/constants";
import { MatTableDataSource } from '@angular/material/table';
import { ViewTableComponent } from 'src/app/shared/allentities/components/view-table/viewtable.component';
import { IDownloadInputModel } from 'src/app/shared/interfaces/IDownloadInputModel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.scss']
})
export class FundsComponent {
  userName: string;
  userRoles = [];
  tableData: IEntitiesViewModel;
  controller: string = 'Funds';
  fundsLoaded = false;
  dataSource = new MatTableDataSource<any>();
  @ViewChild(ViewTableComponent) ViewTableComponent;
  @ViewChild(ToolBarComponent) ToolBarComponent;

  constructor(
    private coreCacheService: CoreCacheService,
    private fundsSevice: FundsService,
    private toaster: ToastrService,
    private mediaService: MediaService
  ) { }

  ngOnInit(): void {
    let user = this.coreCacheService.getByKey(DataGateConstants.userKey);
    this.userName = user.username;
    this.userRoles = user.roles;
    this._fetchData();
  }

  private _fetchData() {
    this.fundsSevice.all(this.userName).subscribe(data => {
      this.fundsLoaded = true;
      this.tableData = data;
      this._populateDataSource(data);
    });
  }

  _populateDataSource(data) {
    this.dataSource = new MatTableDataSource();
    for (let i = 0; i < data.values.length; i++) {
      const value = data.values[i];
      let obj = {};
      for (let j = 0; j < data.headers.length; j++) {
        const header = data.headers[j];
        obj[header] = data.values[i][j];
      }
      this.dataSource.data.push(obj);
    }
  }

  extract(event) {
    event == 'excel' ? this._generateReport('Excel') : this._generateReport('PDF');
  }

  update(model) {
    this.fundsLoaded = false;
    model.userName = this.userName;
    this.fundsSevice.update(model).subscribe(data => {
      this.fundsLoaded = true;
      this.tableData = data;
      this._populateDataSource(data);
    })
  }

  restore() {
    this._fetchData();
  }

  _generateReport(type: string) {
    let model = this._getModel(type);
    this.mediaService.generateReport(model).subscribe((data: any) => {
      if (!data.success) {
        this.toaster.error('Error while downloading the file!')
        return;
      }
      if (data != '') {
        this.downloadFile(data.file, data.fileName);
      }
    });
  }

  _getModel(command: string) {
    let model: IDownloadInputModel = {} as IDownloadInputModel;
    let table = this.ViewTableComponent.tableToExtract._elementRef.nativeElement;
    let tableValues = [];
    for (let row of table.rows) {
      let tableRows = [];
      for (let cell of row.cells) {
        tableRows.push(cell.innerText);
      }
      tableValues.push(tableRows);
    }
    model.TableValues = tableValues;
    model.Command = command;
    model.ControllerName = "Funds";
    model.Date = this.tableData.date;
    return model;
  }

  downloadFile(data: string, name: string) {
    let base = this.base64ToArrayBuffer(data);

    const extension = name.split(".").pop();
    let type = '';
    switch (extension) {
      case "pdf":
        type = 'application/pdf';
        break;
      case "xlsx":
        type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        break;
      case "xls":
        type = 'application/vnd.ms-excel';
        break;
      default:
        break;
    }

    let file = new Blob([base], { type: type });
    let fileURL = URL.createObjectURL(file);
    let a = document.createElement("a");
    document.body.appendChild(a);
    a.style.display = "none";
    a.href = fileURL;
    a.target = "_blank";
    a.download = name;
    a.click();
    a.remove();
  }

  base64ToArrayBuffer(base64) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes;
  }
}
